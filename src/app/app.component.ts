import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mycargonaut';

  email: string;

  constructor( public auth: AngularFireAuth, public authService: AuthService) {

  }
  logout(): void {
    this.authService.logout();
  }
}
