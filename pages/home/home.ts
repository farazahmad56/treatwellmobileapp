import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {SignupTypePage} from '../../pages/pages';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {CallNumber} from '@ionic-native/call-number';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientHomePage} from '../../pages/pages';
import {DoctorHomePage} from '../../pages/pages';
import {PharmaHomePage} from '../../pages/pages';
import {ApplicationOverviewPage} from '../../pages/pages';
import {ForgotPasswordPage} from '../../pages/pages';
import 'rxjs/add/operator/map';
import {ToastController} from 'ionic-angular';
declare var calcMD5: any;
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private login: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController, public medicalService: MedicalServiceProvider,
        public storage: Storage, public toastCtrl: ToastController,
        private callNumber: CallNumber) {
        this.login = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.storage.get('isNewUser').then((val) => {
            if (val === null || val === 'N') {
                this.navCtrl.setRoot(ApplicationOverviewPage);
            }
        });
        this.storage.get('loggedInPatientId').then((val) => {
            if (val != null && val !== '') {
                this.navCtrl.setRoot(PatientHomePage);
            } else {
                this.storage.get('loggedInDoctorId').then((val) => {
                    if (val != null && val !== '') {
                        this.navCtrl.setRoot(DoctorHomePage);
                    } else {
                        this.storage.get('loggedInPharmaId').then((val) => {
                            if (val != null && val !== '') {
                                this.navCtrl.setRoot(PharmaHomePage);
                            }
                        });
                    }
                });
            }
        });
    }
    openSignupOptions() {
        this.navCtrl.push(SignupTypePage);
    }
    verifyLogin() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = this.login.value;
        var password = calcMD5(obj.password);
        this.medicalService.verifyLogin(obj.userName, password)
            .subscribe(
            data => {
                loading.dismiss();
                if (data.msg === 'Login') {
                    if (data.userType === 'patient') {
                        this.storage.set('loggedInPatientId', data.id);
                        this.storage.set('loggedInUserName', obj.userName);
                        this.storage.set('loggedInUserType', data.userType);
                        this.navCtrl.setRoot(PatientHomePage);
                    } else if (data.userType === 'doctor') {
                        this.storage.set('loggedInDoctorId', data.id);
                        this.storage.set('loggedInDoctorName', obj.userName);
                        this.navCtrl.setRoot(DoctorHomePage);
                    } else if (data.userType === 'pharma') {
                        this.storage.set('loggedInPharmaId', data.id);
                        this.storage.set('medicalRepId', data.medicalRepId);
                        this.navCtrl.setRoot(PharmaHomePage);
                    } else {
                        let toast = this.toastCtrl.create({
                            message: 'Please contact system admininistrator.',
                            duration: 3000
                        });
                        toast.present();
                    }
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'Invalid username or password. Please contact system admininistrator.',
                        duration: 3000
                    });
                    toast.present();
                }
            },
            err => {
                console.log(err);
            });
    }
    logOutUser() {
        this.storage.remove('loggedInPatientId');
        this.navCtrl.setRoot(HomePage);
    }

    callHelLine() {
        this.callNumber.callNumber("03200003511", true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }
    resetPassword() {
        this.navCtrl.setRoot(ForgotPasswordPage);
    }
}
