import { Routes } from "@angular/router";

const editorRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'areas',
    loadComponent: () =>
      import('./pages/areas/areas.component').then((m) => m.AreasComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-employee/register-employee.component').then((m) => m.RegisterEmployeeComponent),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./pages/employees/employees.component').then((m) => m.EmployeesComponent),
  },
  {
    path: 'view-employee/:slug',
    loadComponent: () =>
      import('./pages/view-employee/view-employee.component').then((m) => m.ViewEmployeeComponent),
  },
  {
    path: 'view-history/:slug',
    loadComponent: () =>
      import('./pages/history/history.component').then((m) => m.HistoryComponent),
  },
  {
    path: 'vacations',
    loadComponent: () =>
      import('./pages/vacations/vacations.component').then((m) => m.VacationsComponent),
  },
  {
    path: 'payment-specialist',
    loadComponent: () =>
      import('./pages/pay-specialist/pay-specialist.component').then((m) => m.PaySpecialistComponent),
  },

  {
    path: 'home-reports',
    loadComponent: () =>
      import('./pages/reports/home-report/home-report.component').then((m) => m.HomeReportComponent),
  },

  {
    path: 'report/history-contract',
    loadComponent: () =>
      import('./pages/reports/history-contract/history-contract.component').then((m) => m.HistoryContractComponent),
  },

  {
    path: 'report/terminated-contract',
    loadComponent: () =>
      import('./pages/reports/report-terminated-contracts/report-terminated-contracts.component').then((m) => m.ReportTerminatedContractsComponent),
  },

  {
    path: 'report/doctors',
    loadComponent: () =>
      import('./pages/reports/report-doctors/report-doctors.component').then((m) => m.ReportDoctorsComponent),
  },

]

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: editorRoutes,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
]