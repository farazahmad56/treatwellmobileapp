import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {DoctorAddPrescriptionPage} from '../../pages/pages';
declare var moment: any;
/**
 * Generated class for the DoctorSelectPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-doctor-select-patient',
    templateUrl: 'doctor-select-patient.html',
})
export class DoctorSelectPatientPage {
    private posts: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController,
        public storage: Storage) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.storage.get('loggedInDoctorId').then((val) => {
            if (val !== null && val !== '') {
                loading.present();
                var m = moment();
                var dt = m.format('DD-MM-YYYY');
                this.medicalServiceProvider.getDoctorAppointments(val, dt)
                    .subscribe(
                    data => {loading.dismiss(); this.posts = data;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }

    selectPatient(post: any) {
        this.navCtrl.push(DoctorAddPrescriptionPage, {
            patient: post
        });
    }

}
