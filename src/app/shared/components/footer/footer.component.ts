import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'shared-footer',
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {

    year = new Date().getFullYear();

    constructor() { }

    ngOnInit() { }
}