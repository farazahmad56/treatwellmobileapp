import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ActionSheetController, Platform} from 'ionic-angular';
import {LoadingController, ToastController} from 'ionic-angular';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {Camera} from '@ionic-native/camera';
import {Storage} from '@ionic/storage';
import {FilePath} from '@ionic-native/file-path';
import {File} from '@ionic-native/file';
import {MedicalServiceProvider} from '../../providers/medical-service/medical-service';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {AlertController} from 'ionic-angular';

/**
 * Generated class for the PatientAttachmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
    selector: 'page-patient-attachment',
    templateUrl: 'patient-attachment.html',
})
export class PatientAttachmentPage {
    imageURI: any;
    imageFileName: any;
    imgSrc: any;
    posts: any;
    lastImage: string = null;
    constructor(public navCtrl: NavController,
        private transfer: FileTransfer, private filePath: FilePath,
        private camera: Camera, private file: File,
        public loadingCtrl: LoadingController, public platform: Platform,
        public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,
        public storage: Storage, public medicalServiceProvider: MedicalServiceProvider,
        private photoViewer: PhotoViewer, public alertCtrl: AlertController) {
        this.loadAllAttachments();

    }

    public loadAllAttachments() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('loggedInPatientId').then((val) => {
            if (val !== '') {
                this.medicalServiceProvider.getPatientAttachments(val)
                    .subscribe(
                    data => {loading.dismiss(); console.log(data); this.posts = data;},
                    err => {
                        console.log(err);
                    });
            }
        });
    }
    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }
    public takePicture(sourceType: any) {
        // Create options for the Camera Dialog
        var options = {
            quality: 70,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 800,
            targetHeight: 800
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath: any, currentName: any, newFileName: any) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
            this.uploadImage();
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }
    // Always get the accurate path to your apps folder
    public pathForImage(img: any) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    presentToast(msg: any) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    public uploadImage() {
        // Destination URL
        var baseUrl = 'http://www.ezimedic.com/ezimedic_mobile/';
        var url = baseUrl + 'finance.htm?action=uploadPatientAttachment';

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;
        this.storage.get('loggedInPatientId').then((val) => {
            if (val !== '') {
                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: true,
                    params: {'patientId': val}
                };
                let loader = this.loadingCtrl.create({
                    content: "Uploading..."
                });

                const fileTransfer: FileTransferObject = this.transfer.create();
                loader.present();
                // Use the FileTransfer to upload the image
                fileTransfer.upload(targetPath, url, options, true).then(data => {
                    loader.dismiss();
                    this.presentToast('Image succesful uploaded.');
                    this.loadAllAttachments();
                }, err => {
                    loader.dismiss();
                    this.presentToast('Error while uploading attachment.');
                });
            }
        });

    }
    displayFullImage(obj: any) {
        this.storage.get('loggedInPatientId').then((val) => {
            if (val !== '') {
                this.photoViewer.show('http://www.ezimedic.com/patientMobileAttachments/' + val + '/' + obj.FILE_NME, obj.FILE_NME, {share: false});
            }
        });
    }

    deletePrescription(obj: any) {
        let toast = this.toastCtrl.create({
            message: 'Your attachment deleted successfully.',
            duration: 4000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        let confirm = this.alertCtrl.create({
            title: 'Deleting Attachment?',
            message: 'Do you want to delete this attachment?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.medicalServiceProvider.deletePatientAttachment(obj.TW_PATIENT_ATTACHMENT_ID).subscribe(
                            data => {
                                if (data.result === 'save_success') {
                                    toast.present();
                                    this.loadAllAttachments();
                                }
                            },
                            err => {
                                console.log(err);
                            });
                    }
                }
            ]
        });
        confirm.present();
    }
}
