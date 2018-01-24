import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAttachmentPage } from './patient-attachment';

@NgModule({
  declarations: [
    PatientAttachmentPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAttachmentPage),
  ],
})
export class PatientAttachmentPageModule {}
