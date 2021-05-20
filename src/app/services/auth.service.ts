import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {User} from '../model/user';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  user: User | null = null;
  public userList: User[];

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth,  private location: Location, private router: Router) {
  }

  async register(lastName, firstName, email, birthday, image, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        let registeredUser = {
          id: response.user?.uid,
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          birthday: birthday,
          image: image ? image : null,
        };
        console.log(registeredUser);
        firebase
          .firestore()
          .collection('users')
          .doc(response.user?.uid)
          .set(registeredUser);
        this.router.navigate(['/']);
      }).catch((err) => {
      console.log(err.message);
    });
  }

  async login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      }).catch((err) => {
        console.log(err.message);
      });
  }

  logout(): void {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      }).catch((err) => {
        console.log(err.message);
    })
  }
}

