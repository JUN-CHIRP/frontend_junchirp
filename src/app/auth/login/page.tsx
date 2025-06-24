import styles from './page.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { ReactElement } from 'react';
import GoogleAuthButton from '@/shared/components/GoogleAuthButton/GoogleAuthButton';

export default function Login(): ReactElement {
  return (
    <div className={styles.login}>
      <LoginForm />
      <div className={styles.login__divider}>
        <div className={styles.login__line}></div>
        <span className={styles.login__text}>або</span>
        <div className={styles.login__line}></div>
      </div>
      <GoogleAuthButton
        fullWidth={true}
        message={{
          severity: 'error',
          summary: 'Не вдалося увійти через Google.',
          detail: 'Спробуй ще раз або обери інший спосіб входу.',
          life: 3000,
        }}
      />
    </div>
  );
}
