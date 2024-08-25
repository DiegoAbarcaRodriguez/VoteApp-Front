import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'shared-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() { }

    logout() {
        this.authService.logout();
    }
}