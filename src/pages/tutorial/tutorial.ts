import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html'
})
export class TutorialPage {
    loginButton = LoginPage;
    slides = [
        {
            title: "Markers",
            description: "Tappando in uno dei marker intorno a te potrai visualizzare le informazioni del negozio che vende prodotti di tuo interesse.",
            image: "assets/images/tutorial1.png",
        },
        {
            title: "Profilo",
            description: "Per accedere al tuo profilo tappa sull'immagine del tuo profilo!",
            image: "assets/images/tutorial2.png",
        },
        {
            title: "Modifica le tue preferenze",
            description: "Puoi modificare le tue preferenze di brands e categorie all'interno del tuo profilo tappando nelle zone sopra descritte",
            image: "assets/images/tutorial3.png",
        }
    ];

    constructor(public navCtrl: NavController,
                public plt: Platform,
                private statusBar: StatusBar
                ) {

    }
    
    ionViewWillEnter(){
        this.statusBar.hide();
    }

    onLink(url: string) {
        window.open(url);
    }
}