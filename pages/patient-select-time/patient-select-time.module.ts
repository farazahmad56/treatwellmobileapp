import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSelectTimePage } from './patient-select-time';

@NgModule({
  declarations: [
    PatientSelectTimePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSelectTimePage),
  ],
})
export class PatientSelectTimePageModule {}
