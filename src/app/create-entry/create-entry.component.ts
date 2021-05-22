import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EntryService} from '../services/entry.service';
import {Request} from '../model/request';
import {Offer} from '../model/offer';


@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.css']
})
export class CreateEntryComponent implements OnInit {
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

  constructor(public entryService: EntryService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.value.type === 'Angebot') {
      const newOffer: Offer = new Offer(this.form.value.start, this.form.value.end, this.form.value.date, this.form.value.time,
        this.form.value.vehicle, this.form.value.searchtype, this.form.value.length, this.form.value.width, this.form.value.height,
        this.form.value.seats, this.form.value.description, this.form.value.price);
      this.entryService.addOffer(newOffer);
      this.message = 'Angebot erstellt';
    } else if (this.form.value.type === 'Gesuch') {
      const newRequest: Request = new Request(this.form.value.start, this.form.value.end, this.form.value.date, this.form.value.time,
        this.form.value.searchtype, this.form.value.length, this.form.value.width, this.form.value.height,
        this.form.value.seats, this.form.value.description);
      this.entryService.addRequest(newRequest);
      this.message = 'Gesuch erstellt';
    } else {
      this.message = 'Wähle aus, ob du ein Angebot oder Gesuch anlegen möchtest';
    }
    console.log(this.message);
  }
}
