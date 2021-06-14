import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {SearchService} from '../services/search.service';
import {OpenRequestsService} from '../services/open-requests.service';
import {OpenRequests} from '../model/open-requests';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticatedUser: string;

  public id: string;
  public art: string;
  public helper: any;
  public element: any;
  public name = '';
  public profileimage: string;
  public seats: any;
  public cubicmeters = [];
  public seatsNeeded = '';
  public cubicMetersNeeded = '';

  // open requests attributes
  public confirmed = false;
  public pending = true;
  public rejected = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authFire: AngularFireAuth,
    public auth: AuthService,
    public search: SearchService,
    public openRequestService: OpenRequestsService
  ) {
    this.user = authFire.user;
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.art = params.art;
    });
    if (JSON.parse(localStorage.getItem('searchResults'))) {
      this.helper = JSON.parse(localStorage.getItem('searchResults')).filter(
        (result: any) => result.id === this.id
      );
      this.element = this.helper[0];
    }
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.authenticatedUser = user.uid;
      console.log('current user');
      console.log(this.authenticatedUser);
    });
    this.fetchData().then(() => {
      if (this.element.seats != undefined) {
        console.log(this.element.seats);

        // tslint:disable-next-line:radix
        this.seats = new Array(parseInt(this.element.seats));
        this.cubicmeters = [];
      } else {
        console.log(this.element.cubicmeter);
        
        this.cubicmeters = new Array(this.element.cubicmeter);
        this.seats = [];
      }
    });
    if (!this.element) {
      this.router.navigate(['/search-page']);
    }
  }

  createRequest(): void {
    if (this.element.transportType === 'Mitfahrgelegenheit') {
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
    // let userId = this.authService.getcurrentUser;
    console.log(' this.element.id: ' +  this.element);
    const newOpenRequest: OpenRequests = new OpenRequests(
      this.id,
      this.element.userId,
      this.authenticatedUser,
      this.confirmed,
      this.pending,
      this.rejected,
      this.seatsNeeded,
      this.cubicMetersNeeded);
    this.openRequestService.addOpenRequest(newOpenRequest);
  }


  async fetchData(): Promise<void> {
    const searchArray = JSON.parse(localStorage.getItem('searchResults')).filter(
      (result: any) => result.id === this.id
    );
    this.search.search(JSON.parse(localStorage.getItem('searchQuery')));
    const searchObject = searchArray[0];

    this.name = searchObject.name;
    this.profileimage = searchObject.profileimage;
    await this.search.getEntry(this.id).then((res) => {
      this.element = res;
      console.log('Element ', this.element);
    });

  }
}
