import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { OpenRequests } from '../model/open-requests';
import { User } from '../model/user';
import { Entry } from '../model/entry';
import { Booking } from '../model/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  public profileImage = '';
  public supplierName = '';
  public requestId: string;
  public request: OpenRequests;
  public supplier: any;
  public entry: Entry;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public booking: BookingService
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.requestId = paramMap.get('requestId');
    });
    this.getRequest().then(() => {
      this.getUser();
    });
  }

  ngOnInit(): void {
    if (this.entry === undefined) {
      this.router.navigate(['/open-requests']);
    }
  }
  public async getRequest() {
    this.entry = this.booking.entry;
    let helper = await this.booking.getRequest(this.requestId);
    this.request = helper[0];
    return;
  }
  public async getUser() {
    let helper1 = await this.booking.getSupplier(this.request.userId);
    this.supplier = helper1[0];
    console.log('Supplier ', this.supplier);

    return;
  }
  public async prepareBooking() {
    if (this.entry.transportType != 'Ladefläche') {
      let booking = new Booking(
        this.request.entryId,
        this.request.requestedUserId,
        this.request.userId,
        new Date().toLocaleDateString()
      );
      this.booking.createBooking(booking, parseInt(this.request.seatsNeeded), this.requestId);
    } else {
      let booking = new Booking(
        this.request.entryId,
        this.request.requestedUserId,
        this.request.userId,
        new Date().toLocaleDateString()
      );
      this.booking.createBooking(booking, parseInt(this.request.cubicMetersNeeded), this.requestId);
    }
  }
}
