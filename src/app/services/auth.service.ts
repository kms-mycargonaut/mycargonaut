import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../model/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import firebase from 'firebase';
import 'firebase/storage';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import {Entry} from '../model/entry';

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
  public offers: any;

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

  async uploadProfilePicture(): Promise<string> {
    const storageRef = firebase
      .storage()
      .ref()
      .child(`profile_images/${this.file.name}`);
    return new Promise((resolve, reject) => {
      storageRef.put(this.file).then((snapshot) => {
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
    if (this.file) {
      this.uploadProfilePicture().then((result) => {
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

  public getcurrentUser(): Promise<User> {
    let currentUser: User;
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user){
          firebase.firestore().collection('users').doc(user.uid).get().then(snap => {
            const user = snap.data();
            if (user) {
              currentUser = new User(user.id, user.email, user.password, user.firstname, user.lastname, user.birthday, user.image);
            }
            resolve(currentUser);
            console.log(currentUser);
          }).catch((err) => {
            reject(err);
          });
        }
      });
    });
  }

 public async getOffersFromCurrentUser() {
    return await firebase.firestore().collection('entries').get().then((snap) => {
      const offerArray = [];
      let angebot: Entry;
      for (const doc of snap.docs) {
        if (doc.data().entryType === 'Angebot') {
          const offer = doc.data();
          offer.id = doc.id;
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              angebot = new Entry(offer.entryType, offer.start, offer.destination, offer.startDate, offer.startTime, offer.description, offer.price, offer.transportType, offer.length, offer.width, offer.height, offer.seats, offer.trackingStatus);
              firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
                offer.id = `${doc.data().id}`;
                offerArray.push(offer);
                this.offers = offerArray;
              });
            }
          });
        }
      }
      return this.offers;
    });
 }
}

