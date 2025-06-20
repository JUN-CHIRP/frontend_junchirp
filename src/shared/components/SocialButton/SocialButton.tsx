'use client';

import styles from './SocialButton.module.scss';
import React, { ReactElement, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '../../../hooks/useToast';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconOnly?: boolean;
  social: 'google' | 'facebook';
  fullWidth?: boolean;
}

const buttonData = {
  google: {
    text: 'Продовжити з Google',
    iconSrc: '/images/google.svg',
  },
  facebook: {
    text: 'Продовжити з Facebook',
    iconSrc: '/images/google.svg',
  },
};

export default function SocialButton({
  social,
  iconOnly = false,
  fullWidth = false,
}: ButtonProps): ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();

  const className = [
    styles['social-button'],
    styles[`social-button--${social}`],
    fullWidth && styles['social-button--full'],
    iconOnly && styles['social-button--icon-button'],
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'google_auth_failed') {
      toast({
        severity: 'error',
        summary: 'Не вдалося зареєструватись через Google.',
        detail: 'Спробуй ще раз або обери інший спосіб реєстрації.',
        life: 1000,
      });

      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      router.replace(url.pathname);
    }
  }, [searchParams, toast, router]);

  const handleSocialLogin = (): void => {
    const currentPath = window.location.pathname;
    const returnUrl = encodeURIComponent(currentPath);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseUrl}/auth/${social}?returnUrl=${returnUrl}`;
  };

  return (
    <button className={className} onClick={handleSocialLogin}>
      <Image
        src={buttonData[social].iconSrc}
        alt={social}
        width={24}
        height={24}
      />
      {!iconOnly ? <span>{buttonData[social].text}</span> : null}
    </button>
  );
}
