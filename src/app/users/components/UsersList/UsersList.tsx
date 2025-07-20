'use client';

import { ReactElement } from 'react';
import styles from './UsersList.module.scss';
import { UserInterface } from '@/shared/interfaces/user.interface';
import UserItem from './components/UserItem/UserItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import authSelector from '@/redux/auth/authSelector';
import MyProjectsSelector from '@/redux/myProjects/myProjectsSelector';

interface UsersListProps {
  users: UserInterface[];
}

export default function UsersList({ users }: UsersListProps): ReactElement {
  const currentUser = useAppSelector(authSelector.selectUser);
  const myProjects = useAppSelector(MyProjectsSelector.selectMyOwnedProjects);

  return (
    <div className={styles['users-list']}>
      {users.map((user: UserInterface) => (
        <UserItem
          key={user.id}
          user={user}
          currentUser={currentUser}
          myProjects={myProjects}
        />
      ))}
    </div>
  );
}
