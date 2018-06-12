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
    public event = {
        timeStarts: '09:00',
        timeEnds: '21:00'
    }
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
            data => {this.specilities = data;},
            err => {
                console.log(err);
            });
        this.medicalServiceProvider.getClinics("3")
            .subscribe(
            data => {loading.dismiss(); this.clinics = data;},
            err => {
                console.log(err);
            });
        this.getArea('3');
        this.doctor = this.formBuilder.group({
            doctorName: ['', Validators.required],
            contactNo: ['', Validators.required],
            email: ['', Validators.email],
            loginId: ['', Validators.required],
            totalExp: ['', Validators.required],
            consultancyFee: ['1000', Validators.required],
            specilityId: ['10', Validators.required],
            cityId: ['3'],
            areaId: [''],
            newClinicName: [''],
            clinicName: [''],
            openTime: [''],
            closeTime: [''],
            maxAppointment: ['10'],
            clinicAddress: ['']

        });
    }

    saveDoctorInfo() {
        let toast = this.toastCtrl.create({
            message: 'Success! Your account has been created. Please wait for sms to get password for your login.',
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
    showClinicName(val: any) {
        if (val === '-1') {
            this.showNewClinic = true;
        } else {
            this.showNewClinic = false;
        }
    }
}
