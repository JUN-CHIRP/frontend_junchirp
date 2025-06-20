import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '../../../../../api/authApi';
import React, { ReactElement, useEffect } from 'react';
import { useToast } from '../../../../../hooks/useToast';
import styles from './RegistrationForm.module.scss';
import Input from '../../../../../shared/components/Input/Input';
import Button from '../../../../../shared/components/Button/Button';
import { blackListPasswords } from '../../../../../shared/constants/black-list-passwords';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Link from 'next/link';
import Checkbox from '@/assets/icons/checkbox-empty.svg';
import CheckboxChecked from '@/assets/icons/checkbox-checked.svg';

const schema = z
  .object({
    firstName: z
      .string()
      .nonempty('Поле імені не може бути порожнім')
      .min(2, `Ім'я повинно містити від 2 до 50 символів`)
      .max(50, `Ім'я повинно містити від 2 до 50 символів`)
      .regex(
        /^[a-zA-Zа-яА-ЯґҐіІїЇєЄ'’ -]+$/,
        'Використовувати можна тільки літери, пробіли, апострофи та дефіси',
      ),
    lastName: z
      .string()
      .nonempty('Поле прізвища не може бути порожнім')
      .min(2, 'Прізвище повинно містити від 2 до 50 символів')
      .max(50, 'Прізвище повинно містити від 2 до 50 символів')
      .regex(
        /^[a-zA-Zа-яА-ЯґҐіІїЇєЄ'’ -]+$/,
        'Використовувати можна тільки літери, пробіли, апострофи та дефіси',
      ),
    email: z
      .string()
      .nonempty('Поле електронної пошти не може бути порожнім')
      .email('Некоректний формат електронної пошти')
      .regex(/^(?!.*[а-яА-ЯґҐіІєЄїЇ])/, 'Некоректний формат електронної пошти')
      .refine((val) => !val.endsWith('.ru'), {
        message: `Домен '.ru' не підтримується. Вибери інший`,
      }),
    password: z
      .string()
      .nonempty('Поле пароля не може бути порожнім')
      .min(8, 'Пароль повинен містити від 8 до 20 символів')
      .max(20, 'Пароль повинен містити від 8 до 20 символів')
      .refine(
        (val) => /^[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(val),
        {
          message: 'Пароль містить заборонені символи',
        },
      ),
    confirmPassword: z
      .string()
      .nonempty('Поле підтвердження пароля не може бути порожнім'),
    agreement: z.boolean().refine((val) => val, {
      message:
        'Підтверди, будь ласка, свою згоду з "Умовами використання" та "Політикою конфіденційності"',
    }),
  })
  .superRefine(({ password, firstName, lastName, confirmPassword }, ctx) => {
    if (password.includes(firstName) && firstName.length) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: `Пароль не повинен містити ваше ім'я та прізвище`,
      });
    }

    if (password.includes(lastName) && lastName.length) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: `Пароль не повинен містити ваше ім'я та прізвище`,
      });
    }

    if (blackListPasswords.includes(password)) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: 'Уникайте очевидних паролів, таких як Password1',
      });
    }

    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'Паролі не збігаються. Перевір, будь ласка, введені значення',
      });
    }
  });

