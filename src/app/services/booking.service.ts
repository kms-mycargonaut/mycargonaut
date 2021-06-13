import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Booking} from '../model/booking';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private db;
  user: firebase.User | null = null;
  private bookingCollection: AngularFirestoreCollection<Booking>;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth) {
    this.db = firebase.firestore();
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

  async getBookingByEntryId(entryId: string): Promise<Booking[]> {
    const bookingList: Booking[] = [];
    const bookingRef = this.db.collection('booking');
    await bookingRef.where('entry', '==', entryId).get().then(e => {
      e.forEach(doc => {
        bookingList.push(new Booking(doc.data().entry, doc.data().searcher, doc.data().supplier, doc.data().bookingDate));
      });
    });
    return bookingList;
  }
}
