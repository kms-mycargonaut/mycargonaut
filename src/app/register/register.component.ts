import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../model/user';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  user: User[] = [];
  form = new FormGroup({
    lastName: new FormControl(),
    firstName: new FormControl(),
    email: new FormControl(),
    birthday: new FormControl(),
    image: new FormControl(),
    password: new FormControl(),
    passwordControl: new FormControl()
  });
  constructor(public authService: AuthService, public alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (
      this.form.value.password !== this.form.value.passwordControl &&
      this.form.value.lastName !== '' &&
      this.form.value.firstName !== '' &&
      this.form.value.email !== '' &&
      this.form.value.password !== '' &&
      this.form.value.passwordControl !== ''
    ) {
      const alert = {
        type: 'danger',
        message: 'Passwörter stimmen nicht überein!'
      };
      this.alertService.ALERTS.push(alert);
      setTimeout(() => this.alertService.close(alert), 5000);
    } else {
      this.authService.register(this.form.value.lastName, this.form.value.firstName,
        this.form.value.email, this.form.value.birthday, this.form.value.image, this.form.value.password);
    }
  }

  setProfileImage(event): void {
    this.authService.file = event.target.files[0];
  }
}
