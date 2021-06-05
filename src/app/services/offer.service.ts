import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Offer} from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offerCollection: AngularFirestoreCollection<Offer>;
  private offers: Observable<Offer[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.offerCollection = afs.collection('offers');
  }

  async addOffer(offer: Offer): Promise<void> {
    const userId: string = this.authService.getCurrentUser().uid;
    offer.setUserId(userId);
    await this.offerCollection.doc().set(Object.assign({}, offer));
  }
}
