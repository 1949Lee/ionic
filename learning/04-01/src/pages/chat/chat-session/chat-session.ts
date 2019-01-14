import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, Events, Content } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { avatarPath } from '../../../common/assets';
import { Storage } from '@ionic/storage';
import { ChatMessage, ChatMessageStatus } from '../../../common/utils/interface';
import { ChatServiceProvider } from '../../../providers/chat-service/chat-service';

@IonicPage()
@Component({
    selector: 'page-chat-session',
    templateUrl: 'chat-session.html',
})
export class ChatSessionPage {

    /**消息输入框 */
    @ViewChild('sendInput') sendInputEle: TextInput;

    /**Page容器 */
    @ViewChild(Content) ionContent: Content;

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
    messageToSend: string = '';

    /**光标位置 */
    focusPosition: number = 0;

    /**所有消息列表 */
    messageList: ChatMessage[] = [];

    ChatMessageStatus: any = ChatMessageStatus;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private rest: RestProvider,
        private storage: Storage,
        private events: Events,
        private chatService: ChatServiceProvider) {
        this.chatUserName = this.navParams.get('username');
        this.chatUserId = this.navParams.get('userid');
    }

    ionViewDidLoad() {
        this.events.subscribe('chatSession.anwser', (anwser: ChatMessage) => {
            //自动回复的消息添加到消息列表
            this.messageList.push(anwser);
            this.scrollToBottom();
        });
    }

    ionViewWillLeave() {
        this.isShowEmojiPicker = false;
        this.messageToSend = '';
        this.events.unsubscribe('chatSession.anwser');
    }

    ionViewDidEnter() {
        this.storage.get('userId').then((val) => {
            if (val != null) {
                this.rest.getUserInfo({ userId: val })
                    .subscribe(
                        userinfo => {
                            this.userId = val;
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
        if (!this.isShowEmojiPicker) {
            this.sendInputEle.setFocus();
        }
    }

    /**处理输入文字后 */
    handleKeyUp() {
        this.setFocusPosition();
    }

    /**留存光标位置 */
    setFocusPosition() {
        // 留存光标位置
        let ele: HTMLTextAreaElement = this.sendInputEle._native.nativeElement;
        this.focusPosition = ele.selectionStart;
    }

    /**处理输入框的点击 */
    handleInputClick() {
        this.isShowEmojiPicker = false;
        this.setFocusPosition();
    }

    /**点击表情的处理 */
    handleEmoji(emoji: any) {

        if (this.focusPosition) {
            let remainMessage = this.messageToSend.slice(this.focusPosition);
            let preMessage = this.messageToSend.slice(0, this.focusPosition);
            this.messageToSend = preMessage + emoji + remainMessage;
        } else {
            this.messageToSend += emoji;
        }
        this.focusPosition += 2;
        // this.sendInputEle._native.nativeElement.selectionStart = this.focusPosition;
        // this.sendInputEle._native.nativeElement.selectionEnd = this.focusPosition;
    }

    /**点击发送消息 */
    sendMessage() {
        console.log(this.messageToSend);
        if (!this.messageToSend.trim()) return;

        const id = Date.now().toString();
        let messageSend: ChatMessage = {
            messageId: id,
            userId: this.userId,
            userName: this.userName,
            userImgUrl: this.userImgUrl,
            toUserId: this.chatUserId,
            time: Date.now(),
            message: this.messageToSend,
            status: ChatMessageStatus.pending // 默认消息发送中
        }

        this.messageToSend = '';

        this.messageList.push(messageSend);
        this.scrollToBottom();

        //发送消息并改变消息的状态
        this.chatService.send(messageSend)
            .then(() => {
                // 发送成功后，消息置为发送成功。
                messageSend.status = ChatMessageStatus.success;
            }).catch((error) => {
                // 发送失败后，消息置为发送失败。
                messageSend.status = ChatMessageStatus.failed;
            });

    }

    scrollToBottom(): any {
        setTimeout(() => {
            this.ionContent.scrollToBottom();
        }, 200);
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
