import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {VehicleService} from '../services/vehicle.service';
import {Vehicle} from '../model/vehicle';
import {RatingService} from '../services/rating.service';


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
  public vehiclesList: Vehicle [] = [];

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public userService: AuthService,
    public vehicleService: VehicleService, private ratingService: RatingService) {
    this.user = auth.user;
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
      this.userService.getOffersFromCurrentUser(this.authenticatedUser.uid).then(() => {
          this.vehicleService.getVehicles(this.authenticatedUser.uid).then(vehicles => {
            this.vehiclesList = vehicles;
          });
        }).then(() => {
          this.userService.getBookingsFromCurrentUser(this.authenticatedUser.uid);
        });
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
  }

  ngOnInit(): void {
  }

  deleteVehicle(vehicleId): void {
    this.vehicleService.deleteVehicle(vehicleId, this.id).then(() => {
      location.reload();
    });
  }
}