type FormData = z.infer<typeof schema>;
type PasswordStrength = 'none' | 'weak' | 'medium' | 'strong';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getPasswordStrength(
  password?: string,
  firstName?: string,
  lastName?: string,
  blackList: string[] = [],
): PasswordStrength {
  if (!password) {
    return 'none';
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
  const onlyAllowedChars =
    /^[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(password);
  const length = password.length;
  const isBlacklisted = blackList?.includes(password);
  const containsNames =
    (firstName && password.includes(firstName)) ??
    (lastName && password.includes(lastName));

  if (
    length >= 12 &&
    length <= 20 &&
    hasLower &&
    hasUpper &&
    hasDigit &&
    hasSpecial &&
    onlyAllowedChars &&
    !isBlacklisted &&
    !containsNames
  ) {
    return 'strong';
  }

  if (
    length >= 8 &&
    length <= 20 &&
    [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length >= 2 &&
    onlyAllowedChars &&
    !isBlacklisted &&
    !containsNames
  ) {
    return 'medium';
  }

  return 'weak';
}

export default function RegistrationForm(): ReactElement {
  const {
    register,
    trigger,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, dirtyFields, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const password = watch('password');
  const email = watch('email');
  const agreement = watch('agreement');
  const passwordStrength = getPasswordStrength(
    password,
    firstName,
    lastName,
    blackListPasswords,
  );
  const strengthInfo = !password
    ? {
        classNames: ['', '', ''],
        text: 'Стан паролю',
      }
    : passwordStrength === 'weak'
      ? {
          classNames: [
            styles['registration-form__password-strength-item--weak'],
            '',
            '',
          ],
          text: 'Пароль занадто слабкий',
        }
      : passwordStrength === 'medium'
        ? {
            classNames: [
              styles['registration-form__password-strength-item--medium'],
              styles['registration-form__password-strength-item--medium'],
              '',
            ],
            text: 'Можна покращити',
          }
        : {
            classNames: [
              styles['registration-form__password-strength-item--strong'],
              styles['registration-form__password-strength-item--strong'],
              styles['registration-form__password-strength-item--strong'],
            ],
            text: 'Надійний пароль',
          };

  useEffect(() => {
    if (dirtyFields.confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, trigger, dirtyFields.confirmPassword]);

  useEffect(() => {
    trigger('password');
  }, [firstName, lastName, trigger]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (
        !email ||
        (errors.email?.type !== 'manual' && !!errors.email?.message)
      ) {
        return;
      }

      try {
        const res = await fetch(
          `${BASE_URL}/users/check-email?email=${encodeURIComponent(email)}`,
        );
        if (!res.ok) {
          return;
        }
        const { isAvailable } = await res.json();

        if (!isAvailable) {
          setError('email', {
            type: 'manual',
            message: 'Ця електронна пошта вже використовується',
          });
        } else {
          clearErrors('email');
        }
      } catch {
        return;
      }
    }, 500);

    return (): void => clearTimeout(timeout);
  }, [email, setError, clearErrors, errors.email?.type, errors.email?.message]);

  const router = useRouter();
  const [registration, { isLoading }] = useRegisterMutation();
  const toast = useToast();

  const onSubmit = async (data: FormData): Promise<void> => {
    const trimmedData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
    };
    const result = await registration(trimmedData);

    if ('error' in result) {
      const errorData = result.error as
        | ((FetchBaseQueryError | SerializedError) & { status: number })
        | undefined;
      const status = errorData?.status;

      if (status === 409) {
        toast({
          severity: 'error',
          summary: 'Ця електронна пошта вже використовується.',
          detail: 'Спробуй іншу електронну пошту.',
          life: 1000,
        });
        return;
      }

      toast({
        severity: 'error',
        summary: 'Помилка реєстрації.',
        detail: 'Сталася помилка під час реєстрації. Спробуй пізніше.',
        life: 1000,
      });
      return;
    }

    router.push('/confirm-email');
  };

  return (
    <form
      noValidate
      className={styles['registration-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className={styles['registration-form__fieldset']}
        disabled={isLoading}
      >
        <Input
          label="Ім'я"
          {...register('firstName')}
          withError
          errorMessages={
            errors.firstName?.message && [errors.firstName.message]
          }
        />
        <Input
          label="Прізвище"
          {...register('lastName')}
          withError
          errorMessages={errors.lastName?.message && [errors.lastName.message]}
        />
        <Input
          label="Email"
          placeholder="example@email.com"
          type="email"
          {...register('email')}
          withError
          errorMessages={errors.email?.message && [errors.email.message]}
        />
        <Input
          autoComplete="new-password"
          label="Пароль"
          type="password"
          {...register('password')}
          withError
          errorMessages={
            errors.password &&
            (dirtyFields.password || isSubmitted) &&
            errors.password.message
              ? [errors.password.message]
              : undefined
          }
        />
        <div className={styles['registration-form__password-strength']}>
          <div className={styles['registration-form__password-strength-list']}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${styles['registration-form__password-strength-item']} ${strengthInfo.classNames[i] || ''}`}
              ></div>
            ))}
          </div>
          <div
            className={styles['registration-form__password-strength-describe']}
          >
            {strengthInfo.text}
          </div>
        </div>
        <Input
          label="Повторити пароль"
          type="password"
          {...register('confirmPassword')}
          withError
          errorMessages={
            errors.confirmPassword &&
            (dirtyFields.confirmPassword || isSubmitted) &&
            errors.confirmPassword.message
              ? [errors.confirmPassword.message]
              : undefined
          }
        />
        <div>
          <div className={styles['registration-form__checkbox-wrapper']}>
            <p className={styles['registration-form__checkbox-label']}>
              Я погоджуюсь з{' '}
              <Link
                className={styles['registration-form__link']}
                href="/legal-terms"
              >
                Умовами використання
              </Link>{' '}
              та{' '}
              <Link
                className={styles['registration-form__link']}
                href="/privacy-policy"
              >
                Політикою конфіденційності
              </Link>
            </p>
            <label htmlFor="checkbox">
              {agreement ? (
                <CheckboxChecked
                  className={styles['registration-form__icon']}
                />
              ) : (
                <Checkbox className={styles['registration-form__icon']} />
              )}
            </label>
            <input
              className={styles['registration-form__checkbox']}
              id="checkbox"
              type="checkbox"
              {...register('agreement')}
            />
          </div>
          {errors.agreement ? (
            <p className={styles['registration-form__checkbox-error']}>
              {errors.agreement.message}
            </p>
          ) : (
            <p className={styles['registration-form__checkbox-error']}></p>
          )}
        </div>
      </fieldset>
      <Button
        type="submit"
        size="md"
        color="green"
        fullWidth={true}
        loading={isLoading}
      >
        Зареєструватися
      </Button>
    </form>
  );
}
