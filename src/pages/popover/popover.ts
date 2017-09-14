import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { InfoModalPage } from '../info-modal/info-modal';

import { TutorialPage } from '../tutorial/tutorial';
import { LoginPage } from '../login/login';

//Providers
import {AccountProvider} from '../../providers/account/account';

import {
 GoogleMap
} from '@ionic-native/google-maps';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
    
    map: GoogleMap;
    home_index: number;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public viewCtrl: ViewController, 
      private sAccount: AccountProvider, 
      public modalCtrl: ModalController,
      public loading: LoadingController
      ) {
      this.map = navParams.get('map');
  }
  
  close(){
      this.viewCtrl.dismiss();
  }
  
  tutorialAlert() {
      this.viewCtrl.onDidDismiss(()=>{
        this.map.setClickable(false);
        this.navCtrl.push(TutorialPage);
      })
  }
  
  infoAlert() {
      this.viewCtrl.onDidDismiss(()=>{
        this.map.setClickable(false);
        let infoModal = this.modalCtrl.create(InfoModalPage, {map:this.map});
        infoModal.present();

        infoModal.onWillDismiss(()=>{
            this.map.setClickable(true)
        });
      });
  }
  
  logout() {
      let loading = this.loading.create({
        content: 'Attendi...'
      });
      
      loading.present();
      
      this.viewCtrl.onDidDismiss(()=>{
        this.map.setClickable(false);
        this.sAccount.logout()
            .then(()=>{
                this.navCtrl.setRoot(LoginPage);
                loading.dismiss();
            });
      })
  }

}
