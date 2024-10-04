import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { catchError, Observable, of, tap, Subject } from 'rxjs';
import { LoginPayload, LoginResponse, RegisterPayload, UpdatePasswordPayload, User } from '../interfaces';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _url = `${environments.baseUrl}/api/user`;
    private _user?: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : undefined;
    private _pollIdVoted$: Subject<string> = new Subject<string>();
    private _pollIdVote: string = '';

    get user(): User | undefined {
        return this._user;
    }

    get pollIdVotedAsObservable(): Observable<string> {
        return this._pollIdVoted$.asObservable();
    }

    get pollIdVoted(): string {
        return this._pollIdVote;
    }

    set pollIdVoted(value: string) {
        localStorage.setItem('poll_id_voted', value);
        this._pollIdVote = value;
        this._pollIdVoted$.next(value);
    }

    constructor(
        private http: HttpClient
    ) {
        this.pollIdVoted = localStorage.getItem('poll_id_voted') || '';
    }




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
        return this.http.put(`${this._url}/update-password`, body)
    }

    logout(): Observable<any> {

        return this.http.put(`${this._url}/close-user-session`, { email: this._user!.email }).pipe(
            tap(() => {
                if (this._user?.google) {
                    google.accounts.id.revoke(this.user!.email, () => {
                    });;
                }

                this._user!.isActive = false;
                localStorage.clear();

            }));


    }

    loginGoogle(accessToken: string) {
        return this.http.post<LoginResponse>(`${this._url}/google`, { accessToken })
            .pipe(tap(({ user, token }) => {
                this._user = user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(this._user));
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

