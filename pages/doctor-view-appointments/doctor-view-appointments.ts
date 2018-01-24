import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
/**
 * Generated class for the DoctorViewAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-doctor-view-appointments',
    templateUrl: 'doctor-view-appointments.html',
})
export class DoctorViewAppointmentsPage {
    private dates: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.storage.get('loggedInDoctorId').then((val) => {
            if (val !== '') {
                loading.present();
                this.medicalServiceProvider.getDoctorAppointments(val)
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
