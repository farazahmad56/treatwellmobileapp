import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {AddPrescriptionMedicinePage} from '../../pages/pages';;
import {AddPrescriptionTestPage} from '../../pages/pages';;
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {DoctorHomePage} from '../../pages/pages';;
/**
 * Generated class for the DoctorAddPrescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-doctor-add-prescription',
    templateUrl: 'doctor-add-prescription.html',
})
export class DoctorAddPrescriptionPage {
    private medicineList: any = [];
    private testList: any = [];
    private patient: any;
    private prescription: any = {};
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public ModalCtrl: ModalController, private toastCtrl: ToastController,
        public loadingCtrl: LoadingController, public storage: Storage,
        public medicalServiceProvider: MedicalServiceProvider, public alertCtrl: AlertController) {
        this.patient = this.navParams.get('patient');
    }
    medicineModal() {
        let medicineModal = this.ModalCtrl.create(AddPrescriptionMedicinePage);
        medicineModal.present();
        medicineModal.onDidDismiss(data => {
            if (data) {
                this.medicineList.push({
                    medicine: data.medicine, frequency: data.frequency, usageList: data.usageList,
                    days: data.days, quantity: data.quantity
                });
            }
        });

    }
    testModal() {
        let testModal = this.ModalCtrl.create(AddPrescriptionTestPage);
        testModal.present();
        testModal.onDidDismiss(data => {
            if (data) {
                this.testList.push({test: data.test, lab: data.lab, collectionCenter: data.collectionCenter});
            }
        });
    }
    savePrescription() {

        let confirm = this.alertCtrl.create({
            title: 'Saving warning?',
            message: 'Do you agree to save this prescription without any medicine added?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.processSavePrescription();
                    }
                }
            ]
        });
        if (this.medicineList.length && this.medicineList.length > 0) {
            this.processSavePrescription();
        } else {
            confirm.present();
        }
    }
    processSavePrescription() {
        this.storage.get('loggedInDoctorId').then((val) => {
            if (val !== null && val !== '') {
                var userName = '';
                this.storage.get('loggedInDoctorName').then((name) => {
                    if (name !== null && name !== '') {
                        userName = name;
                    }
                });
                var remarks = this.prescription.doctorRemarks;
                var obj = {
                    patientId: this.patient.TW_PATIENT_ID, clinicId: this.patient.TW_CLINIC_ID,
                    remarks: remarks, doctorId: val, userName: userName,
                    medicineList: this.medicineList, testList: this.testList
                };

                let toast = this.toastCtrl.create({
                    message: 'Success! Prescription has been saved.',
                    duration: 3000,
                    position: 'bottom',
                    showCloseButton: true,
                    closeButtonText: 'Ok'
                });
                toast.onDidDismiss(() => {
                    this.navCtrl.setRoot(DoctorHomePage);
                });
                let loading = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading.present();
                this.medicalServiceProvider.savePrescription(obj)
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
        });

    }

}