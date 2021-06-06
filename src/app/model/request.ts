import {Post} from './post';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Request extends Post {

  private length: number;
  private width: number;
  private height: number;
  private seats: number;

  constructor(start: string, destination: string, startDate: NgbDate, startTime: NgbTime, description: string, price: number) {
    super(start, destination, startDate, startTime, description, price);
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
