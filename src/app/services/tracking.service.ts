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

  public startRide(): Tracking {
    this.tracking.setStatus(Trackingstatus.Start);
    return this.tracking;
  }

  public arrived(): Tracking {
    this.tracking.setStatus(Trackingstatus.Destination);
    return this.tracking;
  }

  public finishRide(): Tracking {
    this.tracking.setStatus(Trackingstatus.Finished);
    return this.tracking;
  }

}
