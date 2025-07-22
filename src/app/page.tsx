import styles from './page.module.scss';
import { ReactElement } from 'react';

import StartPage from '@/app/components/StartPage/StartPage';

export default function Home(): ReactElement {
  return (
    <div className={styles.page}>
      <StartPage />
    </div>
  );
}
