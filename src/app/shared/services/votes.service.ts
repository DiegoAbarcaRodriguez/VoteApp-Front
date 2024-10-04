import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vote } from '../interfaces/vote.interface';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VotesService {
    constructor(private http: HttpClient) { }

    private _getHeaders() {
        return {
            'headers': new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };
    }


    private urlServer = environments.baseUrl;

    getVoteOptionsByPollId(poll_id: string): Observable<Vote[]> {
        return this.http.get<Vote[]>(`${this.urlServer}/api/optionVote/${poll_id}`, this._getHeaders());
    }

    getVoteOptionsByAccesCode(poll_id: string) {
        return this.http.get<Vote[]>(`${this.urlServer}/api/optionVote/byAccessCode/${poll_id}`);
    }

    addVoteOption(body: Vote) {
        return this.http.post(`${environments.baseUrl}/api/optionVote`, body, this._getHeaders());
    }

    updateVoteOption(_id: string, body: Vote) {
        return this.http.patch(`${environments.baseUrl}/api/optionVote/${_id}`, body, this._getHeaders());
    }

    deleteVoteOption(_id: string) {
        return this.http.delete(`${environments.baseUrl}/api/optionVote/${_id}`, this._getHeaders());
    }

    incrementAmountOfVotes(_id: string, newAmount: number): Observable<{ ok: boolean, voteEntity: Vote }> {
        return this.http.patch<{ ok: boolean, voteEntity: Vote }>(`${environments.baseUrl}/api/optionVote/incrementVotes/${_id}`, { amount: newAmount });
    }

}