import { AssignedEmployee } from '@patients/models/employee.model';

export interface NewSurgery {
  description?: string;
  performedDate: string;
  tariffId: number;
}

export type Surgery = Omit<NewSurgery, 'tariffId'> & {
  id: number;
  specialists?: AssignedEmployee[];
  tariffHospitalCost?: number;
  tariffSpecialistFee?: number;
  tariffPrice?: number;
  createdAt: string;
  updatedAt?: string;
};

export type UpdateSurgery = Omit<NewSurgery, 'tariffId'>;
