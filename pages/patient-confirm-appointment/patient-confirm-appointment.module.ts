import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientConfirmAppointmentPage } from './patient-confirm-appointment';

@NgModule({
  declarations: [
    PatientConfirmAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientConfirmAppointmentPage),
  ],
})
export class PatientConfirmAppointmentPageModule {}
