import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {OpenRequests} from '../model/open-requests';
import {AngularFireAuth} from '@angular/fire/auth';
import {EntryService} from './entry.service';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class OpenRequestsService {
  private openRequestCollection: AngularFirestoreCollection<OpenRequests>;
  public entryId: string;
  private db;
  public user: User;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private afs: AngularFirestore, private auth: AngularFireAuth, public entryService: EntryService) {
    this.openRequestCollection = afs.collection<OpenRequests>('open_requests');
    this.db = firebase.firestore();
    this.authService.getcurrentUser().then((user) => {
      this.user = user;
    });
  }

  async getOpenRequests(): Promise<OpenRequests[]> {
    const openRequestList: OpenRequests[] = [];
    const openRequestRef = this.db.collection('open_requests');
    await openRequestRef.where('requestedUserId', '==', this.user.id).get().then(request => {
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
}
