import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { catchError, filter, map, of } from 'rxjs';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PollService } from 'src/app/shared/services/poll.service';
import { VotesService } from 'src/app/shared/services/votes.service';

@Component({
    templateUrl: 'auth-layout.component.html',
    styleUrls: ['auth-layout.component.scss']
})

export class AuthLayoutComponent implements OnInit {

    mustShowModal: boolean = false;
    mustShowButtonAccessCode: boolean = true;
    currentUrl?: string;
    isThereOptionToVote?: boolean;

    constructor(
        private modalService: ModalService,
        private router: Router,
        private pollService: PollService,
        private voteService: VotesService
    ) { }

    ngOnInit() {

        this.getArgumentOfRoutes();
        this.currentUrl = this.router.url;

        this.modalService.onShowButtonAccessCode.subscribe({
            next: (mustShow) => this.mustShowButtonAccessCode = mustShow
        });

        this.modalService.onShowModal.subscribe({
            next: (resp) => this.mustShowModal = resp
        });

        this.onGetOptionsToVoteNumber();
    }

    getArgumentOfRoutes() {
        this.router.events
            .pipe(
                filter((event): event is ActivationEnd => event instanceof ActivationEnd),
                filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                map((event: ActivationEnd) => event.snapshot.data)
            )
            .subscribe(({ url }) => {
                this.currentUrl = url || this.router.url;
            });
    }

    launchPopUpAccesCode() {
        new DomModalHelper(this.modalService).insertSCSSClassesModal(true);
        this.mustShowModal = true;
    }

    private onGetOptionsToVoteNumber() {
        this.pollService.onChangePoll_id.subscribe(() => {
            this.voteService.getVoteOptionsByAccesCode(this.pollService.poll_id!)
                .pipe(catchError(() => of([])))
                .subscribe((votes: any[]) => { this.isThereOptionToVote = votes.length > 0; });
        });

    }
}