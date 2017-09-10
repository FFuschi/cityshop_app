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
import {Categoria} from '../../models/categoria.model';
import {Brand} from '../../models/brand.model';

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
    shop: Store;
    categorie: Array<Categoria>;
    brands: Array<Brand>;

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
                    
        });
  }
  
  ngOnInit(){
        this.shop_id =  this.navParams.get('shop_id');
        this.getStore();
        this.getCategories();
        this.getBrands();
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
  
   close() {
    document.getElementById('content_start').removeAttribute('class');//className = 'modalContentEnd';
    var attribute = document.createAttribute("class");
    attribute.nodeValue = "modalContentEnd";
    document.getElementById('content_start').setAttributeNode(attribute);
    this.viewCtrl.dismiss();
  }
  
  openInMap(){
      if (this.plt.is('ios'))
          window.open('maps://?q=' + this.shop.nome + '&saddr=' + this.shop.latitudine + ',' + this.shop.longitudine + '&daddr=' + this.shop.latitudine + ',' + this.shop.longitudine, '_system');  
      else if (this.plt.is('android'))
        window.open('geo://'+ this.shop.latitudine +','+ this.shop.longitudine +'?q='+ this.shop.latitudine +','+ this.shop.longitudine +'('+ this.shop.nome +')', '_system');
  }
  
  getStore() {
        this.sStore.getStore(this.shop_id)
            .then((data: Store)=>{
                this.shop = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  getCategories(){
      this.sStore.getStoreCategories(this.shop_id)
            .then((data: Array<Categoria>)=>{
                this.categorie = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  getBrands(){
      this.sStore.getStoreBrands(this.shop_id)
            .then((data: Array<Brand>)=>{
                this.brands = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  openProducts(){
      this.navCtrl.push(ProductsListPage, {store_id: this.shop.id, store_name: this.shop.nome});
  }

}
