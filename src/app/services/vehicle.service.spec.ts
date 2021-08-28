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
import Spy = jasmine.Spy;

describe('VehicleService', () => {
  let service: VehicleService;
  let vehicleIdToDelete: string;

  beforeEach(() => {
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

  afterAll(() => {
    console.log('afterall');
    service.deleteVehicle(vehicleIdToDelete, '123456789');
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('VehicleService', () => {
    const vehicleFromDB = new Vehicle();
    const vehicle = new Vehicle();
    vehicle.brand = 'VW';
    vehicle.height = 100;
    vehicle.length = 220;
    vehicle.width = 140;
    vehicle.numberOfSeats = 5;
    vehicle.transportType = 'PKW';
    vehicle.yearOfManufacture = '1980';
    it('Add Vehicle should have been called once', () => {
      service.addVehicle(vehicle, '123456789');
    });
    it('Get Vehicle by userid and delete vehicle by id', () => {
      let vehiclesList;
      service.getVehicles('123456789').then(vehicles => {
        vehiclesList = vehicles;
        vehicles.forEach(v => {
          vehicleIdToDelete = v.vehicleId;
          vehicleFromDB.brand = v.brand;
          vehicleFromDB.height = v.height;
          vehicleFromDB.length = v.length;
          vehicleFromDB.width = v.width;
          vehicleFromDB.numberOfSeats = v.numberOfSeats;
          vehicleFromDB.transportType = v.transportType;
          vehicleFromDB.yearOfManufacture = v.yearOfManufacture;
        });
      });
      expect(vehicle.brand).toEqual('hoppla');
      expect(vehicle.height).toEqual(vehicleFromDB.height);
      expect(vehicle.length).toEqual(vehicleFromDB.length);
      expect(vehicle.width).toEqual(vehicleFromDB.width);
      expect(vehicle.numberOfSeats).toEqual(vehicleFromDB.numberOfSeats);
      expect(vehicle.transportType).toEqual(vehicleFromDB.transportType);
      expect(vehicle.yearOfManufacture).toEqual(vehicleFromDB.yearOfManufacture);
    });
  });
});
