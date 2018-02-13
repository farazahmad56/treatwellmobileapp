import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientIntakePage} from '../../pages/pages';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
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
    bloodGroups: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider,
        public storage: Storage) {
        this.patient = this.formBuilder.group({
            patientName: ['', Validators.required],
            contactNo: ['', Validators.required],
            email: [''],
            dob: [''],
            age: [''],
            gender: ['M'],
            profession: [''],
            referredBy: [''],
            cityId: ['3'],
            bloodGroupId: ['2'],
            canDonateBlood: ['N']
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
    }


    savePatientInfo() {
        //        this.navCtrl.push(PatientIntakePage, {
        //            patientId: '108'
        //        });
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = this.patient.value;
        if (obj.dob !== '') {
            var dob = moment(obj.dob);
            obj.dob = dob.format('DD-MM-YYYY');
            if (obj.age === '') {
                var a = moment();
                var b = dob;
                var age = a.diff(b, 'years'); // 1
                obj.age = age;
            }

        }
        this.medicalServiceProvider.savePatient(obj)
            .subscribe(
            data => {
                loading.dismiss();
                if (data.result === 'save_success') {
                    var patientId = data.patientId;
                    this.navCtrl.setRoot(PatientIntakePage, {
                        patientId: patientId
                    });
                }
            },
            err => {
                console.log(err);
            });
    }
}
