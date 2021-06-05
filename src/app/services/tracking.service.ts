import { Injectable } from '@angular/core';
import {Tracking} from '../model/tracking';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private tracking: Tracking;

  constructor() {
    this.tracking = new Tracking();
  }



}
