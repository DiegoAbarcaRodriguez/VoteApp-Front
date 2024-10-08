import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map, pipe, switchMap, tap } from 'rxjs';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { Vote } from 'src/app/shared/interfaces';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { ModalService } from 'src/app/shared/services/modal.service';
import { VotesService } from 'src/app/shared/services/votes.service';
import { PollService } from '../../../shared/services/poll.service';
import { ParticipantService } from 'src/app/shared/services/participant.service';

@Component({
    templateUrl: 'vote.component.html'
})

export class VotePageComponent implements OnInit, OnDestroy {

    optionsToVote: Vote[] = [];
    isLoading: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private votesService: VotesService,
        private router: Router,
        private modalService: ModalService,
        private pollService: PollService,
        private participantService: ParticipantService
    ) { }

    ngOnDestroy(): void {
        this.modalService.onShowButtonAccessCode = true;
    }

    ngOnInit() {
        this.getOptionsToVote();
        this.modalService.onShowButtonAccessCode = false;
    }

    getOptionsToVote() {
        this.isLoading = true;
        this.activatedRoute.params
            .pipe(
                tap(({ poll_id }) => {this.pollService.poll_id = poll_id}),
                switchMap(({ poll_id }) => this.participantService.verifyParticipant(this.participantService.userName, poll_id)),
                switchMap(({ poll_id }) => this.votesService.getVoteOptionsByAccesCode(poll_id)),
                delay(1000),
                map((votes: Vote[]) => votes.map(vote => ({ ...vote, img: `http://localhost:3030/api/image/${vote.img}` }))),
            )
            .subscribe({
                next: (optionsToVote) => {
                    this.isLoading = false;
                    this.optionsToVote = optionsToVote;
                    this.pollService.onChangePoll_id = true;
                    new DomModalHelper(this.modalService).removeSCSSClassesModal();
                },
                error: ({ error }: HttpErrorResponse) => {
                    this.isLoading = false;
                    PopUpAdaptador.generatePopUp('Error!', error.error, 'error').then(() => {
                        new DomModalHelper(this.modalService).removeSCSSClassesModal();
                        this.modalService.onShowButtonAccessCode = true;
                        this.router.navigateByUrl('/');

                    });
                }
            });
    }
}