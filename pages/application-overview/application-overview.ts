import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Slides} from 'ionic-angular';
import {HomePage} from '../../pages/pages';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the ApplicationOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-application-overview',
    templateUrl: 'application-overview.html',
})
export class ApplicationOverviewPage {
    @ViewChild(Slides) slides: Slides;
    data = [
        {
            image: "assets/imgs/slide_1.jpg",
        },
        {
            image: "assets/imgs/slide_2.jpg",
        },
        {
            image: "assets/imgs/slide_4.jpg",
        },
        {
            image: "assets/imgs/slide-5.jpg",
        },
        {
            image: "assets/imgs/slide_6.jpg",
        }
    ];
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    }
    slideChanged() {
        var isEnd = this.slides.isEnd();
        if (isEnd) {

        }
        //        var total = this.slides.length();
        //        if (currentIndex === total - 1) {
        //            this.storage.set('isNewUser', "Y");
        //            this.navCtrl.setRoot(HomePage);
        //        } else {
        //            //console.log('Current index is', currentIndex);
        //        }
    }
    skipSlides() {
        this.storage.set('isNewUser', "Y");
        this.navCtrl.setRoot(HomePage);
    }
}
