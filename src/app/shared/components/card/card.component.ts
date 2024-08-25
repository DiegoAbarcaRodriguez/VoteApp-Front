import { Component, Input, OnInit } from '@angular/core';
import { Vote } from '../../interfaces/vote.interface';
import { Router } from '@angular/router';
import { VotesService } from 'src/app/shared/services/votes.service';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { PopUpAdaptador } from '../../plugin';
import { ErrorMessages } from '../../enums/error.enum';
import { RespondImageServer } from '../../interfaces';
import { filter, switchMap } from 'rxjs';


@Component({
    selector: 'shared-card',
    templateUrl: 'card.component.html'
})

export class CardComponent implements OnInit {

    @Input()
    optionToVote?: Vote;
    currentUrl?: string;

    constructor(
        private router: Router,
        private votesService: VotesService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.currentUrl = this.router.url;
    }


    onClicButton(optionVote: Vote | undefined) {
        new DomModalHelper(this.votesService).insertSCSSClassesModal();
        this.votesService.onEmitClicOptionFromCard = { optionVote, isShowedModal: true };

    }

    onVote() {
        const newAmount = this.optionToVote?.amount! + 1;
        this.http.put(`${environments.baseUrl}/api/optionVote/${this.optionToVote?._id}`, { ...this.optionToVote, img: null, amount: newAmount })
            .subscribe({
                next: () => {
                    PopUpAdaptador.generatePopUp('Success', `The option ${this.optionToVote?.title} has been voted`, 'success');
                },
                error: (error: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error');
                }
            });
    }

    onDelete() {
        PopUpAdaptador.generateQuestionPopUp('Do you want to eliminate it?')
            .then(result => {
                if (result.isConfirmed) {
                    this.http.delete<RespondImageServer>(`${environments.imagesServerUrl}/delete/${this.optionToVote?._id}`)
                        .pipe(
                            filter(({ ok }: RespondImageServer) => ok),
                            switchMap(() => this.http.delete(`${environments.baseUrl}/api/optionVote/${this.optionToVote?._id}`)))
                        .subscribe({
                            next: () => {
                                PopUpAdaptador.generatePopUp('Success', `The option ${this.optionToVote?.title} has been eliminated`, 'success');
                            },
                            error: (error: HttpErrorResponse) => {
                                PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error');
                            }
                        });
                }
            });
    }
}