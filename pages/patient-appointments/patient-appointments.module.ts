import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PatientAppointmentsPage} from './patient-appointments';

@NgModule({
    declarations: [
        PatientAppointmentsPage,
    ],
    imports: [
        IonicPageModule.forChild(PatientAppointmentsPage),
    ], exports: [
        PatientAppointmentsPage
    ]
})
export class PatientAppointmentsPageModule {}
