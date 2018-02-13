import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientSelectDatePage} from '../../pages/pages';

/**
 * Generated class for the PatientSelectClinicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-select-clinic',
    templateUrl: 'patient-select-clinic.html',
})
export class PatientSelectClinicPage {
    private doctor: any;
    private doctorId: string;
    private clinics: any;
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public navParams: NavParams) {
        this.doctor = this.navParams.get('doctor');
        this.doctorId = this.doctor.TW_DOCTOR_ID;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getDoctorClinic(this.doctorId)
            .subscribe(
            data => {loading.dismiss(); this.clinics = data;},
            err => {
                console.log(err);
            });
    }
    selectClinic(clinicObj: any) {
        var clinic = clinicObj;
        this.navCtrl.push(PatientSelectDatePage, {
            clinic: clinic,
            doctor: this.doctor
        });
    }


}
