import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Camera} from '@ionic-native/camera';
import {CallNumber} from '@ionic-native/call-number';
import {FilePath} from '@ionic-native/file-path';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {Geolocation} from '@ionic-native/geolocation';
import {Device} from '@ionic-native/device';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignupTypePage} from '../pages/signup-type/signup-type';
import {SignupPatientPage} from '../pages/signup-patient/signup-patient';
import {PatientIntakePage} from '../pages/patient-intake/patient-intake';
import {MedicalServiceProvider} from '../providers/medical-service/medical-service';
import {DoctorSignupPage} from '../pages/doctor-signup/doctor-signup';
import {PatientHomePage} from '../pages/patient-home/patient-home';
import {PatientFindDoctorPage} from '../pages/patient-find-doctor/patient-find-doctor';
import {PatientAppointmentsPage} from '../pages/patient-appointments/patient-appointments';
import {PatientAttachmentPage} from '../pages/patient-attachment/patient-attachment';
import {PatientDoctorFilterPage} from '../pages/patient-doctor-filter/patient-doctor-filter';
import {PatientSelectClinicPage} from '../pages/patient-select-clinic/patient-select-clinic';
import {PatientSelectDatePage} from '../pages/patient-select-date/patient-select-date';
import {PatientSelectTimePage} from '../pages/patient-select-time/patient-select-time';
import {PatientConfirmAppointmentPage} from '../pages/patient-confirm-appointment/patient-confirm-appointment';
import {ViewPatientAppointmentPage} from '../pages/view-patient-appointment/view-patient-appointment';
import {DoctorHomePage} from '../pages/doctor-home/doctor-home';
import {DoctorViewAppointmentsPage} from '../pages/doctor-view-appointments/doctor-view-appointments';
import {ViewFavDoctorsPage} from '../pages/view-fav-doctors/view-fav-doctors';
import {PharmaHomePage} from '../pages/pharma-home/pharma-home';
import {PharmaDoctorSearchPage} from '../pages/pharma-doctor-search/pharma-doctor-search';
import {PharmaViewHistoryPage} from '../pages/pharma-view-history/pharma-view-history';
import {PatientPrescriptionListPage} from '../pages/patient-prescription-list/patient-prescription-list';
import {PatientPrescriptionViewPage} from '../pages/patient-prescription-view/patient-prescription-view';
import {PatientClinicResultPage} from '../pages/patient-clinic-result/patient-clinic-result';
import {PatientSearchClinicPage} from '../pages/patient-search-clinic/patient-search-clinic';
import {PatientSelectPharmacyPage} from '../pages/patient-select-pharmacy/patient-select-pharmacy';
import {ChangePasswordPage} from '../pages/change-password/change-password';
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SignupTypePage,
        SignupPatientPage,
        PatientIntakePage,
        DoctorSignupPage,
        PatientHomePage,
        PatientFindDoctorPage,
        PatientAppointmentsPage,
        PatientAttachmentPage,
        PatientDoctorFilterPage,
        PatientSelectClinicPage,
        PatientSelectDatePage,
        PatientSelectTimePage,
        PatientConfirmAppointmentPage,
        ViewPatientAppointmentPage,
        DoctorViewAppointmentsPage,
        DoctorHomePage,
        ViewFavDoctorsPage,
        PharmaHomePage,
        PharmaDoctorSearchPage,
        PharmaViewHistoryPage,
        PatientPrescriptionListPage,
        PatientPrescriptionViewPage,
        PatientSearchClinicPage,
        PatientClinicResultPage,
        PatientSelectPharmacyPage,
        ChangePasswordPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SignupTypePage,
        SignupPatientPage,
        PatientIntakePage,
        DoctorSignupPage,
        PatientHomePage,
        PatientFindDoctorPage,
        PatientAppointmentsPage,
        PatientAttachmentPage,
        PatientDoctorFilterPage,
        PatientSelectClinicPage,
        PatientSelectDatePage,
        PatientSelectTimePage,
        PatientConfirmAppointmentPage,
        ViewPatientAppointmentPage,
        DoctorViewAppointmentsPage,
        DoctorHomePage,
        ViewFavDoctorsPage,
        PharmaHomePage,
        PharmaDoctorSearchPage,
        PharmaViewHistoryPage,
        PatientPrescriptionListPage,
        PatientPrescriptionViewPage,
        PatientSearchClinicPage,
        PatientClinicResultPage,
        PatientSelectPharmacyPage,
        ChangePasswordPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        MedicalServiceProvider,
        FileTransfer,
        FileTransferObject,
        File,
        Camera,
        CallNumber,
        FilePath,
        PhotoViewer,
        Geolocation,
        Device
    ]
})
export class AppModule {}
