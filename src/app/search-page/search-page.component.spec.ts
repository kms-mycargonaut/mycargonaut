import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterTestingModule,
      ],
      declarations: [SearchPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem(
      'searchResults',
      JSON.stringify([
        {
          art: 'Gesuch',
          cubicmeter: 0,
          date: { year: 2021, month: 5, day: 26 },
          description: 'Suche eine Mitfahrgelegenheit. Bitte 2 Sitzplätze',
          end: 'Berlin',
          height: null,
          id: 1,
          length: null,
          nutzer: 'VyUClws9c7d8bF9YN1zwVCuFDQz2',
          seats: '2',
          start: 'Köln',
          time: { minute: 30, hour: 14, second: 0 },
          type: 'Mitfahrgelegenheit',
          width: null,
        },
      ])
    );
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
