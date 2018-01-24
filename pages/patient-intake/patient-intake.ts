import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {HomePage} from '../../pages/home/home';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {ToastController} from 'ionic-angular';

/**
 * Generated class for the PatientIntakePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-intake',
    templateUrl: 'patient-intake.html',
    providers: [MedicalServiceProvider]
})
export class PatientIntakePage {
    diseases: any;
    patientId: any;

    private inTakeForm: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController, public medicalService: MedicalServiceProvider,
        public storage: Storage, private toastCtrl: ToastController) {
        this.inTakeForm = this.formBuilder.group({
            attendClinic: ['N'],
            medicineOpt: ['N'],
            steroidOpt: ['N'],
            allergy: ['N'],
            rheumatic: ['N'],
            smoker: ['N'],
            diseaseId: this.formBuilder.array([])
        });
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.patientId = navParams.get('patientId');
        this.medicalService.getDiseases()
            .subscribe(
            data => {loading.dismiss(); this.diseases = data;},
            err => {
                console.log(err);
            });
    }
    onChange(id: string, isChecked: boolean) {
        const diseaseIdArr = <FormArray> this.inTakeForm.controls.diseaseId;
        if (isChecked) {
            diseaseIdArr.push(new FormControl(id));
        } else {
            let index = diseaseIdArr.controls.findIndex(x => x.value == id)
            diseaseIdArr.removeAt(index);
        }
    }
    savePatientIntake() {
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
        var obj = this.inTakeForm.value;
        this.medicalService.savePatientInTakeForm(obj, this.patientId)
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
