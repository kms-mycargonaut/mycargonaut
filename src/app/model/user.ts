export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  image?: string;
  constructor(id: string, email: string, password: string, firstName: string, lastName: string, birthday?: string, image?: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.image = image;
  }

  getFullName(){
    this.firstName + '' + this.lastName
  }
}
