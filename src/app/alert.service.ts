import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  type: string;
  message: string;
  public ALERTS: any = [];

  public close(alert): void {
    this.ALERTS.splice(this.ALERTS.indexOf(alert), 1);
  }
}
