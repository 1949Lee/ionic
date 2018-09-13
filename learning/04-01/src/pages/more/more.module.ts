import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPage } from './login/login';

@NgModule({
  declarations: [
    MorePage,
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(MorePage),
  ],
})
export class MorePageModule {}
