import { Routes } from '@angular/router';

export const routes: Routes =  [
    {
        path: "dashboard",
        loadComponent: () => import('./pages/dashboard/dashboard.component')
    },
    {
        path: "inventory",
        loadComponent: () => import('./pages/inventory/inventory.component')
    },
    {
        path: "sales",
        loadComponent: () => import('./pages/sales/sales.component')
    },
    {
        path: "inventory-check",
        loadComponent: () => import('./pages/inventory-check/inventory-check.component')
    },
    {
        path: "reports",
        loadComponent: () => import('./pages/reports/reports.component')
    },
    {
        path: "settings",
        loadComponent: () => import('./pages/settings/settings.component')
    },
    {
        path: "",
        redirectTo: "inventory",
        pathMatch: "full"
    }
]