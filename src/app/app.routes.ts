import { Routes } from '@angular/router';
import { authGuard } from '@shared/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'session',
        pathMatch: 'full'
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
        path: "session",
        loadChildren: () => import('./modules/session/auth.routes').then(m => m.routes)
    },
    {
        path: 'restaurant',
        canActivate: [authGuard],
        data: {
            role: 'CAJERO'
        },
        loadChildren: () => import('./modules/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES),
    },
    {
        path: 'Hotel',
        canActivate: [authGuard],
        data: {
            role: 'RECEPCIONISTA'
        },
        loadChildren: () => import('@patients/patients.routes').then((m) => m.routes),
    },
];
