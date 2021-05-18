import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateEntryComponent} from './create-entry/create-entry.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'app-create-entry', component: CreateEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
