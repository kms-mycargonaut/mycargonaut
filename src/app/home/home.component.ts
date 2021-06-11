import { Router } from '@angular/router';
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
    public searchService: SearchService,
    private router: Router
  ) {}
  public year = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;
  public currentDay = new Date().getDate();

  public start: string;
  public end: string;
  public date: NgbDate;
  public type: string = '';
  ngOnInit(): void {}
  async startSearch() {
    this.searchService.setQuery(this.start, this.end, this.date, this.type);
  }
  public search() {
    if (
      this.start != undefined &&
      this.end != undefined &&
      this.date != undefined &&
      this.type != ''
    ) {
      this.startSearch().then(() => {
        this.router.navigate(['/search-page']);
      });
    } else {
      alert('Nicht alle Felder ausgefüllt!')
    }
  }
}
