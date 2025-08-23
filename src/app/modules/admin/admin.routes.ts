import { Routes } from "@angular/router";

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'management-users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'rooms',
    loadComponent: () =>
      import('./pages/rooms-managment/rooms-managment.component').then((m) => m.RoomsManagmentComponent),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/home-report/home-report.component').then((m) => m.HomeReportComponent),
  },
  {
    path: 'reports/income',
    loadComponent: () =>
      import('./pages/reports/report-income/report-income.component').then((m) => m.ReportIncomeComponent),
  },
  {
    path: 'reports/expose',
    loadComponent: () =>
      import('./pages/reports/report-expense/report-expense.component').then((m) => m.ReportExpenseComponent),
  },
  {
    path: 'reports/earnigs',
    loadComponent: () =>
      import('./pages/reports/report-earnings/report-earnings.component').then((m) => m.ReportEarningsComponent),
  },
]

export const ADMIN_ROUTES: Routes = [
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
    children: adminRoutes,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
]