import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const DashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.checkJWT()
        .pipe(

            tap(({ ok, token }) => {

                if (!ok) {
                    router.navigateByUrl('/');
                    return;
                }
                localStorage.setItem('token', token!);

            }),

            map(({ ok }) => ok)

        );

};