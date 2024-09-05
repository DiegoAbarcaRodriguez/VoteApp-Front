import { ElementRef } from "@angular/core";
import { ModalService } from "../services/modal.service";

export class DomModalHelper {

    constructor(private modalService: ModalService) { }

    insertSCSSClassesModal() {
        const body = document.querySelector('body');

        body!.style.overflow = 'hidden';
        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modal');
        body!.prepend(bgModal);

        scrollTo({ top: 0 });
    }

    removeSCSSClassesModal(modalContainer: ElementRef<HTMLDivElement>) {
        const bgModal = document.querySelector('.bg-modal');

        modalContainer?.nativeElement.classList.add('hide');

        setTimeout(() => {
            modalContainer?.nativeElement.classList.remove('hide');
            bgModal!.remove();
            document.body.style.overflow = 'auto';
            this.modalService.onEmitClicOptionToEmit = { isShowedModal: false };

        }, 1000);
    }
}