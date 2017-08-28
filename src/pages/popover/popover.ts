import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { InfoModalPage } from '../info-modal/info-modal';

import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, public modalCtrl: ModalController) {
      this.map = navParams.get('map');
  }
  
  close() {
    this.viewCtrl.dismiss();
  }
  
  tutorialAlert() {
      this.viewCtrl.onDidDismiss(()=>{
        this.map.setClickable(false);
        let alert = this.alertCtrl.create({
          title: 'Low battery',
          subTitle: '10% of battery remaining',
          buttons: [{text: 'Cancel', role:'dissmiss', handler : () => { this.map.setClickable(true)}}]
        });
        alert.present();
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

}
