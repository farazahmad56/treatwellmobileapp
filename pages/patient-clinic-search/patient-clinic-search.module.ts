import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientClinicSearchPage } from './patient-clinic-search';

@NgModule({
  declarations: [
    PatientClinicSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientClinicSearchPage),
  ],
})
export class PatientClinicSearchPageModule {}
