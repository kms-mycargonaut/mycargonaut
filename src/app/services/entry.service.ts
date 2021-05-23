import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Offer} from '../model/offer';
import {Request} from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private userCollection: AngularFirestoreCollection;
  user: firebase.User | null = null;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.userCollection = afs.collection(`users/`);
      }
    });
  }

  async addOffer(newOffer: Offer): Promise<void> {
    const writeOffer = {
      id: newOffer.id,
      start: newOffer.start,
      end: newOffer.end,
      date: newOffer.date,
      time: newOffer.time,
      vehicle: newOffer.vehicle,
      type: newOffer.type,
      length: newOffer.length,
      width: newOffer.width,
      height: newOffer.height,
      cubicmeter: newOffer.cubicmeter,
      seats: newOffer.seats,
      description: newOffer.description,
      price: newOffer.price
    };
    try {
    await this.userCollection.doc(this.user.uid).update({
      offers: firebase.firestore.FieldValue.arrayUnion(writeOffer)
    });
    }
    catch (e) {
      console.log(e);
    }
  }

  async addRequest(newRequest: Request): Promise<void> {
    const writeRequest = {
      id: newRequest.id,
      start: newRequest.start,
      end: newRequest.end,
      date: newRequest.date,
      time: newRequest.time,
      type: newRequest.type,
      length: newRequest.length,
      width: newRequest.width,
      height: newRequest.height,
      cubicmeter: newRequest.cubicmeter,
      seats: newRequest.seats,
      description: newRequest.description
    };
    try {
      await this.userCollection.doc(this.user.uid).update({
        requests: firebase.firestore.FieldValue.arrayUnion(writeRequest)
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
