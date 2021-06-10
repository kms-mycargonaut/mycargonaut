import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export abstract class Entry {

  entryId: string;
  userId: string;
  start: string;
  destination: string;
  startDate: NgbDate;
  startTime: NgbTime;
  description: string;
  price: number;
  type: string;
  length: number;
  width: number;
  height: number;
  cubicmeter: number;
  seats: number;
  trackingId: string;

  // tslint:disable-next-line:max-line-length


  constructor(entryId: string, userId: string, start: string, destination: string,
              startDate: NgbDate, startTime: NgbTime, description: string, price: number, type: string, length: number,
              width: number, height: number, seats: number, trackingId: string) {
    this.entryId = entryId;
    this.userId = userId;
    this.start = start;
    this.destination = destination;
    this.startDate = startDate;
    this.startTime = startTime;
    this.description = description;
    this.price = price;
    this.type = type;
    this.length = length;
    this.width = width;
    this.height = height;
    this.cubicmeter = this.getCubicMeter();
    this.seats = seats;
    this.trackingId = trackingId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getStart(): string {
    return this.start;
  }

  public setStart(start: string): void {
    this.start = start;
  }

  public getDestination(): string {
    return this.destination;
  }

  public setDestination(destination: string): void {
    this.destination = destination;
  }

  public getStartDate(): NgbDate {
    return this.startDate;
  }

  public setStartDate(startDate: NgbDate): void {
    this.startDate = startDate;
  }

  public getStartTime(): NgbTime {
    return this.startTime;
  }

  public setStartTime(startTime: NgbTime): void {
    this.startTime = startTime;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public setTrackingId(trackingId: string): void {
    this.trackingId = trackingId;
  }

  public getTrackingId(): string {
    return this.trackingId;
  }

  public getEntryId(): string {
    return this.entryId;
  }

  public setEntryId(entryId: string): void {
    this.entryId = entryId;
  }

  public getCubicMeter(): number {
    return this.length * this.width * this.height / 1000000;
  }
}
