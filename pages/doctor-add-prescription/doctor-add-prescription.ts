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
import {DoctorHomePage} from '../../pages/pages';
declare var moment: any;
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
    private prescNo: any;
    private prescDate: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public ModalCtrl: ModalController, private toastCtrl: ToastController,
        public loadingCtrl: LoadingController, public storage: Storage,
        public medicalServiceProvider: MedicalServiceProvider, public alertCtrl: AlertController) {
        this.patient = this.navParams.get('patient');
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.storage.get('loggedInDoctorId').then((val) => {
            if (val !== '') {
                var m = moment();
                var dt = m.format('DD-MM-YYYY');
                this.medicalServiceProvider.getNextPrescriptionNumber(val, this.patient.TW_PATIENT_ID, this.patient.TW_CLINIC_ID)
                    .subscribe(
                    data => {loading.dismiss(); this.prescNo = data.nextPrescriptionNumber; this.prescDate = dt;},
                    err => {
                        console.log(err);
                    });
            }
        });

    }
    medicineModal() {
        let medicineModal = this.ModalCtrl.create(AddPrescriptionMedicinePage, {medicineList: this.medicineList});
        medicineModal.present();
        medicineModal.onDidDismiss(data => {
            if (data != null) {
                this.medicineList.lenght = 0;
                for (let i = 0; i < data.lenght; i++) {
                    this.medicineList.push({
                        medicine: data[i].medicine, frequency: data[i].frequency, usageList: data[i].usageList,
                        days: data[i].days, quantity: data[i].quantity
                    });
                }

            }
        });

    }
    testModal() {
        let testModal = this.ModalCtrl.create(AddPrescriptionTestPage, {testList: this.testList});
        testModal.present();
        testModal.onDidDismiss(data => {
            if (data) {
                this.testList.lenght = 0;
                for (let i = 0; i < data.lenght; i++) {
                    this.testList.push({test: data[i].test, lab: data[i].lab, collectionCenter: data[i].collectionCenter});
                }
            }
        });
    }
    savePrescription() {
        let confirm = this.alertCtrl.create({
            title: 'Saving?',
            message: 'Do you want to save this prescription?',
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
                    medicineList: this.medicineList, testList: this.testList,
                    prescNo: this.prescNo
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