import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import {User} from '../model/user';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import 'firebase/storage';
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
  public file?: File;
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

  async uploadProfilePicture(file: File): Promise<string> {
    const storageRef = firebase
      .storage()
      .ref()
      .child(`profile_images/${file.name}`);
    return new Promise((resolve, reject) => {
      storageRef.put(file).then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  // tslint:disable-next-line:max-line-length
  async register(lastName: string, firstName: string, email: string, birthday: string, image: any, password: string): Promise<any> {
    if (image) {
      this.uploadProfilePicture(image).then((result) => {
        image = result;
        this.createUser(lastName, firstName, email, birthday, image, password).catch((err) => {
          console.error(err);
        });
      });
    } else {
      this.createUser(lastName, firstName, email, birthday, image, password).catch((err) => {
        console.error(err);
      });
    }
  }

  async createUser(lastName: string, firstName: string, email: string, birthday: string, image: string, password: string): Promise<void> {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (image !== undefined) {
          response.user?.updateProfile({
            photoURL: image,
          });
        }
        const registeredUser = {
          id: response.user?.uid,
          email,
          password,
          firstname: firstName,
          lastname: lastName,
          birthday,
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

