import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    public search: SearchService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.art = params.art;
    });
    if (JSON.parse(localStorage.getItem('searchResults'))) {
      this.helper = JSON.parse(localStorage.getItem('searchResults')).filter(
        (result: any) => result.id == this.id
      );
      this.element = this.helper[0];
    }
  }
  public id: string;
  public art: string;
  public helper: any;
  public element: any;
  public name: string = '';
  public profileimage: string;
  public seats: any;
  public cubicmeters = [];
  public seatsNeeded = '';
  public cubicMetersNeeded = '';

  ngOnInit(): void {
    this.fetchData().then(() => {
      if (this.element.seats != undefined) {
        console.log(this.element.seats);

        this.seats = new Array(parseInt(this.element.seats));
        this.cubicmeters = [];
      } else {
        this.cubicmeters = new Array(this.element.cubicmeter);
        this.seats = [];
      }
    });
    if (!this.element) {
      this.router.navigate(['/search-page']);
    }
  }
  public createRequest() {
    if (this.element.transportType == 'Mitfahrgelegenheit') {
      console.log(
        'Anfrage/Angebot Mitfahrgelegenheit. Anzahl benötigter Sitze:',
        this.seatsNeeded
      );
    } else {
      console.log(
        'Anfrage/Angebot Gütertransport. Anzahl benötigter Kubikmeter:',
        this.cubicMetersNeeded
      );
    }
  }

  
  public async fetchData() {
    let searchArray = JSON.parse(localStorage.getItem('searchResults')).filter(
      (result: any) => result.id == this.id
    );
    this.search.search(JSON.parse(localStorage.getItem('searchQuery')));
    let searchObject = searchArray[0];

    this.name = searchObject.name;
    this.profileimage = searchObject.profileimage;
    await this.search.getEntry(this.id).then((res) => {
      this.element = res;
      console.log('Element ', this.element);
    });
  }
}
