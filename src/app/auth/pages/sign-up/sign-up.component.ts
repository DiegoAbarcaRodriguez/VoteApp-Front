import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent implements OnInit {

    isLoading: boolean = false;

    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]]
    }, {
        validators: [this.validatorService.isFieldOneEqualToFieldTwo('password', 'password2')]
    });

    constructor(
        private fb: FormBuilder,
        private validatorService: ValidatorService,
        private authService: AuthService

    ) { }

    ngOnInit() { }

    register() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        this.authService.signUp({ ...this.form.value })
            .subscribe({
                next: () => {
                    PopUpAdaptador.generatePopUp('Success', 'Please verify your email to validate your account', 'success').then(() => {
                        this.isLoading = false;
                    });
                },
                error: ({ error }: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', error.error, 'error').then(() => this.isLoading = true)

                }
            });


    }
}