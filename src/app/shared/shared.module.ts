import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { ModalVotesComponent } from './components/modal/modal-votes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        CardComponent,
        ListComponent,
        ModalVotesComponent,
        ErrorMessageComponent
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        CardComponent,
        ListComponent,
        ModalVotesComponent,
        ErrorMessageComponent
    ],
    providers: [],
})
export class SharedModule { }
