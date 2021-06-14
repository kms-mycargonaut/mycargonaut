import { Router } from '@angular/router';
import { SearchService } from './../services/search.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public searchService: SearchService,
    public alertService: AlertService,
    protected afa: AngularFireAuth
  ) {
    this.afa.user.subscribe(user => {
      if (user) {
        this.loggedInUser = user;
      }
    });
  }
  public year = new Date().getFullYear();
  public currentMonth = new Date().getMonth() + 1;
  public currentDay = new Date().getDate();

  public start: string;
  public end: string;
  public date: NgbDate;
  public type = '';
  public loggedInUser: any = null;
  ngOnInit(): void {}
  public search(): void {
    if (
      this.start !== undefined &&
      this.end !== undefined &&
      this.date !== undefined &&
      this.type !== ''
    ) {
      this.searchService.setQuery(this.start, this.end, this.date, this.type);
    } else {
      const alert = {
        type: 'danger',
        message: 'Bitte fülle alle Felder aus'
      };
      this.alertService.ALERTS.push(alert);
      setTimeout(() => this.alertService.close(alert), 5000);
    }
  }
}
