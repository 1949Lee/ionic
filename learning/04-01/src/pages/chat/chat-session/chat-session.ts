import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';
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

    /**消息输入框 */
    @ViewChild('sendInput') sendInputEle:TextInput;

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

    /**光标位置 */
    focusPosition: number = null;

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

    ionViewWillLeave() {
        this.isShowEmojiPicker = false;
        this.focusPosition = null;
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
        let ele:HTMLTextAreaElement = this.sendInputEle._native.nativeElement;
        if(!this.isShowEmojiPicker) {
            // 设置光标位置
            if(this.focusPosition){
                ele.selectionStart = this.focusPosition
            } else {
                if(this.messageToSend){
                    ele.selectionStart = this.messageToSend.length;
                }
                else {
                    ele.selectionStart = 0;
                }

            }
            this.sendInputEle.setFocus();
        }
    }

    /**处理输入框的点击 */
    handleInputClick() {
        // 留存光标位置
        let ele:HTMLTextAreaElement = this.sendInputEle._native.nativeElement;
        this.focusPosition = ele.selectionStart;
        this.isShowEmojiPicker = false;
    }

    /**点击表情的处理 */
    handleEmoji(emoji:any) {
        if(this.focusPosition){
            let remainMessage = this.messageToSend.slice(this.focusPosition);
            let preMessage = this.messageToSend.slice(0,this.focusPosition);
            this.messageToSend = preMessage + emoji +remainMessage;
        } else {
            this.messageToSend += emoji;
        }
        this.focusPosition++;

    }

    /**点击发送消息 */
    sendMessage() {
        console.log(this.messageToSend);
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
