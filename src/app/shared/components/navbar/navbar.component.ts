import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';
import { PopUpAdaptador } from '../../plugin';

@Component({
    selector: 'shared-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    pollId?: string;

    constructor(
        private authService: AuthService,
        private pollService: PollService,
        private router: Router
    ) { }

    ngOnInit() {
        this.pollId = this.pollService.poll_id;
    }


    logout() {
        this.authService.logout().subscribe({
            next: () => this.router.navigateByUrl('/sign-up'),
            error: () => PopUpAdaptador.generatePopUp('Error', 'It has ocurred an error loging out the user', 'error')
        });
    }
}