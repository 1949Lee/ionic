import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { avatarPath } from '../../../common/assets';
import { PopOverService } from '../../../share/service/pop-over.service';
import { Storage } from '@ionic/storage';

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

    // 用户id
    userId: String = '';

    // 问题id
    questionId: string = '';

    // 默认图片路径
    avatarPath: string = avatarPath;

    // 问题
    question: any = null;

    // 回答列表
    answerList: any = [];

    // 标签数组
    tags: string[] = ['旅行', '高铁', '自助游', '欧洲', 'X 是种怎样的体验', '俄罗斯'];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private popover: PopOverService,
        private storage: Storage,
        private rest: RestProvider) {
            this.storage.get('userId').then((val) => {
                this.userId = val;
                this.getQuestion();
            })
    }

    ionViewDidLoad() {

    }

    getQuestion(){
        this.questionId = this.navParams.get('id');
        let loader:Loading = this.popover.loading({content:'拼命获取中'});
        this.rest.getQuestionWithUser({ id: this.questionId,userid:this.userId }).subscribe((question) => {
            loader.dismiss();
            console.log(question);
            this.question = question;
            this.answerList = question.Answers;
        },error => {
            loader.dismiss();
        });
    }


    markQuestion(){
        let loading: Loading = this.popover.loading({content:'拼命处理中'});
        this.rest.markQuestion({questionid:this.questionId,userid:this.userId}).subscribe((res) => {
            loading.dismiss();
            if(res.Status === 'OK'){
                this.question.IsFavourite = !this.question.IsFavourite;
                this.popover.toast({message:this.question.IsFavourite?'取消关注成功':'关注成功'});
            } else {
                this.popover.toast({message:'请重试'});
            }
        },error => {
            loading.dismiss();
        });
    }

}
