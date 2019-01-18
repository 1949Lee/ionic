import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { UserInfoPageModule } from './user-info/user-info.module';
import { UpdateAvatarPageModule } from './update-avatar/update-avatar.module';
import { ScanQrPageModule } from './scan-qr/scan-qr.module';
import { AboutPageModule } from './about/about.module';

@NgModule({
  declarations: [
    MorePage
  ],
  imports: [
    LoginPageModule,
    RegisterPageModule,
    UserInfoPageModule,
    UpdateAvatarPageModule,
    ScanQrPageModule,
    AboutPageModule,
    IonicPageModule.forChild(MorePage),
  ],
  exports: [
    MorePage,
    LoginPageModule,
    RegisterPageModule,
    UserInfoPageModule,
    ScanQrPageModule,
    AboutPageModule,
    UpdateAvatarPageModule
  ]
})
export class MorePageModule { }
