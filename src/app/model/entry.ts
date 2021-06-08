import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export abstract class Entry {

  protected userId: string;
  protected start: string;
  protected destination: string;
  protected startDate: NgbDate;
  protected startTime: NgbTime;
  protected description: string;
  protected price: number;
  protected type: string;

  // tslint:disable-next-line:max-line-length
  protected constructor(start: string, destination: string, startDate: NgbDate, startTime: NgbTime, description: string, price: number) {
    this.start = start;
    this.destination = destination;
    this.startDate = startDate;
    this.startTime = startTime;
    this.description = description;
    this.price = price;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getStart(): string {
    return this.start;
  }

  public setStart(start: string): void {
    this.start = start;
  }

  public getDestination(): string {
    return this.destination;
  }

  public setDestination(destination: string): void {
    this.destination = destination;
  }

  public getStartDate(): NgbDate {
    return this.startDate;
  }

  public setStartDate(startDate: NgbDate): void {
    this.startDate = startDate;
  }

  public getStartTime(): NgbTime {
    return this.startTime;
  }

  public setStartTime(startTime: NgbTime): void {
    this.startTime = startTime;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public setType(type: string): void {
    this.type = type;
  }
}
