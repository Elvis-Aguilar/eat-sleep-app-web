import { Routes } from '@angular/router';
import { authGuard } from '@shared/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'session',
        pathMatch: 'full'
    },
    {
        path: "session",
        loadChildren: () => import('./modules/session/auth.routes').then(m => m.routes)
    },
    {
        path: 'manager',
        canActivate: [authGuard],
        data: {
            role: 'GERENTE'
        },
        loadChildren: () => import('./modules/MANAGER/manager.routes').then(m => m.MANAGER_ROUTES),
    },
    {
        path: 'restaurant',
        canActivate: [authGuard],
        data: {
            role: 'CAJERO'
        },
        loadChildren: () => import('./modules/RESTAURANT/restaurant.routes').then(m => m.RESTAURANT_ROUTES),
    },
    {
        path: 'hotel',
        canActivate: [authGuard],
        data: {
            role: 'RECEPCIONISTA'
        },
        loadChildren: () => import('./modules/HOTEL/hotel.routes').then((m) => m.HOTEL_ROUTES),
    },
];
