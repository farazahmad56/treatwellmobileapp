import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientDoctorFilterPage } from './patient-doctor-filter';

@NgModule({
  declarations: [
    PatientDoctorFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientDoctorFilterPage),
  ],
})
export class PatientDoctorFilterPageModule {}
