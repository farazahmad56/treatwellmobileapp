import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpHeaders} from '@angular/common/http';

/*
  Generated class for the MedicalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MedicalServiceProvider {
    private baseUrl = 'http://104.154.204.71/treatwell_mobile/';
    //private baseUrl = 'http://192.168.0.101/treatwell_mobile/';
    constructor(public http: HttpClient) {

    }
    verifyLogin(userName: string, password: string): Observable<any> {
        var url = this.baseUrl + 'login.htm?action=verifyLogin'
        let body = new URLSearchParams();
        body.set('userName', userName);
        body.set('password', password);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(url, body.toString(), options);
    }
    getDiseases(): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getDiseasesForIntakeForm';
        return this.http.get(url)
    }
    savePatient(patient: any): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=savePatient'
        let body = new URLSearchParams();
        body.set('patientName', patient.patientName);
        body.set('contactNo', patient.contactNo);
        body.set('email', patient.email);
        body.set('dob', patient.dob);
        body.set('gender', patient.gender);
        body.set('profession', patient.profession);
        body.set('referredBy', patient.referredBy);
        body.set('cityId', patient.cityId);
        body.set('age', patient.age);
        body.set('patientAddress', 'N/A');
        body.set('patientWeight', '0');
        body.set('patientHeight', '0');
        body.set('doctorType', '2');
        body.set('addedFrom', 'MOBILE');
        body.set('bloodGroupId', patient.bloodGroupId);
        body.set('wantDonateBlood', patient.canDonateBlood);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(url, body.toString(), options);
    }
    savePatientInTakeForm(patient: any, id: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=saveInTakeForm'
        let body = new URLSearchParams();
        body.set('patientId', id);
        body.set('attendClinic', patient.attendClinic);
        body.set('medicineOpt', patient.medicineOpt);
        body.set('steroidOpt', patient.steroidOpt);
        body.set('Rheumatic', patient.rheumatic);
        body.set('allergy', patient.allergy);
        body.set('smoker', patient.smoker);
        for (var i = 0; i < patient.diseaseId.length; i++) {
            body.set('diseasesArr', patient.diseaseId[i]);
        }
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(url, body.toString(), options);
    }
    getCities(): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getCities';
        return this.http.get(url)
    }
    getAreas(cityId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getAreasByCity&cityId=' + cityId;
        return this.http.get(url)
    }
    getBloodGroups(): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getBloodGroups';
        return this.http.get(url)
    }
    saveDoctor(doctor: any): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=saveDoctor'
        let body = new URLSearchParams();
        body.set('doctorName', doctor.doctorName);
        body.set('cellNo', doctor.contactNo);
        body.set('email', '');
        body.set('totalExperience', doctor.totalExp);
        body.set('newUserName', doctor.loginId);
        body.set('specilityId', doctor.specilityId);
        body.set('consultancyFee', doctor.consultancyFee);
        body.set('cityId', doctor.cityId);
        body.set('clinicId', doctor.clinicName);
        body.set('clinicTimeFrom', doctor.openTime);
        body.set('clinicTimeTo', doctor.closeTime);
        body.set('totalAppointments', doctor.maxAppointment);
        body.set('doctorType', '2');
        body.set('addedFrom', 'MOBILE');
        body.set('clinicName', doctor.newClinicName);
        body.set('areaId', doctor.areaId);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(url, body.toString(), options);
    }
    saveAppointment(doctorId: string, clinicId: string, patientId: string, date: string, time: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=saveAppointment'
        let body = new URLSearchParams();
        body.set('doctorId', doctorId);
        body.set('patientId', patientId);
        body.set('clinicId', clinicId);
        body.set('appointmentDate', date);
        body.set('appointmentTime', time);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(url, body.toString(), options);
    }

    getDoctorSpecilities(): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getSpecilities';
        return this.http.get(url)
    }
    getDoctorWithSpecilities(specilityId: string, cityId: string, areaId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getDoctorsWithSpecilities&specilityId=' + specilityId + '&cityId=' + cityId + '&areaId=' + areaId;
        return this.http.get(url)
    }
    getClinics(cityId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getClinicsByCity&cityId=' + cityId;
        return this.http.get(url)
    }
    getDoctorClinic(doctorId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getDoctorClinics&doctorId=' + doctorId;
        return this.http.get(url)
    }
    getAppointmentDates(doctorId: any, clinicId: any): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getAppointmentDates&doctorId=' + doctorId + '&clinicId=' + clinicId;
        return this.http.get(url)
    }
    getAppointedTime(doctorId: any, clinicId: any, date: any): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getAppointedTime&doctorId=' + doctorId + '&clinicId=' + clinicId + "&date=" + date;
        return this.http.get(url)
    }
    getPatientAppointments(patientId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getAppointmentsForPatient&patientId=' + patientId;
        return this.http.get(url)
    }
    getDoctorAppointments(doctorId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getAppointmentsForDoctor&doctorId=' + doctorId;
        return this.http.get(url)
    }

    cancelAppointment(appointmentId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=cancelAppointment'
        let body = new URLSearchParams();
        body.set('appointmentId', appointmentId);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(url, body.toString(), options);
    }

    addToFavourites(doctorId: string, patientId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=savePatientFavDoctor'
        let body = new URLSearchParams();
        body.set('patientId', patientId);
        body.set('doctorId', doctorId);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(url, body.toString(), options);
    }
    getFavouriteDoctors(patientId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getPatientFavDoctor&patientId=' + patientId;
        return this.http.get(url)
    }
    deleteFavouriteDoctor(id: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=deletePatientFavDoctor'
        let body = new URLSearchParams();
        body.set('id', id);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(url, body.toString(), options);
    }
    getPatientAttachments(patientId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getPatientAttachments&patientId=' + patientId;
        return this.http.get(url)
    }
    deletePatientAttachment(id: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=deletePatientAttachment'
        let body = new URLSearchParams();
        body.set('id', id);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(url, body.toString(), options);
    }
    getDoctorForPharmaBricks(pharmaCompanyId: string, repId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getDoctorsForPharmaRep&pharmaCompanyId=' + pharmaCompanyId + '&repId=' + repId;
        return this.http.get(url)
    }
    saveMedicalRepVisit(obj: any): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=saveMedicalRepVisit'
        let body = new URLSearchParams();
        body.set('doctorId', obj.doctorId);
        body.set('repId', obj.repId);
        body.set('latitude', obj.latitude);
        body.set('longitude', obj.longitude);
        body.set('deviceDate', obj.deviceDate);
        body.set('deviceModel', obj.deviceModel);
        body.set('deviceSerial', obj.deviceSerial);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(url, body.toString(), options);
    }
    getPreviousVisits(date: string, repId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getVisitedDoctorsForDate&repId=' + repId;
        return this.http.get(url)
    }
    getPrescriptionMasterForPatient(patientId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getPrescriptionMasterForPatient&patientId=' + patientId;
        return this.http.get(url)
    }
    getPrescriptionForMedicine(masterId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getPrescriptionForMedicine&masterId=' + masterId;
        return this.http.get(url)
    }
    getPrescriptionForLabTest(masterId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getPrescriptionForLabTest&masterId=' + masterId;
        return this.http.get(url)
    }
    getPharmaciesByArea(cityId: string, areaId: string): Observable<any> {
        var url = this.baseUrl + 'finance.htm?action=getPharmaciesByArea&cityId=' + cityId + '&areaId' + areaId;
        return this.http.get(url)
    }
    changePassword(userName: string, currPassword: string, newPassword: string): Observable<any> {
        var url = this.baseUrl + 'login.htm?action=changePassword'
        let body = new URLSearchParams();
        body.set('userName', userName);
        body.set('currentPassword', currPassword);
        body.set('newPassword', newPassword);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(url, body.toString(), options);
    }
}
