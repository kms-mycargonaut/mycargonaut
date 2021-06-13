import { Entry } from './../model/entry';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Booking } from '../model/booking';
import firebase from 'firebase';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  user: firebase.User | null = null;
  private bookingCollection: AngularFirestoreCollection<Booking>;
  public entry: Entry;

  constructor(
    protected afs: AngularFirestore,
    protected auth: AngularFireAuth
  ) {
    this.bookingCollection = afs.collection('booking');
    this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  async getBooking(bookingId: string): Promise<Booking> {
    const requestFirestore = await this.afs
      .collection('booking')
      .doc<Booking>(bookingId)
      .get()
      .toPromise();
    return requestFirestore.data();
  }
  async getSupplier(userId: string) {
    const requestFirestore = await this.afs
      .collection('entries')
      .doc<User>(userId)
      .get()
      .toPromise();
    return requestFirestore.data();
  }
  async getRequest(requestId: string) {
    const requestFirestore = await this.afs
      .collection('open_requests')
      .doc(requestId)
      .get()
      .toPromise();

    return requestFirestore.data();
  }
  async getEntry(entryId: string) {
    const requestFirestore = await this.afs
      .collection('entries')
      .doc<Entry>(entryId)
      .get()
      .toPromise();
    this.entry = requestFirestore.data();
    return requestFirestore.data();
  }
  async createBooking() {
    if (this.entry.entryType === 'Angebot') {
      this.bookingCollection.add(
        new Booking(
          this.entry.entryId,
          this.user.uid,
          this.entry.userId,
          new Date(Date.now())
        )
      );
    } else {
      this.bookingCollection.add(
        new Booking(
          this.entry.entryId,
          this.entry.userId,
          this.user.uid,
          new Date(Date.now())
        )
      );
    }
  }
}
