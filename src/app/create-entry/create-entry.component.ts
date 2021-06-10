import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Vehicle} from '../model/vehicle';
import {Entry} from '../model/entry';
import {EntryService} from '../services/entry.service';


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
  vehicles: Vehicle[];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private entryService: EntryService) { }

  ngOnInit(): void {
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
        this.entryService.addEntry(newEntry);
        this.message = 'Eintrag erstellt';
        this.router.navigate(['']);
    } else {
      this.message = 'Bitte fülle alle Felder aus';
    }
    console.log(this.message);
    alert(this.message);
  }
}
