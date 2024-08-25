import { Component, OnInit, ViewChild } from '@angular/core';
import { VotesService } from 'src/app/shared/services/votes.service';
import { EmitionModalSettings, Vote } from 'src/app/shared/interfaces/vote.interface';
import { delay, tap } from 'rxjs';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';



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
    private votesService: VotesService,
  ) { }

  ngOnInit(): void {
    this.onEmitClicOptionFromCard();
  }

  onEmitClicOptionFromCard() {


    this.votesService.onEmitClicOptionFromCard
      .pipe(
        tap(({ optionVote }: EmitionModalSettings) => this.optionVoteClicked = optionVote ? { ...optionVote, img: undefined } as Vote : undefined),
        tap(({ isShowedModal }: EmitionModalSettings) => this.isShowedModal = isShowedModal),
        delay(10),
      )
      .subscribe(({ optionVote }: EmitionModalSettings) => this.optionVoteClicked!.img = optionVote?.img);
  }

  onClicAddOptionVote() {
    new DomModalHelper(this.votesService).insertSCSSClassesModal();
    this.votesService.onEmitClicOptionFromCard = { optionVote: undefined, isShowedModal: true };
  }


}
