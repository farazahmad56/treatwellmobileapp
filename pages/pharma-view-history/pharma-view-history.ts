import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoadingController} from 'ionic-angular';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
declare var moment: any;
/**
 * Generated class for the PharmaViewHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-pharma-view-history',
    templateUrl: 'pharma-view-history.html',
})
export class PharmaViewHistoryPage {
    private posts: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
        public loadingCtrl: LoadingController, public medicalServiceProvider: MedicalServiceProvider) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        var deviceDate = moment().format('DD-MM-YYYY');
        this.storage.get('loggedInPharmaId').then((loggedInPharmaId) => {
            if (loggedInPharmaId !== '') {
                this.storage.get('medicalRepId').then((medicalRepId) => {
                    if (medicalRepId && medicalRepId !== '') {
                        loading.present();
                        this.medicalServiceProvider.getPreviousVisits(deviceDate, medicalRepId)
                            .subscribe(
                            data => {loading.dismiss(); this.posts = data; console.log(data);},
                            err => {
                                console.log(err);
                            });
                    }
                });
            }
        });
    }



}
