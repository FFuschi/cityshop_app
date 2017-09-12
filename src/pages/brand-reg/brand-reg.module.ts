import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandRegPage } from './brand-reg';

@NgModule({
  declarations: [
    BrandRegPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandRegPage),
  ],
  exports: [
    BrandRegPage
  ]
})
export class BrandRegPageModule {}
