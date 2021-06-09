import {Entry} from './entry';
import {Vehicle} from './vehicle';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Offer extends Entry {

  private vehicle: Vehicle;

  // tslint:disable-next-line:max-line-length
  constructor(start: string, destination: string, startDate: NgbDate, startTime: NgbTime, description: string, price: number, vehicle: Vehicle, trackingId: string) {
    super(start, destination, startDate, startTime, description, price, trackingId);
    this.vehicle = vehicle;
  }

  public getVehicle(): Vehicle {
    return this.vehicle;
  }

  public setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }
}
