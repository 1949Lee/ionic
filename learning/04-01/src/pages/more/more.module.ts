import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { ShareModule } from '../../share/shre.module';

@NgModule({
  declarations: [
    MorePage
  ],
  imports: [
    LoginPageModule,
    RegisterPageModule,
    ShareModule,
    IonicPageModule.forChild(MorePage),
  ],
  exports: [
    MorePage,
    LoginPageModule,
    RegisterPageModule
  ]
})
export class MorePageModule { }
