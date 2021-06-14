import { Component, OnInit } from '@angular/core';
import { OpenRequestsService } from '../services/open-requests.service';
import { OpenRequests } from '../model/open-requests';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EntryService } from '../services/entry.service';
import { Entry } from '../model/entry';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-requests',
  templateUrl: './open-requests.component.html',
  styleUrls: ['./open-requests.component.css'],
})
export class OpenRequestsComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: firebase.User;
  public openRequestList: any = [];
  public confirmedEntryList: Entry[] = [];
  public showConfirmed = false;
  public showPending = false;
  public showRejected = false;
  public pendingEntryList: Entry[] = [];
  public rejectedEntryList: Entry[] = [];
  public openRequestEntry: any;
  public userId: string;
  public entryId: string;
  public start: string;
  public end: string;
  public date: string;
  public time: string;

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
  }

  ngOnInit(): void {
    this.bookNow();
  }

  async bookNow(): Promise<any> {
    await this.authService.getcurrentUser().then((user) => {
      this.userId = user.id;
    });
    this.openRequestList = await this.openRequestService.getOpenRequests();
    for (const openRequestEntry of this.openRequestList) {
      const entryId = openRequestEntry.entryId;
      const orentry: any = await this.entryService.getEntry(entryId);
      if (openRequestEntry.confirmed === true) {
        orentry.requestId = openRequestEntry.requestId;
        console.log(orentry);
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
}
