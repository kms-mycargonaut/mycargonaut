import {Offer} from './offer';
import {Request} from './request';

export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  image?: string;
  offers?: Offer[];
  requests?: Request[];

  constructor(id: string, email: string, password: string, firstName: string, lastName: string, birthday?: string, image?: string, offers?: Offer[], requests?: Request[]) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.image = image;
    this.offers = offers;
    this.requests = requests;
  }

  getFullName(): string{
    return this.firstName + '' + this.lastName;
  }
}
