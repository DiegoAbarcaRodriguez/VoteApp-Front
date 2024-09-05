import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { ModalService } from '../../services/modal.service';
import { ValidatorService } from '../../validators/validator.service';
import { PollService } from '../../services/poll.service';
import { PopUpAdaptador } from '../../plugin';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'shared-modal-polls',
    templateUrl: 'modal-polls.component.html',
})

export class ModalPollsComponent implements OnInit {

    @ViewChild('modalPolls')
    modalContainer?: ElementRef<HTMLDivElement>;

    form = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required]],
        numberOfParticipants: [0, [Validators.required, this.validatorService.validateNumberOfParticipants]]
    })

    constructor(
        private fb: FormBuilder,
        private modalService: ModalService,
        private validatorService: ValidatorService,
        private pollService: PollService
    ) { }

    ngOnInit() { }

    closeModal() {
        new DomModalHelper(this.modalService).removeSCSSClassesModal(this.modalContainer!);
    }

    onSubmitForm() {
        this.form?.markAllAsTouched();

        if (this.form?.invalid) {
            return;
        }


        this.pollService.createPoll({ title: this.form.value.title!.toLowerCase(), description: this.form.value.description!, numberOfParticipants: this.form.controls['numberOfParticipants'].value! as any })
            .subscribe({
                next: ({ message }) => {
                    PopUpAdaptador.generatePopUp('Success!', message, 'success');
                    new DomModalHelper(this.modalService).removeSCSSClassesModal(this.modalContainer!);
                },
                error: ({ error }: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error!', error.error, 'error')
            });

    }

}