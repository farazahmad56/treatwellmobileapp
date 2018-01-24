import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {LoadingController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AlertController} from 'ionic-angular';
import {PharmaHomePage} from '../../pages/pharma-home/pharma-home';
import {Geolocation} from '@ionic-native/geolocation';
import {Device} from '@ionic-native/device';
declare var moment: any;
/**
 * Generated class for the PharmaDoctorSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-pharma-doctor-search',
    templateUrl: 'pharma-doctor-search.html',
})
export class PharmaDoctorSearchPage {
    private doctors: any;
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
        public medicalServiceProvider: MedicalServiceProvider, public alertCtrl: AlertController,
        public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController,
        private geolocation: Geolocation, private device: Device) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.storage.get('loggedInPharmaId').then((loggedInPharmaId) => {
            if (loggedInPharmaId !== '') {
                this.storage.get('medicalRepId').then((medicalRepId) => {
                    if (medicalRepId && medicalRepId !== '') {
                        loading.present();
                        this.medicalServiceProvider.getDoctorForPharmaBricks(loggedInPharmaId, medicalRepId)
                            .subscribe(
                            data => {loading.dismiss(); this.doctors = data;},
                            err => {
                                console.log(err);
                            });
                    }
                });
            }
        });

    }

    selectDoctor(post: any) {

        let confirm = this.alertCtrl.create({
            title: 'Confirm Visit?',
            message: 'Do you want to confirm the visit?',
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
                        let loading = this.loadingCtrl.create({
                            content: 'Please wait...'
                        });
                        this.storage.get('medicalRepId').then((medicalRepId) => {
                            if (medicalRepId && medicalRepId !== '') {
                                loading.present();
                                this.geolocation.getCurrentPosition().then((resp) => {
                                    var day = moment(resp.timestamp);
                                    var deviceDate = day.format('DD-MM-YYYY HH:mm');
                                    var obj = {
                                        doctorId: post.TW_DOCTOR_ID, repId: medicalRepId, latitude: resp.coords.latitude,
                                        longitude: resp.coords.longitude, deviceDate: deviceDate,
                                        deviceModel: this.device.model + ', ' + this.device.manufacturer,
                                        deviceSerial: this.device.serial
                                    };

                                    this.medicalServiceProvider.saveMedicalRepVisit(obj)
                                        .subscribe(
                                        data => {
                                            loading.dismiss();
                                            if (data.result === 'save_success') {
                                                let toast = this.toastCtrl.create({
                                                    message: 'Your location saved successfully.',
                                                    duration: 4000,
                                                    position: 'middle',
                                                    showCloseButton: true,
                                                    closeButtonText: 'Ok'
                                                });
                                                toast.onDidDismiss(() => {
                                                    this.navCtrl.setRoot(PharmaHomePage);
                                                });

                                                toast.present();
                                            } else {
                                                this.presentToast('Your location could not be saved. Please try again later.');
                                            }
                                        },
                                        err => {
                                            console.log(err);
                                        });

                                }).catch((error) => {
                                    console.log('Error getting location. Please try again', error);
                                    this.presentToast('Error getting location. Please try again');
                                });
                            }
                        });

                    }
                }
            ]
        });
        confirm.present();
    }
    presentToast(msg: any) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');

        });

        toast.present();
    }
}
