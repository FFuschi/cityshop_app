import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//Providers
import { BrandProvider } from '../../providers/brand/brand';
import { AccountProvider } from '../../providers/account/account';
import { DictionaryServiceProvider } from '../../providers/dictionary-service/dictionary-service';

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
      public loadingCtrl: LoadingController,
      public statusBar: StatusBar,
      public sTranslate: DictionaryServiceProvider,
      public plt: Platform
      ) {
      
        this.plt.ready().then(() => {  
              this.categories = this.navParams.get('categories');
              this.user =  this.navParams.get('user'); 

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
        
        const loading = this.loadingCtrl.create({content: this.sTranslate.get("WAIT")});
        loading.present();
        
        for(let item of this.brandsSelector){
            console.log(item);
        }
        
        var aCategory: Array<Categoria> = [];
        var aBrand: Array<Brand> = [];
        var j = 0;
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i] != null){
                aCategory[j] = this.categories[i];
                j++;
            }
        }
        
        j = 0;
        
        for (let i = 0; i < this.brandsSelector.length; i++) {
            if (this.brandsSelector[i] != null){
                aBrand[j] = this.brandsSelector[i];
                j++;
            }
        }
        
        this.sAccount.signup(this.user, aCategory, aBrand).then(()=>{
            this.sAccount.login(this.user.email, this.user.password).then(()=>{
                loading.dismiss().then(() => {
                    this.navCtrl.setRoot(HomePage);
                });
            });
        });
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandRegPage');
  }

}
