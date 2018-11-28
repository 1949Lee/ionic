import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PageResult } from '../../common/utils/interface';

@IonicPage()
@Component({
    selector: 'page-question',
    templateUrl: 'question.html',
})
export class QuestionPage {

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private viewCtrl: ViewController,
        ) {
    }

    ionViewDidLoad() {
    }

    /**取消并返回 */
    dismiss() {
        this.viewCtrl.dismiss({ result: 1, message: '用户取消，提问' } as PageResult);
    }

    /**提交问题 */
    submit() {
        const data = {
            userid:'',
            title:'',
            content:'',
        }
    }

}
