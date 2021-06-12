export class Tracking {

  id: string;
  entryId: string;
  status: string;
  date: Date;
  done: boolean;


  constructor(entryId: string, status: string, date: Date, done: boolean) {
    this.entryId = entryId;
    this.status = status;
    this.date = date;
    this.done = done;
  }
}
