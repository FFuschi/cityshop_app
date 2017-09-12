import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//Providers
import {CategoryProvider} from '../../providers/category/category';
import {AccountProvider} from '../../providers/account/account';

import {Categoria} from '../../models/categoria.model';

/**
 * Generated class for the CategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

    check: boolean[] = [];
    categories: Array<Categoria> = [];
    userCategorie: Array<Categoria> = [];
    token: String = "";

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public plt: Platform, 
      public statusBar: StatusBar,
      public sCategory: CategoryProvider,
      public sAccount: AccountProvider
      ) {
      
      this.token =  this.navParams.get('token');
  }
  
  ngOnInit(){
      this.getCategories();
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
    
    getCategories(){
        this.sCategory.getCategories()
            .then((data: Array<Categoria>)=>{
                this.categories = data;
                this.getUserCategories();
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
    }
    
    getUserCategories(){
        this.sAccount.getAllUserCategories(this.token)
            .then((data: Array<Categoria>)=>{
                this.userCategorie = data;
                
                for (var i = 0; i < this.categories.length; i++){
                    let found: boolean = false;
                    for (var j = 0; j < this.userCategorie.length && !found; j++){
                        if (this.categories[i].nome == this.userCategorie[j].nome){
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
    
    updateCategory(index: number, category: Categoria){
        this.check[index]=!this.check[index];
        if(!this.check[index]){
            document.getElementById("check" + category.nome).style.backgroundColor = "white";
            this.sCategory.removeUserCategories(this.token, category);
        } else {
            document.getElementById("check" + category.nome).style.backgroundColor = "rgba(123, 123, 123, 0.3)";
            this.sCategory.addUserCategories(this.token, category);
        }
    }
    
    initializeList(){
        for(var i = 0; i < this.check.length; i++){
            if(this.check[i] != false){
                document.getElementById("check" + this.categories[i].nome).style.backgroundColor = "rgba(123, 123, 123, 0.3)";
            }
        }
    }

}
