import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';


import { CategoriesPage } from '../categories/categories';
import { BrandsPage } from '../brands/brands';

//Models
import {User} from '../../models/user.model';
import {Categoria} from '../../models/categoria.model';
import {Brand} from '../../models/brand.model';

//Providers
import {AccountProvider} from '../../providers/account/account';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;

 
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    lastImage: string = null;
    user: User;
    token: String = "";
    categorie: Array<Categoria>;
    brands: Array<Brand>;
    foto: String = "http://dominiotestprova.altervista.org/image/avatars/avatardefault.png";

  constructor(
      private navCtrl: NavController, 
      private plt: Platform, 
      private statusBar: StatusBar,
      private sAccount: AccountProvider, 
      private alertCtrl: AlertController,
      private actionSheetCtrl: ActionSheetController,
      private loading: LoadingController,
      private camera: Camera,
      private transfer: FileTransfer,
      private file: File, 
      private filePath: FilePath
      ) {
      
      this.plt.ready().then(() => {
            
            
       });
      
  }
  
  ngOnInit(){
        this.getUser();
        this.token = this.user.token;
        this.foto = "http://dominiotestprova.altervista.org/image/avatars/" + this.user.image;
        this.getCategories();
        this.getBrands();
    }
  
  ionViewWillEnter(){
        
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#ff823e');
            
            this.getCategories();
            this.getBrands();
            
        });
        
    }
    
    getUser() {
        this.user = this.sAccount.getUser();    
    }
    
    getCategories(){
        this.sAccount.getUserCategories(this.token)
            .then((data: Array<Categoria>)=>{
                this.categorie = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  getBrands(){
      this.sAccount.getUserBrands(this.token)
            .then((data: Array<Brand>)=>{
                this.brands = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  changeAttribute(value: string, type: string){
      let alert = this.alertCtrl.create({
        inputs: [
          {
            name: 'value',
            value: value,
          }
        ],
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel'
          },
          {
            text: 'Salva',
            handler: data => {
                if(data.vale != ""){
                    var userUp = this.user;
                    if(type == 'firstname'){
                        userUp.firstname = data.value;
                    } else if(type == 'lastname'){
                        userUp.lastname = data.value;
                    }
                    this.sAccount.update(userUp, this.token)
                        .then(()=>{
                            this.getUser();
                            return;
                        })
                        .catch(()=>{
                            console.log("errore Shop: non sono riuscito a caricare le Info");
                            return false;
                        }); 
                }
            }
          }
        ]
      });
      alert.present();
  }
  
  openCategories(){
      this.navCtrl.push(CategoriesPage, {token: this.token});
  }
  
  openBrands() {
      this.navCtrl.push(BrandsPage, {token: this.token});
  }
  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Immagine Profilo',
      buttons: [
        {
          icon: "md-image",
          text: 'Gallery',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          icon: 'md-camera',
          text: 'Foto',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
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
        let loading = this.loading.create({
            content: 'Attendi...'
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
            this.user.image = filename;
            this.sAccount.update(this.user, this.token)
                        .then(()=>{
                            this.getUser();
                            this.foto = "http://dominiotestprova.altervista.org/image/avatars/" + this.user.image;
                        })
                        .catch(()=>{
                            console.log("errore Shop: non sono riuscito a caricare le Info");
                        }); 
            loading.dismiss();
        }, err => {
            loading.dismiss();
            alert("Errore");
        });
    }

}
