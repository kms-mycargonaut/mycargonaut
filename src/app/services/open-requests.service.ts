import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Offer} from '../model/offer';
import {AuthService} from './auth.service';
import {OpenRequests} from '../model/openRequests';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenRequestsService {
  private openRequestCollection: AngularFirestoreCollection<OpenRequests>;
  private openRequests: Observable<OpenRequests[]>;
  private offerCollection: AngularFirestoreCollection<Offer>;
  private requestCollection: AngularFirestoreCollection<Request>;
  private userCollection: AngularFirestoreCollection<User>;
  user: firebase.User | null = null;
  private db;
  constructor(private authService: AuthService, private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.openRequestCollection = afs.collection<OpenRequests>('open_requests');
    this.offerCollection = afs.collection<Offer>('offer');
    this.requestCollection = afs.collection<Request>('request');
    this.userCollection = afs.collection<User>('users');
    this.db = firebase.firestore();
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
  getOpenRequests(): Promise<OpenRequests[]> {
    let openRequestList: OpenRequests[] = [];
    const requestList: any[] = [];
    return new Promise(((resolve, reject) => {
      this.db
        .collection('open_requests')
        .get()
        .then(snapshot => {
          openRequestList = snapshot.docs.map(doc => doc.data());
          for (const request of openRequestList) {
            requestList.push(
                new OpenRequests(
                  request.offerId,
                  request.offeredUserId,
                  request.requestedUserId,
                  request.confirmed,
                  request.pending,
                  request.rejected)
              );
          }
          console.log(requestList);
          resolve(requestList);
        }).catch((err) => {
          reject(err);
      });
    }));
  }
}
