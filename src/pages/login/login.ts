import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

import { RegistrazionePage } from '../registrazione/registrazione';
import { HomePage } from '../home/home';

//Models
import {User} from '../../models/user.model';

//Providers
import {AccountProvider} from '../../providers/account/account';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    
  email: string = "";
  password: string = "";
  regButton = RegistrazionePage;
  
  constructor(
      public navCtrl: NavController,
      public sAccount: AccountProvider, 
      public statusBar: StatusBar,
      public plt: Platform, 
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController
      ) {
    
  }
    //splashscren
  ionViewDidLoad() {
  }
  
  ionViewWillEnter(){
        
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#7b7b7b');
            
        });
        
    }
  
  login() {
      this.validate();
            
    }
    
    enterUser() {
        
        const loading = this.loadingCtrl.create({ content: "Attendere..." });
        loading.present();
        this.sAccount.login(this.email, this.password)
            .then((user: User) => {
                if (user.email != ""){
                    loading.dismiss().then(() => {
                        this.navCtrl.setRoot(HomePage);
                    });
                }
                else {
                    loading.dismiss().then(() => {
                        this.alertCtrl.create({
                            title: "Errore di login",
                            message: "Dati non corretti o inesistenti",
                            buttons: ['OK']
                        }).present();
                    });
                }
            })
            .catch(() => {
                console.log("errore login: non mi sono riuscito a loggare");
                this.alertCtrl.create({
                    title: "Errore login",
                    message: "Problema di connessione con il database",
                    buttons: ['OK']
                })
            });
    }
    
    private validate() {
            let msg = "";
            if (this.email.trim() === "") {
                msg = "Per favore inseririsci un'email valida";
            } else if (this.password.trim() === "") {
                msg = "Per favore inserisci una password";
            }
            
            if (msg !== "") {
                this.alertCtrl.create({
                    title: "Errore di login",
                    message: msg,
                    buttons: ['OK']
                }).present();

            } else {
                this.enterUser();
            }
            
    }
  onLink(url: string) {
      window.open(url);
  }
}