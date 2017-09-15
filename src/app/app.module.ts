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
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Globalization } from '@ionic-native/globalization';

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
import { CategoriaRegPage } from '../pages/categoria-reg/categoria-reg';
import { BrandRegPage } from '../pages/brand-reg/brand-reg';

import { AccountProvider } from '../providers/account/account';
import { UserPersistanceProvider } from '../providers/user-persistance/user-persistance';
import { StoreProvider } from '../providers/store/store';
import { ProductProvider } from '../providers/product/product';
import { CategoryProvider } from '../providers/category/category';
import { BrandProvider } from '../providers/brand/brand';
import { AccesspersistanceProvider } from '../providers/accesspersistance/accesspersistance';
import { DictionaryPipe } from '../pipes/dictionary/dictionary';
import { DictionaryServiceProvider } from '../providers/dictionary-service/dictionary-service';

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
    BrandsPage,
    CategoriaRegPage,
    BrandRegPage,
    DictionaryPipe
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
    BrandsPage,
    CategoriaRegPage,
    BrandRegPage
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
    BrandProvider,
    AccesspersistanceProvider,
    File,
    FileTransfer,
    FileTransferObject,
    FilePath,
    Globalization,
    DictionaryServiceProvider
  ]
})
export class AppModule {}
