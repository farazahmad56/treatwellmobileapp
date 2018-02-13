import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientClinicResultPage} from '../../pages/pages';

/**
 * Generated class for the PatientSearchClinicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-search-clinic',
    templateUrl: 'patient-search-clinic.html',
})
export class PatientSearchClinicPage {
    private searchPharmacy: FormGroup;
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

        this.searchPharmacy = this.formBuilder.group({
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
    searchPharmacies() {
        var obj = this.searchPharmacy.value;
        this.navCtrl.push(PatientClinicResultPage, {
            cityId: obj.cityId,
            areaId: obj.areaId
        });
    }
}
