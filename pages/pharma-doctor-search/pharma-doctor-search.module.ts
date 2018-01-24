import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmaDoctorSearchPage } from './pharma-doctor-search';

@NgModule({
  declarations: [
    PharmaDoctorSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmaDoctorSearchPage),
  ],
})
export class PharmaDoctorSearchPageModule {}
