import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientDoctorFilterPage} from '../../pages/patient-doctor-filter/patient-doctor-filter';
import {PatientAppointmentsPage} from '../../pages/patient-appointments/patient-appointments';
import {PatientAttachmentPage} from '../../pages/patient-attachment/patient-attachment';
import {ViewFavDoctorsPage} from '../../pages/view-fav-doctors/view-fav-doctors';
import {PatientPrescriptionListPage} from '../../pages/patient-prescription-list/patient-prescription-list';
import {PatientSearchClinicPage} from '../../pages/patient-search-clinic/patient-search-clinic';
import {ChangePasswordPage} from '../../pages/change-password/change-password';
import {HomePage} from '../../pages/home/home';
import {Storage} from '@ionic/storage';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
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
}
