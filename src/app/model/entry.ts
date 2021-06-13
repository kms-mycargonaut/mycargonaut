import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Entry {

  entryId: string;
  userId: string;
  entryType: string;
  start: string;
  destination: string;
  startDate: NgbDate;
  startTime: NgbTime;
  description: string;
  price: number;
  transportType: string;
  length: number;
  width: number;
  height: number;
  cubicmeter: number;
  seats: number;
  trackingStatus: string;


  // tslint:disable-next-line:max-line-length
  constructor(entryType: string, start: string, destination: string, startDate: NgbDate, startTime: NgbTime,
              description: string, price: number, transportType: string, length: number, width: number, height: number,
              seats: number, trackingStatus: string) {
    this.entryType = entryType;
    this.start = start;
    this.destination = destination;
    this.startDate = startDate;
    this.startTime = startTime;
    this.description = description;
    this.price = price;
    this.transportType = transportType;
    this.length = length;
    this.width = width;
    this.height = height;
    this.cubicmeter = this.getCubicMeter();
    this.seats = seats;
    this.trackingStatus = trackingStatus;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getCubicMeter(): number {
    return this.length * this.width * this.height / 1000000;
  }

  public setEntryId(entryId: string): void {
    this.entryId = entryId;
  }
}
