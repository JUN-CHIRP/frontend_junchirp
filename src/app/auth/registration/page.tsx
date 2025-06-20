'use client';

import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import styles from './page.module.scss';
import SocialButton from '@/shared/components/SocialButton/SocialButton';
import { ReactElement, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';

export default function Registration(): ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();

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

  const handleGoogleLogin = (): void => {
    const currentPath = window.location.pathname;
    const returnUrl = encodeURIComponent(currentPath);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseUrl}/auth/google?returnUrl=${returnUrl}`;
  };

  return (
    <div className={styles.registration}>
      <RegistrationForm />
      <div className={styles.registration__divider}>
        <div className={styles.registration__line}></div>
        <span className={styles.registration__text}>або</span>
        <div className={styles.registration__line}></div>
      </div>
      <SocialButton
        social="google"
        fullWidth={true}
        onClick={handleGoogleLogin}
      />
    </div>
  );
}
