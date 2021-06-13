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
  suppliers: string[] = [];
  searchers: string[] = [];
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
  status1 = new Tracking('', '', '', false);
  status2 = new Tracking('', '', '', false);
  status3 = new Tracking('', '', '', false);
  status4 = new Tracking('', '', '', false);
  status1Message = 'Deine Fahrt ist gebucht';
  status2Message = 'Der Fahrer ist unterwegs';
  status3Message = 'Der Fahrer ist am Zielort angekommen';
  status4Message = 'Deine Fahrt ist abgeschlossen';
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
  }

  public loadTrackingList(): void {
    this.trackingService.getTrackingByEntryId(this.entryId).then(trackings => {
      trackings.forEach(t => {
        const tracking: Tracking = new Tracking(t.entryId, t.status, t.date, t.done);
        if (this.bookingId !== null && t.status === 'booked') {
          this.bookingService.getBooking(this.bookingId).then(booking => {
            tracking.setDate(booking.bookingDate);
          });
        }
        this.trackingList.push(tracking);
      });
    }).then(() => {
      this.setStatus();
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
    }).then(() => {
      this.loadTrackingList();
    });

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
      this.trackingService.updateTracking(id, true).then(() => {
        location.reload();
      });
    });
  }

  private setStatus(): void {
    for (const tracking of this.trackingList) {
      if (tracking.status === 'booked') {
        this.status1 = tracking;
      } else if (tracking.status === 'started') {
        this.status2 = tracking;
      } else if (tracking.status === 'arrived') {
        this.status3 = tracking;
      } else if (tracking.status === 'finished') {
        this.status4 = tracking;
      }
    }
    if (this.status4.done) {
      this.status = this.status4Message;
    } else if (this.status3.done) {
      this.status = this.status3Message;
    } else if (this.status2.done) {
      this.status = this.status2Message;
    } else {
      this.status = this.status1Message;
    }
  }

  onSubmit(): void {
    if (this.form.value.rating !== null && this.form.value.title !== null && this.form.value.ratingDescription !== null) {
      const newRating: Rating = new Rating(this.form.value.rating, this.form.value.title, this.form.value.ratingDescription);
      this.ratingService.addRating(newRating, this.bookingId).then(() => {
        this.message = 'Deine Bewertung wurde abgeschickt';
      }).catch(() => {
        this.message = 'Es tut uns Leid, aber es gab einen Fehler beim abschicken deiner Bewertung';
      });
    } else {
      this.message = 'Bitte fülle alle Felder aus';
    }
    alert(this.message);
  }
}
