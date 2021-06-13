import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  public alerts = this.alertService.ALERTS;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
  }

}
