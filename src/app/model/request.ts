import {Entry} from './entry';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Request extends Entry {

  constructor(start: string, destination: string,
              startDate: NgbDate, startTime: NgbTime, description: string, price: number, type: string,
              length: number, width: number, height: number, seats: number) {
    super(start, destination, startDate, startTime, description, price, type, length, width, height, seats);
  }
}
