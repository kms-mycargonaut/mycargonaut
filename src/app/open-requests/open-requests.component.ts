import {Component, OnInit} from '@angular/core';
import {OpenRequestsService} from '../services/open-requests.service';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EntryService} from '../services/entry.service';
import {Entry} from '../model/entry';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {BookingService} from '../services/booking.service';
import {OpenRequests} from '../model/open-requests';

@Component({
  selector: 'app-requests',
  templateUrl: './open-requests.component.html',
  styleUrls: ['./open-requests.component.css'],
})
export class OpenRequestsComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: firebase.User;
  public openRequestList: any = [];
  public myOpenRequestList: any = [];
  public myConfirmedEntryList = [];
  public confirmedEntryList: Entry[] = [];
  public userList = [];
  public showConfirmed = false;
  public showPending = false;
  public showRejected = false;
  public showAllRequests = false;
  public pendingEntryList: Entry[] = [];
  public rejectedEntryList: Entry[] = [];
  public openRequestEntry: any;
  public userId: string;
  public entryId: string;
  public requestedUserId: string;
  public start: string;
  public end: string;
  public date: string;
  public time: string;
  public userData: any;

  constructor(
    public openRequestService: OpenRequestsService,
    public authService: AuthService,
    public entryService: EntryService,
    public booking: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
      this.entryId = paramMap.get('entryId');
    });
    this.authService.getUserByUserId(this.userId);
  }

  ngOnInit(): void {
    this.bookNow();
    this.getConfirmRequests();
  }

  async bookNow(): Promise<any> {
    this.confirmedEntryList = [];
    this.pendingEntryList = [];
    this.rejectedEntryList = [];
    this.showConfirmed = false;
    this.showPending = false;
    this.showRejected = false;
    await this.authService.getcurrentUser().then((user) => {
      this.userId = user.id;
    });
    this.openRequestList = await this.openRequestService.getOpenRequests();
    for (const openRequestEntry of this.openRequestList) {
      const entryId = openRequestEntry.entryId;
      const orentry: any = await this.entryService.getEntry(entryId);
      if (openRequestEntry.confirmed === true) {
        orentry.requestId = openRequestEntry.requestId;

        this.confirmedEntryList.push(await orentry);
      } else if (openRequestEntry.pending === true) {
        this.pendingEntryList.push(await orentry);
      } else if (openRequestEntry.rejected === true) {
        this.rejectedEntryList.push(await orentry);
      }
      if (this.confirmedEntryList.length > 0) {
        this.showConfirmed = true;
      }
      if (this.pendingEntryList.length > 0) {
        this.showPending = true;
      }
      if (this.rejectedEntryList.length > 0) {
        this.showRejected = true;
      }
    }
  }

  book(entry: Entry, requestId: string): void {
    this.booking.entry = entry;
    this.router.navigate(['/booking/' + requestId]);
  }

  async getConfirmRequests(): Promise<any> {
    this.myConfirmedEntryList = [];
    this.showAllRequests = false;
    await this.authService.getcurrentUser().then((user) => {
      this.userId = user.id;
    });
    this.myOpenRequestList = await this.openRequestService.getMyOpenRequests();
    for (const myOpenRequestEntry of this.myOpenRequestList) {

      // Loading html input
      const entryId = myOpenRequestEntry.entryId;
      const uId = myOpenRequestEntry.requestedUserId;
      const myorentry: Entry = await this.entryService.getEntry(entryId);
      const entry = {
        entryType: myorentry.entryType,
        start: myorentry.start,
        destination: myorentry.destination,
        startDate: myorentry.startDate,
        startTime: myorentry.startTime,
        description: myorentry.description,
        price: myorentry.price,
        transportType: myorentry.transportType,
        length: myorentry.length,
        width: myorentry.width,
        height: myorentry.height,
        seats: myorentry.seats,
        trackingStatus: myorentry.trackingStatus,
        firstName: '',
        lastName: '',
        requestId: myOpenRequestEntry.requestId
      };

      // Get current user
      this.userData = await this.authService.getUserByUserId(uId);
      entry.firstName = this.userData.firstName;
      entry.lastName = this.userData.lastName;
      this.myConfirmedEntryList.push(entry);
    }
    if (this.myConfirmedEntryList.length > 0){
      this.showAllRequests = true;
    }
  }

  rejectedRequests(requestId: string): void {
    this.openRequestService.rejectRequest(requestId).then(() => {
      this.getConfirmRequests();
    });
  }

  confirmRequests(requestId: string): void {
    this.openRequestService.confirmRequest(requestId).then(() => {
      this.getConfirmRequests();
    });
  }

  pullBackRequest(requestId: string): void {
    this.openRequestService.deleteRequest(requestId).then(() => {
      this.getConfirmRequests();
    });
  }
}
