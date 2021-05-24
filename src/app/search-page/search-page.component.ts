import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor() {}

  public offerList: any;

  ngOnInit(): void {
    this.offerList = JSON.parse(localStorage.getItem('searchResults'));
  }
}
