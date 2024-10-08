import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipantService {

    private baseUrl: string = environments.baseUrl + '/api/participant';
    private _userName: string = '';

    get userName(): string {
        return this._userName;
    }

    set userName(name: string) {
        this._userName = name;
        localStorage.setItem('userName', name);
    }


    constructor(private http: HttpClient) {
        if (localStorage.getItem('userName')) {
            this._userName = localStorage.getItem('userName')!;
        }


    }

    executeParticipation(poll_id: string, name: string): Observable<{ ok: boolean, message: string }> {
        return this.http.get<{ ok: boolean, message: string }>(`${this.baseUrl}/${poll_id}/${name}`);
    }

    verifyParticipant(name: string, poll_id: string): Observable<{ ok: boolean, poll_id: string }> {
        return this.http.post<{ ok: boolean, poll_id: string }>(this.baseUrl, { name, poll_id });
    }
}