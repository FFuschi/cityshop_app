import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//Providers
import {StoreProvider} from '../../providers/store/store';

import {Product} from '../../models/product.model';

import { ProdottoPage } from '../prodotto/prodotto';

/**
 * Generated class for the ProductsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-products-list',
  templateUrl: 'products-list.html',
})
export class ProductsListPage {

    store_name: String = "";
    store_id: Number;
    products: Array<Product>;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public plt: Platform, 
      private statusBar: StatusBar, 
      public sStore: StoreProvider 
      ) {
      
      this.plt.ready().then(() => {
            this.store_id =  this.navParams.get('store_id');  
            this.store_name =  this.navParams.get('store_name'); 
                
        });
  }
  
  ionViewWillEnter(){
        
        this.plt.ready().then(() => {
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#ff823e');
            
        });
        
    }
    
    ngOnInit(){
        this.getProducts(this.store_id);
    }
    
    getProducts(id: Number){

        this.sStore.getAllProducts(id)
            .then((data: Array<Product>)=>{
                this.products = data;   
           
            })
            .catch(() => {
                console.log("errore Mappa: non sono riuscito a Caricare i Marker");
            });     
         
    }

    openProduct(id: Number) {
        this.navCtrl.push(ProdottoPage, {product_id: id});
    }

}
