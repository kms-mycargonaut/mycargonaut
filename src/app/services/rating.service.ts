import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Rating} from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratingCollection: AngularFirestoreCollection<Rating>;
  private bookingCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.ratingCollection = afs.collection('rating');
    this.bookingCollection = afs.collection('booking');
  }

  async addRating(rating: Rating): Promise<void> {
    // const bookingId = await this.getBookingId();
    // rating.setBookingId(bookingId);
    this.ratingCollection.doc().set(Object.assign({}, rating));
  }

  /*async getBookingId(): Promise<string> {
    this.bookingCollection.doc()
  }*/
}
