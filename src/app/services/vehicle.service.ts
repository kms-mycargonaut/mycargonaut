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

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
      this.vehicleCollection = afs.collection<Vehicle>('vehicles');
      this.vehicles = this.vehicleCollection.valueChanges();
  }

  addVehicle(vehicle: Vehicle): void {
    vehicle.setUserId(firebase.auth().currentUser.uid);
    this.vehicleCollection.add(Object.assign({}, vehicle));
  }

  getVehicles(user: firebase.User): Vehicle[] {
    const vehicles: Vehicle[] = [];
    const values = this.afs.collection('vehicles', ref => ref.where('userId', '==', user.uid)).valueChanges();
    values.subscribe(v => {
      v.forEach((element: Vehicle) => {
        vehicles.push(element);
      });
    });
    return vehicles;
  }
}
