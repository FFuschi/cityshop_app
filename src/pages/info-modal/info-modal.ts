import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';

import {
 GoogleMap
} from '@ionic-native/google-maps';

/**
 * Generated class for the InfoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {

   map: GoogleMap;
   item_version = "0.0.0";
   item_name = "CityShop";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public plt: Platform, private appVersion: AppVersion) {
      this.plt.ready().then(() => {
            this.map = navParams.get('map');
            this.appVersion.getAppName().then((name) => {
                this.item_name = name;
            });
            this.appVersion.getVersionNumber().then((version) => {
                this.item_version = version;
            });
            
        });     
  }
  
  close() {
    document.getElementById('content_start').removeAttribute('class');//className = 'modalContentEnd';
    var attribute = document.createAttribute("class");
    attribute.nodeValue = "modalContentEnd";
    document.getElementById('content_start').setAttributeNode(attribute);
    this.viewCtrl.dismiss();
  }

}
