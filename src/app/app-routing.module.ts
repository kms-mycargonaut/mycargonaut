import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {VehicleManagementComponent} from './vehicle-management/vehicle-management.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {TrackingComponent} from './tracking/tracking.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'create-entry', component: CreateEntryComponent
  },
  {
    path: 'search-page', component: SearchPageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'create-vehicle', component: VehicleManagementComponent
  },
  {
    path: 'my-profile', component: MyProfileComponent
  },
  {
    path: 'tracking', component: TrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
