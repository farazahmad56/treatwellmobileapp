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
import {MedicalServiceProvider} from '../providers/medical-service/medical-service';
import {OneSignal} from '@ionic-native/onesignal';
import {SocialSharing} from '@ionic-native/social-sharing';
@NgModule({
    declarations: [
        MyApp,
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
        Device,
        OneSignal,
        SocialSharing
    ]
})
export class AppModule {}
