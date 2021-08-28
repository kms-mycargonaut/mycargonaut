import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Vehicle} from '../model/vehicle';
import {Entry} from '../model/entry';
import {EntryService} from '../services/entry.service';
import {Tracking} from '../model/tracking';
import {TrackingService} from '../services/tracking.service';
import {Trackingstatus} from '../model/trackingstatus';
import {VehicleService} from '../services/vehicle.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.css']
})

export class CreateEntryComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticatedUser: firebase.User;
  form = new FormGroup({
    type: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    vehicle: new FormControl(),
    searchtype: new FormControl(),
    length: new FormControl(),
    width: new FormControl(),
    height: new FormControl(),
    seats: new FormControl(),
    description: new FormControl(),
    price: new FormControl()
  });

  public year = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;
  public currentDay = new Date().getDate();
  time = {hour: 13, minute: 30};
  public message: string;
  vehicles: Vehicle[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AngularFireAuth, private router: Router, private entryService: EntryService,
              private trackingService: TrackingService, private vehicleService: VehicleService, private alertService: AlertService) {
    this.user = auth.user;
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user;
      this.loadVehicles();
    });
  }

  onSubmit(): void {
    if (this.form.value.type !== null && this.form.value.start !== null && this.form.value.end !== null && this.form.value.date !== null
      && this.form.value.time !== null && this.form.value.searchtype !== null && this.form.value.description !== null
      && (this.form.value.seats !== null || (this.form.value.length !== null && this.form.value.width !== null
      && this.form.value.height !== null)))
    {
        const newEntry: Entry = new Entry (this.form.value.type, this.form.value.start, this.form.value.end, this.form.value.date,
          this.form.value.time, this.form.value.description, this.form.value.price, this.form.value.searchtype,
          this.form.value.length, this.form.value.width, this.form.value.height, this.form.value.seats, '');
        this.entryService.addEntry(newEntry).then((entryId) => {
          this.initializeTracking(entryId);
        });
        const alert = {
          type: 'success',
          message: 'Dein Eintrag wurde erstellt'
        };
        this.router.navigate(['']);
        this.alertService.ALERTS.push(alert);
        setTimeout(() => this.alertService.close(alert), 5000);
    } else {
      const alert = {
        type: 'danger',
        message: 'Bitte fülle alle Felder aus'
      };
      this.alertService.ALERTS.push(alert);
      setTimeout(() => this.alertService.close(alert), 5000);
    }
  }

  private initializeTracking(entryId: string): void {
    const tracking: Tracking = new Tracking(entryId, Trackingstatus.booked, new Date().toLocaleDateString(),  true);
    const tracking2: Tracking = new Tracking(entryId, Trackingstatus.started, null,  false);
    const tracking3: Tracking = new Tracking(entryId, Trackingstatus.arrived, null,  false);
    const tracking4: Tracking = new Tracking(entryId, Trackingstatus.finished, null,  false);
    this.trackingService.
    addTracking(tracking).then(() => this.trackingService.
    addTracking(tracking2).then(() => this.trackingService.
    addTracking(tracking3).then(() => this.trackingService.
    addTracking(tracking4))));
  }

  loadVehicles(): void {
    if (this.authenticatedUser.uid) {
      this.vehicleService.getVehicles(this.authenticatedUser.uid).then(v => {
        this.vehicles = v;
      });
    }
  }
}
