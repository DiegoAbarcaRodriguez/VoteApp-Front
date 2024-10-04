import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ValidateComponent } from './pages/validate-account/validate-account.component';
import { VotePageComponent } from './pages/vote/vote.component';

const routes: Routes = [

    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent
    },
    {
        path: 'recover-password/:token',
        component: RecoverPasswordComponent
    },
    {
        path: 'validate-account/:token',
        component: ValidateComponent
    },
    {
        path: 'vote/:poll_id',
        component: VotePageComponent
    },
    {
        path: '*',
        redirectTo: 'sign-up'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-up'
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
