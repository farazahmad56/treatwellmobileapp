import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PatientSelectPharmacyPage} from './patient-select-pharmacy';

@NgModule({
    declarations: [
        PatientSelectPharmacyPage,
    ],
    imports: [
        IonicPageModule.forChild(PatientSelectPharmacyPage),
    ], exports: [
        PatientSelectPharmacyPage
    ]
})
export class PatientSelectPharmacyPageModule {}
