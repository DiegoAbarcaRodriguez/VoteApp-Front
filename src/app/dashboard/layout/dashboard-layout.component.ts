import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { catchError, filter, map, of, Subscription } from 'rxjs';
import { titleOfPages } from 'src/app/shared/enums/title.enum';
import { PollService } from 'src/app/shared/services/poll.service';
import { VotesService } from 'src/app/shared/services/votes.service';


@Component({
    templateUrl: 'dashboard-layout.component.html',
    styleUrls: ['dashboard-layout.component.scss']
})

export class DashboardLayoutComponent implements OnInit, OnDestroy {
    title: string = '';
    private subscription?: Subscription = new Subscription();
    mustHideTitle: boolean = false;
    isThereOptionToVote?: boolean;

    constructor(
        private router: Router,
        private pollService: PollService,
        private voteService: VotesService
    ) { }

    ngOnInit(): void {
        this.title = titleOfPages[this.router.url.split('/').at(2)!];
        this.subscription?.add(this.getArgumentOfRoutes());
        this.subscription?.add(this.onMustHideTitle());
        this.subscription?.add(this.onGetOptionsToVoteNumber());
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }


    private getArgumentOfRoutes() {
        return this.router.events
            .pipe(
                filter((event): event is ActivationEnd => event instanceof ActivationEnd),
                filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                map((event: ActivationEnd) => event.snapshot.data)
            )
            .subscribe(({ title }) => {
                this.title = title;
                document.title = 'AppVotes - ' + title;
            });
    }

    private onMustHideTitle() {
        return this.pollService.mustHideTitle.subscribe(
            {
                next: (value) => this.mustHideTitle = value,
                error: () => this.mustHideTitle = false
            });
    }

    private onGetOptionsToVoteNumber() {
        this.pollService.onChangePoll_id.subscribe(() => {
            this.voteService.getVoteOptionsByPollId(this.pollService.poll_id!)
                .pipe(catchError(() => of([])))
                .subscribe((votes: any[]) => this.isThereOptionToVote = votes.length > 0)
        });

    }

}