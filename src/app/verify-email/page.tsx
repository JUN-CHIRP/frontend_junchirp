import { ReactElement, Suspense } from 'react';
import styles from './page.module.scss';
import VerifyEmailContent from './components/VerifyEmailContent/VerifyEmailContent';

export default function VerifyEmail(): ReactElement {
  return (
    <Suspense fallback={null}>
      <div className={styles['verify-email']}>
        <VerifyEmailContent />
      </div>
    </Suspense>
  );
}
