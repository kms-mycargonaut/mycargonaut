import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
      lastName: new FormControl(),
      firstName: new FormControl(),
      email: new FormControl(),
      birthday: new FormControl(),
      image: new FormControl(),
      password: new FormControl(),
    });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form.value.lastName, this.form.value.firstName,
      this.form.value.email, this.form.value.birthday, this.form.value.image, this.form.value.password);
  }


}
