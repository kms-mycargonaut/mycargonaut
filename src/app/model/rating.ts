export class Rating {
  bookingId: string;
  rating: number;
  title: string;
  description: string;

  constructor(rating: number, title: string, description: string) {
    this.rating = rating;
    this.title = title;
    this.description = description;
  }

  public setBookingId(bookingId: string): void {
    this.bookingId = bookingId;
  }
}
