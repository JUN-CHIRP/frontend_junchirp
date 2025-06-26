import { ReactElement, Suspense } from 'react';
import styles from './page.module.scss';
import ConfirmationResultContent from './components/ConfirmationResultContent/ConfirmationResultContent';
import Image from 'next/image';

export default function ConfirmationResult(): ReactElement {
  return (
    <Suspense fallback={null}>
      <div className={styles['confirmation-result']}>
        <div className={styles['confirmation-result__inner']}>
          <ConfirmationResultContent />
          <div className={styles['confirmation-result__bird']}>
            <Image
              src="/images/bird-2.svg"
              alt="bird"
              width={420}
              height={223}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
