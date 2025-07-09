import { JSX, ReactElement } from 'react';
import { ProfileActionType } from '@/shared/types/profile-action.type';
import styles from './ProfileActionForm.module.scss';
import SocialForm from './components/SocialForm/SocialForm';

interface ProfileActionFormProps {
  action: ProfileActionType;
  allField: boolean;
}

export default function ProfileActionForm({
  action,
  allField,
}: ProfileActionFormProps): ReactElement {
  let content: JSX.Element;
  switch (action?.type) {
    case 'add-social': {
      content = <SocialForm />;
      break;
    }
    case 'edit-social': {
      content = <SocialForm initialValues={action.item} />;
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
