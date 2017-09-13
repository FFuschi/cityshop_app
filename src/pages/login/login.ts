import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
        this.sAccount.login(this.email, this.password)
            .then((user: User) => {
                if (user.email != ""){
                    this.navCtrl.setRoot(HomePage);
                }
                else {
                    this.alertCtrl.create({
                    title: "alert",
                    message: "Dati non corretti o inesistenti",
                    buttons: ['Confirm']
                }).present();

                }
            })
            .catch(() => {
                console.log("errore login: non mi sono riuscito a loggare");
                this.alertCtrl.create({
                    title: "alert",
                    message: "Problema di connessione con il database",
                    buttons: ['Confirm']
                })
            });
    }
    
    private validate() {
            let msg = "";
            if (this.email.trim() === "") {
                msg = "Inserire l'email";
            } else if (this.password.trim() === "") {
                msg = "Inserire la password dell'account";
            }
            
            if (msg !== "") {
                this.alertCtrl.create({
                    title: "alert",
                    message: msg,
                    buttons: ['Confirm']
                }).present();

            } else {
                this.enterUser();
            }
            
    }
  onLink(url: string) {
      window.open(url);
  }
}