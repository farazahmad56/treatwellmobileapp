import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {HomePage} from '../../pages/pages';;
import {ToastController} from 'ionic-angular';
/**
 * Generated class for the DoctorSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-doctor-signup',
    templateUrl: 'doctor-signup.html',
})
export class DoctorSignupPage {
    private doctor: FormGroup;
    cities: any;
    specilities: any;
    clinics: any;
    area: any;
    showNewClinic: boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {
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

        this.medicalServiceProvider.getDoctorSpecilities()
            .subscribe(
            data => {loading.dismiss(); this.specilities = data;},
            err => {
                console.log(err);
            });


        this.doctor = this.formBuilder.group({
            doctorName: ['', Validators.required],
            contactNo: ['', Validators.required],
            email: ['', Validators.required],
            pmdcNo: ['', Validators.required],
            totalExp: ['1'],
            consultancyFee: ['1500'],
            specilityId: ['10', Validators.required],
            cityId: ['3'],
            address: [''],
            gender: ['M']

        });
    }

    saveDoctorInfo() {
        let toast = this.toastCtrl.create({
            message: 'Your information has been saved. Please wait for call from our representative.',
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.onDidDismiss(() => {
            this.navCtrl.setRoot(HomePage);
        });
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = this.doctor.value;
        this.medicalServiceProvider.saveDoctor(obj)
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
}
