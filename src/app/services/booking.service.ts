import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Booking} from '../model/booking';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  user: firebase.User | null = null;
  private bookingCollection: AngularFirestoreCollection<Booking>;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth) {
    this.bookingCollection = afs.collection('booking');
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  async getBooking(bookingId: string): Promise<Booking> {
    const requestFirestore = await this.afs.collection('booking').doc<Booking>(bookingId).get().toPromise();
    return requestFirestore.data();
  }
}
