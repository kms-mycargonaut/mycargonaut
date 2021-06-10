export class Booking {
  entry: string;
  searcher: string;
  supplier: string;
  bookingDate: Date;

  constructor(entry: string, searcher: string, supplier: string, bookingDate: Date) {
    entry = this.entry;
    searcher = this.searcher;
    supplier = this.supplier;
    bookingDate = this.bookingDate;
  }
}
