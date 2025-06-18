'use client';

import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import styles from './page.module.scss';
import SocialButton from '../../../shared/components/SocialButton/SocialButton';
import { ReactElement } from 'react';

export default function Registration(): ReactElement {
  return (
    <div className={styles.registration}>
      <RegistrationForm />
      <div className={styles.registration__divider}>
        <div className={styles.registration__line}></div>
        <span className={styles.registration__text}>або</span>
        <div className={styles.registration__line}></div>
      </div>
      <SocialButton social="google" fullWidth={true} />
    </div>
  );
}
