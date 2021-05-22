import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {User} from '../model/user';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Offer} from '../model/offer';
import {Request} from '../model/request';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private userCollection: AngularFirestoreCollection<User>;
  // users: Observable<User[]>;
  user: firebase.User | null = null;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      if (user) {
        console.log(user.uid);
        this.user = user;
        this.userCollection = afs.collection<User>(`users/`);
        // this.users = this.userCollection.valueChanges({idField: 'id'});
        // console.log(this.users);
      }
    });
  }

  async addOffer(newOffer: Offer): Promise<void> {
    console.log(this.user.uid);
    console.log(newOffer);
    try {
    await this.userCollection.doc(this.user.uid).update({
      offers: [ newOffer ]
    });
    }
    catch (e) {
      console.log(e);
    }
  }

  async addRequest(newRequest: Request): Promise<void> {
    console.log(this.user.uid);
    console.log(newRequest);
    try {
      await this.userCollection.doc(this.user.uid).update({
        requests: [ newRequest ]
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
