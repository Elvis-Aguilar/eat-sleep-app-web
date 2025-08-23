import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "app/store/auth.store";

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(AuthStore);
    const router = inject(Router);

    if (store.session?.token()) {
        if (route.data['role'] && store.session.roleName() !== route.data['role']) {
            switch (store.session.roleName()) {
                case 'Encargado de Farmacia':
                  router.navigate(['/pharmacy'])
                  break;
          
                case 'Encargado de Empleados':
                  router.navigate(['/employee-management'])
                  break;
                case 'Encargado de Pacientes':
                  router.navigate(['/patients'])
                  break;
          
                case 'Administrador':
                  router.navigate(['/admin'])
                  break;
          
                default:
                  // defult to USER
                  router.navigate(['/session/login'])
                  break;
              }
        }
        return true
    }
    store.logout()
    return true
}

