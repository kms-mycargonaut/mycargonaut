import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Offerold {
  static counter = 1;
  public id: number;
  public start: string;
  public end: string;
  public date: NgbDate;
  public time: NgbTime;
  public vehicle: string;
  public type: string;
  public length: number;
  public width: number;
  public height: number;
  public cubicmeter: number;
  public seats: number;
  public description: string;
  public price: number;

  constructor(start: string, end: string, date: NgbDate, time: NgbTime, vehicle: string, type: string, length: number,
              width: number, height: number, seats: number, description: string, price: number) {
    this.id = Offerold.counter++;
    this.start = start;
    this.end = end;
    this.date = date;
    this.time = time;
    this.vehicle = vehicle;
    this.type = type;
    this.length = length;
    this.width = width;
    this.height = height;
    this.cubicmeter = this.getCubicMeter();
    this.seats = seats;
    this.description = description;
    this.price = price;
  }

  getCubicMeter(): number {
    return this.length * this.width * this.height / 1000000;
  }
}
