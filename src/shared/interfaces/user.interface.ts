import { RoleInterface } from './role.interface';
import { SoftSkillInterface } from './soft-skill.interface';
import { HardSkillInterface } from './hard-skill.interface';
import { SocialInterface } from './social.interface';
import { EducationInterface } from './education.interface';

export interface UserInterface {
  id: string;
  googleId: string | null;
  discordId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  activeProjectCount: number;
  isVerified: boolean;
  role: RoleInterface;
  educations: EducationInterface[];
  softSkills: SoftSkillInterface[];
  hardSkills: HardSkillInterface[];
  socials: SocialInterface[];
}
