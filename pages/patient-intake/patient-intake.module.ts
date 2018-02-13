import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PatientIntakePage} from './patient-intake';

@NgModule({
    declarations: [
        PatientIntakePage,
    ],
    imports: [
        IonicPageModule.forChild(PatientIntakePage),
    ], exports: [
        PatientIntakePage
    ]
})
export class PatientIntakePageModule {}
