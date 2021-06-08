import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Request} from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestCollection: AngularFirestoreCollection<Request>;
  private trackingCollection: AngularFirestoreCollection;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.requestCollection = afs.collection('requests');
    this.trackingCollection = afs.collection('tracking');
  }

  async addRequest(request: Request): Promise<void> {
    const userId: string = this.authService.getCurrentUser().uid;
    request.setUserId(userId);
    this.trackingCollection.add({}).then((newTracking) => {
      request.setTrackingId(newTracking.id);
      this.requestCollection.doc().set(Object.assign({}, request));
    });
  }
}
