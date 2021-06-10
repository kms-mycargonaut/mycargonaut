import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Offer} from '../model/offer';
import firebase from 'firebase';
import {EntryService} from './entry.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entry} from '../model/entry';
import {Request} from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends EntryService{

  private offerCollection: AngularFirestoreCollection<Offer>;
  private trackingCollection: AngularFirestoreCollection;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth) {
    super(afs, auth);
    this.offerCollection = afs.collection('offers');
    this.trackingCollection = afs.collection('tracking');
  }

  async addOffer(offer: Offer): Promise<void> {
    offer.setUserId(this.user.uid);
    console.log(offer);
    this.trackingCollection.add({}).then((newTracking) => {
      offer.setTrackingId(newTracking.id);
      this.offerCollection.doc().set(Object.assign({}, offer));
    });
  }

  async getOffer(offerId: string): Promise<Offer> {
    const requestFirestore = await this.afs.collection('offers').doc<Offer>(offerId).get().toPromise();
    return requestFirestore.data();
  }
}
