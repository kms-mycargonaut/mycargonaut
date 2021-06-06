import { Injectable } from '@angular/core';
import {Request} from '../model/request';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../model/user';
import {Offer} from '../model/offer';
import {Vehicle} from '../model/vehicle';
import {AuthService} from './auth.service';
import {OpenRequests} from '../model/openRequests';

@Injectable({
  providedIn: 'root'
})
export class OpenRequestsService {
  private openRequestCollection: AngularFirestoreCollection;
  user: firebase.User | null = null;
  public confirmedList: Offer[] = [];

  constructor(private authService: AuthService, private afs: AngularFirestore) { }

  getOpenRequests(): OpenRequests[] {
    const userId: string = this.authService.getCurrentUser().uid;
    const values = this.afs.collection('open_requests', ref => ref.where('offeredUserId', '==', userId)).valueChanges();
    values.subscribe(v => {
      // tslint:disable-next-line:no-shadowed-variable
      v.forEach((element: OpenRequests) => {
        element.offeredUserId = null;
        this.confirmedList.push(element);
      });
    });
    return vehicles;
  }
}
