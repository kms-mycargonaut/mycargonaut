import {Offerold} from './offerold';
import {Requestold} from './requestold';

export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  image?: string;
  offers?: Offerold[];
  requests?: Requestold[];

  constructor(id: string, email: string, password: string, firstName: string, lastName: string, birthday?: string,
              image?: string, offers?: Offerold[], requests?: Requestold[]) {
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
