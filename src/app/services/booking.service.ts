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
import { OpenRequests } from '../model/open-requests';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private db;
  user: firebase.User | null = null;
  private bookingCollection: AngularFirestoreCollection<Booking>;
  public entry: Entry;
  constructor(
    protected afs: AngularFirestore,
    protected auth: AngularFireAuth,
    private router: Router,
  ) {
    this.db = firebase.firestore();
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
  async getSupplier(userId: string): Promise<User[]> {
    const requestFirestore = await this.afs
      .collection('users')
      .doc<User>(userId)
      .get()
      .toPromise();
    const arr: User[] = [];
    arr.push(requestFirestore.data());
    return arr;
  }
  async getRequest(requestId: string): Promise<OpenRequests[]> {
    const requestFirestore = await this.afs
      .collection('open_requests')
      .doc<OpenRequests>(requestId)
      .get()
      .toPromise();
    let arr: OpenRequests[] = [];
    arr.push(requestFirestore.data());
    return arr;
  }
  async getEntry(entryId: string): Promise<any> {
    const requestFirestore = await this.afs
      .collection('entries')
      .doc<Entry>(entryId)
      .get()
      .toPromise();
    this.entry = requestFirestore.data();
    return { data: requestFirestore.data(), id: requestFirestore.id };
  }
  async createBooking(
    booking: Booking,
    requestedAmount: number,
    requestId: string
  ) {
    const entriesDB = this.afs.collection('entries');
    let entry: any = await this.getEntry(booking.entry);
    let entryId = entry.id;
    entriesDB.doc(entryId).update({});
    if (entry.data.transportType == 'Ladefläche') {
      if (requestedAmount <= entry.data.cubicmeter) {
        console.log('Ladefläche buchen: ', requestedAmount);
        entriesDB
          .doc(entryId)
          .update({ cubicmeter: entry.data.cubicmeter - requestedAmount })
          .then(() => {
            firebase
              .firestore()
              .collection('booking')
              .add(Object.assign({}, booking))
              .then((res) => {
                let bookingId = res.id;
                firebase
                  .firestore()
                  .collection('open_requests')
                  .doc(requestId)
                  .delete()
                  .then(() => {
                    this.router.navigate(['/tracking/booking/' + bookingId]);
                  });
              });
          });
      } else {
        alert('Platz nicht mehr vorhanden');
      }
    } else {
      if (requestedAmount <= entry.data.seats) {
        console.log('Entry ', entry);
        entriesDB
          .doc(entryId)
          .update({ seats: entry.data.seats - requestedAmount })
          .then(() => {
            firebase
              .firestore()
              .collection('booking')
              .add(Object.assign({}, booking))
              .then((res) => {
                let bookingId = res.id;
                firebase
                  .firestore()
                  .collection('open_requests')
                  .doc(requestId)
                  .delete()
                  .then(() => {
                    this.router.navigate(['/tracking/booking/' + bookingId]);
                  });
              });
          });
      } else {
        alert('Platz nicht mehr vorhanden');
      }
    }
  }
  async getBookingByEntryId(entryId: string): Promise<Booking[]> {
    const bookingList: Booking[] = [];
    const bookingRef = this.db.collection('booking');
    await bookingRef
      .where('entry', '==', entryId)
      .get()
      .then((e) => {
        e.forEach((doc) => {
          bookingList.push(
            new Booking(
              doc.data().entry,
              doc.data().searcher,
              doc.data().supplier,
              doc.data().bookingDate
            )
          );
        });
      });
    return bookingList;
  }
}
