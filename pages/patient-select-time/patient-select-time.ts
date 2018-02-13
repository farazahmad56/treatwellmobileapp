import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PatientConfirmAppointmentPage} from '../../pages/pages';
declare var moment: any;

/**
 * Generated class for the PatientSelectTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-patient-select-time',
    templateUrl: 'patient-select-time.html',
})
export class PatientSelectTimePage {
    private date: string;
    private clinic: any;
    private doctor: any;
    private timeFrom: string;
    private timeTo: string;
    private doctorId: string;
    private clinicId: string;
    private appointmentTime: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public medicalServiceProvider: MedicalServiceProvider, public loadingCtrl: LoadingController) {
        this.date = navParams.get("date");
        this.clinic = navParams.get("clinics");
        this.doctor = navParams.get("doctors");
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        this.timeFrom = this.clinic.TIME_FROM;
        this.timeTo = this.clinic.TIME_TO;
        this.clinicId = this.clinic.TW_CLINIC_ID;
        this.doctorId = this.doctor.TW_DOCTOR_ID;

        this.medicalServiceProvider.getAppointedTime(this.doctorId, this.clinicId, this.date)
            .subscribe(
            data => {
                var a = moment(this.timeFrom, "HH:mm");
                var b = moment(this.timeTo, "HH:mm");
                var duration = moment.duration(b.diff(a));
                var mins = duration.asMinutes();
                var interval = Math.floor(mins / 15);
                var time = [];
                for (var i = 0; i <= interval; i++) {
                    var islocked = false;
                    if (data.length > 0) {
                        for (var z = 0; z < data.length; z++) {
                            if (data[z].APPOINTED_TIME === a.format("HH:mm")) {
                                islocked = true;
                                break;
                            }
                        }
                    }
                    //if (!islocked) {
                    time.push({TIME: moment(a).format("HH:mm"), isLocked: islocked});
                    //}
                    a.add(15, 'minutes');
                }
                loading.dismiss();
                this.appointmentTime = time;

            },
            err => {
                console.log(err);
            });
    }
    confirmAppointment(appointmentObj: any) {
        var appointmentTime = appointmentObj.TIME;
        this.navCtrl.push(PatientConfirmAppointmentPage, {
            time: appointmentTime,
            clinic: this.clinic,
            doctor: this.doctor,
            date: this.date

        });
    }

}
