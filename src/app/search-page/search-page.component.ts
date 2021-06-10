import { SearchService } from './../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(public search: SearchService) {
    this.search.search(JSON.parse(localStorage.getItem('searchQuery')));
  }

  public offerList: any = [];
  public countResult: any = [];

  ngOnInit(): void {
    this.offerList = JSON.parse(localStorage.getItem('searchResults'));
    this.countResult = this.offerList.length;
    console.log(this.offerList);
  }
}
