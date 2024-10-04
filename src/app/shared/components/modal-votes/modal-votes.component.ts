import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DomModalHelper } from 'src/app/shared/helpers/dom-modal.helper';
import { RespondImageServer } from 'src/app/shared/interfaces';
import { Vote } from 'src/app/shared/interfaces/vote.interface';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { ModalService } from '../../services/modal.service';
import { ImageService } from '../../services/image.service';
import { VotesService } from '../../services/votes.service';
import { PollService } from '../../services/poll.service';



@Component({
    selector: 'manage-votes-modal',
    templateUrl: 'modal-votes.component.html',
})

export class ModalVotesComponent implements OnInit {

    @Input()
    vote?: Vote;

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
        private modalService: ModalService,
        private imageService: ImageService,
        private voteService: VotesService,
        private pollService: PollService
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



    closeModal() {
        new DomModalHelper(this.modalService).removeSCSSClassesModal();
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

        this.imageService.createImage(this.formData)
            .pipe(switchMap(({ imageName }: RespondImageServer) => this.voteService.addVoteOption({ ...this.form?.value, img: imageName, poll_id: this.pollService.poll_id })))
            .subscribe({
                next: () => {
                    PopUpAdaptador.generatePopUp('Success', 'The option has been created succesfully', 'success');
                    this.closeModal();

                },
                error: ({ error }: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', error.error, 'error');
                    this.closeModal();
                }
            });

    }

    private updateOptionToVote() {


        if (this.imageToUpload) {
            this.imageService.updateImage(this.vote!._id, this.formData)
                .pipe(switchMap(({ imageName }: RespondImageServer) => this.voteService.updateVoteOption(this.vote!._id, { ...this.form?.value, img: imageName })))
                .subscribe(
                    {
                        next: () => {
                            PopUpAdaptador.generatePopUp('Success', 'The option has been updated succesfully', 'success');
                            this.closeModal();
                        },
                        error: ({ error }: HttpErrorResponse) => {
                            PopUpAdaptador.generatePopUp('Error', error.error, 'error');
                            this.closeModal();
                        }
                    });
        } else {
            this.voteService.updateVoteOption(this.vote!._id, { ...this.form?.value, img: undefined })
                .subscribe(
                    {
                        next: () => {
                            PopUpAdaptador.generatePopUp('Success', 'The option has been updated succesfully', 'success');
                            this.closeModal();
                        },
                        error: ({ error }: HttpErrorResponse) => {
                            PopUpAdaptador.generatePopUp('Error', error.error, 'error');
                            this.closeModal();
                        }
                    });
        }


    }



}