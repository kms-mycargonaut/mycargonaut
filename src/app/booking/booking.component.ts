import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  public profileImage = '';
  public supplierName = '';
  public bookingId: string;
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public booking: BookingService
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookingId = paramMap.get('requestId');
    });
    console.log(this.bookingId);
    
  }

  ngOnInit(): void {}
}
