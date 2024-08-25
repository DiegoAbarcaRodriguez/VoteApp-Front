import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    templateUrl: 'forget-password.component.html'
})

export class ForgetPasswordComponent {

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }


    sendEmail() {

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.authService.sendEmailToRecoverPassword({ email: this.form.value.email! })
            .subscribe({
                next: () => PopUpAdaptador.generatePopUp('Success', 'It has been sent the email succesfully', 'success'),
                error: (error: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error', error.error.error, 'error')
            })


    }
}