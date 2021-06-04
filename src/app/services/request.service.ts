import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Vehicle} from '../model/vehicle';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
//  userId - Anbietender
//  offerId
//  userId - Anfragender

export class RequestService {


  private requestsCollection: AngularFirestoreCollection<Vehicle>;
  private requests: Observable<Vehicle[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.requestsCollection = afs.collection('requests');
  }

  async addRequest(requests: Vehicle): Promise<void> {
    const userId: string = this.authService.getCurrentUser().uid;
    requests.setUserId(userId);
    await this.requestsCollection.doc().set(Object.assign({}, requests));
  }
}
