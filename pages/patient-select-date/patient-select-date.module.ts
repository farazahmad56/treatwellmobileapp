import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSelectDatePage } from './patient-select-date';

@NgModule({
  declarations: [
    PatientSelectDatePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSelectDatePage),
  ],
})
export class PatientSelectDatePageModule {}
