import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsModule } from '../pages/tabs/tabs.module';
import { RestProvider } from '../providers/rest/rest';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PopOverService } from '../share/service/pop-over.service';
import { IonicStorageModule } from "@ionic/storage";
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';
import { FilePath } from '@ionic-native/file-path';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        TabsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // ShareModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '返回'
        }),
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
        Camera,
        File,
        FilePath,
        FileTransfer,
        QRScanner,
        AppVersion,
        { provide: PopOverService, useFactory: (loading, toast,alert) => { return new PopOverService(loading, toast,alert) }, deps: [LoadingController, ToastController,AlertController] },
        EmojiProvider,
        ChatServiceProvider
    ]
})
export class AppModule {
    constructor(private qrScanner: QRScanner) {
        // 准备开启扫描
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // 成功
                } else if (status.denied) {
                    // 拒绝权限，无法扫描二维码
                } else {
                    // 稍后重试
                }
            })
            .catch((e: any) => console.log(e));
    }
}
