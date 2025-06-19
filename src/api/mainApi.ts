import {
  fetchBaseQuery,
  BaseQueryFn,
  createApi,
} from '@reduxjs/toolkit/query/react';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface CsrfErrorData {
  code: string;
  message?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const isAuthRequest = (args: string | FetchArgs, method: string): boolean => {
  const url = typeof args === 'string' ? args : args.url;
  return (
    method === 'POST' &&
    (url.endsWith('auth/login') || url.endsWith('auth/register'))
  );
};

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  console.log(document.cookie);
  return match?.[2].split('%')[0];
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

const getCsrfTokenFromCookies = (): string | undefined => {
  return process.env.NEXT_PUBLIC_ENV === 'production'
    ? getCookie('__Host-prod.x-csrf-token')
    : getCookie('_csrf');
};

const deleteCsrfCookies = (): void => {
  const cookiesName =
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? '__Host-prod.x-csrf-token'
      : '_csrf';
  document.cookie = `${cookiesName}=; Max-Age=0; path=`;
};

const getNewCsrfTokenFromBackend = async (): Promise<string | undefined> => {
  const newCsrf = await fetch(`${BASE_URL}/csrf`, { credentials: 'include' });
  if (newCsrf.ok) {
    return getCsrfTokenFromCookies();
  }
};

const isCsrfError = (error: FetchBaseQueryError | undefined): boolean => {
  return error
    ? error.status === 403 &&
        (error.data as CsrfErrorData)?.code === 'EBADCSRFTOKEN'
    : false;
};

const baseQueryWithReauthAndCsrf: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const method = typeof args === 'string' ? 'GET' : (args.method ?? 'GET');

  const attachCsrfHeader = async (
    arg: string | FetchArgs,
  ): Promise<string | FetchArgs> => {
    const token =
      getCsrfTokenFromCookies() ?? (await getNewCsrfTokenFromBackend());

    if (typeof arg === 'string') {
      return {
        url: arg,
        method,
        headers: { 'x-csrf-token': token },
      };
    } else {
      return {
        ...arg,
        headers: {
          ...arg.headers,
          'x-csrf-token': token,
        },
      };
    }
  };

  if (method !== 'GET') {
    args = await attachCsrfHeader(args);
  }

  let result = await baseQuery(args, api, extraOptions);

  if (method === 'GET' && result.error?.status === 401) {
    let csrf =
      getCsrfTokenFromCookies() ?? (await getNewCsrfTokenFromBackend());

    let refreshResp = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: csrf ? { 'x-csrf-token': csrf } : {},
    });

    if (refreshResp.status === 403) {
      const json = await refreshResp.json().catch(() => ({}));
      if (json.code === 'EBADCSRFTOKEN') {
        deleteCsrfCookies();
        csrf = await getNewCsrfTokenFromBackend();

        refreshResp = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          headers: csrf ? { 'x-csrf-token': csrf } : {},
        });
      }
    }

    if (refreshResp.ok) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: 'auth/logout' });
    }
  }

  if (method !== 'GET' && isCsrfError(result.error)) {
    deleteCsrfCookies();
    await getNewCsrfTokenFromBackend();
    args = await attachCsrfHeader(args);
    result = await baseQuery(args, api, extraOptions);
  }

  if (
    method !== 'GET' &&
    result.error?.status === 401 &&
    !isAuthRequest(args, method)
  ) {
    const csrf =
      getCsrfTokenFromCookies() ?? (await getNewCsrfTokenFromBackend());

    const refreshResp = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: csrf ? { 'x-csrf-token': csrf } : {},
    });

    if (refreshResp.ok) {
      args = await attachCsrfHeader(args);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: 'auth/logout' });
    }
  }

  return result;
};

const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQueryWithReauthAndCsrf,
  tagTypes: ['auth'],
  endpoints: () => ({}),
});

export default mainApi;
