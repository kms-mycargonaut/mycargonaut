export class OpenRequests {
  public openRequestId?: string;
  public entryId: string;
  public userId: string;
  public requestedUserId: string;
  public confirmed: boolean;
  public pending: boolean;
  public rejected: boolean;

  constructor(
    openRequestId: string,
    entryId: string,
    userId: string,
    requestedUserId: string,
    confirmed: boolean,
    pending: boolean,
    rejected: boolean) {
    this.openRequestId = openRequestId;
    this.entryId = entryId;
    this.requestedUserId = requestedUserId;
    this.confirmed = confirmed;
    this.pending = pending;
    this.rejected = rejected;

  }
}
