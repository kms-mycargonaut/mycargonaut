import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Vehicle} from '../model/vehicle';
import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent {
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

  public createVehicle(): void {
    const vehicle = new Vehicle();
    vehicle.brand = this.getBrand();
    vehicle.height = this.getHeight();
    vehicle.length = this.getLength();
    vehicle.width = this.getWidth();
    vehicle.numberOfSeats = this.getNumberOfSeats();
    vehicle.transportType = this.getTransportType();
    vehicle.yearOfManufacture = this.getYearOfManufacture();
    this.vehicleService.addVehicle(vehicle);
  }

  private getBrand(): any {
    if (this.vehicleFrontend.value.brand === null) {
      console.error('brand should not be null');
    } else {
      return this.vehicleFrontend.value.brand;
    }
  }

  private getHeight(): any {
    if (this.vehicleFrontend.value.height === null) {
      console.error('height should not be null');
    } else {
      return this.vehicleFrontend.value.height;
    }
  }

  private getLength(): any {
    if (this.vehicleFrontend.value.length === null) {
      console.error('length should not be null');
    } else {
      return this.vehicleFrontend.value.length;
    }
  }

  private getWidth(): any {
    if (this.vehicleFrontend.value.width === null) {
      console.error('width should not be null');
    } else {
      return this.vehicleFrontend.value.width;
    }
  }

  private getNumberOfSeats(): any {
    if (this.vehicleFrontend.value.numberOfSeats === null) {
      console.error('number of seats should not be null');
    } else {
      return this.vehicleFrontend.value.numberOfSeats;
    }
  }

  private getTransportType(): any {
    if (this.vehicleFrontend.value.transportType === null) {
      console.error('number of seats should not be null');
    } else {
      return this.vehicleFrontend.value.transportType;
    }
  }

  private getYearOfManufacture(): any {
    return this.vehicleFrontend.value.yearOfManufacture;
  }
}
