import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProfileComponent } from './supplier-profile.component';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';

describe('SupplierProfileComponent', () => {
  let component: SupplierProfileComponent;
  let fixture: ComponentFixture<SupplierProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterModule.forRoot([])
      ],
      declarations: [ SupplierProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
