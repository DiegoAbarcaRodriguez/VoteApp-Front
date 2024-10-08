import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpressions } from 'src/app/shared/helpers/regular-expressions.helper';
import { LoginPayload } from 'src/app/shared/interfaces';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { AuthService } from 'src/app/shared/services/auth.service';


declare const google: any;

@Component({
    templateUrl: './sign-in.component.html'
})
export class SignInComponent implements AfterViewInit {

    @ViewChild('buttonGoogle')
    buttonGoogle?: ElementRef;

    form = this.fb.group({
        user: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private zone: NgZone
    ) { }


    ngAfterViewInit(): void {
        this.googleInit();
    }

    googleInit() {
        google.accounts.id.initialize({
            client_id: '596013410668-c19kj4sjnu7es7aa7qkvjff50kk1vu0g.apps.googleusercontent.com',
            callback: (response: any) => this.handleCredentialResponse(response) //!IMPORTANT: si se pone this.handleCredentialResponse, el this interno a este método apuntata a este método que se le pasa como callback y no al componente!!

        });
        google.accounts.id.renderButton(
            this.buttonGoogle?.nativeElement,
            { theme: "outline", size: "large" }  // customization attributes
        );
    }

    handleCredentialResponse(response: any) {

        this.authService.loginGoogle(response.credential)
            .subscribe({
                next: () => this.zone.run(() => this.router.navigateByUrl('/dashboard/main')),
                error: ({ error }: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error', error.error, 'error')
            })
    }


    login() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }


        this.authService.login({ user: this.form.value.user?.toLocaleLowerCase(), password: this.form.value.password } as LoginPayload)
            .subscribe({
                next: () => this.zone.run(() => this.router.navigateByUrl('/dashboard/main')),
                error: ({ error }: HttpErrorResponse) => PopUpAdaptador.generatePopUp('Error', error.error, 'error')
            })
    }
}