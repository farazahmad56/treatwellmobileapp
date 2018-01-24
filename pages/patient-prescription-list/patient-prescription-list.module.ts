import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientPrescriptionListPage } from './patient-prescription-list';

@NgModule({
  declarations: [
    PatientPrescriptionListPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientPrescriptionListPage),
  ],
})
export class PatientPrescriptionListPageModule {}
