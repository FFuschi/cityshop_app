import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RegistrazionePage } from '../registrazione/registrazione';
import { HomePage } from '../home/home';
import {AlertController } from 'ionic-angular';

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
      public alertCtrl: AlertController
      ) {
    
  }
    //splashscren
  ionViewDidLoad() {
  }
  
  login() {
      this.validate();
            
    }
    
    enterUser() {
        this.sAccount.login(this.email, this.password)
            .then((user: User) => {
                if (user.email != ""){
                    this.navCtrl.push(HomePage);
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