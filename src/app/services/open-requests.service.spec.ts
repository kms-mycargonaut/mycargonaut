import { TestBed } from '@angular/core/testing';

import { OpenRequestsService } from './open-requests.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RouterTestingModule} from '@angular/router/testing';

describe('OpenRequestsService', () => {
  let service: OpenRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(OpenRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
