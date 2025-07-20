'use client';

import { ReactElement } from 'react';
import styles from './UserItem.module.scss';
import { UserInterface } from '@/shared/interfaces/user.interface';
import Button from '@/shared/components/Button/Button';
import Image from 'next/image';
import { ProjectCardInterface } from '@/shared/interfaces/project-card.interface';

interface UserItemProps {
  user: UserInterface;
  currentUser: UserInterface;
  myProjects: ProjectCardInterface[];
}

export default function UserItem({
  user,
  currentUser,
  myProjects,
}: UserItemProps): ReactElement {
  return (
    <div className={styles['user-item']}>
      <div className={styles['user-item__profile']}>
        <Image
          className={styles['user-item__image']}
          src="./images/bird-3.svg"
          alt="bird"
          height={148}
          width={148}
        />
        <div className={styles['user-item__details']}>
          <h3 className={styles['user-item__title']}>
            {user.firstName} {user.lastName}
          </h3>
          <ul className={styles['user-item__edu-list']}>
            {user.educations.map((edu) => (
              <li className={styles['user-item__edu-item']} key={edu.id}>
                {edu.specialization.roleName}
              </li>
            ))}
          </ul>
          <p className={styles['user-item__projects-text']}>
            Кількість активних проєктів:{' '}
            <span className={styles['user-item__projects-count']}>
              {user.activeProjectsCount}
            </span>
          </p>
        </div>
      </div>
      <div className={styles['user-item__actions']}>
        <Button variant="secondary-frame" color="green">
          Профіль
        </Button>
        <Button
          color="green"
          disabled={
            user.activeProjectsCount === 2 ||
            user.id === currentUser.id ||
            myProjects.length === 0
          }
        >
          Запросити
        </Button>
      </div>
    </div>
  );
}
