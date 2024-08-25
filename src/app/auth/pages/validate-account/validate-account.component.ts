import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
    templateUrl: 'validate-account.component.html',
    styleUrls: ['validate-account.component.scss']
})

export class ValidateComponent implements OnInit {

    isValidToken: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(switchMap(({ token }) => this.authService.checkToken(token, true)))
            .subscribe(
                {
                    next: () => this.isValidToken = true,
                    error: (error: HttpErrorResponse) => {
                        this.isValidToken = false;
                        if (error.status == 500) {
                            PopUpAdaptador.generatePopUp('Error', error.error.error, 'error');
                        }
                    }
                });



    }


}