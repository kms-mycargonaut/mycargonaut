import {Entry} from './entry';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export class Request extends Entry {

  constructor(entryId: string, userId: string, start: string, destination: string,
              startDate: NgbDate, startTime: NgbTime, description: string, price: number, type: string,
              length: number, width: number, height: number, seats: number, trackingId: string) {
    super(entryId, userId, start, destination, startDate, startTime, description, price, type, length, width, height, seats, trackingId);
  }
}
