import { TestBed } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {RegisterComponent} from '../register/register.component';
import {AuthService} from './auth.service';
import {Vehicle} from '../model/vehicle';
import {VehicleManagementComponent} from '../vehicle-management/vehicle-management.component';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterTestingModule
      ],
      declarations: [VehicleManagementComponent],
      providers: [VehicleService]
    }).compileComponents();
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
