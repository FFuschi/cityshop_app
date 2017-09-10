import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Platform } from 'ionic-angular';

//Providers
import {ProductProvider} from '../../providers/product/product';

import {Product} from '../../models/product.model';

@Component({
    selector: 'page-prodotto',
    templateUrl: 'prodotto.html'
})
export class ProdottoPage {

    store_name: String ="";
    product_id: Number;
    product: Product;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public plt: Platform, 
        public sProduct: ProductProvider  
        ) {
        this.store_name =  this.navParams.get('store_name');
        this.product_id =  this.navParams.get('product_id');
    }
    
    ngOnInit(){
        this.getProduct(this.product_id);
    }
    
    getProduct(id: Number){
        this.sProduct.getProduct(id)
            .then((data: Product)=>{
                this.product = data;   
           
            })
            .catch(() => {
                console.log("errore Mappa: non sono riuscito a Caricare i Marker");
            });
    }

}