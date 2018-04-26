import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';

/**
 * Generated class for the AddPrescriptionMedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-prescription-medicine',
    templateUrl: 'add-prescription-medicine.html',
})
export class AddPrescriptionMedicinePage {
    private medicines: FormGroup;
    private medicine: any;
    private frequency: any;
    private usage: any;
    private medicineList: any = [];
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public viewCtrl: ViewController,
        private formBuilder: FormBuilder, public storage: Storage) {
        this.medicineList = this.navParams.get('medicineList');
        this.medicines = this.formBuilder.group({
            medicine: ['', Validators.required],
            frequency: ['2', Validators.required],
            usageList: ['', Validators.required],
            days: ['7', Validators.required],
            quantity: ['1', Validators.required]
        });
        this.storage.get('loggedInDoctorId').then((val) => {
            if (val != null && val !== '') {
                this.medicalServiceProvider.getMedicinesForDoctor(val)
                    .subscribe(
                    data => {this.medicine = data;},
                    err => {
                        console.log(err);
                    });
                this.medicalServiceProvider.getMedicineUsage(val)
                    .subscribe(
                    data => {this.usage = data;},
                    err => {
                        console.log(err);
                    });
                this.medicalServiceProvider.getFrequencies()
                    .subscribe(
                    data => {this.frequency = data;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }
    dismiss() {
        this.viewCtrl.dismiss(this.medicineList);
    }
    addMedicine() {
        let data = this.medicines.value;
        this.medicineList.push({
                    medicine: data.medicine, frequency: data.frequency, usageList: data.usageList,
                    days: data.days, quantity: data.quantity
                });
    }

    deleteMedicine(index: any) {
        this.medicineList.splice(index, 1);
    }

}
