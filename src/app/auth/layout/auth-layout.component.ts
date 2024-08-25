import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'auth-layout.component.html',
    styleUrls: ['auth-layout.component.scss']
})

export class AuthLayoutComponent implements OnInit {
    currentUrl: string = '';

    constructor(private router: Router) { }

    ngOnInit() {
        this.currentUrl = this.router.url;
    }
}