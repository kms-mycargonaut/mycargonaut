import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.test),
        AngularFireDatabaseModule,
        RouterTestingModule,
        NgbModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
