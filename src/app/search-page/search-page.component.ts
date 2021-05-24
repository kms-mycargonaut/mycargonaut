import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../model/offer';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor() { }

  @Input() offerList: Offer;

  ngOnInit(): void {
  }

}
