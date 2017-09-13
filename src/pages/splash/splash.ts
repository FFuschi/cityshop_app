import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

//Providers
import { AccountProvider } from '../../providers/account/account';
import { AccesspersistanceProvider } from '../../providers/accesspersistance/accesspersistance';

import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { TutorialPage } from '../tutorial/tutorial';

/**
 * Generated class for the SplashPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
    
  splash = true; //splashscreen

  constructor(
      public navCtrl: NavController,
      public plt: Platform, 
      public navParams: NavParams, 
      private statusBar: StatusBar,
      public sAccount: AccountProvider,
      public aPersistance: AccesspersistanceProvider
      ) {
      
      this.statusBar.hide();
      
  }

  ionViewDidLoad() {
      this.plt.ready().then(() => {
            
            setTimeout(() => this.splash = false, 5000);
            setTimeout(() => {
                if (!this.sAccount.isLogged()){
                    this.aPersistance.get().then((data)=>{
                        console.log(data);
                        if(data == true){
                            this.navCtrl.setRoot(LoginPage);
                        } else {
                            this.navCtrl.setRoot(TutorialPage);
                        }
                    });
                }
                else {
                    this.navCtrl.setRoot(HomePage);
                }
            }, 5000);
            
        });
  }

}
