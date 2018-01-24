import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSearchClinicPage } from './patient-search-clinic';

@NgModule({
  declarations: [
    PatientSearchClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSearchClinicPage),
  ],
})
export class PatientSearchClinicPageModule {}
