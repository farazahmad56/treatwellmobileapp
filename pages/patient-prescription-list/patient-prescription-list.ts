import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientPrescriptionViewPage} from '../../pages/pages';
/**
 * Generated class for the PatientPrescriptionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-prescription-list',
    templateUrl: 'patient-prescription-list.html',
})
export class PatientPrescriptionListPage {
    private posts: string;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.storage.get('loggedInPatientId').then((val) => {
            if (val && val !== '') {
                loading.present();
                this.medicalServiceProvider.getPrescriptionMasterForPatient(val)
                    .subscribe(
                    data => {loading.dismiss(); this.posts = data;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }
    viewDetail(post: any) {
        this.navCtrl.push(PatientPrescriptionViewPage, {
            post: post
        });
    }

}
