import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientSelectClinicPage} from '../../pages/patient-select-clinic/patient-select-clinic';
import {ToastController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
/**
 * Generated class for the ViewFavDoctorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-view-fav-doctors',
    templateUrl: 'view-fav-doctors.html',
})
export class ViewFavDoctorsPage {
    doctors: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('loggedInPatientId').then((val) => {
            if (val != null && val !== '') {
                this.medicalServiceProvider.getFavouriteDoctors(val)
                    .subscribe(
                    data => {loading.dismiss(); this.doctors = data;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }

    deleteFavourites(doctorObj: any) {
        var id = doctorObj.TW_PATIENT_DOCTOR_ID;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        let confirm = this.alertCtrl.create({
            title: 'Confirm Deletion?',
            message: 'Do you want to remove doctor?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        loading.present();
                        this.medicalServiceProvider.deleteFavouriteDoctor(id)
                            .subscribe(
                            data => {
                                loading.dismiss();
                                if (data.result === 'save_success') {
                                    let toast = this.toastCtrl.create({
                                        message: 'Doctor removed from favorites.',
                                        duration: 3000
                                    });
                                    toast.present();
                                    this.storage.get('loggedInPatientId').then((val) => {
                                        if (val != null && val !== '') {
                                            this.medicalServiceProvider.getFavouriteDoctors(val)
                                                .subscribe(
                                                data => {this.doctors = data;},
                                                err => {
                                                    console.log(err);
                                                });
                                        }
                                    });

                                } else {
                                    let toast = this.toastCtrl.create({
                                        message: 'Error in removing from favorites.',
                                        duration: 3000
                                    });
                                    toast.present();
                                }
                            },
                            err => {
                                console.log(err);
                            });
                    }
                }
            ]
        });
        confirm.present();

    }
    selectDoctor(doctorObj: any) {
        var doctor = doctorObj;
        this.navCtrl.push(PatientSelectClinicPage, {
            doctor: doctor
        });
    }
}
