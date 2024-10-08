import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';
import { PopUpAdaptador } from '../../plugin';
import { ParticipantService } from '../../services/participant.service';

@Component({
    selector: 'shared-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    pollId?: string;
    userName?: string;
    mustShowGoBackOptions: boolean = false;

    @Input()
    isFromDashboard?: boolean;

    @Input()
    title: string = '';

    constructor(
        private authService: AuthService,
        private pollService: PollService,
        private participantService: ParticipantService,
        private router: Router
    ) { }

    ngOnInit() {
        this.pollService.mustHideTitle.subscribe((value) => this.mustShowGoBackOptions = value);
        this.pollService.onChangePoll_id.subscribe(() => this.pollId = this.pollService.poll_id);
        this.userName = this.isFromDashboard ? this.authService.user?.name : this.participantService.userName;
    }

    goBack() {
        if (this.mustShowGoBackOptions) {
            this.pollService.mustHideTitle = false;
            return;
        }
        this.router.navigateByUrl('/');
    }

    logout() {
        this.authService.logout().subscribe({
            next: () => this.router.navigateByUrl('/sign-up'),
            error: () => PopUpAdaptador.generatePopUp('Error', 'It has ocurred an error loging out the user', 'error')
        });
    }
}