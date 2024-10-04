import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
    templateUrl: 'auth-layout.component.html',
    styleUrls: ['auth-layout.component.scss']
})

export class AuthLayoutComponent implements OnInit {

    mustShowModal: boolean = false;
    mustShowButtonAccessCode: boolean = true;

    constructor(
        private modalService: ModalService
    ) { }

    ngOnInit() {
        
        this.modalService.onShowButtonAccessCode.subscribe({
            next: (mustShow) => this.mustShowButtonAccessCode = mustShow
        });

        this.modalService.onShowModal.subscribe({
            next: (resp) => this.mustShowModal = resp
        });
    }

    launchPopUpAccesCode() {
        new DomModalHelper(this.modalService).insertSCSSClassesModal(true);
        this.mustShowModal = true;
    }
}