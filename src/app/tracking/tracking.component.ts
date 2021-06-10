import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {Rating} from '../model/rating';
import {RatingService} from '../services/rating.service';
import {EntryService} from '../services/entry.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticatedUser: firebase.User;
  bookingId: string;
  start;
  end;
  date = '02.06.2021';
  status;
  status1date = '15.05.2021, 17:09';
  status2date = '02.06.2021, 13:00';
  status3date = '02.06.2021, 18:00';
  status4date = '02.06.2021, 18:20';
  statusdate = this.status1date;
  form = new FormGroup({
  rating: new FormControl(),
  title: new FormControl(),
  ratingDescription: new FormControl()
});

  public message: string;
  // request = new Request('today', 'yesterday', null, null, null, null , 'SvScYVKxY2GEWxwv3Gfp');

  constructor(public auth: AngularFireAuth, private ratingService: RatingService, private entryService: EntryService,
              private route: ActivatedRoute) {
    this.user = auth.user;
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookingId = paramMap.get('bookingId');
    });
    this.entryService.getEntry('BZ632IoHWt8GCmJJtHL6').then(value => {
      this.start = value.start;
      this.end = value.destination;
      this.status = value.trackingStatus;
    });
  }

  public getTrackingAsSupplier(): void {

  }


  onSubmit(): void {
    if (this.form.value.rating !== null && this.form.value.title !== null && this.form.value.ratingDescription !== null)
    {
      const newRating: Rating = new Rating(this.form.value.rating, this.form.value.title, this.form.value.ratingDescription);
      this.ratingService.addRating(newRating);
      this.message = 'Deine Bewertung wurde abgeschickt';
    } else {
      this.message = 'Bitte fülle alle Felder aus';
    }
    console.log(this.message);
    alert(this.message);
  }
}
