import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { avatarPath } from '../../../common/assets';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-details',
    templateUrl: 'details.html',
})
export class DetailsPage {

    // 默认图片路径
    avatarPath: string = avatarPath;

    // 问题
    question:any = null;

    // 回答列表
    answerList:any = [];

    // 标签数组
    tags: string[] = ['旅行','高铁','自助游','欧洲','X 是种怎样的体验','俄罗斯'];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rest: RestProvider) {
        this.rest.getQuestion({ id: this.navParams.data.id }).subscribe((question) => {
            console.log(question);
            this.question = question;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');
    }

}
