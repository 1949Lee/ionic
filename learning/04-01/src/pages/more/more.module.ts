import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { UserInfoPageModule } from './user-info/user-info.module';
import { UpdateAvatarPageModule } from './update-avatar/update-avatar.module';
import { ScanQrPageModule } from './scan-qr/scan-qr.module';

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
    IonicPageModule.forChild(MorePage),
  ],
  exports: [
    MorePage,
    LoginPageModule,
    RegisterPageModule,
    UserInfoPageModule,
    ScanQrPageModule,
    UpdateAvatarPageModule
  ]
})
export class MorePageModule { }
