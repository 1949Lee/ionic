import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatPage } from '../pages/chat/chat';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { MorePage } from '../pages/more/more';
import { NotificationPage } from '../pages/notification/notification';

@NgModule({
    declarations: [
        MyApp,
        ChatPage,
        DiscoveryPage,
        MorePage,
        NotificationPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ChatPage,
        DiscoveryPage,
        NotificationPage,
        MorePage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
