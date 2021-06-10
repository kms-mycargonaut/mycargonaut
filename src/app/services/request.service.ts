import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Request} from '../model/request';
import {EntryService} from './entry.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrackingService} from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends EntryService{

  private requestCollection: AngularFirestoreCollection<Request>;
  private trackingCollection: AngularFirestoreCollection;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth, public trackingService: TrackingService) {
    super(afs, auth);
    this.requestCollection = afs.collection('requests');
    this.trackingCollection = afs.collection('tracking');
  }

  async addRequest(request: Request): Promise<void> {
    request.setUserId(this.user.uid);
    this.trackingCollection.add({}).then((newTracking) => {
      request.setTrackingId(newTracking.id);
      console.log(request);
      this.requestCollection.doc().set(Object.assign({}, request));
    });
  }

  async getRequest(requestId: string): Promise<Request> {
    const requestFirestore = await this.afs.collection('requests').doc<Request>(requestId).get().toPromise();
    const values = requestFirestore.data();
    console.log(values);
    return null;
  }
}
