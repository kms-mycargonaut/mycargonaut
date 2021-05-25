export class Tracking {
  private status: Trackingstatus;

  public setStatus(status: Trackingstatus): void {
    this.status = status;
  }

  public getStatus(): Trackingstatus {
    return this.status;
  }
}
