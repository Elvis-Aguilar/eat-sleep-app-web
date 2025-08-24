import { Routes } from "@angular/router";

const hotelRoutes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard-hotel/dashboard-hotel.component').then((m) => m.DashboardHotelComponent),
    }

]

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
]