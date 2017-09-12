import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Platform } from 'ionic-angular';

//Providers
import {ProductProvider} from '../../providers/product/product';

import {Product} from '../../models/product.model';
import {Categoria} from '../../models/categoria.model';
import {Brand} from '../../models/brand.model';

@Component({
    selector: 'page-prodotto',
    templateUrl: 'prodotto.html'
})
export class ProdottoPage {

    store_name: String ="";
    product_id: Number;
    product: Product;
    brand: Brand;
    category: Categoria;

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
        this.getCategory(this.product_id);
        this.getBrand(this.product_id);
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
    
    getCategory(id: Number){
        this.sProduct.getProductCategories(id)
            .then((data: Categoria)=>{
                this.category = data;   
           
            })
            .catch(() => {
                console.log("errore Mappa: non sono riuscito a Caricare i Marker");
            });
    }
    
    getBrand(id: Number){
        this.sProduct.getProductBrands(id)
            .then((data: Brand)=>{
                this.brand = data;   
           
            })
            .catch(() => {
                console.log("errore Mappa: non sono riuscito a Caricare i Marker");
            });
    }

}