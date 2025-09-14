import { Routes } from '@angular/router';

const restaurantRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './pages/dashboard-restaurant/dashboard-restaurant.component'
      ).then((m) => m.DashboardRestaurantComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/restaurant-details/restaurant-details.component').then(
        (m) => m.RestaurantDetailsComponent
      ),
  },
  {
    path: 'dishes/:id',
    loadComponent: () =>
      import('./pages/dishes-page/dishes-page.component').then(
        (m) => m.DishesPageComponent
      ),
  },
  {
    path: 'sale/:id',
    loadComponent: () =>
      import('./pages/sale-page/sale-page.component').then(
        (m) => m.SalePageComponent
      ),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./pages/orders-page/orders-page.component').then(
        (m) => m.OrdersPageComponent
      ),
  },
];

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
];
