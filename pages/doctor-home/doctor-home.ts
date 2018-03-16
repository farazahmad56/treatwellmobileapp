import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DoctorViewAppointmentsPage} from '../../pages/pages';;
import {HomePage} from '../../pages/home/home';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {DoctorSelectPatientPage} from '../../pages/pages';
import {SocialSharing} from '@ionic-native/social-sharing';
/**
 * Generated class for the DoctorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-doctor-home',
    templateUrl: 'doctor-home.html',
})
export class DoctorHomePage {
    private totalAppointments: number;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public socialSharing: SocialSharing) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.storage.get('loggedInDoctorId').then((val) => {
            if (val !== '') {
                loading.present();
                this.medicalServiceProvider.getDoctorAppointments(val)
                    .subscribe(
                    data => {loading.dismiss(); this.totalAppointments = data.length;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }

    openViewAppointments() {
        this.navCtrl.push(DoctorViewAppointmentsPage);
    }
    logOutUser() {
        this.storage.remove('loggedInDoctorId');
        this.navCtrl.setRoot(HomePage);
    }
    openAddPrescription() {
        this.navCtrl.push(DoctorSelectPatientPage);
    }
    shareApplicationCode() {
        var msg = 'Kindly download our app ezimedic to schedule your patient appointments directly and to keep your patients record.';
        msg += ' To download please visit: https://play.google.com/store/apps/details?id=com.fabsol.ezimedic';
        this.socialSharing.share(msg, null, null, null);
    }
}
