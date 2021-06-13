import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public profileImage = '';
  public supplierName = '';
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
