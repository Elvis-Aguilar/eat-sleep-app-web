export enum EmployeeType {
  DOCTOR = 'DOCTOR',
  SPECIALIST = 'SPECIALIST',
  NURSE = 'NURSE',
}

export interface AssignedEmployee {
  id: number;
  employeeId: number;
  fullName: string;
  cui: string;
  phone?: string;
  email?: string;
  type: keyof typeof EmployeeType;
  createdAt: string;
  updatedAt?: string;
}
