import { ElementRef } from "@angular/core";
import { VotesService } from "../services/votes.service";

export class DomModalHelper {

    constructor(private votesService: VotesService) { }

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
            this.votesService.onEmitClicOptionFromCard = { isShowedModal: false };

        }, 1000);
    }
}