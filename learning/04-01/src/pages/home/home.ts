import { Component } from '@angular/core';
import { NavController, IonicPage, Tabs, ModalController, Modal } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { PageResult } from '../../common/utils/interface';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController
    ) {

    }

    /**导航 */
    nav(id: string) {
        // (this.navCtrl.parent as Tabs).select(2);
        switch (id) {
            case 'question':
                this.navQuestion();
                break;
            case 'answer':

                break;
            case 'share':

                break;
            default:
                break;
        }
    }

    /**弹出提问页面 */
    navQuestion() {
        let modal: Modal = this.modalCtrl.create(QuestionPage);
        modal.present();
        modal.onDidDismiss((data: PageResult) => {
            if (data && data.result === 0) {
                // 已提交提问
            } else {
                // 取消
            }
        });
    }

}
