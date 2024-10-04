import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DomModalHelper } from '../../helpers/dom-modal.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'shared-modal-access-code',
    templateUrl: 'modal-access-code.component.html'
})

export class ModalAccessCodeComponent implements OnInit {

    @ViewChild('modalCode')
    modalCode?: ElementRef<HTMLDivElement>;

    @Output()
    onMustShowModal: EventEmitter<boolean> = new EventEmitter();

    code: string = '';

    mustShowErrorMessage: boolean = false;

    constructor(
        private modalService: ModalService,
        private router: Router
    ) { }

    ngOnInit() { }

    onCloseModal() {
        new DomModalHelper(this.modalService).removeSCSSClassesModal();
        this.onMustShowModal.emit(false);
    }

    onSubmit() {
        if (!this.code || this.code?.length < 24) {
            this.mustShowErrorMessage = true;
            return;
        }

        new DomModalHelper(this.modalService).removeSCSSClassesModal();
        this.onMustShowModal.emit(false);
        this.router.navigate(['/vote', this.code]);
    }


}