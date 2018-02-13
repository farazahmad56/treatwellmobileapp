import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientFindDoctorPage} from '../../pages/pages';;
/**
 * Generated class for the PatientDoctorFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-doctor-filter',
    templateUrl: 'patient-doctor-filter.html',
})
export class PatientDoctorFilterPage {
    private searchDoctor: FormGroup;
    cities: any;
    specilities: any;
    area: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private formBuilder: FormBuilder,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController) {
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
        //        this.getArea('3');
        this.searchDoctor = this.formBuilder.group({
            specilityId: ['10', Validators.required],
            cityId: ['3'],
            areaId: ['']
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
    searchDoctors() {
        var obj = this.searchDoctor.value;
        this.navCtrl.push(PatientFindDoctorPage, {
            specilityId: obj.specilityId,
            cityId: obj.cityId,
            areaId: obj.areaId
        });
        //this.navCtrl.push(PatientDoctorFilterPage);
    }

}
