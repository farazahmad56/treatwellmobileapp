import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSelectClinicPage } from './patient-select-clinic';

@NgModule({
  declarations: [
    PatientSelectClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSelectClinicPage),
  ],
})
export class PatientSelectClinicPageModule {}
