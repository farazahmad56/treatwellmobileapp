import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {ToastController} from 'ionic-angular';
import {PatientHomePage} from '../../pages/pages';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the PatientConfirmAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-confirm-appointment',
    templateUrl: 'patient-confirm-appointment.html',
})
export class PatientConfirmAppointmentPage {
    private date: string;
    private time: string;
    private clinic: any;
    private doctor: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController,
        private toastCtrl: ToastController, public storage: Storage) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        this.date = navParams.get("date");
        this.time = navParams.get("time");
        this.clinic = navParams.get("clinic");
        this.doctor = navParams.get("doctor");

        loading.dismiss();

    }
    confirmAppointment() {
        let toast = this.toastCtrl.create({
            message: 'Success! Your appointment is saved.',
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.onDidDismiss(() => {
            this.navCtrl.setRoot(PatientHomePage);
        });
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.storage.get('loggedInPatientId').then((val) => {
            if (val !== '') {
                loading.present();
                this.medicalServiceProvider.saveAppointment(this.doctor.TW_DOCTOR_ID, this.clinic.TW_CLINIC_ID, val,
                    this.date, this.time)
                    .subscribe(
                    data => {
                        loading.dismiss();
                        if (data.result === 'save_success') {
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
