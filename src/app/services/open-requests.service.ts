import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {OpenRequests} from '../model/open-requests';
import {AngularFireAuth} from '@angular/fire/auth';
import {EntryService} from './entry.service';

@Injectable({
  providedIn: 'root'
})
export class OpenRequestsService {
  private openRequestCollection: AngularFirestoreCollection<OpenRequests>;
  user: firebase.User | null = null;
  public entryId: string;
  private db;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private afs: AngularFirestore, private auth: AngularFireAuth, public entryService: EntryService) {
    this.openRequestCollection = afs.collection<OpenRequests>('open_requests');
    this.db = firebase.firestore();
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  async getOpenRequests(): Promise<OpenRequests[]> {
    const openRequestList: OpenRequests[] = [];
    const openRequestRef = this.db.collection('open_requests');
    await openRequestRef.where('requestedUserId', '==', this.user.uid).get().then(request => {
      request.forEach(doc => {
        openRequestList.push(new OpenRequests(
          doc.data().openRequestId,
          doc.data().entryId,
          doc.data().userId,
          doc.data().requestedUserId,
          doc.data().confirmed,
          doc.data().pending,
          doc.data().rejected
        ));
      });
    });
    return openRequestList;
  }

  // async getEntryIdFromOpenRequests(entryId: string): Promise<string> {
  //   const entryRef = this.db.collection('entry');
  //   await entryRef.where('entryId', '==', entryId).get().then(e => {
  //     e.forEach(doc => {
  //       if (doc.data().status === status) {
  //         this.entryId = doc.id;
  //       }
  //     });
  //   });
  //   console.log(this.entryId);
  //   return this.entryId;
  // }

  // getOpenRequests(): Promise<OpenRequests[]> {
  //   const requestList: any[] = [];
  //   return new Promise(((resolve, reject) => {
  //     this.db
  //       .collection('open_requests')
  //       .get()
  //       .then(snapshot => {
  //         this.openRequestList = snapshot.docs.map(doc => doc.data());
  //         for (const request of this.openRequestList) {
  //           requestList.push(
  //               new OpenRequests(
  //                 request.openRequestId,
  //                 request.entryId,
  //                 request.userId,
  //                 request.requestedUserId,
  //                 request.confirmed,
  //                 request.pending,
  //                 request.rejected)
  //             );
  //           this.entryService.getEntry(request.entryId).then(offer => console.log(offer));
  //         }
  //         console.log(requestList);
  //         resolve(requestList);
  //       }).catch((err) => {
  //         reject(err);
  //     });
  //   }));
  // }
}
