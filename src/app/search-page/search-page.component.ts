import { Router } from '@angular/router';
import { SearchService } from './../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  public count;
  constructor(public search: SearchService, public router: Router) {
    this.search.search(JSON.parse(localStorage.getItem('searchQuery')));
  }

  ngOnInit(): void {
    this.count = this.search.searchResults.length;
    if (!this.search.searchResults) {
      this.router.navigate(['/']);
    }
  }
}
