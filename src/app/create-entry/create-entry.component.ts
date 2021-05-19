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
    description: new FormControl(),
    price: new FormControl(),
    searchtype: new FormControl(),
    searchsize: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }
}
