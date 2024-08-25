import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environment';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { LoginPayload, LoginResponse, RegisterPayload, UpdatePasswordPayload, User } from '../interfaces';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _url = `${environments.baseUrl}/api/user`;
    private _user?: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : false;

    isFromGoogle: boolean = localStorage.getItem('isFromGoogle') ? localStorage.getItem('isFromGoogle')! === 'true' : false;

    get user(): User | undefined {
        return this._user;
    }



    constructor(
        private http: HttpClient,
        private router: Router
    ) { }


    login(body: LoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this._url}/login`, body)
            .pipe(tap(({ token, user }) => {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(this._user));
                this._user = user;
            }))
    }

    signUp(body: RegisterPayload): Observable<any> {
        return this.http.post(`${this._url}/sign-up`, body)
    }

    sendEmailToRecoverPassword(body: { email: string }): Observable<any> {
        return this.http.post(`${environments.baseUrl}/api/user/recover-password`, body)
    }

    checkToken(token: string, isValidatedEmailFlow: boolean): Observable<any> {
        return this.http.post(
            `${this._url}/validate-xtoken`,
            { isValidatedEmailFlow },
            { headers: { 'x-token': token } }
        )
    }

    updatePassword(body: UpdatePasswordPayload): Observable<any> {
        return this.http.post(`${this._url}/update-password`, body)
    }

    logout() {

        if (this.isFromGoogle) {
            google.accounts.id.revoke(this.user!.email, () => {
            });;
        }

        this.isFromGoogle = false;
        localStorage.clear();
        this.router.navigateByUrl('/sign-up');
    }

    loginGoogle(accessToken: string) {
        return this.http.post(`${this._url}/google`, { accessToken })
            .pipe(tap((user: any) => {
                this._user = user;
                this.isFromGoogle = true;
                localStorage.setItem('user', JSON.stringify(this._user));
                localStorage.setItem('isFromGoogle', 'true');
            }));
    }

    checkJWT() {
        if (!localStorage.getItem('token')) {
            return of({ ok: false, token: undefined });
        }

        return this.http.post<{ ok: boolean, token: string }>(`${this._url}/check-jwt`, null, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')! }
        })
            .pipe(catchError(() => of({ ok: false, token: undefined })));
    }

}

