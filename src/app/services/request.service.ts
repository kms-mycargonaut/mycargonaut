import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Request} from '../model/request';
import {EntryService} from './entry.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends EntryService{

  private requestCollection: AngularFirestoreCollection<Request>;
  private trackingCollection: AngularFirestoreCollection;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth) {
    super(afs, auth);
    this.requestCollection = afs.collection('requests');
    this.trackingCollection = afs.collection('tracking');
  }

  async addRequest(request: Request): Promise<void> {
    request.setUserId(this.user.uid);
    this.trackingCollection.add({}).then((newTracking) => {
      request.setTrackingId(newTracking.id);
      this.requestCollection.doc().set(Object.assign({}, request));
    });
  }
}
