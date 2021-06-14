import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {OpenRequests} from '../model/open-requests';
import {AngularFireAuth} from '@angular/fire/auth';
import {EntryService} from './entry.service';
import {User} from '../model/user';
import {Booking} from '../model/booking';

@Injectable({
  providedIn: 'root',
})
export class OpenRequestsService {
  private openRequestCollection: AngularFirestoreCollection<OpenRequests>;
  public entryId: string;
  private db;
  public user: User;

  // tslint:disable-next-line:max-line-length
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    public entryService: EntryService,
    private router: Router
  ) {
    this.openRequestCollection = afs.collection<OpenRequests>('open_requests');
    this.db = firebase.firestore();
    this.authService.getcurrentUser().then((user) => {
      this.user = user;
    });
  }

  async getOpenRequests(): Promise<OpenRequests[]> {
    const openRequestList: any = [];
    const openRequestRef = this.db.collection('open_requests');
    await openRequestRef
      .where('requestedUserId', '==', this.user.id)
      .get()
      .then((request) => {
        request.forEach((doc) => {
          openRequestList.push({
            entryId: doc.data().entryId,
            userId: doc.data().userId,
            requestedUserId: doc.data().requestedUserId,
            confirmed: doc.data().confirmed,
            pending: doc.data().pending,
            rejected: doc.data().rejected,
            seatsNeeded: doc.data().seatsNeeded,
            cubicMetersNeeded: doc.data().cubicMetersNeeded,
            requestId: doc.id,
          });
        });
      });
    return openRequestList;
  }

  async getMyOpenRequests(): Promise<OpenRequests[]> {
    const myOpenRequestList: any = [];
    const openRequestRef = this.db.collection('open_requests');
    await openRequestRef
      .where('userId', '==', this.user.id)
      .get()
      .then((request) => {
        request.forEach((doc) => {
          myOpenRequestList.push({
            entryId: doc.data().entryId,
            userId: doc.data().userId,
            requestedUserId: doc.data().requestedUserId,
            confirmed: doc.data().confirmed,
            pending: doc.data().pending,
            rejected: doc.data().rejected,
            seatsNeeded: doc.data().seatsNeeded,
            cubicMetersNeeded: doc.data().cubicMetersNeeded,
            requestId: doc.id,
          });
        });
      });
    return myOpenRequestList;
  }

  async addOpenRequest(openRequest: OpenRequests): Promise<void> {
    await this.openRequestCollection.add(Object.assign({}, openRequest));
    console.log(openRequest);
    this.router.navigate(['/open-requests']);
  }

  // async updateOpenRequest(openRequestId: string): Promise<void> {
  //   this.openRequestCollection.doc(openRequestId).update({confirmed: false});
  //       entriesDB
  //         .doc(entryId)
  //         .update({cubicmeter: entry.data.cubicmeter - requestedAmount})
  //         .then(() => {
  //           firebase
  //             .firestore()
  //             .collection('booking')
  //             .add(Object.assign({}, booking))
  //             .then((res) => {
  //               let bookingId = res.id;
  //               firebase
  //                 .firestore()
  //                 .collection('open_requests')
  //                 .doc(requestId)
  //                 .delete();
  //             });
  //         });
  //     }
      // deleteVehicle(openRequestId: string): Promise<void> {
      //   console.log(openRequestId);
      //   if (this.user.id === this.user.id) {
      //     return this.afs.collection('vehicles').doc(vehicleId).delete();
      //   }
      //   return null;
      // }
}
