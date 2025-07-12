'use client';

import AuthGuard from '@/shared/components/AuthGuard/AuthGuard';
import { ReactElement, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import ProfileBaseInfo from './components/ProfileBaseInfo/ProfileBaseInfo';
import { useSelector } from 'react-redux';
import authSelector from '@/redux/auth/authSelector';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import { selectAllSocials } from '@/redux/socials/socialsSlice';
import { selectAllEducations } from '@/redux/educations/educationsSlice';
import { selectAllSoftSkills } from '@/redux/softSkills/softSkillsSlice';
import { selectAllHardSkills } from '@/redux/hardSkills/hardSkillsSlice';
import { SocialInterface } from '@/shared/interfaces/social.interface';
import { EducationInterface } from '@/shared/interfaces/education.interface';
import { HardSkillInterface } from '@/shared/interfaces/hard-skill.interface';
import { SoftSkillInterface } from '@/shared/interfaces/soft-skill.interface';
import ProfileAction from './components/ProfileAction/ProfileAction';
import { ProfileActionType } from '@/shared/types/profile-action.type';
import ProfileActionForm from './components/ProfileActionForm/ProfileActionForm';
import { useDeleteSocialMutation } from '@/api/socialsApi';
import DeleteItemPopup from '@/app/profile/components/DeleteItemPopup/DeleteItemPopup';
import { isEducation, isSocial } from '@/shared/utils/typeGuards';
import { DeletedItemInterface } from '@/shared/interfaces/deleted-item.interface';
import { useToast } from '@/hooks/useToast';
import { useDeleteEducationMutation } from '@/api/educationsApi';

export default function Profile(): ReactElement {
  const [action, setAction] = useState<ProfileActionType>(null);
  const [deletedItem, setDeletedItem] = useState<DeletedItemInterface<
    | SocialInterface
    | EducationInterface
    | SoftSkillInterface
    | HardSkillInterface
  > | null>(null);
  const [deleteSocial] = useDeleteSocialMutation();
  const [deleteEducation] = useDeleteEducationMutation();
  const toast = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector(authSelector.selectUser);
  const socials = useSelector(selectAllSocials);
  const educations = useSelector(selectAllEducations);
  const softSkills = useSelector(selectAllSoftSkills);
  const hardSkills = useSelector(selectAllHardSkills);

  const allFilled = [socials, educations, softSkills, hardSkills].every(
    (arr) => arr.length > 0,
  );

  useEffect(() => {
    if (action && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [action]);

  const handleAddSocial = (): void =>
    setAction({ type: 'add-social', description: 'Додати соцмережу' });
  const handleAddEducation = (): void =>
    setAction({ type: 'add-education', description: 'Додати освіту' });
  const handleAddHardSkill = (): void =>
    setAction({ type: 'add-hard-skill', description: 'Додати хард скіл' });
  const handleAddSoftSkill = (): void =>
    setAction({ type: 'add-soft-skill', description: 'Додати софт скіл' });
  const handleEditSocial = (item: SocialInterface): void =>
    setAction({
      type: 'edit-social',
      item,
      description: 'Редагувати соцмережу',
    });
  const handleEditEducation = (item: EducationInterface): void =>
    setAction({
      type: 'edit-education',
      item,
      description: 'Редагувати освіту',
    });
  const handleCancel = (): void => setAction(null);
  const closeModal = (): void => {
    setModalOpen(false);
    setDeletedItem(null);
  };
  const openModal = (
    item:
      | SocialInterface
      | EducationInterface
      | SoftSkillInterface
      | HardSkillInterface,
  ): void => {
    setModalOpen(true);
    if (isSocial(item)) {
      setDeletedItem({
        item,
        title: 'Видалити соцмережу?',
        message:
          'Ти дійсно хочеш видалити цю соцмережу? Дію неможливо скасувати.',
      });
    }
    if (isEducation(item)) {
      setDeletedItem({
        item,
        title: 'Видалити запис про освіту?',
        message:
          'Ти дійсно хочеш видалити цей запис про освіту? Дію неможливо скасувати.',
      });
    }
  };
  const handleDeleteSocial = async (item: SocialInterface): Promise<void> => {
    const result = await deleteSocial(item.id);
    closeModal();
    console.log(result);

    if ('data' in result) {
      toast({
        severity: 'success',
        summary: 'Соцмережу видалено.',
        life: 3000,
      });
    }
  };

  const handleDeleteEducation = async (
    item: EducationInterface,
  ): Promise<void> => {
    const result = await deleteEducation(item.id);
    closeModal();
    console.log(result);

    if ('data' in result) {
      toast({
        severity: 'success',
        summary: 'Запис про освіту видалено.',
        life: 3000,
      });
    }
  };

  return (
    <AuthGuard requireVerified>
      <div className={styles.profile}>
        <div className={styles.profile__details}>
          <div className={styles.profile__info}>
            <ProfileBaseInfo user={user} />
          </div>
          <ProfileDetails<SocialInterface>
            title="Соцмережі"
            isEditable
            items={socials}
            maxSize={5}
            handleAddItem={handleAddSocial}
            handleEditItem={handleEditSocial}
            handleDeleteItem={openModal}
          />
          <ProfileDetails<EducationInterface>
            title="Освіта"
            isEditable
            items={educations}
            maxSize={5}
            handleAddItem={handleAddEducation}
            handleEditItem={handleEditEducation}
            handleDeleteItem={openModal}
          />
          <ProfileDetails<HardSkillInterface>
            title="Хард скіли"
            items={hardSkills}
            maxSize={20}
            handleAddItem={handleAddHardSkill}
            handleDeleteItem={handleCancel}
          />
          <ProfileDetails<SoftSkillInterface>
            title="Софт скіли"
            items={softSkills}
            maxSize={20}
            handleAddItem={handleAddSoftSkill}
            handleDeleteItem={handleCancel}
          />
        </div>
        <div className={styles.profile__actions} ref={formRef}>
          <ProfileAction action={action} />
          <ProfileActionForm
            action={action}
            allField={allFilled}
            onCancel={handleCancel}
          />
        </div>
      </div>
      {isModalOpen && deletedItem && isSocial(deletedItem.item) && (
        <DeleteItemPopup<SocialInterface>
          item={deletedItem.item}
          onCancel={closeModal}
          onConfirm={handleDeleteSocial}
          maxSize={5}
          count={socials.length}
          title={deletedItem.title}
          message={deletedItem.message}
        />
      )}
      {isModalOpen && isEducation(deletedItem?.item) && (
        <DeleteItemPopup<EducationInterface>
          item={deletedItem.item}
          onCancel={closeModal}
          onConfirm={handleDeleteEducation}
          maxSize={5}
          count={educations.length}
          title={deletedItem.title}
          message={deletedItem.message}
        />
      )}
    </AuthGuard>
  );
}
