'use client';

import { ReactElement } from 'react';
import { ProfileActionType } from '@/shared/types/profile-action.type';
import styles from './ProfileActionForm.module.scss';
import SocialForm from './components/SocialForm/SocialForm';
import EducationForm from './components/EducationForm/EducationForm';

interface ProfileActionFormProps {
  action: ProfileActionType;
  allField: boolean;
  onCancel: () => void;
}

export default function ProfileActionForm(
  props: ProfileActionFormProps,
): ReactElement {
  const { action, allField, onCancel } = props;
  let content: ReactElement;
  switch (action?.type) {
    case 'add-social': {
      content = <SocialForm onCancel={onCancel} />;
      break;
    }
    case 'edit-social': {
      content = <SocialForm initialValues={action.item} onCancel={onCancel} />;
      break;
    }
    case 'add-education': {
      content = <EducationForm onCancel={onCancel} />;
      break;
    }
    case 'edit-education': {
      content = (
        <EducationForm initialValues={action.item} onCancel={onCancel} />
      );
      break;
    }
    default: {
      content = allField ? (
        <p className={styles['profile-action-form__text']}>
          Профіль готовий — обирай проєкт або створи власний!
        </p>
      ) : (
        <p className={styles['profile-action-form__text']}>
          Заповни профіль, щоб показати свої сильні сторони та долучитись до
          крутих можливостей!
        </p>
      );
    }
  }

  return <div className={styles['profile-action-form']}>{content}</div>;
}
