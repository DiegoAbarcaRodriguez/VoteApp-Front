import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const PublicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.checkJWT()
        .pipe(

            tap(({ ok }) => {

                if (ok || authService.isFromGoogle) {
                    router.navigateByUrl('/dashboard');
                }

            }),

            map(({ ok }) => !ok && !authService.isFromGoogle)

        );
};