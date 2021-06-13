import { DetailPageComponent } from './detail-page/detail-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TrackingComponent } from './tracking/tracking.component';
import { RequestsComponent } from './requests/requests.component';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import {BookingComponent} from './booking/booking.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'create-entry',
    component: CreateEntryComponent,
  },
  {
    path: 'search-page',
    component: SearchPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'create-vehicle',
    component: VehicleManagementComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'tracking/booking/:bookingId', component: TrackingComponent
  },
  {
    path: 'tracking/entry/:entryId', component: TrackingComponent
  },
  {
    path: 'requests',
    component: RequestsComponent,
  },
  {
    path: 'supplier-profile',
    component: SupplierProfileComponent,
  },
  {
    path: 'detail-page',
    component: DetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
