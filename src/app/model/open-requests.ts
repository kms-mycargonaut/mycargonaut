export class OpenRequests {
  public openRequestId?: string;
  public entryId: string;
  public userId: string;
  public requestedUserId: string;
  public confirmed: boolean;
  public pending: boolean;
  public rejected: boolean;
  public seatsNeeded?: string;
  public cubicMetersNeeded?: string;

  constructor(
    openRequestId: string,
    entryId: string,
    userId: string,
    requestedUserId: string,
    confirmed: boolean,
    pending: boolean,
    rejected: boolean,
    seatsNeeded: string,
    cubicMetersNeeded: string) {
    this.openRequestId = openRequestId;
    this.entryId = entryId;
    this.requestedUserId = requestedUserId;
    this.confirmed = confirmed;
    this.pending = pending;
    this.rejected = rejected;
    this.seatsNeeded = seatsNeeded;
    this.cubicMetersNeeded = cubicMetersNeeded;

  }
}
