import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { Poll } from 'src/app/shared/interfaces/poll.interface';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PollService } from 'src/app/shared/services/poll.service';

@Component({
    templateUrl: 'main-page.component.html',
    styleUrls: ['main-page.component.scss']
})

export class MainPageComponent implements OnInit, AfterViewInit {
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
    ) { }

    ngAfterViewInit(): void {
        this.onAnimateCircles();
    }

    ngOnInit() {
        this.onEmitClicOptionFromPoll();
        this.onGetUpdatedPolls();
        this.onGetDeletedPoll();
        this.onMustHideTitle();
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

    onMustHideTitle() {
        this.pollService.mustHideTitle.subscribe(value => {
            this.mustShowPolls = value;

            if (!value) {
                setTimeout(() => {
                    this.onAnimateCircles();
                }, 0);

            }
        });
    }

    onAnimateCircles() {
        const circleBlue: HTMLDivElement = document.querySelector('.circle--blue')!;
        const circleRed: HTMLDivElement = document.querySelector('.circle--red')!;
        const circleGreen: HTMLDivElement = document.querySelector('.circle--green')!;
        const circleOrange: HTMLDivElement = document.querySelector('.circle--orange')!;
        const circlePink: HTMLDivElement = document.querySelector('.circle--pink')!;
        const circleYellow: HTMLDivElement = document.querySelector('.circle--yellow')!;

        setInterval(() => {
            circleBlue!.style.top = `${Math.random() * 90}%`;
            circleBlue!.style.left = `${Math.random() * 90}%`;
            circleRed!.style.top = `${Math.random() * 90}%`;
            circleRed!.style.left = `${Math.random() * 90}%`;
            circleGreen!.style.top = `${Math.random() * 90}%`;
            circleGreen!.style.left = `${Math.random() * 90}%`;
            circleOrange!.style.top = `${Math.random() * 90}%`;
            circleOrange!.style.left = `${Math.random() * 90}%`;
            circlePink!.style.top = `${Math.random() * 90}%`;
            circlePink!.style.left = `${Math.random() * 90}%`;
            circleYellow!.style.top = `${Math.random() * 90}%`;
            circleYellow!.style.left = `${Math.random() * 90}%`;
        }, 1000);


    }

}