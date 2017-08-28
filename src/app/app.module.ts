import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

import { MyApp } from './app.component';
import { SplashPage } from '../pages/splash/splash';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/popover/popover';
import { InfoModalPage } from '../pages/info-modal/info-modal';
import { ShopModalPage } from '../pages/shop-modal/shop-modal';
import { ProfilePage } from '../pages/profile/profile';
import { AccountProvider } from '../providers/account/account';
import { UserPersistanceProvider } from '../providers/user-persistance/user-persistance';

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    HomePage,
    PopoverPage,
    InfoModalPage,
    ShopModalPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
        name: '__cityshop_list',
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    HomePage,
    PopoverPage,
    InfoModalPage,
    ShopModalPage,
    ProfilePage
  ],
  providers: [
    SplashScreen,
    GoogleMaps,
    Geolocation,
    StatusBar,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpModule,
    IonicStorageModule,
    AccountProvider,
    UserPersistanceProvider
  ]
})
export class AppModule {}
