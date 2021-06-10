import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {Rating} from '../model/rating';
import {RatingService} from '../services/rating.service';
import {EntryService} from '../services/entry.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BookingService} from '../services/booking.service';
import {Tracking} from '../model/tracking';
import {TrackingService} from '../services/tracking.service';
import {Trackingstatus} from '../model/trackingstatus';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  trackingList: Tracking[] = [];
  started: Tracking;
  user: Observable<firebase.User>;
  authenticatedUser: firebase.User;
  bookingId: string;
  trackingEntryId: string;
  entryId: string;
  start;
  end;
  date;
  time;
  status;
  status1date = '15.05.2021, 17:09';
  status2date;
  status3date = '02.06.2021, 18:00';
  status4date = '02.06.2021, 18:20';
  statusdate = this.status1date;
  ratingbool = true;
  form = new FormGroup({
    rating: new FormControl(),
    title: new FormControl(),
    ratingDescription: new FormControl()
  });

  public message: string;

  constructor(public auth: AngularFireAuth, private ratingService: RatingService, private entryService: EntryService,
              private bookingService: BookingService, private trackingService: TrackingService,
              private route: ActivatedRoute) {
    this.user = auth.user;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookingId = paramMap.get('bookingId');
      this.trackingEntryId = paramMap.get('entryId');
    });
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
    });
    if (this.bookingId !== null) {
      this.loadEntryViaBooking();
    } else {
      this.entryId = this.trackingEntryId;
      this.loadEntry();
    }
    console.log(this.trackingList);
  }

  public loadTrackingList(): void{
    this.trackingService.getTrackingByEntryId(this.entryId).then(trackings => {
      trackings.forEach(t => {
        this.trackingList.push(new Tracking(t.entryId, t.status, t.date, t.done));
      });
    });
  }

  public loadEntryViaBooking(): void {
    this.bookingService.getBooking(this.bookingId).then(booking => {
      this.entryId = booking.entry;
    }).then(() => {
      this.loadEntry();
    });
  }

  public loadEntry(): void {
    this.entryService.getEntry(this.entryId).then(value => {
      this.start = value.start;
      this.end = value.destination;
      this.date = value.startDate.day + '.' + value.startDate.month + '.' + value.startDate.year;
      this.time = value.startTime.hour + ':' + value.startTime.minute;
      this.status = value.trackingStatus;
    }).then(() => {
      this.loadTrackingList();
    });
  }


  onSubmit(): void {
    if (this.form.value.rating !== null && this.form.value.title !== null && this.form.value.ratingDescription !== null) {
      const newRating: Rating = new Rating(this.form.value.rating, this.form.value.title, this.form.value.ratingDescription);
      this.ratingService.addRating(newRating, this.bookingId).then(() => {
        this.ratingbool = false;
        this.message = 'Deine Bewertung wurde abgeschickt';
      }).catch((err) => {
        this.message = 'Es tut uns Leid, aber es gab einen Fehler beim abschicken deiner Bewertung';
      });
    } else {
      this.message = 'Bitte fülle alle Felder aus';
    }
    console.log(this.message);
    alert(this.message);
  }

  starting(): void {
    this.updateTracking(Trackingstatus.started);
  }

  updating(): void {
    this.updateTracking(Trackingstatus.arrived);
  }

  finished(): void {
    this.updateTracking(Trackingstatus.finished);
  }

  updateTracking(statusToSearch: string): void {
    this.trackingService.getTrackingIDByEntryIdAndStatus(this.entryId, statusToSearch).then((id) => {
      this.trackingService.updateTracking(id, true);
    });
  }
}
