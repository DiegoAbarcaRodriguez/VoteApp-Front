import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vote } from '../../interfaces/vote.interface';
import { VotesService } from 'src/app/shared/services/votes.service';
import { catchError, delay, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessages } from '../../enums/error.enum';
import { PopUpAdaptador } from '../../plugin';


@Component({
    selector: 'shared-list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {

    public isLoading: boolean = true;
    optionsToVote: Vote[] = [];

    constructor(
        private votesService: VotesService,
    ) { }

    ngOnInit(): void {
        this.getOptionsToVote();
        this.connectToWebSockets();
    }


    private getOptionsToVote() {
        this.isLoading = true;
        this.votesService.getVoteOptions()
            .pipe(
                delay(1000),
                map((votes: Vote[]) => votes.map(vote => ({ ...vote, img: `http://localhost:3030/api/image/${vote.img}` })))
            )
            .subscribe(({
                next: (votes: Vote[]) => {
                    this.isLoading = false;
                    this.optionsToVote = votes;
                },
                error: (error: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error')
            }));

    }


    private connectToWebSockets() {

        const socket = new WebSocket('ws://localhost:3000/ws');

        socket.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);

            switch (type) {
                case 'create-option-vote':
                    const newPayload = { ...payload, img: `http://localhost:3030/api/image/${payload.img}` }
                    this.optionsToVote.push(newPayload);
                    break;
                case 'update-option-vote':
                    this.optionsToVote = this.optionsToVote.map(vote => {
                        if (vote._id === payload._id) {
                            vote = payload;
                            vote.img = `http://localhost:3030/api/image/${payload.img}`;
                        }
                        return vote;
                    })
                    break;
                case 'delete-option-vote':
                    this.optionsToVote = this.optionsToVote.filter(vote => vote._id != payload._id);
                    break;

                default:
                    throw new Error('No option found');
                    break;
            }

            console.log(this.optionsToVote)


        };

        socket.onclose = (event) => {
            console.log('Connection closed');
            setTimeout(() => {
                console.log('retrying to connect');
                this.connectToWebSockets();
            }, 1500);

        };

        socket.onopen = (event) => {
            console.log('Connected');
        };

    }

}