import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import {User} from '../model/user';
import {AlertService} from '../alert.service';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public allUsers = [];
  public searchResults: any;
  public foundresult = false;
  constructor(public afs: AngularFirestore, private router: Router, public alertService: AlertService) {}
  public getUsers(): User[] {
    return this.allUsers;
  }
  public setQuery(start: string, end: string, date: NgbDate, type: string): void {
    const query = {
      start,
      end,
      date,
      type,
    };
    localStorage.removeItem('searchQuery');
    localStorage.setItem('searchQuery', JSON.stringify(query));
    this.search(query).then((res) => {
      if (this.foundresult) {
        this.router.navigate(['/search-page']);
      } else {
        const alert = {
          type: 'danger',
          message: 'Es gibt keine Ergebnisse zu deiner Suche!'
        };
        this.alertService.ALERTS.push(alert);
        setTimeout(() => this.alertService.close(alert), 5000);
      }
    });
  }
  public async search(query: any): Promise<void> {
    this.foundresult = false;
    return await firebase
      .firestore()
      .collection('entries')
      .get()
      .then((snap) => {
        const helperArray = [];
        for (const doc of snap.docs) {
          if (
            doc.data().start === query.start &&
            doc.data().destination === query.end &&
            doc.data().startDate.day === query.date.day &&
            doc.data().startDate.month === query.date.month &&
            doc.data().startDate.year === query.date.year &&
            doc.data().transportType === query.type
          ) {
            this.foundresult = true;
            const pushObject = doc.data();
            pushObject.id = doc.id;
            firebase
              .firestore()
              .collection('users')
              .doc(pushObject.userId)
              .get()
              .then((doc) => {
                pushObject.name = `${doc.data().firstname} ${
                  doc.data().lastname
                }`;
                pushObject.profileimage = doc.data().image;
                helperArray.push(pushObject);
                this.searchResults = helperArray;
                localStorage.removeItem('searchResults');
                localStorage.setItem(
                  'searchResults',
                  JSON.stringify(this.searchResults)
                );
              });
          }
        }
        return this.searchResults;
      });
  }
  public async getUser(id: any) {
    return firebase
      .firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((doc) => {
        return doc.data();
      });
  }

  public async getEntry(id: any) {
    return firebase
      .firestore()
      .collection('entries')
      .doc(id)
      .get()
      .then((doc) => {
        return doc.data();
      });
  }
}
