import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MorePage');
    }

    nav(path: string) {
        switch (path) {
            case 'login':
                this.navLogin();
                break;
            default:
                break;
        }
    }

    navLogin(){
        let result: Modal = this.modalCtrl.create('LoginPage');
        result.present();
        result.onDidDismiss((data) => {
            console.log(data);
            if(data&&data.result === 0){
                // 用户登录成功
            }
        });
    }


}
