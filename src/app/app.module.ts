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
import { Camera} from '@ionic-native/camera';

import { MyApp } from './app.component';
import { SplashPage } from '../pages/splash/splash';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/popover/popover';
import { InfoModalPage } from '../pages/info-modal/info-modal';
import { ShopModalPage } from '../pages/shop-modal/shop-modal';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ProductsListPage } from '../pages/products-list/products-list';
import { ProdottoPage } from '../pages/prodotto/prodotto';
import { CategoriesPage } from '../pages/categories/categories';
import { BrandsPage } from '../pages/brands/brands';

import { AccountProvider } from '../providers/account/account';
import { UserPersistanceProvider } from '../providers/user-persistance/user-persistance';
import { StoreProvider } from '../providers/store/store';
import { ProductProvider } from '../providers/product/product';
import { CategoryProvider } from '../providers/category/category';
import { BrandProvider } from '../providers/brand/brand';

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    HomePage,
    PopoverPage,
    InfoModalPage,
    ShopModalPage,
    ProfilePage,
    LoginPage,
    RegistrazionePage,
    TutorialPage,
    ProductsListPage,
    ProdottoPage,
    CategoriesPage,
    BrandsPage
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
    ProfilePage,
    LoginPage,
    RegistrazionePage,
    TutorialPage,
    ProductsListPage,
    ProdottoPage,
    CategoriesPage,
    BrandsPage
  ],
  providers: [
    SplashScreen,
    GoogleMaps,
    Geolocation,
    StatusBar,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    HttpModule,
    IonicStorageModule,
    AccountProvider,
    UserPersistanceProvider,
    StoreProvider,
    ProductProvider,
    CategoryProvider,
    BrandProvider
  ]
})
export class AppModule {}
