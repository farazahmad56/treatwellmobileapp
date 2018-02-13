import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupPatientPage} from './signup-patient';

@NgModule({
    declarations: [
        SignupPatientPage,
    ],
    imports: [
        IonicPageModule.forChild(SignupPatientPage),
    ], exports: [
        SignupPatientPage
    ]
})
export class SignupPatientPageModule {}
