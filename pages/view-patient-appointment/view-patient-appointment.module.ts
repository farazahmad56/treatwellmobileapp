import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPatientAppointmentPage } from './view-patient-appointment';

@NgModule({
  declarations: [
    ViewPatientAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPatientAppointmentPage),
  ],
})
export class ViewPatientAppointmentPageModule {}
