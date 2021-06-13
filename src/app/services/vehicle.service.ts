import {Injectable} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleCollection: AngularFirestoreCollection<Vehicle>;
  private vehicles: Observable<Vehicle[]>;
  private db;

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
      this.db = firebase.firestore();
      this.vehicleCollection = afs.collection<Vehicle>('vehicles');
      this.vehicles = this.vehicleCollection.valueChanges();
  }

  addVehicle(vehicle: Vehicle): void {
    vehicle.setUserId(firebase.auth().currentUser.uid);
    this.vehicleCollection.add(Object.assign({}, vehicle));
  }

  async getVehicles(userId: string): Promise<Vehicle[]> {
    const vehicleList: Vehicle[] = [];
    const vehicleRef = this.db.collection('vehicles');
    await vehicleRef.where('userId', '==', userId).get().then(v => {
      v.forEach(doc => {
        const vehicle: Vehicle = new Vehicle();
        vehicle.setVehicleId(doc.data().vehicleId);
        vehicle.setUserId(doc.data().userId);
        vehicle.setTransportType(doc.data().transportType);
        vehicle.setBrand(doc.data().brand);
        vehicle.setYearOfManufacture(doc.data().yearOfManufacture);
        vehicle.setNumberOfSeats(doc.data().numberOfSeats);
        vehicle.setLength(doc.data().length);
        vehicle.setHeight(doc.data().height);
        vehicle.setWidth(doc.data().width);
        vehicleList.push(vehicle);
      });
    });
    return vehicleList;
  }
}
