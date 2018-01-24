import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientHomePage} from '../../pages/patient-home/patient-home';
declare var calcMD5: any;
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-change-password',
    templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
    private userInfo: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private formBuilder: FormBuilder,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController,
        private toastCtrl: ToastController, public storage: Storage) {
        this.userInfo = this.formBuilder.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            newRetyePassword: ['', Validators.required]
        });
    }

    processChangePassword() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        var obj = this.userInfo.value;
        if (obj) {
            if (obj.newPassword === obj.newRetyePassword) {
                var currentPassword = calcMD5(obj.currentPassword);
                var newPassword = calcMD5(obj.newPassword);
                this.storage.get('loggedInUserName').then((val) => {
                    if (val != null && val !== '') {
                        loading.present();
                        this.medicalServiceProvider.changePassword(val, currentPassword, newPassword)
                            .subscribe(
                            data => {
                                loading.dismiss();
                                if (data.msg === 'saved') {
                                    let toast = this.toastCtrl.create({
                                        message: 'Your account password has been changed',
                                        duration: 4000,
                                        position: 'middle',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok'
                                    });
                                    toast.onDidDismiss(() => {
                                        this.navCtrl.setRoot(PatientHomePage);
                                    });
                                    toast.present();
                                } else {
                                    this.showToast('Your password can not be changed. Please contact system admin.');
                                }
                            },
                            err => {
                                console.log(err);
                            });
                    }
                });
            } else {
                this.showToast('New password and retype password are not same. Please try again.');
            }
        }
    }

    showToast(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }

}
