import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  start = 'Köln';
  end = 'Berlin';
  date = '02.06.2021';
  status = 'Deine Fahrt ist gebucht';
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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.value.rating !== null && this.form.value.title !== null && this.form.value.ratingDescription !== null)
    {
      console.log(this.form.value.rating + ', ' + this.form.value.title + ', ' + this.form.value.ratingDescription);
    } else {
      this.message = 'Bitte fülle alle Felder aus';
    }
    console.log(this.message);
    alert(this.message);
  }
}
