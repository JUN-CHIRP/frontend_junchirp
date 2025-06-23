import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import styles from './page.module.scss';
import { ReactElement } from 'react';
import GoogleAuthButton from '@/shared/components/GoogleAuthButton/GoogleAuthButton';

export default function Registration(): ReactElement {
  return (
    <div className={styles.registration}>
      <RegistrationForm />
      <div className={styles.registration__divider}>
        <div className={styles.registration__line}></div>
        <span className={styles.registration__text}>або</span>
        <div className={styles.registration__line}></div>
      </div>
      <GoogleAuthButton
        fullWidth={true}
        message={{
          severity: 'error',
          summary: 'Не вдалося зареєструватись через Google.',
          detail: 'Спробуй ще раз або обери інший спосіб реєстрації.',
          life: 1000,
        }}
      />
    </div>
  );
}
