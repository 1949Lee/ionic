import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsModule } from '../pages/tabs/tabs.module';
import { RestProvider } from '../providers/rest/rest';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PopOverService } from '../share/service/pop-over.service';
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        TabsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        RestProvider,
        {provide:PopOverService,useFactory:(loading,toast)=>{ return new PopOverService(loading,toast)},deps:[LoadingController,ToastController]}
    ]
})
export class AppModule { }
