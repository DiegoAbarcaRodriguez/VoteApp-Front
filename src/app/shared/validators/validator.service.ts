import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
    constructor() { }


    getError(kindOfError: ValidationErrors): string[] {
        const errorNames = Object.keys(kindOfError);
        const errors = [];

        for (const errorName of errorNames) {

            if (errorName === 'required') {
                errors.push('Must be included!');
            }

            if (errorName === 'minlength') {
                errors.push(`The minimum limit is ${kindOfError[errorName].requiredLength}!`);
            }

            if (errorName === 'notEqual') {
                errors.push('The passwords are differents!');
            }

            if (errorName === 'email') {
                errors.push('Email not valid!');
            }

            if (errorName === 'hasBlankSpace') {
                errors.push('Must not have blank spaces on the sideways!');
            }
        }

        return errors;
    }

    isTouchedAndInvalidControl(form: FormGroup, controlName: string): boolean {
        return form.controls[controlName].touched && form.controls[controlName].invalid;
    }

    isFieldOneEqualToFieldTwo(field1: string, field2: string) {
        return (formGroup: FormGroup): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value || '';
            const fieldValue2 = formGroup.get(field2)?.value || '';

            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return {
                    notEqual: true
                }
            }
            return null;
        }
    }

    validateName(formControl: FormControl): ValidationErrors | undefined {
        if (formControl.value.startsWith(' ') || formControl.value.endsWith(' ')) {
            return {
                hasBlankSpace: true
            }
        }

        return undefined;
    }

}