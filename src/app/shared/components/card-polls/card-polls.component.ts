import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../../interfaces/poll.interface';

@Component({
    selector: 'shared-card-polls',
    templateUrl: 'card-polls.component.html'
})

export class CardPollComponent implements OnInit {
    @Input()
    poll?: Poll;

    constructor() { }

    ngOnInit() { }
}