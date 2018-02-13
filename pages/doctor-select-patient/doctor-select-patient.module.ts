import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DoctorSelectPatientPage} from './doctor-select-patient';

@NgModule({
    declarations: [
        DoctorSelectPatientPage,
    ],
    imports: [
        IonicPageModule.forChild(DoctorSelectPatientPage),
    ], exports: [
        DoctorSelectPatientPage
    ]
})
export class DoctorSelectPatientPageModule {}
