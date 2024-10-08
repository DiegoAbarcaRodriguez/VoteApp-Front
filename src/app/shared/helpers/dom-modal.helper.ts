import { ElementRef } from "@angular/core";
import { ModalService } from "../services/modal.service";

export class DomModalHelper {

    constructor(private modalService: ModalService) { }

    insertSCSSClassesModal(isByAccessCode: boolean = false) {
        const body = document.querySelector('body');

        body!.style.overflow = 'hidden';
        body!.style.position = 'relative';
        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modal');
        (isByAccessCode)
            ? bgModal.classList.add('bg-modal--code')
            : bgModal.classList.add('bg-modal--form');
        body!.prepend(bgModal);

        scrollTo({ top: 0 });
    }

    removeSCSSClassesModal(isByUserName: boolean = false, isFromCloseButton: boolean = false) {
        const bgModal = document.querySelector('.bg-modal');
        const bgModalByCode = document.querySelector('.bg-modal--code');
        const bgModalByForm = document.querySelector('.bg-modal--form');

        const modalContainer = document.querySelector('.modal-container');
        const modalContainerUserName = document.querySelector('.modal-container-username');

        if (isByUserName && !isFromCloseButton) {
            modalContainerUserName?.classList.add('hide');
        } else {
            modalContainer?.classList.add('hide');
            modalContainerUserName?.classList.add('hide');
        }



        setTimeout(() => {


            if (isByUserName && !isFromCloseButton) {
                modalContainerUserName?.classList.remove('hide');
                modalContainerUserName?.remove();
            } else {
                modalContainer?.classList.remove('hide');
                bgModal?.remove();
                bgModalByForm?.remove();
                bgModalByCode?.remove();
                document.body.style.overflow = 'auto';
                this.modalService.onEmitClicOptionToEmit = { isShowedModal: false };
                this.modalService.onShowModal = false;
            }


        }, 1000);
    }
}