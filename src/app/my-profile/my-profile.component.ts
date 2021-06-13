import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {VehicleService} from '../services/vehicle.service';


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

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public userService: AuthService,
    public vehicleService: VehicleService) {
    this.user = auth.user;
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
    });
  }

  ngOnInit(): void {

    this.userService.getOffersFromCurrentUser();
    this.userService.getVehiclesFromCurrentUser();
    this.userService.getBookingsFromCurrentUser();
    // this.vehicleService.deleteVehicle();

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

  /*deleteVehicleByIdAndUser(): void {
    const vehicleId: string = null;
    const userId: string = null;
    this.vehicleService.deleteVehicle(vehicleId, userId);
  }*/
}


