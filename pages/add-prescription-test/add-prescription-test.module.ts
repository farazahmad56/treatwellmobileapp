import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddPrescriptionTestPage} from './add-prescription-test';

@NgModule({
    declarations: [
        AddPrescriptionTestPage,
    ],
    imports: [
        IonicPageModule.forChild(AddPrescriptionTestPage),
    ], exports: [
        AddPrescriptionTestPage
    ]
})
export class AddPrescriptionTestPageModule {}
