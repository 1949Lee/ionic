import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { PopOverService } from '../../share/service/pop-over.service';
import { avatarPath } from '../../common/assets';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-more',
    templateUrl: 'more.html',
})
export class MorePage {

    /**用户是否登录 */
    isLogined = false;

    /**用户信息是否有效 */
    isValidInfo = false;

    /**默认头像路径 */
    avatar = `${avatarPath}?${Math.random()}`;

    /**用户信息 */
    userInfo = {
        nickname: '未登录',
        avatar: null,
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private storage: Storage,
        private rest: RestProvider,
        private popOver: PopOverService
    ) {
    }

    ionViewDidLoad() {
    }

    /**导航 */
    nav(path: string) {
        switch (path) {
            // 导航到登录
            case 'login':
                this.navLogin();
                break;

            // 导航到个人信息
            case 'userInfo':
                this.navToUserInfo();
                break;

            // 扫描二维码
            case 'scanQR':
                this.navToScanQR();
                break;

            // 关于APP
            case 'about':
                this.navToUserInfo();
                break;

            default:
                break;
        }
    }

    /**跳转到登录 */
    navLogin() {
        let result: Modal = this.modalCtrl.create('LoginPage');
        result.present();
        result.onDidDismiss((data) => {
            if (data && data.result === 0) {
                // 用户登录成功
                this.isLogined = true;
            } else {
                this.isLogined = false;
            }
        });
    }

    navToUserInfo() {
        this.navCtrl.push('UserInfoPage');
    }

    ionViewDidEnter() {
        this.storage.get('userId').then((value) => {
            console.log(value);
            if (value) {
                this.isLogined = true;
                this.rest.getUserInfo({ userId: value }).subscribe((data) => {
                    console.log(data);
                    if (data.Status === 'OK') {
                        this.userInfo.avatar = data.UserHeadface;
                        this.userInfo.nickname = data.UserNickName;
                        this.avatar = `${data.UserHeadface}?${Math.random()}`
                    } else {
                        this.popOver.toast({ message: data.StatusContent });
                    }
                });
            } else {
                this.isLogined = false;
            }
        });
    }

    navToScanQR(){
        this.navCtrl.push('ScanQrPage',null,{animate:false});
    }


}
