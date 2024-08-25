import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
    templateUrl: 'dashboard-layout.component.html',
    styleUrls: ['dashboard-layout.component.scss']
})

export class DashboardLayoutComponent implements OnInit, OnDestroy {
    title: string = '';
    private subscription?: Subscription;



    constructor(private router: Router) { }

    ngOnInit(): void {
        this.subscription = this.getArgumentOfRoutes();
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
}