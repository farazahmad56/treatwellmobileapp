import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
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
    private testList: any = [];
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public viewCtrl: ViewController,
        private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.testList = this.navParams.get('testList');
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
        this.viewCtrl.dismiss(this.testList);
    }
    addLabTest() {
        let data = this.tests.value;
        if (!this.isLabTestAlreadyExists(data.test)) {
            this.testList.push({test: data.test, lab: data.lab, collectionCenter: data.collectionCenter});
        } else {
            let alert = this.alertCtrl.create({
                title: 'Duplicate Test!',
                subTitle: 'Test already added in list!',
                buttons: ['OK']
            });
            alert.present();
        }

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

    deleteTest(index: any) {
        this.testList.splice(index, 1);
    }

    isLabTestAlreadyExists(testId: string) {
        var flag: boolean = false;
        for (var i = 0; i < this.testList.length; i++) {
            if (this.testList[i].test === testId) {
                flag = true;
                break;
            }
        }
        return flag;
    }
}
