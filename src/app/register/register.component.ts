import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../model/user';

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
  constructor(public authService: AuthService) {
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
      alert('Passwörter stimmen nicht überein!');
    } else {
      this.authService.register(this.form.value.lastName, this.form.value.firstName,
        this.form.value.email, this.form.value.birthday, this.form.value.image, this.form.value.password);
    }
  }

  setProfileImage(event): void {
    this.authService.file = event.target.files[0];
  }
}
