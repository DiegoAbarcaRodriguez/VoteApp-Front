import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { PopUpAdaptador } from './shared/plugin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.connectToWebSockets();
  }

  private connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
      const { email, type } = JSON.parse(event.data);
      if (type === 'warning' && email === this.authService.user?.email) {
        PopUpAdaptador.generatePopUp('Warning!', 'Another session has been detected!', 'warning')
          .then(result => {
            if (result.isConfirmed) {
              this.authService.logout()
                .subscribe(() => this.router.navigateByUrl('/'));
            }
          });
      }
    }


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
