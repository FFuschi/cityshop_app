import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//Models
import {User} from '../../models/user.model';

//Providers
import {AccountProvider} from '../../providers/account/account';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    name: String = "";
    lastname: String = "";
    email: String = "";
    image: String = "";

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public plt: Platform, 
      public statusBar: StatusBar,
      public sAccount: AccountProvider, 
      ) {
      
      this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            
            
       });
      
  }
  
  ionViewDidEnter(){
        
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#ff823e');
            
            this.getUser();
            
        });
        
    }
    
    getUser() {
        var user = this.sAccount.getUser();    
        this.name = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.image = user.image;
    }

}
