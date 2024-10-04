import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Poll } from '../../interfaces/poll.interface';
import { ModalService } from '../../services/modal.service';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { PopUpAdaptador } from '../../plugin';
import { PollService } from '../../services/poll.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../snackbar/snackbar.component';

@Component({
    selector: 'shared-card-polls',
    templateUrl: 'card-polls.component.html'
})

export class CardPollComponent implements OnInit {
    @Input()
    poll?: Poll;

    @ViewChild(SnackBarComponent)
    snackbarComponent?: SnackBarComponent;

    mustShowSnackBar: boolean = false;


    constructor(
        private modalService: ModalService,
        private pollService: PollService,
        private router: Router
    ) { }

    ngOnInit() {

    }


    async onCopyCode() {
        this.mustShowSnackBar = true;
        try {
            await navigator.clipboard.writeText(this.poll?._id!);
            this.snackbarComponent!.message = 'The code has been copied!';
            
        } catch (error) {
            this.snackbarComponent!.message = 'Has occured an error!'
        }

    }


    onEditPoll() {
        this.modalService.onEmitClicOptionToEmit = { emittedObject: this.poll!, isShowedModal: true };
        new DomModalHelper(this.modalService).insertSCSSClassesModal();
    }

    onDeletePoll() {
        PopUpAdaptador.generateQuestionPopUp('Do you wanna eliminate it?')
            .then((result) => {
                if (result.isConfirmed) {
                    this.pollService.deletePoll(this.poll?._id!)
                        .subscribe({
                            next: ({ poll }) => {
                                PopUpAdaptador.generatePopUp('Success!', `The poll ${poll.title} has been eliminated!`, 'success');
                                this.pollService.deletedPoll = poll;
                            },
                            error: ({ error }: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error!', error.error, 'error')
                        })
                }

            })

    }

    onSeeDetailsPoll() {
        this.pollService.poll_id = this.poll?._id!;
        localStorage.setItem('poll_id', this.poll?._id!);
        this.router.navigate(['/dashboard/settings', this.poll?._id]);
    }
}