import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }
}
