import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ApplicationOverviewPage} from './application-overview';

@NgModule({
    declarations: [
        ApplicationOverviewPage,
    ],
    imports: [
        IonicPageModule.forChild(ApplicationOverviewPage),
    ], exports: [
        ApplicationOverviewPage
    ]
})
export class ApplicationOverviewPageModule {}
