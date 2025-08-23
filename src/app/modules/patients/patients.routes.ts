import { Routes } from '@angular/router';

const patientsRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./pages/patients/patients.page').then((m) => m.PatientsPage),
  },
  {
    path: 'patient/:id/details',
    loadComponent: () =>
      import('./pages/patient-details/patient-details.page').then(
        (m) => m.PatientDetailsPage
      ),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: patientsRoutes,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
