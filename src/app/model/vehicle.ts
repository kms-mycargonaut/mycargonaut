import firebase from 'firebase';
import User = firebase.User;

export class Vehicle {

  private user: User;
  private transportType: string;
  private brand: string;
  private yearOfManufacture: string;
  private numberOfSeats: number;
  private length: number;
  private height: number;
  private width: number;

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getTransportType(): string {
    return this.transportType;
  }

  public setTransportType(value: string): void {
    this.transportType = value;
  }

  public getBrand(): string {
    return this.brand;
  }

  public setBrand(value: string): void {
    this.brand = value;
  }

  public getYearOfManufacture(): string {
    return this.yearOfManufacture;
  }

  public setYearOfManufacture(value: string): void {
    this.yearOfManufacture = value;
  }

  public getNumberOfSeats(): number {
    return this.numberOfSeats;
  }

  public setNumberOfSeats(value: number): void {
    this.numberOfSeats = value;
  }

  public getLength(): number {
    return this.length;
  }

  public setLength(value: number): void {
    this.length = value;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(value: number): void {
    this.height = value;
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(value: number): void {
    this.width = value;
  }
}