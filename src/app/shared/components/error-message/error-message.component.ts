import { Component, Input } from '@angular/core';
import { ValidatorService } from '../../validators/validator.service';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'shared-error-message',
    templateUrl: 'error-message.component.html'
})

export class ErrorMessageComponent {

    @Input()
    field: string = '';

    @Input()
    form?: FormGroup;

    @Input()
    errors: ValidationErrors = {};

    constructor(private validatorService: ValidatorService) { }

    isValidField(): boolean {  
        return this.validatorService.isTouchedAndInvalidControl(this.form!, this.field);
    }

    getFieldErrors() {
        return this.validatorService.getError(this.errors);
    }
}