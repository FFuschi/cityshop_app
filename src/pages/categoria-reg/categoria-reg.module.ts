import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaRegPage } from './categoria-reg';

@NgModule({
  declarations: [
    CategoriaRegPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaRegPage),
  ],
  exports: [
    CategoriaRegPage
  ]
})
export class CategoriaRegPageModule {}
