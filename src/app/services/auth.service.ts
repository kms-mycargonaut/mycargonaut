import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../model/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import firebase from 'firebase';
import 'firebase/storage';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Entry} from '../model/entry';
import {Vehicle} from '../model/vehicle';
import {Booking} from '../model/booking';
import {Rating} from '../model/rating';
import {BookingService} from './booking.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private db;
  authState: any = null;
  users: Observable<User[]>;
  user: User | null = null;
  firebaseUser: firebase.User | null = null;
  public userList: User[];
  public file?: File;
  public isLoggedIn = false;
  public offers: any;
  public offersFromSelectedUser: any;
  public bookingsFromSelectedUser: any;
  public ratingsFromSelectedUser: any;
  public vehicles: any;
  public currentUser: firebase.User | null = null;
  public selectedUser;
  public entryId: any;
  public bookingId: any;
  public offersArray: any;
  public bookingsArray: any;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private location: Location, private router: Router, public bookingService: BookingService) {
    this.db = firebase.firestore();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authState = user;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.auth.user.subscribe(user => {
      if (user) {
        this.currentUser = user;
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

  async login(email, password): Promise<void> {
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

  public getcurrentUser(): Promise<User> {
    let currentUser: User;
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection('users').doc(user.uid).get().then(snap => {
            const user = snap.data();
            if (user) {
              currentUser = new User(
                user.id,
                user.email,
                user.password,
                user.firstname,
                user.lastname,
                user.birthday,
                user.image);
            }
            resolve(currentUser);
          }).catch((err) => {
            reject(err);
          });
        }
      });
    });
  }

  public async getOffersFromCurrentUser(userId: string) {
    const offerArray = [];
    const offersList = firebase.firestore().collection('entries');
    await offersList.where('userId', '==', userId).get().then(offer => {
      offer.forEach(doc => {
        if (doc.data().entryType === 'Angebot') {
          const entry: Entry = new Entry(
            doc.data().entryType,
            doc.data().start,
            doc.data().destination,
            doc.data().startDate,
            doc.data().startTime,
            doc.data().description,
            doc.data().price,
            doc.data().transportType,
            doc.data().length,
            doc.data().width,
            doc.data().height,
            doc.data().seats,
            doc.data().trackingStatus
          );
          entry.setEntryId(doc.id);
          offerArray.push(entry);
        }
      });
    });
    this.offers = offerArray;
    return this.offers;
  }

  public async getBookingsFromCurrentUser(userId: string) {
    const bookingsList = firebase.firestore().collection('booking');
    bookingsList.where('searcher', '==', userId).get().then(booking => {
      booking.forEach(doc => {
        const bookingId = doc.id;
        const entry = doc.data().entry;
        const requestsArray = [];
        const requestsList = firebase.firestore().collection('entries');
        requestsList.doc(entry).get().then(request => {
          const request2: Entry = new Entry(
            request.data().entryType,
            request.data().start,
            request.data().destination,
            request.data().startDate,
            request.data().startTime,
            request.data().description,
            request.data().price,
            request.data().transportType,
            request.data().length,
            request.data().width,
            request.data().height,
            request.data().seats,
            request.data().trackingStatus
          );
          request2.setEntryId(bookingId);
          requestsArray.push(request2);
        });
        this.bookingsFromSelectedUser = requestsArray;
        return this.bookingsFromSelectedUser;
      });
    });
  }

  public async getVehiclesFromCurrentUser(userId: string) {
    const vehicleList: Vehicle[] = [];
    const vehicleRef = this.db.collection('vehicles');
    await vehicleRef.where('userId', '==', userId).get().then(v => {
      v.forEach(doc => {
        const vehicle: Vehicle = new Vehicle();
        vehicle.setVehicleId(doc.id);
        vehicle.setUserId(doc.data().userId);
        vehicle.setTransportType(doc.data().transportType);
        vehicle.setBrand(doc.data().brand);
        vehicle.setYearOfManufacture(doc.data().yearOfManufacture);
        vehicle.setNumberOfSeats(doc.data().numberOfSeats);
        vehicle.setLength(doc.data().length);
        vehicle.setHeight(doc.data().height);
        vehicle.setWidth(doc.data().width);
        vehicleList.push(vehicle);
      });
    });
    this.vehicles = vehicleList;
    return this.vehicles;
  }

  public async getUserByUserId(userId: string): Promise<User> {
    let user: User;
    const userRef = firebase.firestore().collection('users');
    await userRef.where('id', '==', userId).get().then(e => {
      e.forEach(doc => {
        user = new User(
          doc.data().id,
          doc.data().email,
          doc.data().password,
          doc.data().firstname,
          doc.data().lastname,
          doc.data().birthday,
          doc.data().image
        );
      });
      this.selectedUser = user;
    });
    return this.selectedUser;
  }

  public async getOffersFromSelectedUser(userId: string) {
    const offerArray = [];
    const offersList = firebase.firestore().collection('entries');
    await offersList.where('userId', '==', userId).get().then(offer => {
      offer.forEach(doc => {
        if (doc.data().entryType === 'Angebot') {
          offerArray.push(new Entry(
            doc.data().entryType,
            doc.data().start,
            doc.data().destination,
            doc.data().startDate,
            doc.data().startTime,
            doc.data().description,
            doc.data().price,
            doc.data().transportType,
            doc.data().length,
            doc.data().width,
            doc.data().height,
            doc.data().seats,
            doc.data().trackingStatus
          ));
        }
      });
    });
    this.offersFromSelectedUser = offerArray;
    return this.offersFromSelectedUser;
  }

  public async getRatingsFromSelectedUser(userId: string): Promise<Rating[]> {
    return new Promise((resolve, reject) => {
      const bookingsList = firebase.firestore().collection('booking');
      bookingsList.where('supplier', '==', userId).get().then(booking => {
        booking.forEach(doc => {
          const bookingId = doc.id;
          const ratingsArray = [];
          const ratingsList = firebase.firestore().collection('rating');
          ratingsList.where('bookingId', '==', bookingId).get().then(ratings => {
            ratings.forEach(doc => {
              ratingsArray.push(new Rating(
                doc.data().rating,
                doc.data().title,
                doc.data().description
              ));
            });
            this.ratingsFromSelectedUser = ratingsArray;
            console.log(this.ratingsFromSelectedUser);
            resolve(this.ratingsFromSelectedUser);
          }).catch((err) => {
            reject(err);
          });
        });
      });
    });
  }
}











