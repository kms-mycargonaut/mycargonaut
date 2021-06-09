import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private trackingCollection: AngularFirestoreCollection<TrackingStatus>;
  private trackings: Observable<TrackingStatus[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.trackingCollection = afs.collection('trackings');
  }

  public createTracking(): void {

  }

  public updateTracking(docId: string, trackingStatus: TrackingStatus): void {
    this.trackingCollection.doc(docId).set(trackingStatus, {merge: true});
  }
}
