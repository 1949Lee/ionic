import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, Refresher } from 'ionic-angular';
import { PopOverService } from '../../share/service/pop-over.service';
import { RestProvider } from '../../providers/rest/rest';
import { avatarPath } from '../../common/assets';
import { Storage } from '@ionic/storage';
import { PageRefreshText } from '../../common/utils/interface';

@IonicPage()
@Component({
    selector: 'page-discovery',
    templateUrl: 'discovery.html',
})
export class DiscoveryPage {

    userId: string = '';

    avatarPath: string = avatarPath;

    questionList:any[] = null;

    refresherText:any = PageRefreshText.pulling;

    constructor(
        private navCtrl: NavController,
        private rest: RestProvider,
        private storage: Storage,
        private popOver: PopOverService) {
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

    getQuestionList(isRefresh:boolean = false) {
        let loading: Loading = this.popOver.loading({ content: '拼命加载中' });
        this.rest.getQuestionList({index: 1, number: 10 }).subscribe((data) => {
            // console.log(loading);
            loading.dismiss();
            if(data !== null && data.length > 0){
                this.questionList = data;
            } else {
                this.questionList = null;
            }
        });
    }

    navDetails(id) {
        this.navCtrl.push('DetailsPage',{id});
    }

    doRefresh(refresher:Refresher) {
        console.log(refresher);
        this.rest.getQuestionList({index: 1, number: 10 }).subscribe((data) => {
            this.refresherText = PageRefreshText.pulling;
            if(data !== null && data.length > 0){
                this.questionList = data;
                this.popOver.toast({message:'刷新成功'});
                refresher.complete();
            } else {
                this.questionList = null;
                this.popOver.toast({message:'刷新失败请稍后重试'});
                refresher.cancel();
            }
        });
    }

    doPull(refresher:Refresher) {
        if(refresher.progress >= 1){
            if(this.refresherText !== PageRefreshText.ready){
                this.refresherText = PageRefreshText.ready;
            }
        }
    }
}
