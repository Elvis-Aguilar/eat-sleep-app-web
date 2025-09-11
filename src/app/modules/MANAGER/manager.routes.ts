import { Routes } from '@angular/router';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard-manager/dashboard-manager.component').then(
        (m) => m.DashboardManagerComponent
      ),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./pages/manager-employee/manager-employee.component').then(
        (m) => m.ManagerEmployeeComponent
      ),
  },
  {
    path: 'hotels',
    loadComponent: () =>
      import('./pages/manager-hotel/manager-hotel.component').then(
        (m) => m.ManagerHotelComponent
      ),
  },
  {
    path: 'hotels/room/:id',
    loadComponent: () =>
      import('./pages/manager-rooms/manager-rooms.component').then(
        (m) => m.ManagerRoomsComponent
      ),
  },
  {
    path: 'hotels/room/reservation/:id',
    loadComponent: () =>
      import(
        './pages/manager-reservations/manager-reservations.component'
      ).then((m) => m.ManagerReservationsComponent),
  },
  {
    path: 'restaurants',
    loadComponent: () =>
      import('./pages/manager-restaurant/manager-restaurant.component').then(
        (m) => m.ManagerRestaurantComponent
      ),
  },
  {
    path: 'promotions',
    loadComponent: () =>
      import('./pages/manager-promotion/manager-promotion.component').then(
        (m) => m.ManagerPromotionComponent
      ),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/manager-employee/manager-employee.component').then(
        (m) => m.ManagerEmployeeComponent
      ),
  },
];

export const MANAGER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout-manager/layout-manager.component').then(
        (m) => m.LayoutManagerComponent
      ),
    children: adminRoutes,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
