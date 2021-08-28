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

  user: firebase.User = null;
  vehicleCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  db;

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.db = firebase.firestore();
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.vehicleCollection = afs.collection<Vehicle>('vehicles');
    this.vehicles = this.vehicleCollection.valueChanges();
  }

  addVehicle(vehicle: Vehicle, userId: string): void {
    vehicle.setUserId(userId);
    this.vehicleCollection.add(Object.assign({}, vehicle));
  }

  async getVehicles(userId: string): Promise<Vehicle[]> {
    return new Promise((resolve, reject) => {
      const vehicleList: Vehicle[] = [];
      const vehicleRef = this.db.collection('vehicles');
      vehicleRef.where('userId', '==', userId).get().then(v => {
        v.forEach(doc => {
          const vehicle: Vehicle = new Vehicle();
          vehicle.setVehicleId(doc.id);
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
        resolve(vehicleList);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  deleteVehicle(vehicleId: string, userId: string): Promise<void> {
    return this.afs.collection('vehicles').doc(vehicleId).delete();
  }
}
