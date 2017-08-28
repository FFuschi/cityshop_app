import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import {
 GoogleMap
} from '@ionic-native/google-maps';

/**
 * Generated class for the ShopModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-modal',
  templateUrl: 'shop-modal.html',
})
export class ShopModalPage {
    
    map: GoogleMap;
    shop_id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public plt: Platform) {
      this.plt.ready().then(() => {
            this.map = navParams.get('map');  
            this.shop_id =  navParams.get('shop_id');    
        });
  }
  
   close() {
    document.getElementById('content_start').removeAttribute('class');//className = 'modalContentEnd';
    var attribute = document.createAttribute("class");
    attribute.nodeValue = "modalContentEnd";
    document.getElementById('content_start').setAttributeNode(attribute);
    this.viewCtrl.dismiss();
  }
  
  openInMap(){
      if (this.plt.is('ios'))
        window.open('maps://?q=Test&saddr=42.5802706,13.9850773&daddr=42.5802706,13.9850773', '_system');  
      else if (this.plt.is('android'))
        window.open('geo://42.5802706,13.9850773?q=42.5802706,13.9850773(Test)', '_system');
  }

}
