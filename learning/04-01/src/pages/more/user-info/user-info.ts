import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { PopOverService } from '../../../share/service/pop-over.service';
import { avatarPath } from '../../../common/assets';

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

    /**存储用户的信息的结构体 */
    userInfo = {
        nickname: '未登录',
        avatar: avatarPath
    }

    /**默认头像 */
    avatar = `${avatarPath}?${Math.random()}`;

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

    /**导航 */
    nav(path: string) {
        switch (path) {
            case 'updateAvatar': // 导航到修改头像
                this.navUpdateAvatar();
                break;
            default:
                break;
        }
    }

    /**导航到更换头像 */
    navUpdateAvatar() {
        this.navCtrl.push('UpdateAvatarPage');
    }

    /**保存个人信息 */
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

    signOut(){
        this.storage.remove('userId');
        this.navCtrl.pop();
    }

}
