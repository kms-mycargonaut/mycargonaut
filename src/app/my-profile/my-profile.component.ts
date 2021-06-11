import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {EntryService} from '../services/entry.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticatedUser: firebase.User;
  id;
  email;
  password;
  firstName;
  lastName;
  birthday;
  image;
  entryId;
  start;
  end;
  date;
  time;
  status;

  public entryList: any = [];


  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public userService: AuthService,
    private entryService: EntryService,
    private route: ActivatedRoute) {
    this.user = auth.user;
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
    });

    this.userService.getcurrentUser().then(user => {
      this.id = user.id;
      this.email = user.email;
      this.password = user.password;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.birthday = user.birthday;
      this.image = user.image;
    });

    /*this.entryService.getEntry(this.entryId).then(entry => {
      this.entryId = entry.entryId;
      this.start = entry.start;
      this.end = entry.destination;
      this.date = entry.startDate;
      this.time = entry.startTime;
    });*/
  }
}


