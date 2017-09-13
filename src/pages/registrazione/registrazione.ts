import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { TutorialPage } from '../tutorial/tutorial';
import { AlertController } from 'ionic-angular';

import { UserReg } from '../../models/user.model';
import { CategoriaRegPage } from '../categoria-reg/categoria-reg';

@Component({
    selector: 'page-registrazione',
    templateUrl: 'registrazione.html'
})
export class RegistrazionePage {
    
    user: UserReg = new UserReg;
    email: string = "";
    password: string = "";
    firstname: string = "";
    lastname: string = "";
    confermapassword: string = "";
    
    public base64Image: string;
    
    

    constructor(public navCtrl: NavController, private camera: Camera, public alertCtrl: AlertController) {
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
            }/* else if (this.password == this.confermapassword) {
                msg = "Le password inserite non corrispondono";
            }*/
            
            if (msg !== "") {
                this.alertCtrl.create({
                    title: "alert",
                    message: msg,
                    buttons: ['Confirm']
                }).present();
                
            } else {
                this.user.email = this.email;
                this.user.password = this.password;
                this.user.firstname = this.firstname;
                this.user.lastname = this.lastname;
                this.navCtrl.push(CategoriaRegPage, {user: this.user});
            }
    }
    
    onLink(url: string) {
        window.open(url);
    }
    
    public options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: 2
    }
    
    openGallery() {
        this.camera.getPicture(this.options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64:
         let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
         // Handle error
        });
    };

}

