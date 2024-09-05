import { Component, OnInit, ViewChild } from '@angular/core';
import { Vote } from 'src/app/shared/interfaces/vote.interface';
import { delay, tap } from 'rxjs';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { ModalService } from 'src/app/shared/services/modal.service';
import { EmitionModalSettings } from 'src/app/shared/interfaces';



@Component({
  templateUrl: './manage-votes-page.component.html',
  styles: [
  ]
})
export class ManageVotesPageComponent implements OnInit {

  isShowedModal: boolean = false;
  optionVoteClicked?: Vote | undefined;
  currentUrl?: string;

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.onEmitClicOptionFromCard();
  }

  onEmitClicOptionFromCard() {


    this.modalService.onEmitClicOptionToEmit
      .pipe(
        tap(({ emittedObject }: EmitionModalSettings) => this.optionVoteClicked = emittedObject ? { ...emittedObject, img: undefined } as Vote : undefined),
        tap(({ isShowedModal }: EmitionModalSettings) => this.isShowedModal = isShowedModal),
        delay(10),
      )
      .subscribe(({ emittedObject }: any) => {
        if (this.optionVoteClicked) {
          this.optionVoteClicked.img = emittedObject?.img;
        }
      });
  }

  onClicAddOptionVote() {
    new DomModalHelper(this.modalService).insertSCSSClassesModal();
    this.modalService.onEmitClicOptionToEmit = { emittedObject: undefined, isShowedModal: true };
  }


}
