import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { PopOverService } from '../../../share/service/pop-over.service';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-info',
    templateUrl: 'user-info.html',
})
export class UserInfoPage {

    userInfo = {
        nickname: '未登录',
        avatar: '../../assets/imgs/avatar.png'
    }
    avatar = `../../assets/imgs/avatar.png?${Math.random()}`;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        private rest: RestProvider,
        private popOver: PopOverService) {
    }

    ionViewDidLoad() {
    }

    // 进入视图会刷新：导航的push或pop
    ionViewDidEnter() {
        this.storage.get('userId').then((value) => {
            if (value) {
                let loader = this.popOver.loading({content:'正在获取最新信息'});
                this.rest.getUserInfo({ userId: value }).subscribe((data) => {
                    loader.dismiss();
                    if (data.Status === 'OK') {
                        this.userInfo.avatar = data.UserHeadface;
                        this.userInfo.nickname = data.UserNickName;
                        this.avatar = `${data.UserHeadface}?${Math.random()}`
                    } else {
                        this.popOver.toast({ message: data.StatusContent });
                    }
                });
            }
        });
    }

    nav(path: string) {
        switch (path) {
            case 'updateAvatar': // 导航到修改头像
                this.navUpdateAvatar();
                break;
            default:
                break;
        }
    }

    navUpdateAvatar() {
        this.navCtrl.push('UpdateAvatarPage');
    }

    update() {
        this.storage.get('userId').then((data) => {
            let loader = this.popOver.loading({ content: '努力保存中...' });
            this.rest.updateUserInfo({
                userId: data,
                nickname: this.userInfo.nickname
            }).subscribe((res) => {
                loader.dismiss();
                if (res.Status = 'OK') {
                    this.popOver.toast({ message: '保存成功' });
                    this.navCtrl.pop();
                }
            })
        })
    }

}
