import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Vehicle} from '../model/vehicle';
import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {
  vehicleFrontend = new FormGroup({
    brand: new FormControl(),
    height: new FormControl(),
    length: new FormControl(),
    width: new FormControl(),
    numberOfSeats: new FormControl(),
    transportType: new FormControl(),
    yearOfManufacture: new FormControl()
  });

  constructor(public vehicleService: VehicleService) {
  }

  ngOnInit(): void {
  }

  public createVehicle(): void {
    console.log(this.vehicleFrontend.value.brand + ' ' + this.vehicleFrontend.value.height + ' ' + this.vehicleFrontend.value.length + ' '
      + this.vehicleFrontend.value.width + ' ' + this.vehicleFrontend.value.numberOfSeats + ' ' +  +
      ' ' + this.vehicleFrontend.value.yearOfManufacture);
    const vehicle = new Vehicle();
    vehicle.setBrand(this.vehicleFrontend.value.brand);
    vehicle.setHeight(this.vehicleFrontend.value.height);
    vehicle.setLength(this.vehicleFrontend.value.length);
    vehicle.setWidth(this.vehicleFrontend.value.width);
    vehicle.setNumberOfSeats(this.vehicleFrontend.value.numberOfSeats);
    vehicle.setTransportType(this.vehicleFrontend.value.transportType);
    vehicle.setYearOfManufacture(this.vehicleFrontend.value.yearOfManufacture);
    this.vehicleService.saveVehicle(vehicle);
  }

}
