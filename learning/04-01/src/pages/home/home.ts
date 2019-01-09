import { Component } from '@angular/core';
import { NavController, IonicPage, Tabs, ModalController, Modal, Loading } from 'ionic-angular';
import { QuestionPage } from './question/question';
import { PageResult } from '../../common/utils/interface';
import { avatarPath } from '../../common/assets';
import { RestProvider } from '../../providers/rest/rest';
import { PopOverService } from '../../share/service/pop-over.service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    userId: string = '';

    avatarPath: string = avatarPath;

    questionList:any[] = null;

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private rest: RestProvider,
        private storage: Storage,
        private popOver: PopOverService
    ) {

        this.storage.get('userId').then((val) => {
            this.userId = val;
            this.getQuestionList();
        })
    }

    ionViewDidLoad() {
    }

    doMoreTap(e:Event){
        e.stopPropagation();
        console.log('更多按钮点击了');
    }

    getQuestionList() {
        let loading: Loading = this.popOver.loading({ content: '拼命加载中' });
        this.rest.getUserQuestionList({userid:this.userId,type:'question', index: 1, number: 10 }).subscribe((data) => {
        // this.rest.getQuestionList({index: 1, number: 10 }).subscribe((data) => {
            loading.dismiss();
            if(data !== null && data.length > 0){
                this.questionList = data;
            } else {
                this.questionList = null;
            }
        });
    }

    /**导航 */
    nav(id: string) {
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

    navTabTo(index: number) {
        (this.navCtrl.parent as Tabs).select(index);
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

    navDetails(id) {
        this.navCtrl.push('DetailsPage',{id});
    }

}
