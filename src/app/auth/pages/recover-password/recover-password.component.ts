import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    templateUrl: 'Recover-password.component.html'
})

export class RecoverPasswordComponent implements OnInit {

    isValidToken: boolean = false;
    private _id: string = '';

    form = this.fb.group({
        'password': ['', [Validators.minLength(6), Validators.required]],
        'password2': ['', [Validators.minLength(6), Validators.required]]
    }, {
        validators: [
            this.validatorService.isFieldOneEqualToFieldTwo('password', 'password2')
        ]
    });


    constructor(
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private validatorService: ValidatorService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(switchMap(({ token }) => this.authService.checkToken(token, false)))
            .subscribe(
                {
                    next: ({ _id }) => {
                        this.isValidToken = true
                        this._id = _id;
                    },
                    error: (error: HttpErrorResponse) => {
                        this.isValidToken = false;
                        if (error.status == 500) {
                            PopUpAdaptador.generatePopUp('Error', error.error.error, 'error');
                        }
                    }
                });



    }





    sendPasswords() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.authService.updatePassword({ ...this.form.value, _id: this._id })
            .subscribe({
                next: () => {
                    PopUpAdaptador.generatePopUp('Success!', 'The password has been updated succesfully', 'success');
                    this.router.navigateByUrl('/');
                },
                error: ({ error }: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', error.error, 'error');
                }

            });

    }
}
