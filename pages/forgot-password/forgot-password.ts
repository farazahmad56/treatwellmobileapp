import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {HomePage} from '../../pages/pages';;
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-forgot-password',
    templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
    private user: any = {};
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {

    }
    validateMobileNo() {
        if (this.user.mobileNo !== '') {
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            this.medicalServiceProvider.resetPassword(this.user.mobileNo)
                .subscribe(
                data => {
                    loading.dismiss();
                    if (data.result === 'save_success') {
                        let toast = this.toastCtrl.create({
                            message: 'New password has been sent via sms. If you will not receive any sms within 5 minutes contact treatwell services.',
                            duration: 5000,
                            position: 'middle',
                            showCloseButton: true,
                            closeButtonText: 'Ok'
                        });
                        toast.onDidDismiss(() => {
                            this.navCtrl.setRoot(HomePage);
                        });
                        toast.present();
                    } else {
                        this.showToast('Your password can not be changed. It may be you have entered invalid mobile number. Please contact system administrator.');
                    }
                },
                err => {
                    console.log(err);
                });
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
