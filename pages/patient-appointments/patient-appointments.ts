import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
/**
 * Generated class for the PatientAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-appointments',
    templateUrl: 'patient-appointments.html',
})
export class PatientAppointmentsPage {
    private dates: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController,
        public alertCtrl: AlertController) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('loggedInPatientId').then((val) => {
            if (val !== '') {
                this.medicalServiceProvider.getPatientAppointments(val)
                    .subscribe(
                    data => {loading.dismiss(); this.dates = data;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }

    cancelAppointment(appointment: any) {
        let toast = this.toastCtrl.create({
            message: 'Your appointment cancelled successfully.',
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        let confirm = this.alertCtrl.create({
            title: 'Confirm Cancellation?',
            message: 'Do you want to cancel appointment?',
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
                        this.medicalServiceProvider.cancelAppointment(appointment.TW_APPOINTMENT_ID).subscribe(
                            data => {
                                if (data.result === 'save_success') {
                                    toast.present();
                                    //
                                    this.storage.get('loggedInPatientId').then((val) => {
                                        if (val !== '') {
                                            this.medicalServiceProvider.getPatientAppointments(val)
                                                .subscribe(
                                                data => {loading.dismiss(); this.dates = data;},
                                                err => {
                                                    console.log(err);
                                                });
                                        }
                                    });
                                    //
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

}
