import { Component } from '@angular/core';

import { NavController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

//Providers
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { AccountProvider } from '../../providers/account/account';


import { TutorialPage } from '../tutorial/tutorial';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { UserReg } from '../../models/user.model';
import { CategoriaRegPage } from '../categoria-reg/categoria-reg';

declare var cordova: any;

@Component({
    selector: 'page-registrazione',
    templateUrl: 'registrazione.html'
})
export class RegistrazionePage {
    
    lastImage: string = 'http://dominiotestprova.altervista.org/image/avatars/avatardefault.png';
    loading: Loading;
    
    user: UserReg = new UserReg;
    email: string = "";
    password: string = "";
    firstname: string = "";
    lastname: string = "";
    confermapassword: string = "";
    
    public base64Image: string;
    
    

    constructor(public navCtrl: NavController, 
                public loadingCtrl: LoadingController,
                private camera: Camera, 
                public statusBar: StatusBar,
                public plt: Platform,
                public actionSheetCtrl: ActionSheetController,
                public alertCtrl: AlertController,
                private transfer: FileTransfer, 
                private file: File, 
                private filePath: FilePath, 
                public sAccount: AccountProvider,
                public platform: Platform
                ) {
    }
    
    ionViewWillEnter(){
        
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#ff823e');
            
        });
        
    }
    
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            cssClass: 'alertTitle',
            title: 'Seleziona una foto',
            buttons: [
            {
              icon: "md-image",
              text: 'Galleria',
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            }, {
              icon: 'md-camera',
              text: 'Fotocamera',
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA);
              }
            }, {
              cssClass: 'cancelCss',
              icon: 'md-close',
              text: 'Annulla',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
    }
    
    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
          quality: 50,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          cameraDirection: 1
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
                this.uploadImage();
              });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                this.uploadImage();
            }
        }, (err) => {
          this.alertCtrl.create({
                    title: "Alert",
                    message: "Errore nella selezione dell'immagine",
                    buttons: ['OK']
                }).present();
        });
      }
    // Create a new name for the image
    private createFileName() {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
      return newFileName;
    }
 
    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
      }, error => {
        this.alertCtrl.create({
                    title: "Alert",
                    message: "Immagine non caricata",
                    buttons: ['OK']
                }).present();
      });
    }

    public uploadImage() {
      // Destination URL
      var url = "http://dominiotestprova.altervista.org/upload.php";

      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);

      // File name only
      var filename = this.lastImage;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };

      const fileTransfer: FileTransferObject = this.transfer.create();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();

      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll()
        this.alertCtrl.create({
                    title: "Alert",
                    message: "Immagine caricata con successo",
                    buttons: ['OK']
                }).present();
      }, err => {
        this.loading.dismissAll()
        this.alertCtrl.create({
                    title: "alert",
                    message: "Errore nell'upload dell'immagine",
                    buttons: ['Conferma']
                }).present();
      });
    }
 
    // Always get the accurate path to your apps folder
    public pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return this.file.dataDirectory + img;
      }
    }
    
    signup() {
        this._validate();
    }
    
    private _validate() {
            let msg = "";
            
            if (this.firstname.trim() === "") {
                msg = "Inserire il nome";
            } else if (this.lastname.trim() === "") {
                msg = "Inserire il cognome";
            } else if (this.email.trim() === "") {
                msg = "Inserire un'email";
            } else if (this.password.trim() === "") {
                msg = "Inserire la password";
            } else if (this.confermapassword.trim() === "") {
                msg = "Inserire la password";
            } else if (this.password != this.confermapassword) {
                msg = "Le password inserite non corrispondono";
            } 
            
            if (msg !== "") {

                this.alertCtrl.create({
                   title: "Alert",
                    message: msg,
                    buttons: ['OK']
                }).present();

            } else {
                this.sAccount.userExsist(this.email).then((data)=>{
                    if(!data){
                       
                        this.user.email = this.email;
                        this.user.password = this.password;
                        this.user.nome = this.firstname;
                        this.user.cognome = this.lastname;
                        this.user.foto = this.lastImage;
                        this.navCtrl.push(CategoriaRegPage, {user: this.user});
                        
                    } else {
                        this.alertCtrl.create({
                        title: "Alert",
                        message: "Utente già esistente",
                        buttons: ['OK']
                        }).present();
                    }
                });
            }
            
    }
    
    onLink(url: string) {
        window.open(url);
    }

}

