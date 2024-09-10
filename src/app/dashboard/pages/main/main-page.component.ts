import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { Poll } from 'src/app/shared/interfaces/poll.interface';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PollService } from 'src/app/shared/services/poll.service';

@Component({
    templateUrl: 'main-page.component.html'
})

export class MainPageComponent implements OnInit {
    isShowedModal: boolean = false;
    pollToModify?: Poll;
    mustShowPolls: boolean = false;
    polls: Poll[] = [];
    nextUrl?: string;
    previousUrl?: string;
    pagesNumber: number[] = [];
    currentPage?: number


    constructor(
        private modalService: ModalService,
        private pollService: PollService,
        private router: Router
    ) { }

    ngOnInit() {
        this.onEmitClicOptionFromPoll();
        this.onGetUpdatedPolls();
        this.onGetDeletedPoll();
    }

    openModalPoll() {
        new DomModalHelper(this.modalService).insertSCSSClassesModal();
        this.modalService.onEmitClicOptionToEmit = { isShowedModal: true };
    }

    private onEmitClicOptionFromPoll() {
        this.modalService.onEmitClicOptionToEmit.subscribe({
            next: ({ isShowedModal, emittedObject }: any) => {
                this.isShowedModal = isShowedModal;
                this.pollToModify = emittedObject ? emittedObject : undefined;
            }
        })
    }

    getPolls(url: string = '/api/poll?page=1&limit=6') {
        this.pollService.getPolls(url)
            .subscribe({
                next: ({ polls, next, previous, pagesNumber, page }) => {

                    this.polls = polls;
                    this.mustShowPolls = true;
                    this.pollService.mustHideTitle = true;

                    this.nextUrl = next;
                    this.previousUrl = previous;
                    this.pagesNumber = pagesNumber;
                    this.currentPage = page;

                },
                error: ({ error }: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error!', error.error, 'error')
            });
    }

    onGetUpdatedPolls() {
        this.pollService.updatedPoll.subscribe({
            next: (updatedVote) => {
                this.polls = this.polls.map(poll => {
                    if (poll._id === updatedVote._id) {
                        poll = updatedVote
                    }
                    return poll;
                });
            }
        });
    }
    onGetDeletedPoll() {
        this.pollService.deletedPoll.subscribe({
            next: (deletedPoll) => {
                this.polls = this.polls.filter(poll => poll._id !== deletedPoll._id);
            }
        });
    }



    goBack() {
        this.mustShowPolls = false;
        this.pollService.mustHideTitle = false;
    }
}