import { Routes } from '@angular/router';

const hotelRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard-hotel/dashboard-hotel.component').then(
        (m) => m.DashboardHotelComponent
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/hotel-details/hotel-details.component').then(
        (m) => m.HotelDetailsComponent
      ),
  },
  {
    path: 'rooms/:id',
    loadComponent: () =>
      import('./pages/rooms-page/rooms-page.component').then(
        (m) => m.RoomsPageComponent
      ),
  },
  {
    path: 'reservations/:hotelId/room/:roomId',
    loadComponent: () =>
      import('./pages/reservations-page/reservations-page.component').then(
        (m) => m.ReservationsPageComponent
      ),
  },
  {
    path: 'reservations/:hotelId',
    loadComponent: () =>
      import('./pages/reservations-page/reservations-page.component').then(
        (m) => m.ReservationsPageComponent
      ),
  },
];

export const HOTEL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/layout-hotel/layout-hotel.component').then(
        (m) => m.LayoutHotelComponent
      ),
    children: hotelRoutes,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
