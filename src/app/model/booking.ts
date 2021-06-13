export class Booking {
  entry: string;
  searcher: string;
  supplier: string;
  bookingDate: string;

  constructor(entry: string, searcher: string, supplier: string, bookingDate: string) {
    this.entry = entry;
    this.searcher = searcher;
    this.supplier = supplier;
    this.bookingDate = bookingDate;
  }
}
