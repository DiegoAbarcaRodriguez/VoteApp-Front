import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ErrorMessages } from 'src/app/shared/enums/error.enum';
import { Vote } from 'src/app/shared/interfaces/vote.interface';
import { PopUpAdaptador } from 'src/app/shared/plugin';
import { VotesService } from 'src/app/shared/services/votes.service';


@Component({
    selector: 'chart-page',
    templateUrl: 'chart-page.component.html',
    styles: [
        `.container-chart{
            margin:10px auto;
            width:300px;
            height:300px;
        }`
    ]

})

export class ChartPageComponent implements OnInit {

    @ViewChild('chart')
    private chartElement?: ElementRef<HTMLCanvasElement>;
    optionsToVote: Vote[] = [];

    private chart?: Chart;


    constructor(private votesService: VotesService) { }

    ngOnInit(): void {
        this.connectToWebSockets();
        this.getOptionsToVote();

    }

    private getOptionsToVote() {
        this.votesService.getVoteOptions()
            .subscribe({
                next: (votes: Vote[]) => {
                    this.optionsToVote = votes;
                    this.generateChartPlot();
                },
                error: (error: HttpErrorResponse) => {
                    PopUpAdaptador.generatePopUp('Error', ErrorMessages[error.status], 'error')
                }

            });
    }


    private generateChartPlot() {
        this.chart = new Chart(this.chartElement?.nativeElement!, {
            type: 'bar',
            data: {
                labels: this.optionsToVote.map(option => option.title),
                datasets: [
                    { data: this.optionsToVote.map(option => option.amount || 0), label: 'Number of Votes' },
                ],

            },

        });
    }

    private connectToWebSockets() {

        const socket = new WebSocket('ws://localhost:3000/ws');

        socket.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);

            switch (type) {
                case 'create-option-vote':
                    this.optionsToVote.push(payload);
                    this.chart?.destroy();
                    this.generateChartPlot();
                    break;
                case 'update-option-vote':
                    this.optionsToVote = this.optionsToVote.map(vote => {
                        if (vote._id === payload._id) {
                            vote = payload;
                        }
                        return vote;
                    });
                    this.chart?.destroy();
                    this.generateChartPlot();
                    break;
                case 'delete-option-vote':
                    this.optionsToVote = this.optionsToVote.filter(vote => vote._id != payload._id);
                    this.chart?.destroy();
                    this.generateChartPlot();
                    break;

                default:
                    throw new Error('No option found');
                    break;
            }


        };

        socket.onclose = (event) => {
            console.log('Connection closed');
            setTimeout(() => {
                console.log('retrying to connect');
                this.connectToWebSockets();
            }, 1500);

        };

        socket.onopen = (event) => {
            console.log('Connected');
        };

    }
}