import { Routes } from "@angular/router";

const restaurantRoutes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard-restaurant/dashboard-restaurant.component').then((m) => m.DashboardRestaurantComponent),
    }

]

export const RESTAURANT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
    },
    {
        path: '',
        loadComponent: () =>
            import('./layouts/layout-restaurant/layout-restaurant.component').then(
                (m) => m.LayoutRestaurantComponent
            ),
        children: restaurantRoutes,
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
]