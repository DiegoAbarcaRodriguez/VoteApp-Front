import { Component, Input, OnInit } from '@angular/core';
import { Vote } from '../../interfaces/vote.interface';
import { Router } from '@angular/router';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { PopUpAdaptador } from '../../plugin';
import { switchMap } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ImageService } from '../../services/image.service';
import { VotesService } from '../../services/votes.service';
import { PollService } from '../../services/poll.service';
import { ParticipantService } from '../../services/participant.service';


@Component({
    selector: 'shared-card-votes',
    templateUrl: 'card-votes.component.html',
    styleUrls: ['card-votes.component.scss']
})

export class CardVotesComponent implements OnInit {

    @Input()
    optionToVote?: Vote;
    currentUrl?: string;

    constructor(
        private router: Router,
        private modalService: ModalService,
        private imageService: ImageService,
        private voteService: VotesService,
        private pollService: PollService,
        private participantService: ParticipantService
    ) { }




    ngOnInit() {
        this.currentUrl = this.router.url;
    }



    onClicButton(optionVote: Vote | undefined) {
        new DomModalHelper(this.modalService).insertSCSSClassesModal();
        this.modalService.onEmitClicOptionToEmit = { emittedObject: optionVote, isShowedModal: true };

    }

    onVote() {
        const newAmount = this.optionToVote?.amount! + 1;

        this.participantService.executeParticipation(this.pollService.poll_id!, this.participantService.userName)
            .pipe(
                switchMap(() => this.pollService.plusOneNumberOfParticipations(this.pollService.poll_id!)),
                switchMap(() => this.voteService.incrementAmountOfVotes(this.optionToVote!._id, newAmount))
            )
            .subscribe({
                next: ({ voteEntity }) => {
                    PopUpAdaptador.generatePopUp('Success', `The option ${this.optionToVote?.title} has been voted`, 'success');
                    this.optionToVote!.amount = voteEntity.amount;

                },
                error: ({ error }: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', error.error, 'error');
                }
            });
    }

    onDelete() {
        PopUpAdaptador.generateQuestionPopUp('Do you want to eliminate it?')
            .then(result => {
                if (result.isConfirmed) {
                    this.imageService.deleteImage(this.optionToVote!._id)
                        .pipe(switchMap(() => this.voteService.deleteVoteOption(this.optionToVote!._id)))
                        .subscribe({
                            next: () => {
                                PopUpAdaptador.generatePopUp('Success', `The option ${this.optionToVote?.title} has been eliminated`, 'success');
                            },
                            error: ({ error }: HttpErrorResponse) => {
                                PopUpAdaptador.generatePopUp('Error', error.error, 'error');
                            }
                        });
                }
            });
    }
}