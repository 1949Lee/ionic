import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = 'TabsPage';

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {

            // 好了，现在我们的程序已经加载完毕了，你在这里可以写一些全局代码。但是越少越好！！！
            statusBar.styleDefault();

            // 首屏加载等待动画关闭
            splashScreen.hide();
        });
    }
}
