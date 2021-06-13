import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TrackingComponent } from './tracking/tracking.component';
import { OpenRequestsComponent } from './open-requests/open-requests.component';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEntryComponent,
    HomeComponent,
    SearchPageComponent,
    LoginComponent,
    RegisterComponent,
    VehicleManagementComponent,
    MyProfileComponent,
    TrackingComponent,
    OpenRequestsComponent,
    SupplierProfileComponent,
    DetailPageComponent,
    AlertComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
