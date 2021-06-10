import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    public search: SearchService
  ) {}
  public id: string;
  public art: string;
  public element: any = [];
  public user: any = [];
  public seats = [];
  public cubicmeters = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.art = params.art;
    });
    let searchArray = JSON.parse(localStorage.getItem('searchResults')).filter(
      (result: any) => result.id == this.id
    );
    let helper = searchArray[0];
    this.element = helper;
    this.search.getEntry(helper.id, helper.art).then((res) => {
      this.element = res;
      console.log(this.element);
      
      this.search.getUser(this.element.userId).then((res) => {
        this.user = res;
      });
    });
    
    if (this.element.seats) {
      this.seats = new Array(parseInt(this.element.seats));
      this.cubicmeters = [];
    } else {
      this.cubicmeters = new Array(this.element.cubicmeter);
      this.seats = [];
    }
  }
}
