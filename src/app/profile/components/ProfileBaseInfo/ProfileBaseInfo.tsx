import { ReactElement } from 'react';
import styles from './ProfileBaseInfo.module.scss';
import Image from 'next/image';
import { UserInterface } from '@/shared/interfaces/user.interface';
import Button from '@/shared/components/Button/Button';
import Edit from '@/assets/icons/edit.svg';

interface ProfileBaseInfoProps {
  user: UserInterface;
}

export default function ProfileBaseInfo({
  user,
}: ProfileBaseInfoProps): ReactElement {
  return (
    <div className={styles['profile-base-info']}>
      <div className={styles['profile-base-info__inner']}>
        <Image src="./images/bird-3.svg" alt="bird" height={148} width={148} />
        <div className={styles['profile-base-info__info']}>
          <div className={styles['profile-base-info__name-wrapper']}>
            <p className={styles['profile-base-info__name']}>
              {user.firstName} {user.lastName}
            </p>
            <Button color="green" variant="secondary-frame" icon={<Edit />} />
          </div>
          <p className={styles['profile-base-info__email']}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
