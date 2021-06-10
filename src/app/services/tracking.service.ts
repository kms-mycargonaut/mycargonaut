import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {Tracking} from '../model/tracking';
import {Offer} from '../model/offer';
import {Request} from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private trackingCollection: AngularFirestoreCollection<Tracking>;
  private tracking: AngularFirestoreDocument<Tracking>;
  private trackings: Observable<Tracking[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.trackingCollection = afs.collection('tracking');
  }

  public createTracking(): void {

  }

  public updateTracking(tracking: Tracking): void {
    this.trackingCollection.doc().set(tracking, {merge: true});
  }

  public getTrackingForRequest(request: Request): Tracking {
    const tracking: Tracking = new Tracking();
    this.trackingCollection.doc<Tracking>(request.getTrackingId()).get().toPromise().then(t => {
      tracking.setStatus(t.data().status);
    });
    return tracking;
  }

  public getTrackingForOffer(offer: Offer): Tracking {
    const tracking: Tracking = new Tracking();
    this.trackingCollection.doc<Tracking>(offer.getTrackingId()).get().toPromise().then(t => {
      tracking.setStatus(t.data().status);
    });
    return tracking;
  }
}
