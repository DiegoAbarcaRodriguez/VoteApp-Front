import { ElementRef } from "@angular/core";
import { ModalService } from "../services/modal.service";

export class DomModalHelper {

    constructor(private modalService: ModalService) { }

    insertSCSSClassesModal(isByAccessCode: boolean = false) {
        const body = document.querySelector('body');

        body!.style.overflow = 'hidden';
        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modal');
        (isByAccessCode)
            ? bgModal.classList.add('bg-modal--code')
            : bgModal.classList.add('bg-modal--form');
        body!.prepend(bgModal);

        scrollTo({ top: 0 });
    }

    removeSCSSClassesModal() {
        const bgModal = document.querySelector('.bg-modal');
        const bgModalByCode = document.querySelector('.bg-modal--code');
        const bgModalByForm = document.querySelector('.bg-modal--form');

        const modalContainer = document.querySelector('.modal-container')
        modalContainer?.classList.add('hide');

     

        setTimeout(() => {
            modalContainer?.classList.remove('hide');
            bgModal?.remove();
            bgModalByForm?.remove();
            bgModalByCode?.remove();
            document.body.style.overflow = 'auto';
            this.modalService.onEmitClicOptionToEmit = { isShowedModal: false };
            this.modalService.onShowModal = false;

        }, 1000);
    }
}