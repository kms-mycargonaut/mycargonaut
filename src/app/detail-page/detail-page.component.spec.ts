import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.test),
        AngularFireDatabaseModule,
        RouterTestingModule,
      ],
      declarations: [DetailPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem(
      'searchResults',
      JSON.stringify([
        {
          startTime: {
            minute: 30,
            second: 0,
            hour: 15,
          },
          width: null,
          price: '20',
          destination: 'München',
          height: null,
          seats: '3',
          start: 'Hamburg',
          entryType: 'Angebot',
          userId: 'VyUClws9c7d8bF9YN1zwVCuFDQz2',
          length: null,
          trackingStatus: 'Fahrt hat begonnen',
          cubicmeter: 0,
          transportType: 'Mitfahrgelegenheit',
          description: 'Ich biete 2 Plätze',
          startDate: {
            year: 2021,
            day: 23,
            month: 6,
          },
          id: 'BZ632IoHWt8GCmJJtHL6',
          name: 'Harry Potter',
          profileimage:
            'https://cdn.pixabay.com/photo/2019/03/24/12/16/harry-potter-4077470_1280.png',
        },
      ])
    );
    component.id = 'BZ632IoHWt8GCmJJtHL6';
    component.element = {
      startTime: {
        minute: 30,
        second: 0,
        hour: 15,
      },
      width: null,
      price: '20',
      destination: 'München',
      height: null,
      seats: '3',
      start: 'Hamburg',
      entryType: 'Angebot',
      userId: 'VyUClws9c7d8bF9YN1zwVCuFDQz2',
      length: null,
      trackingStatus: 'Fahrt hat begonnen',
      cubicmeter: 0,
      transportType: 'Mitfahrgelegenheit',
      description: 'Ich biete 2 Plätze',
      startDate: {
        year: 2021,
        day: 23,
        month: 6,
      },
      id: 'BZ632IoHWt8GCmJJtHL6',
      name: 'Harry Potter',
      profileimage:
        'https://cdn.pixabay.com/photo/2019/03/24/12/16/harry-potter-4077470_1280.png',
    };
  });
});
