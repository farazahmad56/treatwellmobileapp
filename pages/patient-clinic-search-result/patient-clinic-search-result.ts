import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientClinicViewDoctorPage} from '../../pages/pages';
import {ToastController} from 'ionic-angular';

/**
 * Generated class for the PatientClinicSearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-clinic-search-result',
    templateUrl: 'patient-clinic-search-result.html',
})
export class PatientClinicSearchResultPage {
    private clinics: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController) {

        var cityId = this.navParams.get('cityId');
        var areaId = this.navParams.get('areaId');

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getClinicsByArea(cityId, areaId)
            .subscribe(
            data => {loading.dismiss(); this.clinics = data;},
            err => {
                console.log(err);
            });
    }
    selectClinic(obj: any) {
        this.navCtrl.push(PatientClinicViewDoctorPage, {
            clinicId: obj
        });
    }
}
