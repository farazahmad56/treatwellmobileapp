import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientClinicViewDoctorPage } from './patient-clinic-view-doctor';

@NgModule({
  declarations: [
    PatientClinicViewDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientClinicViewDoctorPage),
  ],
})
export class PatientClinicViewDoctorPageModule {}
