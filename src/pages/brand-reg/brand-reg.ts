import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

//Providers
import { BrandProvider } from '../../providers/brand/brand';
import { AccountProvider } from '../../providers/account/account';

import { Brand } from '../../models/brand.model';
import { HomePage } from '../home/home';
import {Categoria} from '../../models/categoria.model';
import { UserReg } from '../../models/user.model';

/**
 * Generated class for the BrandRegPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-brand-reg',
  templateUrl: 'brand-reg.html',
})
export class BrandRegPage {
    
    categories: Array<Categoria>;
    user: UserReg = new UserReg;
    brandsSelector: Array<Brand> = [];
    check: boolean[] = [];
    brands: Array<Brand> = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams, 
      public sBrand: BrandProvider, 
      public sAccount: AccountProvider, 
      public plt: Platform) {
      
        this.plt.ready().then(() => {  
              this.categories = this.navParams.get('categories');
              this.user =  this.navParams.get('user'); 

          });
  }
    
  ngOnInit(){
      this.getBrands();
  }
  
  getBrands(){
        this.sBrand.getBrands()
            .then((data: Array<Brand>)=>{
                this.brands = data;
                for (var i =0; i<this.brands.length; i++){
                    this.check[i] = false;
                }
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  updateBrand(index: number, brand: Brand){
        this.check[index]=!this.check[index];
        if(!this.check[index]){
            document.getElementById("check" + brand.nome).style.backgroundColor = "white";
            this.brandsSelector[index] = null;
        } else {
            document.getElementById("check" + brand.nome).style.backgroundColor = "rgba(123, 123, 123, 0.3)";
            this.brandsSelector[index] = brand;
        }
    }
    
    next(){
        for(let item of this.brandsSelector){
            console.log(item);
        }
        this.sAccount.signup(this.user, this.categories, this.brandsSelector);
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandRegPage');
  }

}
