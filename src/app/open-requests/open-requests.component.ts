import { Component, OnInit } from '@angular/core';
import {OpenRequestsService} from '../services/open-requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './open-requests.component.html',
  styleUrls: ['./open-requests.component.css']
})
export class OpenRequestsComponent implements OnInit {
  confirmedRides = false;
  constructor(public openRequestService: OpenRequestsService) { }

  ngOnInit(): void {
  }

  bookNow(): any {
  const temp = this.openRequestService.getOpenRequests();
  console.log(temp);
  }
}
