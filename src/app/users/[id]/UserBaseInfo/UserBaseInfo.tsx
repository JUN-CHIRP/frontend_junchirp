import { ReactElement } from 'react';
import styles from './UserBaseInfo.module.scss';
import { UserInterface } from '@/shared/interfaces/user.interface';

interface UserBaseInfoProps {
  user: UserInterface;
}

export default function UserBaseInfo({
  user,
}: UserBaseInfoProps): ReactElement {
  return (
    <div className={styles['user-base-info']}>
      <div className={styles['user-base-info__header']}>
        <p className={styles['user-base-info__header']}>Ім'я та прізвище</p>
      </div>
      {user.avatarUrl} {user.firstName} {user.lastName}
    </div>
  );
}
