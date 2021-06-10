import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Offer} from '../model/offer';
import {OfferService} from '../services/offer.service';
import {RequestService} from '../services/request.service';
import {Request} from '../model/request';


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

  constructor(private router: Router, private offerService: OfferService, private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.value.type !== null && this.form.value.start !== null && this.form.value.end !== null && this.form.value.date !== null
      && this.form.value.time !== null && this.form.value.searchtype !== null && this.form.value.description !== null
      && (this.form.value.seats !== null || (this.form.value.length !== null && this.form.value.width !== null
      && this.form.value.height !== null)))
    {
      if (this.form.value.type === 'Angebot') {
        const newOffer: Offer = new Offer(this.form.value.start, this.form.value.end, this.form.value.date,
          this.form.value.time, this.form.value.description, this.form.value.price, this.form.value.vehicle, '');
        this.offerService.addOffer(newOffer);
        this.message = 'Angebot erstellt';
        this.router.navigate(['']);
      } else if (this.form.value.type === 'Gesuch') {
        const newRequest: Request = new Request(this.form.value.start, this.form.value.end, this.form.value.date,
          this.form.value.time, this.form.value.description, this.form.value.price, '');
        newRequest.setType(this.form.value.searchtype);
        newRequest.setLength(this.form.value.length);
        newRequest.setHeight(this.form.value.height);
        newRequest.setWidth(this.form.value.width);
        newRequest.setSeats(this.form.value.seats);
        this.requestService.addRequest(newRequest);
        this.message = 'Gesuch erstellt';
        this.router.navigate(['']);
      } else {
        this.message = 'Das Angebot/Gesuch konnte nicht erstellt werden';
      }
    } else {
      this.message = 'Bitte fülle alle Felder aus';
    }
    console.log(this.message);
    alert(this.message);
  }
}
