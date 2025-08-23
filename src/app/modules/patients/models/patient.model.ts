export interface Patient {
  id: number;
  fullName: string;
  cui: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt?: string;
}

export type NewPatient = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
