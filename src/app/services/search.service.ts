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
  constructor(public afs: AngularFirestore, private router: Router) {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().offers || doc.data().requests) {
            this.allUsers.push(doc.data());
          }
        });
      });
  }
  public getUsers() {
    return this.allUsers;
  }
  public search(start: string, end: string, date: NgbDate, type: string) {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((snap) => {
        this.allUsers = [];
        this.searchResults = [];
        snap.docs.forEach((doc) => {
          if (doc.data().offers || doc.data().requests) {
            this.allUsers.push(doc.data());
            localStorage.removeItem('allUsers');
            localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
          }
        });
      })
      .then(() => {
        for (let index = 0; index < this.allUsers.length; index++) {
          if (this.allUsers[index].offers) {
            this.allUsers[index].offers.forEach((offer) => {
              if (
                offer.start.toLowerCase() == start.toLowerCase() &&
                offer.end.toLowerCase() == end.toLowerCase() &&
                offer.date.day == date.day &&
                offer.date.month == date.month &&
                offer.date.year == date.year &&
                offer.type == type
              ) {
                offer.art = 'Angebot';
                offer.nutzer = this.allUsers[index].id;
                this.searchResults.push(offer);
              }
            });
          }
          if (this.allUsers[index].requests) {
            this.allUsers[index].requests.forEach((request) => {
              if (
                request.start.toLowerCase() == start.toLowerCase() &&
                request.end.toLowerCase() == end.toLowerCase() &&
                request.date.day == date.day &&
                request.date.month == date.month &&
                request.date.year == date.year &&
                request.type == type
              ) {
                request.art = 'Gesuch';
                request.nutzer = this.allUsers[index].id;
                this.searchResults.push(request);
              }
            });
          }
        }
      })
      .then(() => {
        localStorage.removeItem('searchResults');
        localStorage.removeItem('allUsers');
        localStorage.setItem(
          'searchResults',
          JSON.stringify(this.searchResults)
        );
        this.router.navigate(['/search-page']);
      });
  }
}
