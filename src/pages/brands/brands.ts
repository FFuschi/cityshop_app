import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//Providers
import {BrandProvider} from '../../providers/brand/brand';
import {AccountProvider} from '../../providers/account/account';

import {Brand} from '../../models/brand.model';
/**
 * Generated class for the BrandsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-brands',
  templateUrl: 'brands.html',
})
export class BrandsPage {

    check: boolean[] = [];
    brands: Array<Brand> = [];
    userBrand: Array<Brand> = [];
    token: String = "";

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public plt: Platform, 
      public statusBar: StatusBar,
      public sBrand: BrandProvider,
      public sAccount: AccountProvider
      ) {
      
      this.token =  this.navParams.get('token');
  }
  
  ngOnInit(){
      this.getBrands();
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
    
    getBrands(){
        this.sBrand.getBrands()
            .then((data: Array<Brand>)=>{
                this.brands = data;
                this.getUserBrands();
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
    }
    
    getUserBrands(){
        this.sAccount.getAllUserBrands(this.token)
            .then((data: Array<Brand>)=>{
                this.userBrand = data;
                
                for (var i = 0; i < this.brands.length; i++){
                    let found: boolean = false;
                    for (var j = 0; j < this.userBrand.length && !found; j++){
                        if (this.brands[i].nome == this.userBrand[j].nome){
                            this.check[i]= true;
                            found=true;
                        }
                    }
                    if(!found){
                        this.check[i]= false;
                    }
                }
                
                this.initializeList();
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  initializeList(){
        for(var i = 0; i < this.check.length; i++){
            if(this.check[i] != false){
                document.getElementById("check" + this.brands[i].nome).style.backgroundColor = "rgba(123, 123, 123, 0.3)";
            }
        }
    }
    
    updateBrand(index: number, brand: Brand){
        this.check[index]=!this.check[index];
        if(!this.check[index]){
            document.getElementById("check" + brand.nome).style.backgroundColor = "white";
            this.sBrand.removeUserBrands(this.token, brand);
        } else {
        document.getElementById("check" + brand.nome).style.backgroundColor = "rgba(123, 123, 123, 0.3)";
            this.sBrand.addUserBrands(this.token, brand);
        }
    }
    

}
