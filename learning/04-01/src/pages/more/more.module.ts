import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPageModule } from './login/login.module';

@NgModule({
  declarations: [
    MorePage
  ],
  imports: [
    LoginPageModule,
    IonicPageModule.forChild(MorePage),
  ],
  exports: [
    MorePage,
    LoginPageModule
  ]
})
export class MorePageModule { }
