import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'shared-snackbar',
    templateUrl: 'snackbar.component.html',
    styleUrls: ['snackbar.component.scss']
})

export class SnackBarComponent implements OnInit {

    @Output()
    onMustShowSnackBar: EventEmitter<boolean> = new EventEmitter();

    message: string = '';

    constructor() { }

    ngOnInit() {
        setTimeout(() => {
            this.onClose();
        }, 5000);
    }

    onClose() {
        this.onMustShowSnackBar.next(false);
    }
}