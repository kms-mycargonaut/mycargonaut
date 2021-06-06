import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
