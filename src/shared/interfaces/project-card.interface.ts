import { ProjectRoleTypeInterface } from '@/shared/interfaces/project-role-type.interface';

export interface ProjectCardInterface {
  id: string;
  projectName: string;
  description: string;
  status: 'active' | 'done';
  createdAt: Date;
  participantsCount: number;
  ownerId: string;
  roles: ProjectRoleTypeInterface[];
}
