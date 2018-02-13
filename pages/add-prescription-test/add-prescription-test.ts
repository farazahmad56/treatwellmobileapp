import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';

/**
 * Generated class for the AddPrescriptionTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-prescription-test',
    templateUrl: 'add-prescription-test.html',
})
export class AddPrescriptionTestPage {
    private tests: FormGroup;
    private test: any;
    private lab: any;
    private collectionCenter: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public viewCtrl: ViewController,
        private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
        this.tests = this.formBuilder.group({
            test: ['', Validators.required],
            lab: [''],
            collectionCenter: ['']
        });
        let loadingArea = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loadingArea.present();
        this.medicalServiceProvider.getLabTests()
            .subscribe(
            data => {this.test = data;},
            err => {
                console.log(err);
            });
        //Labs
        this.medicalServiceProvider.getLabs()
            .subscribe(
            data => {loadingArea.dismiss(); this.lab = data;},
            err => {
                console.log(err);
            });
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    addLabTest() {
        this.viewCtrl.dismiss(this.tests.value);
    }
    getCollectionCenters(lab: any) {
        let loadingArea = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loadingArea.present();
        this.medicalServiceProvider.getLabCollectionCenters(lab.TW_LAB_MASTER_ID)
            .subscribe(
            data => {loadingArea.dismiss(); this.collectionCenter = data;},
            err => {
                console.log(err);
            });
    }
}
