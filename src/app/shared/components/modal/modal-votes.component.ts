import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ErrorMessages } from 'src/app/shared/enums/error.enum';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { RespondImageServer } from 'src/app/shared/interfaces';
import { Vote } from 'src/app/shared/interfaces/vote.interface';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { VotesService } from 'src/app/shared/services/votes.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { environments } from 'src/environments/environment';



@Component({
    selector: 'manage-votes-modal',
    templateUrl: 'modal-votes.component.html',
    styleUrls: ['modal-votes.component.scss']
})

export class ModalVotesComponent implements OnInit {

    @Input()
    vote?: Vote;

    @ViewChild('modalVotes')
    modalContainer?: ElementRef<HTMLDivElement>;

    form?: FormGroup;
    temporalImage: any;
    imageToUpload?: File;


    get formData(): FormData {
        const formData = new FormData();
        formData.append('img', this.imageToUpload!);
        return formData
    }


    constructor(
        private fb: FormBuilder,
        private votesService: VotesService,
        private valitatorService: ValidatorService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.createForm();
    }





    createForm() {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', Validators.required],
            img: [undefined, [Validators.required]]
        });

        if (this.vote) {
            const { title, description } = this.vote!;
            const img = new File([``], 'undefined', { type: `undefined` });
            this.form!.reset({ title, description, img });
        }
    }

    isInvalidAndTouchedControl(controlName: string): boolean {
        return this.valitatorService.isTouchedAndInvalidControl(this.form!, controlName);

    }


    getErrorsOfControl(controlName: string): string[] {
        const errors = this.form?.controls[controlName].errors;
        return this.valitatorService.getError(errors!);
    }


    closeModal() {
        new DomModalHelper(this.votesService).removeSCSSClassesModal(this.modalContainer!);
    }

    changeImage(file: File) {
        if (!file) {
            this.temporalImage = null;
            return;
        }

        this.imageToUpload = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.temporalImage = reader.result;
        }

        this.form?.controls['img'].setValue(file);

    }

    onSubmitForm() {
        this.form?.markAllAsTouched();

        if (this.form?.invalid) {
            return;
        }

        if (!this.vote) {
            this.createOptionToVote();
            return;
        }

        this.updateOptionToVote();
    }

    private createOptionToVote() {

        this.http.post(`${environments.imagesServerUrl}/upload`, this.formData)
            .pipe(filter((resp: any) => resp.ok))
            .pipe(switchMap(({ imageName }: RespondImageServer) => this.http.post(`${environments.baseUrl}/api/optionVote`, { ...this.form?.value, img: imageName })))
            .subscribe({
                next: () => {
                    PopUpAdaptador.generatePopUp('Success', 'The option has been created succesfully', 'success');
                    this.closeModal();

                },
                error: (error: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error');
                    this.closeModal();
                }
            });

    }

    private updateOptionToVote() {


        if (this.imageToUpload) {
            this.http.put<RespondImageServer>(`${environments.imagesServerUrl}/update/${this.vote?._id}`, this.formData)
                .pipe(switchMap(({ imageName }: RespondImageServer) => this.http.put(`${environments.baseUrl}/api/optionVote/${this.vote!._id}`, { ...this.form?.value, img: imageName })))
                .subscribe(
                    {
                        next: () => {
                            PopUpAdaptador.generatePopUp('Success', 'The option has been updated succesfully', 'success');
                            this.closeModal();
                        },
                        error: (error: HttpErrorResponse) => {
                            PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error');
                            this.closeModal();
                        }
                    });
        } else {

            this.http.put(`${environments.baseUrl}/api/optionVote/${this.vote!._id}`, { ...this.form?.value, img: undefined })
                .subscribe(
                    {
                        next: () => {
                            PopUpAdaptador.generatePopUp('Success', 'The option has been updated succesfully', 'success');
                            this.closeModal();
                        },
                        error: (error: HttpErrorResponse) => {
                            PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error');
                            this.closeModal();
                        }
                    });
        }


    }

    

}