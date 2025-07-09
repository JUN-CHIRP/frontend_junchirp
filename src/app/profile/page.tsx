'use client';

import AuthGuard from '@/shared/components/AuthGuard/AuthGuard';
import { ReactElement, useState } from 'react';
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

export default function Profile(): ReactElement {
  const [action, setAction] = useState<ProfileActionType>(null);
  const user = useSelector(authSelector.selectUser);
  const socials = useSelector(selectAllSocials);
  const educations = useSelector(selectAllEducations);
  const softSkills = useSelector(selectAllSoftSkills);
  const hardSkills = useSelector(selectAllHardSkills);

  const allFilled = [socials, educations, softSkills, hardSkills].every(
    (arr) => arr.length > 0,
  );

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
            buttonText="Додати соцмережу"
            handleAddItem={handleAddSocial}
            handleEditItem={handleEditSocial}
          />
          <ProfileDetails<EducationInterface>
            title="Освіта"
            isEditable
            items={educations}
            maxSize={5}
            buttonText="Додати освіту"
            handleAddItem={handleAddEducation}
            handleEditItem={handleEditEducation}
          />
          <ProfileDetails<HardSkillInterface>
            title="Хард скіли"
            items={hardSkills}
            maxSize={20}
            buttonText="Додати хард скіл"
            handleAddItem={handleAddHardSkill}
          />
          <ProfileDetails<SoftSkillInterface>
            title="Софт скіли"
            items={softSkills}
            maxSize={20}
            buttonText="Додати софт скіл"
            handleAddItem={handleAddSoftSkill}
          />
        </div>
        <div className={styles.profile__actions}>
          <ProfileAction action={action} />
          <ProfileActionForm action={action} allField={allFilled} />
        </div>
      </div>
    </AuthGuard>
  );
}
