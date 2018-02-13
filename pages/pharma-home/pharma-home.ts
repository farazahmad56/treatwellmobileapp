import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import {Storage} from '@ionic/storage';
import {PharmaDoctorSearchPage} from '../../pages/pages';
import {PharmaViewHistoryPage} from '../../pages/pages';

/**
 * Generated class for the PharmaHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-pharma-home',
    templateUrl: 'pharma-home.html',
})
export class PharmaHomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    }

    logOutUser() {
        this.storage.remove('loggedInPharmaId');
        this.navCtrl.setRoot(HomePage);
    }
    openFindDoctor() {
        this.navCtrl.push(PharmaDoctorSearchPage);
    }
    openViewHistory() {
        this.navCtrl.push(PharmaViewHistoryPage);
    }
}
