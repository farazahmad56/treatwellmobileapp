import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSelectPharmacyPage } from './patient-select-pharmacy';

@NgModule({
  declarations: [
    PatientSelectPharmacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSelectPharmacyPage),
  ],
})
export class PatientSelectPharmacyPageModule {}
