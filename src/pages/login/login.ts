import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RegistrazionePage } from '../registrazione/registrazione';
import { HomePage } from '../home/home';

//Models
import {User} from '../../models/user.model';

//Providers
import {AccountProvider} from '../../providers/account/account';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    
  username: string = "test@test.it";
  password: string = "asd";
  regButton = RegistrazionePage;

  constructor(
      public navCtrl: NavController,
      public sAccount: AccountProvider, 
      ) {
    
  }
    //splashscren
  ionViewDidLoad() {
  }
  
  login() {
            
        this.sAccount.login(this.username, this.password)
            .then((user: User) => {
                console.log("logged: ", user);
                this.navCtrl.push(HomePage);
            })
            .catch(() => {
                console.log("errore login: non mi sono riuscito a loggare");

            });
    }

  onLink(url: string) {
      window.open(url);
  }
}