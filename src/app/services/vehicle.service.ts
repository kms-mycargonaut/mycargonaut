import firebase from 'firebase';
import {Vehicle} from '../model/vehicle';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public saveVehicle(vehicle: Vehicle): void {
    const vehicleToSave = {
      brand: vehicle.getBrand(),
      height: vehicle.getHeight(),
      length: vehicle.getLength(),
      numberOfSeats: vehicle.getNumberOfSeats(),
      transportType: vehicle.getTransportType(),
      width: vehicle.getWidth(),
      yearOfManufacture: vehicle.getYearOfManufacture()
    };

    firebase.firestore().collection('vehicles').doc().set(vehicleToSave);
  }
}
