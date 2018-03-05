import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientClinicSearchResultPage} from '../../pages/pages';;

/**
 * Generated class for the PatientClinicSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-clinic-search',
    templateUrl: 'patient-clinic-search.html',
})
export class PatientClinicSearchPage {
    private searchDoctor: FormGroup;
    cities: any;
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
            data => {loading.dismiss(); this.cities = data;},
            err => {
                console.log(err);
            });

        this.searchDoctor = this.formBuilder.group({
            cityId: ['3'],
            areaId: ['']
        });
        this.getArea(this.searchDoctor.value.cityId);
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
    searchClinics() {
        var obj = this.searchDoctor.value;
        this.navCtrl.push(PatientClinicSearchResultPage, {
            cityId: obj.cityId,
            areaId: obj.areaId
        });
    }

}
