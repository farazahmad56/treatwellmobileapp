import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PatientPrescriptionViewPage} from './patient-prescription-view';

@NgModule({
    declarations: [
        PatientPrescriptionViewPage,
    ],
    imports: [
        IonicPageModule.forChild(PatientPrescriptionViewPage),
    ], exports: [
        PatientPrescriptionViewPage
    ]
})
export class PatientPrescriptionViewPageModule {}
