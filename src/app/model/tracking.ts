export class Tracking {

  id: string;
  entryId: string;
  status: string;
  date: string;
  done: boolean;

  constructor(entryId: string, status: string, date: string, done: boolean) {
    this.entryId = entryId;
    this.status = status;
    this.date = date;
    this.done = done;
  }

  public setDate(date: string): void {
    this.date = date;
  }
}
