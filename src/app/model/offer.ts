import {Entry} from './entry';
import {Vehicle} from './vehicle';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Offer extends Entry {

  private vehicle: Vehicle;


  constructor(entryId: string, userId: string, start: string, destination: string, startDate: NgbDate,
              startTime: NgbTime, description: string, price: number, type: string, length: number,
              width: number, height: number, seats: number, trackingId: string) {
    super(entryId, userId, start, destination, startDate, startTime, description, price, type, length, width, height, seats, trackingId);
  }

  public getVehicle(): Vehicle {
    return this.vehicle;
  }

  public setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }
}
