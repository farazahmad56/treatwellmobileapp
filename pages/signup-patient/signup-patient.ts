import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientIntakePage} from '../../pages/pages';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ToastController} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
declare var moment: any;
/**
 * Generated class for the SignupPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signup-patient',
    templateUrl: 'signup-patient.html',
})
export class SignupPatientPage {
    private patient: FormGroup;
    cities: any;
    area: any;
    bloodGroups: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage, private toastCtrl: ToastController) {
        this.patient = this.formBuilder.group({
            patientName: ['', Validators.required],
            contactNo: ['', Validators.required],
            email: [''],
            dob: ['', Validators.required],
            age: [''],
            gender: ['M'],
            profession: [''],
            referredBy: [''],
            cityId: ['3'],
            bloodGroupId: ['2'],
            canDonateBlood: ['N'],
            areaId: ['']
        });
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getCities()
            .subscribe(
            data => {this.cities = data;},
            err => {
                console.log(err);
            });
        this.medicalServiceProvider.getBloodGroups()
            .subscribe(
            data => {loading.dismiss(); this.bloodGroups = data;},
            err => {
                console.log(err);
            });
        this.getArea(this.patient.value.cityId);
    }


    savePatientInfo() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = this.patient.value;

        var dob = moment(obj.dob);
        if (obj.age === '') {
            var a = moment();
            var b = dob;
            var age = a.diff(b, 'years'); // 1
            obj.age = age;
        }
        dob = dob.format('DD-MM-YYYY');
        this.medicalServiceProvider.savePatient(obj, dob)
            .subscribe(
            data => {
                loading.dismiss();
                if (data.result === 'save_success') {
                    var patientId = data.patientId;
                    this.showMessage('Your account has been created. Please wait for sms to get username and password for your account.');
                } else {
                    this.showMessage('You are entering a mobile number which is seems to be used already. Please try again with a valid mobile number .');
                }
            },
            err => {
                console.log(err);
            });
    }

    showMessage(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.onDidDismiss(() => {
            this.navCtrl.setRoot(HomePage);
        });
        toast.present();
    }
    getArea(cityId: string) {
        let loadingArea = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loadingArea.present();
        this.medicalServiceProvider.getAreas(cityId)
            .subscribe(
            data => {loadingArea.dismiss(); this.area = data;},
            err => {
                console.log(err);
            });
    }
}
