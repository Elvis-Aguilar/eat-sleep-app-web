import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "app/store/auth.store";

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(AuthStore);
    const router = inject(Router);

    if (store.session?.token()) {
        if (route.data['role'] && store.session.roleName() !== route.data['role']) {
            switch (store.session.roleName()) {
                case 'GERENTE':
                  router.navigate(['/pharmacy'])
                  break;
          
                case 'CAJERO':
                  router.navigate(['/employee-management'])
                  break;
                case 'RECEPCIONISTA':
                  router.navigate(['/patients'])
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

