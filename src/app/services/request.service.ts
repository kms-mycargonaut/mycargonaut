import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Request} from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private offerCollection: AngularFirestoreCollection<Request>;
  private offers: Observable<Request[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.offerCollection = afs.collection('requests');
  }

  async addRequest(request: Request): Promise<void> {
    const userId: string = this.authService.getCurrentUser().uid;
    request.setUserId(userId);
    await this.offerCollection.doc().set(Object.assign({}, request));
  }
}
