import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientSelectClinicPage} from '../../pages/pages';;
import {ToastController} from 'ionic-angular';
/**
 * Generated class for the PatientFindDoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-find-doctor',
    templateUrl: 'patient-find-doctor.html',
})
export class PatientFindDoctorPage {
    private doctors: any;
    private specilityId: any;
    private cityId: any;
    private areaId: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController) {
        this.specilityId = this.navParams.get('specilityId');
        this.cityId = this.navParams.get('cityId');
        this.areaId = this.navParams.get('areaId');

        this.loadDoctorsData();
    }
    loadDoctorsData() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getDoctorWithSpecilities(this.specilityId, this.cityId, this.areaId)
            .subscribe(
            data => {loading.dismiss(); this.doctors = data;},
            err => {
                console.log(err);
            });
    }
    selectDoctor(doctorObj: any) {
        var doctor = doctorObj;
        this.navCtrl.push(PatientSelectClinicPage, {
            doctor: doctor
        });
    }
    addToFavourites(doctorObj: any) {
        var doctor = doctorObj;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('loggedInPatientId').then((val) => {
            if (val != null && val !== '') {
                this.medicalServiceProvider.addToFavourites(doctor.TW_DOCTOR_ID, val)
                    .subscribe(
                    data => {
                        loading.dismiss();
                        if (data.result === 'save_success') {
                            let toast = this.toastCtrl.create({
                                message: 'Doctor added successfully.',
                                duration: 3000
                            });
                            toast.present();
                            this.loadDoctorsData();

                        } else {
                            let toast = this.toastCtrl.create({
                                message: 'Doctor already added.',
                                duration: 3000
                            });
                            toast.present();
                        }
                    },
                    err => {
                        console.log(err);
                    });
            }
        });
    }
}
