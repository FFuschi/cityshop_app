import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { TutorialPage } from '../tutorial/tutorial';

/**
 * Generated class for the SplashPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
    
  splash = true; //splashscreen

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
      
      this.statusBar.hide();
      
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 5000);
    setTimeout(() => this.navCtrl.push(TutorialPage), 5000);
  }

  onLink() {
      this.navCtrl.push(TutorialPage);
  }

}
