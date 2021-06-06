export class OpenRequests {
  public openRequestId: string;
  public offerId: string;
  public offeredUserId: string;
  public requestedUserId: string;
  public confirmed: boolean;
  public pending: boolean;
  public rejected: boolean;

  constructor(
    openRequestId: string,
    offerId: string, offeredUserId: string,
    requestedUserId: string,
    confirmed: boolean, pending: boolean,
    rejected: boolean) {
    this.openRequestId = openRequestId;
    this.offerId = offerId;
    this.offeredUserId = offeredUserId;
    this.requestedUserId = requestedUserId;
    this.confirmed = confirmed;
    this.pending = pending;
    this.rejected = rejected;

  }
}
