export class Booking {
  entry: string;
  searcher: string;
  supplier: string;
  bookingDate: string;

  constructor(entry: string, searcher: string, supplier: string, bookingDate: string) {
    entry = this.entry;
    searcher = this.searcher;
    supplier = this.supplier;
    bookingDate = this.bookingDate;
  }
}
