import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientDoctorFilterPage} from '../../pages/pages';
import {PatientAppointmentsPage} from '../../pages/pages';
import {PatientAttachmentPage} from '../../pages/pages';
import {ViewFavDoctorsPage} from '../../pages/pages';
import {PatientPrescriptionListPage} from '../../pages/pages';
import {PatientSearchClinicPage} from '../../pages/pages';
import {ChangePasswordPage} from '../../pages/pages';
import {HomePage} from '../../pages/pages';
import {PatientClinicSearchPage} from '../../pages/pages';
import {Storage} from '@ionic/storage';
import {SocialSharing} from '@ionic-native/social-sharing';
/**
 * Generated class for the PatientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-home',
    templateUrl: 'patient-home.html',
})
export class PatientHomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
        public socialSharing: SocialSharing) {

    }
    openFindDoctor() {
        this.navCtrl.push(PatientDoctorFilterPage);
    }
    openViewAppointments() {
        this.navCtrl.push(PatientAppointmentsPage);
    }
    openAttachment() {
        this.navCtrl.push(PatientAttachmentPage);
    }
    logOutUser() {
        this.storage.remove('loggedInPatientId');
        this.navCtrl.setRoot(HomePage);
    }
    openFavDoctors() {
        this.navCtrl.push(ViewFavDoctorsPage);
    }
    openViewPrescriptions() {
        this.navCtrl.push(PatientPrescriptionListPage);
    }
    openFindPharmacy() {
        this.navCtrl.push(PatientSearchClinicPage);
    }
    openChangePassword() {
        this.navCtrl.push(ChangePasswordPage);
    }
    openFindHospital() {
        this.navCtrl.push(PatientClinicSearchPage);
    }
    shareApplicationCode() {
        var msg = 'Kindly download our app ezimedic to schedule your future appointments directly and to keep your medical record.';
        msg += ' To download please visit: https://play.google.com/store/apps/details?id=com.fabsol.ezimedic';
        this.socialSharing.share(msg, null, null, null);
    }
}
