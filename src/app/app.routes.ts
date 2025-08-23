import { Routes } from '@angular/router';
import { PharmacyLayoutComponent } from './modules/pharmacy/layouts/pharmacy-layout/pharmacy-layout.component';
import { authGuard } from '@shared/guard/auth.guard';

export const routes: Routes = [
    {
        path: "pharmacy",
        canActivate: [authGuard],
        data: {
            role: 'Encargado de Farmacia'
        },
        component: PharmacyLayoutComponent,
        loadChildren: () => import('./modules/pharmacy/pharmacy.routes').then(m => m.routes)
    },
    {
        path: '',
        redirectTo: 'session',
        pathMatch: 'full'
    },

    {   path: "session",
        loadChildren: () => import('./modules/session/auth.routes').then(m => m.routes)
    },
    {
        path: 'employee-management',
        canActivate: [authGuard],
        data: {
            role: 'Encargado de Empleados'
        },
        loadChildren: () => import('./modules/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES),
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        data: {
            role: 'Administrador'
        },
        loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    },
    {
        path: 'patient-management',
        canActivate: [authGuard],
        data: {
            role: 'Encargado de Pacientes'
        },
        loadChildren: () => import('@patients/patients.routes').then((m) => m.routes),
    },
];
