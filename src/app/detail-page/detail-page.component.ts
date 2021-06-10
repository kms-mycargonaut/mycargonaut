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
  public name: string;
  public profileimage: string;
  public seats = [];
  public cubicmeters = [];
  public seatsNeeded = "";
  public cubicMetersNeeded = "";

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
    this.name = helper.name;
    this.profileimage = helper.profileimage;
    this.search.getEntry(this.id).then((res) => {      
      this.element = res;
    });
    
    if (this.element.seats) {
      this.seats = new Array(parseInt(this.element.seats));
      this.cubicmeters = [];
    } else {
      this.cubicmeters = new Array(this.element.cubicmeter);
      this.seats = [];
    }
  }
  public createRequest() {
    if (this.element.transportType == 'Mitfahrgelegenheit') {
      console.log('Anfrage/Angebot Mitfahrgelegenheit. Anzahl benötigter Sitze:', this.seatsNeeded);
    } else {
      console.log('Anfrage/Angebot Gütertransport. Anzahl benötigter Kubikmeter:', this.cubicMetersNeeded);
    }
  }
}
