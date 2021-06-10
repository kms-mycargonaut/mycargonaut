import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entry} from '../model/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  // private userCollection: AngularFirestoreCollection;
  user: firebase.User | null = null;
  private entryCollection: AngularFirestoreCollection<Entry>;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth) {
    this.entryCollection = afs.collection('entries');
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        // this.userCollection = afs.collection(`users/`);
      }
    });
  }


  async addEntry(entry: Entry): Promise<void> {
    entry.setUserId(this.user.uid);
    this.entryCollection.doc().set(Object.assign({}, entry));
  }

  async getEntry(entryId: string): Promise<Entry> {
    const requestFirestore = await this.afs.collection('entries').doc<Entry>(entryId).get().toPromise();
    return requestFirestore.data();
  }
}
