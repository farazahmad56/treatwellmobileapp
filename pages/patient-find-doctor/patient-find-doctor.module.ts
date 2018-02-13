import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PatientFindDoctorPage} from './patient-find-doctor';

@NgModule({
    declarations: [
        PatientFindDoctorPage,
    ],
    imports: [
        IonicPageModule.forChild(PatientFindDoctorPage),
    ], exports: [
        PatientFindDoctorPage
    ]
})
export class PatientFindDoctorPageModule {}
