import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PopOverService } from '../../../share/service/pop-over.service';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
    selector: 'page-scan-qr',
    templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

    scanSub: Subscription = null;
    cameraAuthorized: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private popOver: PopOverService,
        private qrScanner: QRScanner) {
    }

    ionViewDidEnter() {
        this.scanQRCode();
    }

    scanQRCode() {
        // 准备开启扫描
        if (this.cameraAuthorized) {
            if (this.scanSub !== null) {
                this.scanSub.unsubscribe();
                this.scanSub = null;
            }
            // 相机授权后 开始扫描
            this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                this.popOver.alert({
                    title:'温馨提示',
                    subTitle:text,
                    buttons:[{
                        text:'确定'
                    }]
                })
            });
            this.qrScanner.show();
        }
    }

    ionViewWillLeave() {
        this.qrScanner.hide(); // 隐藏摄像头画面
        if (this.scanSub !== null) { // 停止扫描
            this.scanSub.unsubscribe();
            this.scanSub = null;
        }
    }

}
