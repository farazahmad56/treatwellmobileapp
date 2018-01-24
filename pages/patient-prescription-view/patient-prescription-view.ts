import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
/**
 * Generated class for the PatientPrescriptionViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-prescription-view',
    templateUrl: 'patient-prescription-view.html',
})
export class PatientPrescriptionViewPage {
    private presc: any;
    private medicines: any;
    private labTests: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage) {
        this.presc = navParams.get("post");
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getPrescriptionForMedicine(this.presc.TW_PRESCRIPTION_MASTER_ID)
            .subscribe(
            data => {this.medicines = data;},
            err => {
                console.log(err);
            });
        this.medicalServiceProvider.getPrescriptionForLabTest(this.presc.TW_PRESCRIPTION_MASTER_ID)
            .subscribe(
            data => {loading.dismiss(); this.labTests = data;},
            err => {
                console.log(err);
            });
    }



}
