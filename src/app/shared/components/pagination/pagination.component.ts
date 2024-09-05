import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'shared-pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent {

    @Input()
    previousUrl?: string;

    @Input()
    nextUrl?: string;

    @Input()
    pagesNumber: number[] = [];

    @Input()
    currentPage?: number;

    @Output()
    onEmitUrl: EventEmitter<string> = new EventEmitter();


    constructor() { }

    onClickUrl(url: string) {
        this.onEmitUrl.next(url);
    }
}