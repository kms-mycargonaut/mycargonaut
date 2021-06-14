import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Rating} from '../model/rating';
import {Projects} from '@angular/cli/lib/config/schema';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {Booking} from '../model/booking';
import {BookingService} from './booking.service';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratingCollection: AngularFirestoreCollection<Rating>;
  private bookingCollection: AngularFirestoreCollection;
  private rating;
  private db;

  constructor(private afs: AngularFirestore, private bookingService: BookingService) {
    this.db = firebase.firestore();
    this.ratingCollection = afs.collection('rating');
    this.bookingCollection = afs.collection('booking');
  }

  async addRating(rating: Rating, bookingId: string): Promise<void> {
    rating.setBookingId(bookingId);
    await this.ratingCollection.doc().set(Object.assign({}, rating));
  }

  getRatings(): Observable<Rating[]> {
    return this.ratingCollection.valueChanges({idField: 'id'});
  }

  async getRatingByUser(userId: string): Promise<Rating[]> {
    const bookingIds: string[] = [];
    const ratings: Rating[] = [];
    this.bookingService.getBookingBySupplier(userId).then(async bookings => {
      bookings.forEach(b => {
        bookingIds.push(b.bookingId);
      });
    }).then(() => {
      const ratingRef = this.db.collection('rating');
      ratingRef.where('bookingId', 'in', bookingIds).get().then(rat => {
        rat.forEach(r => {
          const rating = new Rating(r.data().rating, r.data().title, r.data().description, r.data().bookingId);
          ratings.push(rating);
        });
      });
    });
    return ratings;
  }

  async getAverageRatingByUser(userId: string): Promise<number> {
    let numberOfRatings = 0;
    let ratingSum = 0;
    let averageRating = 0;
    const bookingIds: string[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.bookingService.getBookingBySupplier(userId).then(async bookings => {
        bookings.forEach(b => {
          bookingIds.push(b.bookingId);
        });
      }).then(() => {
        const ratingRef = this.db.collection('rating');
        ratingRef.where('bookingId', 'in', bookingIds).get().then(rat => {
          rat.forEach(r => {
            numberOfRatings++;
            ratingSum = ratingSum + Number(r.data().rating);
          });
          averageRating = ratingSum / numberOfRatings;
          resolve(averageRating);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  }
}
