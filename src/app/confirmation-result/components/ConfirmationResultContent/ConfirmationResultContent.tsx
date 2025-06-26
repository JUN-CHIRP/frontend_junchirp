'use client';

import { ReactElement, useEffect, useState } from 'react';
import styles from './ConfirmationResultContent.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/shared/components/Button/Button';
import EmailPopup from './components/EmailPopup/EmailPopup';

export default function ConfirmationResultContent(): ReactElement {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const router = useRouter();
  let [title, content, button] = [<></>, <></>, <></>];
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const allowedStatuses = ['success', 'deleted', 'invalid'];
    if (!status || !allowedStatuses.includes(status)) {
      router.replace('/');
    }
  }, [status, router]);

  const handleLogin = (): void => router.replace('/auth/login');
  const handleRegistration = (): void => router.replace('/auth/register');
  const closeModal = (): void => setModalOpen(false);
  const openModal = (): void => setModalOpen(true);

  switch (status) {
    case 'success':
      title = (
        <h2
          className={`${styles['confirmation-result-content__title']} ${styles['confirmation-result-content__title--success']}`}
        >
          Вітаємо
        </h2>
      );
      content = (
        <div className={styles['confirmation-result-content__content']}>
          <p className={styles['confirmation-result-content__text']}>
            Реєстрація завершена, Е-mail успішно підтверджено!
          </p>
          <p className={styles['confirmation-result-content__text']}>
            Тепер ти можеш увійти в систему.
          </p>
        </div>
      );
      button = (
        <Button color="green" onClick={handleLogin}>
          Увійти
        </Button>
      );
      break;
    case 'deleted':
      title = (
        <h2
          className={`${styles['confirmation-result-content__title']} ${styles['confirmation-result-content__title--error']}`}
        >
          Термін дії посилання завершився
        </h2>
      );
      content = (
        <div className={styles['confirmation-result-content__content']}>
          <p className={styles['confirmation-result-content__text']}>
            Термін дії посилання завершився, і твій акаунт було видалено. Для
            доступу до платформи зареєструйся знову.
          </p>
        </div>
      );
      button = (
        <Button color="green" onClick={handleRegistration}>
          Зареєструватись
        </Button>
      );
      break;
    case 'invalid':
      title = (
        <h2
          className={`${styles['confirmation-result-content__title']} ${styles['confirmation-result-content__title--error']}`}
        >
          Термін дії посилання завершився
        </h2>
      );
      content = (
        <div className={styles['confirmation-result-content__content']}>
          <p className={styles['confirmation-result-content__text']}>
            Це посилання більше не дійсне. Будь ласка,{' '}
            <Button
              className={styles['confirmation-result-content__inline-button']}
              variant="link"
              color="green"
              onClick={openModal}
            >
              Надішли запит ще раз.
            </Button>{' '}
            на нове посилання для підтвердження електронної пошти.
          </p>
        </div>
      );
      button = <></>;
      break;
  }

  return (
    <>
      <div className={styles['confirmation-result-content']}>
        {title}
        {content}
        {button}
      </div>
      {isModalOpen && <EmailPopup onClose={closeModal} />}
    </>
  );
}
