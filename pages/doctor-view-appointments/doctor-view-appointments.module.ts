import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DoctorViewAppointmentsPage} from './doctor-view-appointments';

@NgModule({
    declarations: [
        DoctorViewAppointmentsPage,
    ],
    imports: [
        IonicPageModule.forChild(DoctorViewAppointmentsPage),
    ], exports: [
        DoctorViewAppointmentsPage
    ]
})
export class DoctorViewAppointmentsPageModule {}
