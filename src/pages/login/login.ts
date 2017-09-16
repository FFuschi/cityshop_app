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
import { DictionaryServiceProvider } from '../../providers/dictionary-service/dictionary-service';

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
      public alertCtrl: AlertController,
      public sTranslate: DictionaryServiceProvider
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
        
        const loading = this.loadingCtrl.create({ content: this.sTranslate.get("WAIT") });
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
                            title: this.sTranslate.get("ERROROFLOGIN"),
                            message: this.sTranslate.get("LOGINERROR"),
                            buttons: [this.sTranslate.get("OK")]
                        }).present();
                    });
                }
            })
            .catch(() => {
                console.log("errore login: non mi sono riuscito a loggare");
                this.alertCtrl.create({
                    title: this.sTranslate.get("ERROROFLOGIN"),
                    message: this.sTranslate.get("DBERROR"),
                    buttons: [this.sTranslate.get("OK")]
                })
            });
    }
    
    private validate() {
            let msg = "";
            if (this.email.trim() === "") {
                msg = this.sTranslate.get("VALIDEMAIL");
            } else if (this.password.trim() === "") {
                msg = this.sTranslate.get("VALIDPASS");
            }
            
            if (msg !== "") {
                this.alertCtrl.create({
                    title: this.sTranslate.get("ERROROFLOGIN"),
                    message: msg,
                    buttons: [this.sTranslate.get("OK")]
                }).present();

            } else {
                this.enterUser();
            }
            
    }
  onLink(url: string) {
      window.open(url);
  }
}