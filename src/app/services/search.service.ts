import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public allUsers = [];
  public searchResults = [];
  constructor(public afs: AngularFirestore, private router: Router) {}
  public getUsers() {
    return this.allUsers;
  }
  public setQuery(start: string, end: string, date: NgbDate, type: string) {
    let query = {
      start,
      end,
      date,
      type,
    };
    localStorage.removeItem('searchQuery');
    localStorage.setItem('searchQuery', JSON.stringify(query));
    this.search(query);
  }
  public search(query: any) {
    firebase
      .firestore()
      .collection('offers')
      .get()
      .then((snap) => {
        this.searchResults = [];
        snap.docs.forEach((doc) => {
          if (
            doc.data().start == query.start &&
            doc.data().destination == query.end &&
            doc.data().startDate.day == query.date.day &&
            doc.data().startDate.month == query.date.month &&
            doc.data().startDate.year == query.date.year &&
            doc.data().type == query.type
          ) {
            let pushObject = doc.data();
            pushObject.art = 'Angebot';
            pushObject.id = doc.id;
            this.searchResults.push(pushObject);
          }
        });
      })
      .then(() => {
        firebase
          .firestore()
          .collection('requests')
          .get()
          .then((snap) => {
            snap.docs.forEach((doc) => {
              if (
                doc.data().start == query.start &&
                doc.data().destination == query.end &&
                doc.data().startDate.day == query.date.day &&
                doc.data().startDate.month == query.date.month &&
                doc.data().startDate.year == query.date.year &&
                doc.data().type == query.type
              ) {
                let pushObject = doc.data();
                pushObject.art = 'Gesuch';
                pushObject.userName = firebase.firestore().collection('users').doc(pushObject.userId).get().then((doc)=>{return})
                pushObject.id = doc.id;
                this.searchResults.push(pushObject);
              }
            });
          });
      })
      .then(() => {
        localStorage.removeItem('searchResults');
        localStorage.setItem(
          'searchResults',
          JSON.stringify(this.searchResults)
        );
      })
      .then(() => {
        this.router.navigate(['/search-page']);
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
  public async getEntry(id: any, type: string) {
    if (type == 'Angebot') {
      return firebase
        .firestore()
        .collection('offers')
        .doc(id)
        .get()
        .then((doc) => {
          return doc.data();
        });
    } else if (type == 'Gesuch') {
      return firebase
        .firestore()
        .collection('offers')
        .doc(id)
        .get()
        .then((doc) => {
          return doc.data();
        });
    } else {
      return;
    }
  }
}
