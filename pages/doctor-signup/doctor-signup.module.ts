import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DoctorSignupPage} from './doctor-signup';

@NgModule({

    declarations: [
        DoctorSignupPage,
    ],
    imports: [
        IonicPageModule.forChild(DoctorSignupPage),
    ],
})
export class DoctorSignupPageModule {}
