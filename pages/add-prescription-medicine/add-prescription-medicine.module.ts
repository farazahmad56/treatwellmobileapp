import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddPrescriptionMedicinePage} from './add-prescription-medicine';

@NgModule({
    declarations: [
        AddPrescriptionMedicinePage,
    ],
    imports: [
        IonicPageModule.forChild(AddPrescriptionMedicinePage),
    ],
    exports: [
        AddPrescriptionMedicinePage
    ]
})
export class AddPrescriptionMedicinePageModule {}
