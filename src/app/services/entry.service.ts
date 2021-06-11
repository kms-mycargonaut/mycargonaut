import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entry} from '../model/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  user: firebase.User | null = null;
  private entryCollection: AngularFirestoreCollection<Entry>;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.entryCollection = afs.collection('entries');
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  async addEntry(entry: Entry): Promise<string> {
    let entryId: string;
    entry.setUserId(this.user.uid);
    await this.entryCollection.add(Object.assign({}, entry)).then(e => {
      entryId = e.id;
    });
    return entryId;
  }

  async getEntry(entryId: string): Promise<Entry> {
    const requestFirestore = await this.afs.collection('entries').doc<Entry>(entryId).get().toPromise();
    return requestFirestore.data();
  }
}
