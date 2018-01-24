import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmaViewHistoryPage } from './pharma-view-history';

@NgModule({
  declarations: [
    PharmaViewHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmaViewHistoryPage),
  ],
})
export class PharmaViewHistoryPageModule {}
