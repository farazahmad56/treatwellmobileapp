import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DoctorAddPrescriptionPage} from './doctor-add-prescription';

@NgModule({
    declarations: [
        DoctorAddPrescriptionPage,
    ],
    imports: [
        IonicPageModule.forChild(DoctorAddPrescriptionPage),
    ], exports: [
        DoctorAddPrescriptionPage
    ]
})
export class DoctorAddPrescriptionPageModule {}
