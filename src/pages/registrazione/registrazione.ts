import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

//Providers
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { AccountProvider } from '../../providers/account/account';
import { DictionaryServiceProvider } from '../../providers/dictionary-service/dictionary-service';

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
    
    user: UserReg = new UserReg;
    email: string = "";
    password: string = "";
    firstname: string = "";
    lastname: string = "";
    confermapassword: string = "";
    image: string = "avatardefault.png";
    foto: String = "http://dominiotestprova.altervista.org/image/avatars/avatardefault.png";
    

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
                public platform: Platform,
                public sTranslate: DictionaryServiceProvider
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
            title: this.sTranslate.get("PHOTOSELECT"),
            buttons: [
            {
              icon: "md-image",
              text: this.sTranslate.get("GALLERY"),
              cssClass: "action_gallery",
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            }, {
              icon: 'md-camera',
              text: this.sTranslate.get("PHOTO"),
              cssClass: "action_gallery",
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA);
              }
            }, {
              cssClass: "action_cancel",
              text: this.sTranslate.get("CANCEL"),
              role: 'cancel',
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
          correctOrientation: true
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
          // Special handling for Android library
          if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
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
        }, () => {
        
        });
    }
    
    // Create a new name for the image
    private createFileName() {
      var d = new Date(),
      n = d.getTime(),
      newFileName ="IMG_" + n + ".jpg";
      return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        let bool = this.file.checkDir(cordova.file.externalRootDirectory, "Cityshop");
        if(!bool){
            this.file.createDir(cordova.file.externalRootDirectory, "Cityshop", false)
              .then(()=>{
                  alert("entra4");
                  let path = cordova.file.externalRootDirectory + "Cityshop";
                  this.file.copyFile(namePath, currentName, path, newFileName).then(() => {
                    this.lastImage = newFileName;
                    this.uploadImage();
                  });
               });
        } else {
           let path = cordova.file.externalRootDirectory + "Cityshop";
              this.file.copyFile(namePath, currentName, path, newFileName).then(() => {
                this.lastImage = newFileName;
                this.uploadImage();
              }); 
        }
    }
    
    public uploadImage() {
        let loading = this.loadingCtrl.create({
            content: this.sTranslate.get("WAIT")
          });

          loading.present();
        
        // Destination URL
        var url = "http://dominiotestprova.altervista.org/upload.php";

        // File for Upload
        var targetPath = cordova.file.externalRootDirectory + "Cityshop/" + this.lastImage;

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

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.image = filename;
            this.foto = "http://dominiotestprova.altervista.org/image/avatars/" + filename;
            loading.dismiss();
        }, err => {
            loading.dismiss();
            alert(this.sTranslate.get("ERROR"));
        });
    }
    
    signup() {
        this._validate();
    }
    
    private _validate() {
            let msg = "";
            
            if (this.firstname.trim() === "") {
                msg = this.sTranslate.get("ERRORNAME");
            } else if (this.lastname.trim() === "") {
                msg = this.sTranslate.get("ERRORSURNAME");
            } else if (this.email.trim() === "") {
                msg = this.sTranslate.get("ERROREMAIL");
            } else if (this.validateEmail(this.email) == false){
                msg = this.sTranslate.get("VALIDEMAIL");
            } else if (this.password.trim() === "") {
                msg = this.sTranslate.get("ERRORPASSWORD");
            } else if (this.confermapassword.trim() === "") {
                msg = this.sTranslate.get("ERRORPASSWORD");
            } else if (this.password != this.confermapassword) {
                msg = this.sTranslate.get("ERRORMATCH");
            } 
            
            if (msg !== "") {

                this.alertCtrl.create({
                   title: this.sTranslate.get("ERRORREG"),
                    message: msg,
                    buttons: [this.sTranslate.get("OK")]
                }).present();

            } else {
                this.sAccount.userExsist(this.email).then((data)=>{
                    if(!data){
                       
                        this.user.email = this.email;
                        this.user.password = this.password;
                        this.user.nome = this.firstname;
                        this.user.cognome = this.lastname;
                        this.user.foto = this.image;
                        this.navCtrl.push(CategoriaRegPage, {user: this.user});
                        
                    } else {
                        this.alertCtrl.create({
                        title: this.sTranslate.get("ALERT"),
                        message: this.sTranslate.get("USERREG"),
                        buttons: [this.sTranslate.get("OK")]
                        }).present();
                    }
                });
            }
            
    }
    
    onLink(url: string) {
        window.open(url);
    }
    
    public validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

