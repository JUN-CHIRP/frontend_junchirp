'use client';

import { ReactElement, useEffect } from 'react';
import Spinner from '@/shared/components/Spinner/Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConfirmEmailMutation } from '@/api/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export default function VerifyEmailContent(): ReactElement | null {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [verifyEmail, { isError, isSuccess, isLoading, error }] =
    useConfirmEmailMutation();

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    if (isSuccess) {
      router.replace('/confirmation-result?status=success');
    } else if (isError) {
      const errorData = error as (FetchBaseQueryError | SerializedError) & {
        status?: number;
      };
      const status = errorData.status;

      if (status === 400) {
        router.replace('/confirmation-result?status=invalid');
      } else if (status === 404) {
        router.replace('/confirmation-result?status=deleted');
      } else {
        router.replace('/confirmation-result?status=error');
      }
    }
  }, [isSuccess, isError, error, router]);

  return <>{isLoading ? <Spinner size={200} /> : null}</>;
}
