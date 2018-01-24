import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientSelectTimePage} from '../../pages/patient-select-time/patient-select-time';

/**
 * Generated class for the PatientSelectDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-select-date',
  templateUrl: 'patient-select-date.html',
})
export class PatientSelectDatePage {
    private doctorId: string;
    private clinicId: string;
    private clinic: any;
    private doctor: any;
    private appiontmentDates: any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController) {
        
        this.clinic = this.navParams.get('clinic');
        this.doctor = this.navParams.get('doctor');
        
        this.doctorId = this.doctor.TW_DOCTOR_ID;
        this.clinicId = this.clinic.TW_CLINIC_ID;
        
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.medicalServiceProvider.getAppointmentDates(this.doctorId, this.clinicId)
            .subscribe(
            data => {loading.dismiss(); this.appiontmentDates = data;},
            err => {
                console.log(err);
            });
       
  }
  selectTime(appiontmentDate: any) {
        var dte = appiontmentDate.DTE;
        this.navCtrl.push(PatientSelectTimePage, {
            clinics: this.clinic,
            doctors: this.doctor,
            date: dte
        });
    }

}
