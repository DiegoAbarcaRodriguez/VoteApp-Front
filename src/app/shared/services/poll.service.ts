import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Poll, ResponsePollGet } from '../interfaces/poll.interface';

@Injectable({ providedIn: 'root' })
export class PollService {

    private _url = environments.baseUrl;
    private _getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

    private _mustHideTitle: Subject<boolean> = new Subject();

    get mustHideTitle(): Observable<boolean> {
        return this._mustHideTitle.asObservable();
    }

    set mustHideTitle(value: boolean) {
        this._mustHideTitle.next(value);
    }

    constructor(private http: HttpClient) { }


    getPolls(url: string): Observable<ResponsePollGet> {
        return this.http.get<ResponsePollGet>(this._url + url, { headers: this._getHeaders() });

    }

    createPoll(body: Poll): Observable<{ ok: boolean, message: string }> {
        return this.http.post<{ ok: boolean, message: string }>(`${this._url}/api/poll`, body, { headers: this._getHeaders() });
    }



}