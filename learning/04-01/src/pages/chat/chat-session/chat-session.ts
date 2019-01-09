import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopOverService } from '../../../share/service/pop-over.service';
import { RestProvider } from '../../../providers/rest/rest';
import { avatarPath } from '../../../common/assets';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-chat-session',
    templateUrl: 'chat-session.html',
})
export class ChatSessionPage {

    /**会话中本人的用户ID */
    userId: string = '';

    /**会话中本人的用户名 */
    userName: string;

    /**会话中本人的用户头像 */
    userImgUrl: string;

    /**会话中对方的用户名 */
    chatUserName: string;

    /**会话中对方的用户ID */
    chatUserId: string;

    /**默认头像地址 */
    avatarPath: string = avatarPath;

    /**是否显示表情选择框 */
    isShowEmojiPicker: boolean = false;

    /**输入框中未发送的消息 */
    messageToSend:string = null;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private rest: RestProvider,
        private storage: Storage,
        private popOver: PopOverService) {
        this.chatUserName = this.navParams.get('username');
        this.chatUserId = this.navParams.get('userid');
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        this.storage.get('UserId').then((val) => {
            if (val != null) {
                this.rest.getUserInfo(val)
                    .subscribe(
                        userinfo => {
                            this.userId = '140000198202211138';
                            this.userName = userinfo["UserNickName"];
                            this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
                        },
                        error => console.log(error));
            }
        });
    }

    /**切换表情输入框的显隐 */
    switchEmojiPicker() {
        this.isShowEmojiPicker = !this.isShowEmojiPicker;
    }

    /**点击发送消息 */
    sendMessage() {

    }

    // getQuestionList(isRefresh: boolean = false) {
    //     let loading: Loading = this.popOver.loading({ content: '拼命加载中' });
    //     this.rest.getQuestionList({ index: 1, number: 10 }).subscribe((data) => {
    //         loading.dismiss();
    //         console.log(data);
    //         if (data !== null && data.length > 0) {
    //             this.questionList = data;
    //         } else {
    //             this.questionList = null;
    //         }
    //     });
    // }

    navDetails(id) {
        this.navCtrl.push('DetailsPage', { id });
    }
}
