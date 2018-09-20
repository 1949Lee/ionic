import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

    isLogined = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private storage:Storage
        ) {
    }

    ionViewDidLoad() {
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

    navLogin() {
        let result: Modal = this.modalCtrl.create('LoginPage');
        result.present();
        result.onDidDismiss((data) => {
            console.log(data);
            if (data && data.result === 0) {
                // 用户登录成功
                this.isLogined = true;
            } else {
                this.isLogined = false;
            }
        });
    }

    ionViewDidEnter(){
        this.storage.get('userId').then((value) => {
            if(value){
                this.isLogined = true;
            } else {
                this.isLogined = false;
            }
        });
    }


}
