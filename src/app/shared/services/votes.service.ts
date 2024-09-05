import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from '../interfaces/vote.interface';
import { Observable, Subject } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VotesService {
    constructor(private http: HttpClient) { }



    private urlServer = environments.baseUrl;

    getVoteOptions(): Observable<Vote[]> {
        return this.http.get<Vote[]>(`${this.urlServer}/api/optionVote`);
    }

    addVoteOption(body: Vote) {
        throw new Error('Method still is not implemented');
    }

    updateVoteOption(id: number) {
        throw new Error('Method still is not implemented');
    }

    deleteVoteOption(id: number) {
        throw new Error('Method still is not implemented');
    }

}