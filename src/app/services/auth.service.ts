import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {User} from '../model/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  users: Observable<User[]>;
  user: User | null = null;
  firebaseUser: firebase.User | null = null;
  public userList: User[];
  public isLoggedIn = false;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth,  private location: Location, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authState = user;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  async register(lastName, firstName, email, birthday, image, password): Promise<void> {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const registeredUser = {
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

  async login(email, password): Promise<void>{
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
        this.router.navigate(['/']);
      }).catch((err) => {
        console.log(err.message);
    });
  }

  getCurrentUser(): firebase.User {
    return this.authState;
  }
}

