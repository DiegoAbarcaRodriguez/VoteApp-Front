import { NgModule } from '@angular/core';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ValidateComponent } from './pages/validate-account/validate-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VotePageComponent } from './pages/vote/vote.component';



@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        SignInComponent,
        SignUpComponent,
        AuthLayoutComponent,
        ForgetPasswordComponent,
        RecoverPasswordComponent,
        ValidateComponent,
        VotePageComponent
    ],
    providers: [],
})
export class AuthModule { }
