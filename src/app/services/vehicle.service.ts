import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Vehicle} from '../model/vehicle';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleCollection: AngularFirestoreCollection<Vehicle>;
  private vehicles: Observable<Vehicle[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.vehicleCollection = afs.collection('vehicles');
  }

  async addVehicle(vehicle: Vehicle): Promise<void> {
    const userId: string = this.authService.getCurrentUser().uid;
    vehicle.setUser(userId);
    await this.vehicleCollection.doc().set(Object.assign({}, vehicle));
  }

  getVehicles(): any {
    const userId: string = this.authService.getCurrentUser().uid;
    return this.afs.collection('vehicles', ref => ref.where('userId', '==', userId)).valueChanges();
  }
}
