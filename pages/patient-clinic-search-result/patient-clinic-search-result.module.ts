import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientClinicSearchResultPage } from './patient-clinic-search-result';

@NgModule({
  declarations: [
    PatientClinicSearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientClinicSearchResultPage),
  ],
})
export class PatientClinicSearchResultPageModule {}
