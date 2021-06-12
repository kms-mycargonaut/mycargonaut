import {Component, OnInit} from '@angular/core';
import {OpenRequestsService} from '../services/open-requests.service';
import {OpenRequests} from '../model/open-requests';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {EntryService} from '../services/entry.service';
import {Entry} from '../model/entry';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Component({
  selector: 'app-requests',
  templateUrl: './open-requests.component.html',
  styleUrls: ['./open-requests.component.css']
})
export class OpenRequestsComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: firebase.User;
  public entryId: string;
  public start: string;
  public end: string;
  public date: string;
  public time: string;
  openRequestList: Promise<void>;

  constructor(public openRequestService: OpenRequestsService, public authService: AuthService, public entryService: EntryService,
              public auth: AngularFireAuth, private route: ActivatedRoute) {
    this.user = auth.user;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.entryId = paramMap.get('entryId');
    });
  }

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  async bookNow(): Promise<any> {
    let openRequestList: OpenRequests[] = [];
    const entryList: Entry[] = [];
    openRequestList = await this.openRequestService.getOpenRequests();
    console.log(openRequestList);
    for (const openRequestEntry of openRequestList) {
      const entryId = openRequestEntry.entryId;
      const entry1 = this.entryService.getEntry(entryId);
      entryList.push(await entry1);
    }
    console.log(entryList);
  }
}
