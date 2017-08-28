import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { TutorialPage } from '../tutorial/tutorial';

@Component({
    selector: 'page-registrazione',
    templateUrl: 'registrazione.html'
})
export class RegistrazionePage {

    public base64Image: string;
    private imageSrc: string;
    tutButton = TutorialPage;

    constructor(public navCtrl: NavController, private camera: Camera) {

    }

    onLink(url: string) {
        window.open(url);
    }
    
    public options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
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

