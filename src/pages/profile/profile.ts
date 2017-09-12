import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { BrandsPage } from '../brands/brands';

//Models
import {User} from '../../models/user.model';
import {Categoria} from '../../models/categoria.model';
import {Brand} from '../../models/brand.model';

//Providers
import {AccountProvider} from '../../providers/account/account';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    user: User;
    token: String = "";
    categorie: Array<Categoria>;
    brands: Array<Brand>;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public plt: Platform, 
      public statusBar: StatusBar,
      public sAccount: AccountProvider, 
      public alertCtrl: AlertController
      ) {
      
      this.plt.ready().then(() => {
            
            
       });
      
  }
  
  ngOnInit(){
        this.getUser();
        this.token = this.user.token;
        this.getCategories();
        this.getBrands();
    }
  
  ionViewWillEnter(){
        
        this.plt.ready().then(() => {
            
            this.statusBar.show();
            
            // let status bar overlay webview
            this.statusBar.overlaysWebView(true);

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#ff823e');
            
            this.getCategories();
            this.getBrands();
            
        });
        
    }
    
    getUser() {
        this.user = this.sAccount.getUser();    
    }
    
    getCategories(){
        this.sAccount.getUserCategories(this.token)
            .then((data: Array<Categoria>)=>{
                this.categorie = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  getBrands(){
      this.sAccount.getUserBrands(this.token)
            .then((data: Array<Brand>)=>{
                this.brands = data;
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
  }
  
  changeAttribute(value: string, type: string){
      let alert = this.alertCtrl.create({
        inputs: [
          {
            name: 'value',
            value: value,
          }
        ],
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel'
          },
          {
            text: 'Salva',
            handler: data => {
                if(data.vale != ""){
                    var userUp = this.user;
                    if(type == 'firstname'){
                        userUp.firstname = data.value;
                    } else if(type == 'lastname'){
                        userUp.lastname = data.value;
                    }
                    this.sAccount.update(userUp, this.token)
                        .then(()=>{
                            this.getUser();
                            return;
                        })
                        .catch(()=>{
                            console.log("errore Shop: non sono riuscito a caricare le Info");
                            return false;
                        }); 
                }
            }
          }
        ]
      });
      alert.present();
  }
  
  openCategories(){
      this.navCtrl.push(CategoriesPage, {token: this.token});
  }
  
  openBrands() {
      this.navCtrl.push(BrandsPage, {token: this.token});
  }

}
