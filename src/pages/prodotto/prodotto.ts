import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Platform } from 'ionic-angular';

@Component({
    selector: 'page-prodotto',
    templateUrl: 'prodotto.html'
})
export class ProdottoPage {

    product_id: Number;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public plt: Platform 
        ) {
        this.product_id =  this.navParams.get('product_id');
    }

}