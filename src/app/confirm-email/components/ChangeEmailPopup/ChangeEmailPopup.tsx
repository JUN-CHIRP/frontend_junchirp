import { ReactElement } from 'react';
import styles from './ChangeEmailPopup.module.scss';
import ChangeEmailForm from './components/ChangeEmailForm/ChangeEmailForm';

interface ConfirmModalProps {
  onClose: () => void;
}

export default function ChangeEmailPopup({
  onClose,
}: ConfirmModalProps): ReactElement {
  return (
    <div className={styles['change-email-popup__wrapper']}>
      <div className={styles['change-email-popup']}>
        <h3 className={styles['change-email-popup__title']}>Змінити e-mail</h3>
        <p className={styles['change-email-popup__content']}>
          Будь ласка, введи свій новий e-mail, щоб ми могли надіслати тобі лист
          для підтвердження.
        </p>
        <ChangeEmailForm onClose={onClose} />
      </div>
    </div>
  );
}
