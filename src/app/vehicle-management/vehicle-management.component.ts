import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VehicleService} from '../services/vehicle.service';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../alert.service';
import {Vehicle} from '../model/vehicle';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit{

  user: Observable<firebase.User>;
  authenticatedUser: firebase.User;
  vehicleFrontend = new FormGroup({
    brand: new FormControl(),
    height: new FormControl(),
    length: new FormControl(),
    width: new FormControl(),
    numberOfSeats: new FormControl(),
    transportType: new FormControl(),
    yearOfManufacture: new FormControl()
  });

  constructor(public auth: AngularFireAuth, private vehicleService: VehicleService, private router: Router,
              private alertService: AlertService) {
    this.user = auth.user;
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
    });
  }

  valueIsFilledOut(value: string): boolean {
    return value !== null && value !== undefined;
  }

  public createVehicle(): void {
    const vehicle = new Vehicle();
    if (this.valueIsFilledOut(this.vehicleFrontend.value.brand)
      && this.valueIsFilledOut(this.vehicleFrontend.value.height)
      && this.valueIsFilledOut(this.vehicleFrontend.value.length)
      && this.valueIsFilledOut(this.vehicleFrontend.value.width)
      && this.valueIsFilledOut(this.vehicleFrontend.value.numberOfSeats)
      && this.valueIsFilledOut(this.vehicleFrontend.value.transportType)) {
      vehicle.brand = this.vehicleFrontend.value.brand;
      vehicle.height = this.vehicleFrontend.value.height;
      vehicle.length = this.vehicleFrontend.value.length;
      vehicle.width = this.vehicleFrontend.value.width;
      vehicle.numberOfSeats = this.vehicleFrontend.value.numberOfSeats;
      vehicle.transportType = this.vehicleFrontend.value.transportType;
      vehicle.yearOfManufacture = this.vehicleFrontend.value.yearOfManufacture;
      this.vehicleService.addVehicle(vehicle);
      const alert = {
        type: 'success',
        message: 'Dein Fahrzeug wurde hinzugefügt'
      };
      this.router.navigate(['my-profile']);
      this.alertService.ALERTS.push(alert);
      setTimeout(() => this.alertService.close(alert), 5000);
    } else {
      const alert = {
        type: 'danger',
        message: 'Bitte fülle alle Felder aus'
      };
      this.alertService.ALERTS.push(alert);
      setTimeout(() => this.alertService.close(alert), 5000);
    }
  }
}
