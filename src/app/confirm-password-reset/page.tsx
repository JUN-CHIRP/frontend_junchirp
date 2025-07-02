import { ReactElement, Suspense } from 'react';
import styles from '@/app/confirm-email/page.module.scss';
import Image from 'next/image';
import ConfirmPasswordResetContent from './components/confirm-password-reset-content/ConfirmPasswordResetContent';

export default function ConfirmPasswordReset(): ReactElement {
  return (
    <Suspense fallback={null}>
      <div className={styles['confirm-email']}>
        <div className={styles['confirm-email__inner']}>
          <ConfirmPasswordResetContent />
          <Image src="/images/bird-1.svg" alt="bird" width={420} height={662} />
        </div>
      </div>
    </Suspense>
  );
}
