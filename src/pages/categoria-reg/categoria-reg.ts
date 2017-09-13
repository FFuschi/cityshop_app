import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

//Providers
import {CategoryProvider} from '../../providers/category/category';

import {Categoria} from '../../models/categoria.model';
import { UserReg } from '../../models/user.model';
import { BrandRegPage } from '../brand-reg/brand-reg';

@IonicPage()
@Component({
  selector: 'page-categoria-reg',
  templateUrl: 'categoria-reg.html',
})
export class CategoriaRegPage {
    
    user: UserReg = new UserReg;
    categorySelector: Array<Categoria> = [];
    check: boolean[] = [];
    categories: Array<Categoria> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sCategories: CategoryProvider, public plt: Platform) {
      
      this.plt.ready().then(() => {  
            
            this.user =  this.navParams.get('user'); 
                
        });
  }
  
  ngOnInit(){
      this.getCategories();
  }
    
  getCategories(){
        this.sCategories.getCategories()
            .then((data: Array<Categoria>)=>{
                this.categories = data;
                for (var i =0; i<this.categories.length; i++){
                    this.check[i] = false;
                }
            })
            .catch(()=>{
                console.log("errore Shop: non sono riuscito a caricare le Info");
            }); 
    }
    
   updateCategory(index: number, category: Categoria){
        this.check[index]=!this.check[index];
        if(!this.check[index]){
            document.getElementById("check" + category.nome).style.backgroundColor = "white";
            this.categorySelector[index] = null;
        } else {
            document.getElementById("check" + category.nome).style.backgroundColor = "rgba(123, 123, 123, 0.3)";
            this.categorySelector[index] = category;
        }
    }
    
    next(){
        for(let item of this.categorySelector){
            console.log(item);
        }
        this.navCtrl.push(BrandRegPage, {user: this.user, categories: this.categorySelector});
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaRegPage');
  }

}