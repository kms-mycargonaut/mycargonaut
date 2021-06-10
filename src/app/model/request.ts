import {Entry} from './entry';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Request extends Entry {

  length: number;
  width: number;
  height: number;
  seats: number;

  // tslint:disable-next-line:max-line-length
  constructor(start: string, destination: string, startDate: NgbDate, startTime: NgbTime, description: string, price: number, trackingId: string) {
    super(start, destination, startDate, startTime, description, price, trackingId);
  }

  public setLength(length: number): void {
    this.length = length;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public getCubicmeter(): number {
    return this.length * this.width * this.height;
  }

  public getSeats(): number {
    return this.seats;
  }

  public setSeats(seats: number): void {
    this.seats = seats;
  }
}
