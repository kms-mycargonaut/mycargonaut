import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {TrackingService} from '../services/tracking.service';
import {Offer} from '../model/offer';
import {Request} from '../model/request';
import {RequestService} from '../services/request.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  user: Observable<firebase.User>;
  request: Request;
  authenticatedUser: firebase.User;
  start = 'Köln';
  end = 'Berlin';
  date = '02.06.2021';
  status = 'Deine Fahrt ist gebucht';
  status1date = '15.05.2021, 17:09';
  status2date = '02.06.2021, 13:00';
  status3date = '02.06.2021, 18:00';
  status4date = '02.06.2021, 18:20';
  statusdate = this.status1date;
  // request = new Request('today', 'yesterday', null, null, null, null , 'SvScYVKxY2GEWxwv3Gfp');

  constructor(public auth: AngularFireAuth, private trackingService: TrackingService, private requestService: RequestService) {
    this.user = auth.user;
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
    });
    this.requestService.getRequest('TL756TwBhRDN3driRmUq').then((value => {
      this.request = new Request(value.start, value.destination, value.startDate, value.startTime,
        value.description, value.price, value.type, value.length, value.width, value.height, value.seats);
      this.request.setTrackingId(value.trackingId);
      this.request.setUserId(value.userId);
      console.log(this.request);
    }));
   // console.log(this.request);
  }

  public getTrackingAsSupplier(): void {

  }


}
