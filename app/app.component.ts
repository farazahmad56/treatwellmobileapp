import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
//import {HomePage} from '../pages/home/home';
import {HomePage} from '../pages/pages';
import {OneSignal} from '@ionic-native/onesignal';
import {Storage} from '@ionic/storage';
//import {ApplicationOverviewPage} from '../pages/application-overview/application-overview';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = HomePage;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, oneSignal: OneSignal,
        public storage: Storage) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            oneSignal.startInit('a3a8ca36-3f7e-47c3-b736-4740eb5dc45d', '244136212621');
            oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.InAppAlert);

            //            oneSignal.handleNotificationReceived().subscribe(() => {
            //                // do something when notification is received
            //                notificationOpenedCallback;
            //            });
            oneSignal.handleNotificationReceived()
                .subscribe(
                jsonData => {
                    console.log('handleNotificationReceived: ' + JSON.stringify(jsonData));
                },
                err => {
                    console.log(err);
                });
            oneSignal.handleNotificationOpened()
                .subscribe(
                jsonData => {
                    console.log('handleNotificationOpened: ' + JSON.stringify(jsonData));
                },
                err => {
                    console.log(err);
                });
            //            oneSignal.handleNotificationOpened().subscribe(() => {
            //                // do something when a notification is opened
            //                notificationOpenedCallback;
            //            });
            //            var notificationOpenedCallback = function (jsonData: any) {
            //                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            //            }

            oneSignal.getIds().then((response) => {
                console.log(response.userId);
                storage.set('notficicationId', response.userId);
            }).catch((ex) => {
                console.error('Error fetching users', ex);
            });

            oneSignal.endInit();

        });
    }
}

