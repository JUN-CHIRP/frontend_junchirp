'use client';

import styles from './page.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import SocialButton from '../../../shared/components/SocialButton/SocialButton';
import { ReactElement } from 'react';

export default function Login(): ReactElement {
  return (
    <div className={styles.login}>
      <LoginForm />
      <div className={styles.login__divider}>
        <div className={styles.login__line}></div>
        <span className={styles.login__text}>або</span>
        <div className={styles.login__line}></div>
      </div>
      <SocialButton social="google" fullWidth={true} />
    </div>
  );
}
