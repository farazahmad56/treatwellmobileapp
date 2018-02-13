import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PharmaHomePage} from './pharma-home';

@NgModule({
    declarations: [
        PharmaHomePage,
    ],
    imports: [
        IonicPageModule.forChild(PharmaHomePage),
    ], exports: [
        PharmaHomePage
    ]
})
export class PharmaHomePageModule {}
