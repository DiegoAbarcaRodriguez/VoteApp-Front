import { Component, OnInit, ViewChild } from '@angular/core';
import { Vote } from 'src/app/shared/interfaces/vote.interface';
import { delay, map, switchMap, tap } from 'rxjs';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { ModalService } from 'src/app/shared/services/modal.service';
import { EmitionModalSettings } from 'src/app/shared/interfaces';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { ActivatedRoute, Router } from '@angular/router';
import { VotesService } from 'src/app/shared/services/votes.service';
import { PollService } from 'src/app/shared/services/poll.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  templateUrl: './manage-votes-page.component.html',
  styles: [
  ]
})
export class ManageVotesPageComponent implements OnInit {

  isShowedModal: boolean = false;
  optionVoteClicked?: Vote | undefined;
  currentUrl?: string;

  isLoading: boolean = false;
  optionsToVote: Vote[] = [];

  constructor(
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private votesService: VotesService,
    private pollService: PollService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOptionsToVote();
    this.onEmitClicOptionFromCard();
  }


  private getOptionsToVote() {
    this.isLoading = true;

    this.activatedRoute.params.pipe(
      switchMap(({ poll_id }) => this.votesService.getVoteOptionsByPollId(poll_id)),
      delay(1000),
      map((votes: Vote[]) => votes.map(vote => ({ ...vote, img: `http://localhost:3030/api/image/${vote.img}` }))),
    )
      .subscribe(({
        next: (votes: Vote[]) => {
          this.pollService.mustHideTitle = false;
          this.isLoading = false;
          this.optionsToVote = votes;
        },
        error: ({ error }: HttpErrorResponse) => {
          PopUpAdaptador.generatePopUp('Error', error.error, 'error')
            .then(result => {
              if (result.isConfirmed) {
                this.pollService.mustHideTitle = false;
                this.router.navigate(['/dashboard/main']);
              }
            })
        }
      }));


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
