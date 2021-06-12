import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Tracking} from '../model/tracking';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  user: firebase.User | null = null;
  private trackingCollection: AngularFirestoreCollection<Tracking>;
  private db;

  constructor(protected afs: AngularFirestore, protected auth: AngularFireAuth) {
    this.db = firebase.firestore();
    this.trackingCollection = afs.collection('tracking');
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  async addTracking(tracking: Tracking): Promise<void> {
    await this.trackingCollection.add(Object.assign({}, tracking));
  }

  async updateTracking(trackingId: string, isDone: boolean): Promise<void> {
      await this.trackingCollection.doc(trackingId).update({done: isDone, date: new Date()});
  }

  async getTrackingIDByEntryIdAndStatus(entryId: string, status: string): Promise<string> {
    let id: string;
    const trackingRef = this.db.collection('tracking');
    await trackingRef.where('entryId', '==', entryId).get().then(e => {
      e.forEach(doc => {
        if (doc.data().status === status) {
          id = doc.id;
        }
      });
    });
    return id;
  }

  async getTrackingByEntryId(entryId: string): Promise<Tracking[]> {
    const trackingList: Tracking[] = [];
    const trackingRef = this.db.collection('tracking');
    await trackingRef.where('entryId', '==', entryId).get().then(e => {
      e.forEach(doc => {
        trackingList.push(new Tracking(doc.data().entryId, doc.data().status, doc.data().date, doc.data().done));
      });
    });
    return trackingList;
  }
}
