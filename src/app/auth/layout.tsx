import React, { ReactElement, Suspense } from 'react';
import styles from './layout.module.scss';
import Image from 'next/image';
import TabMenuWrapper from './components/TabMenuWrapper/TabMenuWrapper';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <div className={styles['auth-layout']}>
      <div className={styles['auth-layout__brackets']}>
        <Image
          src="/images/brackets.svg"
          alt="brackets"
          width={584}
          height={679}
        ></Image>
      </div>
      <div className={styles['auth-layout__routes-wrapper']}>
        <TabMenuWrapper />
        <Suspense>
          <div>{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
