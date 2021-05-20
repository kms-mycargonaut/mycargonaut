import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  public year = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;
  public currentDay = new Date().getDate();
  ngOnInit(): void {
    console.log(this.year);
    console.log(this.currentMonth);
    console.log(this.currentDay);
  }
}
