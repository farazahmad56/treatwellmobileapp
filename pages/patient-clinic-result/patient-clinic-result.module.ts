import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PatientClinicResultPage} from './patient-clinic-result';

@NgModule({
    declarations: [
        PatientClinicResultPage,
    ],
    imports: [
        IonicPageModule.forChild(PatientClinicResultPage),
    ], exports: [
        PatientClinicResultPage
    ]
})
export class PatientClinicResultPageModule {}
