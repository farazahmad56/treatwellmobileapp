import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientSelectDatePage} from '../../pages/pages';;
import {ToastController} from 'ionic-angular';

/**
 * Generated class for the PatientClinicViewDoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-clinic-view-doctor',
    templateUrl: 'patient-clinic-view-doctor.html',
})
export class PatientClinicViewDoctorPage {
    private doctors: any;
    private clinic: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController) {
        this.clinic = this.navParams.get('clinicId');
        this.loadDoctorsData();
    }
    loadDoctorsData() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getDoctorsByClinics(this.clinic.TW_CLINIC_ID)
            .subscribe(
            data => {loading.dismiss(); this.doctors = data;},
            err => {
                console.log(err);
            });
    }

    selectDate(doctorObj: any) {
        var doctor = doctorObj;
        var clinic = {
            ADDRESS: this.clinic.ADDRESS, CLINIC_NME: this.clinic.CLINIC_NME,
            PHONE_NO: "", TIME_FROM: doctorObj.TIME_FROM,
            TIME_TO: doctorObj.TIME_TO,
            TOTAL_APPOINTMENT: doctorObj.TOTAL_APPOINTMENT,
            TW_CLINIC_ID: this.clinic.TW_CLINIC_ID
        };
        this.navCtrl.push(PatientSelectDatePage, {
            doctor: doctor,
            clinic: clinic
        });
    }
    //    addToFavourites(doctorObj: any) {
    //        var doctor = doctorObj;
    //        let loading = this.loadingCtrl.create({
    //            content: 'Please wait...'
    //        });
    //        loading.present();
    //        this.storage.get('loggedInPatientId').then((val) => {
    //            if (val != null && val !== '') {
    //                this.medicalServiceProvider.addToFavourites(doctor.TW_DOCTOR_ID, val)
    //                    .subscribe(
    //                    data => {
    //                        loading.dismiss();
    //                        if (data.result === 'save_success') {
    //                            let toast = this.toastCtrl.create({
    //                                message: 'Doctor added successfully.',
    //                                duration: 3000
    //                            });
    //                            toast.present();
    //                            this.loadDoctorsData();
    //
    //                        } else {
    //                            let toast = this.toastCtrl.create({
    //                                message: 'Doctor already added.',
    //                                duration: 3000
    //                            });
    //                            toast.present();
    //                        }
    //                    },
    //                    err => {
    //                        console.log(err);
    //                    });
    //            }
    //        });
    //    }

}
