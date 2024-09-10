import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../../interfaces/poll.interface';
import { ModalService } from '../../services/modal.service';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { PopUpAdaptador } from '../../plugin';
import { PollService } from '../../services/poll.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'shared-card-polls',
    templateUrl: 'card-polls.component.html'
})

export class CardPollComponent implements OnInit {
    @Input()
    poll?: Poll;

    constructor(
        private modalService: ModalService,
        private pollService: PollService
    ) { }

    ngOnInit() { }

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
}