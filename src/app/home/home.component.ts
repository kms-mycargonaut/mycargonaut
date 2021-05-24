import { SearchService } from './../services/search.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public searchService: SearchService
  ) {}
  public year = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;
  public currentDay = new Date().getDate();

  public start: string;
  public end: string;
  public date: NgbDate;
  public type: string = '';
  ngOnInit(): void {}
  startSearch(): void {
    this.searchService.search(this.start, this.end, this.date, this.type);
  }
}
