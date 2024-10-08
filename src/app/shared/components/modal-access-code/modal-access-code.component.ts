import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { Router } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';

@Component({
    selector: 'shared-modal-access-code',
    templateUrl: 'modal-access-code.component.html',
    styleUrls: ['modal-access-code.component.scss']
})

export class ModalAccessCodeComponent implements OnInit {

    @Input()
    isAccessCode?: boolean;

    @ViewChild('modalCode')
    modalCode?: ElementRef<HTMLDivElement>;

    @Output()
    onMustShowModal: EventEmitter<boolean> = new EventEmitter();

    code: string = '';
    username: string = '';

    mustShowErrorMessage: boolean = false;

    constructor(
        private modalService: ModalService,
        private participantService: ParticipantService,
        private router: Router
    ) { }

    ngOnInit() { }

    onCloseModal() {

        new DomModalHelper(this.modalService).removeSCSSClassesModal(!this.isAccessCode, true);
        this.onMustShowModal.emit(false);
    }

    onSubmit() {
        if (this.isAccessCode && (!this.code || this.code?.length < 24)) {
            this.mustShowErrorMessage = true;
            return;
        }

        if (!this.isAccessCode && (!this.username || this.username.length === 0)) {
            this.mustShowErrorMessage = true;
            return;
        }

        new DomModalHelper(this.modalService).removeSCSSClassesModal(!this.isAccessCode);
        this.onMustShowModal.emit(false);
        if (this.isAccessCode) {
            this.router.navigate(['/vote', this.code]);
        } else {
            this.participantService.userName = this.username.trim().toLowerCase();
        }

    }


}