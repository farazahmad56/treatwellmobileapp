import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ViewFavDoctorsPage} from './view-fav-doctors';

@NgModule({
    declarations: [
        ViewFavDoctorsPage,
    ],
    imports: [
        IonicPageModule.forChild(ViewFavDoctorsPage),
    ], exports: [
        ViewFavDoctorsPage
    ]
})
export class ViewFavDoctorsPageModule {}
