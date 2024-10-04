import { Component, Input, OnInit } from '@angular/core';
import { Vote } from '../../interfaces/vote.interface';
import { AuthService } from '../../services/auth.service';
import { PollService } from '../../services/poll.service';


@Component({
    selector: 'shared-list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {

    @Input()
    isLoading: boolean = true;
    @Input()
    optionsToVote: Vote[] = [];

    constructor(
        private pollService: PollService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.connectToWebSockets();
    }

    private connectToWebSockets() {

        const socket = new WebSocket('ws://localhost:3000/ws');

        socket.onmessage = (event) => {
            const { type, payload, email, poll_id } = JSON.parse(event.data);

            switch (type) {
                case 'create-option-vote':
                    if (poll_id === this.pollService.poll_id || email === this.authService.user?.email) {
                        const newPayload = { ...payload, img: `http://localhost:3030/api/image/${payload.img}` }
                        this.optionsToVote.push(newPayload);
                    }
                    break;
                case 'update-option-vote':
                    if (poll_id === this.pollService.poll_id || email === this.authService.user?.email) {
                        this.optionsToVote = this.optionsToVote.map(vote => {
                            if (vote._id === payload._id) {
                                vote = payload;
                                vote.img = `http://localhost:3030/api/image/${payload.img}`;
                            }
                            return vote;
                        });
                    }
                    break;
                case 'delete-option-vote':
                    if (poll_id === this.pollService.poll_id || email === this.authService.user?.email) {
                        this.optionsToVote = this.optionsToVote.filter(vote => vote._id != payload._id);
                    }
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