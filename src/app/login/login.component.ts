import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(public auth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.form.value.email, this.form.value.password);
  }
}
