import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { UserInfoPageModule } from './user-info/user-info.module';
import { UpdateAvatarPageModule } from './update-avatar/update-avatar.module';

@NgModule({
  declarations: [
    MorePage
  ],
  imports: [
    LoginPageModule,
    RegisterPageModule,
    UserInfoPageModule,
    UpdateAvatarPageModule,
    IonicPageModule.forChild(MorePage),
  ],
  exports: [
    MorePage,
    LoginPageModule,
    RegisterPageModule,
    UserInfoPageModule,
    UpdateAvatarPageModule
  ]
})
export class MorePageModule { }
