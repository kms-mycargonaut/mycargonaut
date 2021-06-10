import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentSnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Request} from '../model/request';
import {EntryService} from './entry.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Tracking} from '../model/tracking';
import {TrackingService} from './tracking.service';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends EntryService{

  private requestCollection: AngularFirestoreCollection<Request>;
  private trackingCollection: AngularFirestoreCollection;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth, public trackingService: TrackingService) {
    super(afs, auth);
    this.requestCollection = afs.collection('requests');
  }

  async addRequest(request: Request): Promise<void> {
    request.setUserId(this.user.uid);
    this.trackingCollection.add({}).then((newTracking) => {
      request.setTrackingId(newTracking.id);
      this.requestCollection.doc().set(Object.assign({}, request));
    });
  }

  async getRequest(requestId: string): Promise<Request> {
    const request = await this.afs.collection('requests').doc<Request>(requestId).get().toPromise();
    console.log(request.data());
    return request.data();
    /*.then(r => {
      if (r != null) {
        const request: Request = new Request(r.data().start, null, null, null, null, null, r.data().trackingId);
        return request;
      } else {
        return null;
      }
    });*/
  }
}
