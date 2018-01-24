import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SignupPatientPage} from '../../pages/signup-patient/signup-patient';
import {DoctorSignupPage} from '../../pages/doctor-signup/doctor-signup';
/**
 * Generated class for the SignupTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signup-type',
    templateUrl: 'signup-type.html',
})
export class SignupTypePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    openSignupForPatient() {
        this.navCtrl.push(SignupPatientPage);
    }

    openSignupForDoctor() {
        this.navCtrl.push(DoctorSignupPage);
    }

}
