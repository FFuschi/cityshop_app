import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import {
 GoogleMap
} from '@ionic-native/google-maps';

import { ProductsListPage } from '../products-list/products-list';

import {Store} from '../../models/store.model';

import {StoreProvider} from '../../providers/store/store';

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
    shop_id: Number;
    store: Store;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public viewCtrl: ViewController,
      public statusBar: StatusBar,
       public plt: Platform, 
        public sStore: StoreProvider
       ) {
      this.plt.ready().then(() => {
            this.map = navParams.get('map');
            this.shop_id =  this.navParams.get('shop_id');  
                
        });
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
    
    ngOnInit(){
        this.getStore();
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
          window.open('maps://?q=' + this.store.nome + '&saddr=' + this.store.latitudine + ',' + this.store.longitudine + '&daddr=' + this.store.latitudine + ',' + this.store.longitudine, '_system');  
      else if (this.plt.is('android'))
        window.open('geo://'+ this.store.latitudine +','+ this.store.longitudine +'?q='+ this.store.latitudine +','+ this.store.longitudine +'('+ this.store.nome +')', '_system');
  }
  
  getStore() {
        this.sStore.getStore(this.shop_id)
            .then((data: Store)=>{
                this.store = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  openProducts(){
      this.navCtrl.push(ProductsListPage, {store_id: this.store.id, store_name: this.store.nome});
  }

}
