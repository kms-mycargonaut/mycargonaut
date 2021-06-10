import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Rating} from '../model/rating';
import {Projects} from '@angular/cli/lib/config/schema';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratingCollection: AngularFirestoreCollection<Rating>;
  private bookingCollection: AngularFirestoreCollection;
  private rating;

  constructor(private afs: AngularFirestore) {
    this.ratingCollection = afs.collection('rating');
    this.bookingCollection = afs.collection('booking');
  }

  async addRating(rating: Rating, bookingId: string): Promise<void> {
    rating.setBookingId(bookingId);
    this.ratingCollection.doc().set(Object.assign({}, rating));
  }

  getRatings(): Observable<Rating[]> {
    return this.ratingCollection.valueChanges({idField: 'id'});
  }

}
