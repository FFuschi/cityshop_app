import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

//Providers
import { AccesspersistanceProvider } from '../../providers/accesspersistance/accesspersistance';
import { AccountProvider } from '../../providers/account/account';

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html'
})
export class TutorialPage {
    
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
                private statusBar: StatusBar,
                public sAccount: AccountProvider,
                public aPersistance: AccesspersistanceProvider
                ) {

    }
    
    ionViewDidLoad() {
      this.plt.ready().then(() => {
          
          this.aPersistance.save(true);
            
        });
    }
  
    ionViewWillEnter(){
        this.statusBar.hide();
    }
    
    nextpage(){
        if(!this.sAccount.isLogged()){
            this.navCtrl.setRoot(LoginPage);
        }
        else{
            this.navCtrl.setRoot(HomePage);
        }
    }
    
    onLink(url: string) {
        window.open(url);
    }
}