import { ReactElement } from 'react';
import styles from './EmailPopup.module.scss';
import CheckEmailForm from '@/app/confirmation-result/components/ConfirmationResultContent/components/EmailPopup/components/CheckEmailForm/CheckEmailForm';

interface ConfirmModalProps {
  onClose: () => void;
}

export default function EmailPopup({
  onClose,
}: ConfirmModalProps): ReactElement {
  return (
    <div className={styles['email-popup__wrapper']}>
      <div className={styles['email-popup']}>
        <h3 className={styles['email-popup__title']}>Отримати лист</h3>
        <p className={styles['email-popup__content']}>
          Будь ласка, введи свій e-mail, щоб ми могли надіслати тобі лист для
          для підтвердження.
        </p>
        <CheckEmailForm onClose={onClose} />
      </div>
    </div>
  );
}
