import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Poll, ResponsePollGet } from '../interfaces/poll.interface';

@Injectable({ providedIn: 'root' })
export class PollService {

    private _url = environments.baseUrl;
    private _getHeaders() {
        return {
            'headers': new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };
    }

    private _mustHideTitle: Subject<boolean> = new Subject();
    private _updatedPoll: Subject<Poll> = new Subject();
    private _deletedPoll: Subject<Poll> = new Subject();
    private _poll_id?: string = localStorage.getItem('poll_id') || undefined;
    private _onChangePoll_id: Subject<boolean> = new Subject();

    get mustHideTitle(): Observable<boolean> {
        return this._mustHideTitle.asObservable();
    }

    set mustHideTitle(value: boolean) {
        this._mustHideTitle.next(value);
    }

    get updatedPoll(): Observable<Poll> {
        return this._updatedPoll.asObservable();
    }

    set updatedPoll(value: Poll) {
        this._updatedPoll.next(value);
    }

    get deletedPoll(): Observable<Poll> {
        return this._deletedPoll.asObservable();
    }

    set deletedPoll(value: Poll) {
        this._deletedPoll.next(value);
    }

    get poll_id(): string | undefined {
        return this._poll_id;
    }

    set poll_id(value: string) {
        this._poll_id = value;
    }

    get onChangePoll_id(): Observable<boolean> {
        return this._onChangePoll_id.asObservable();
    }

    set onChangePoll_id(value: boolean) {
        this._onChangePoll_id.next(value);
    }

    constructor(private http: HttpClient) { }


    getPolls(url: string): Observable<ResponsePollGet> {
        return this.http.get<ResponsePollGet>(this._url + url, this._getHeaders());

    }

    createPoll(body: Poll): Observable<{ ok: boolean, message: string }> {
        return this.http.post<{ ok: boolean, message: string }>(`${this._url}/api/poll`, body, this._getHeaders());
    }


    updatePoll(body: Poll): Observable<{ ok: boolean, poll: Poll }> {
        return this.http.put<{ ok: boolean, poll: Poll }>(`${this._url}/api/poll/${body._id}`, body, this._getHeaders())
            .pipe(tap(({ poll }) => this.updatedPoll = poll))
    }

    deletePoll(_id: string): Observable<{ ok: boolean, poll: Poll }> {
        return this.http.delete<{ ok: boolean, poll: Poll }>(`${this._url}/api/poll/${_id}`, this._getHeaders())
    }

    plusOneNumberOfParticipations(_id: string): Observable<{ ok: boolean, message: string }> {
        return this.http.patch<{ ok: boolean, message: string }>(`${this._url}/api/poll/${_id}`, {});
    }

}