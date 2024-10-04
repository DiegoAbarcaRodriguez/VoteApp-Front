import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardVotesComponent } from './components/card-votes/card-votes.component';
import { ListComponent } from './components/list/list.component';
import { ModalVotesComponent } from './components/modal-votes/modal-votes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ModalPollsComponent } from './components/modal-polls/modal-polls.component';
import { CardPollComponent } from './components/card-polls/card-polls.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { AccessButtonComponent } from './components/access-button/access-button.component';
import { ModalAccessCodeComponent } from './components/modal-access-code/modal-access-code.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        CardVotesComponent,
        ListComponent,
        ModalVotesComponent,
        ErrorMessageComponent,
        CardPollComponent,
        ModalPollsComponent,
        PaginationComponent,
        SnackBarComponent,
        AccessButtonComponent,
        ModalAccessCodeComponent
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        CardVotesComponent,
        ListComponent,
        ModalVotesComponent,
        ErrorMessageComponent,
        CardPollComponent,
        ModalPollsComponent,
        PaginationComponent,
        SnackBarComponent,
        AccessButtonComponent,
        ModalAccessCodeComponent
    ],
    providers: [],
})
export class SharedModule { }
