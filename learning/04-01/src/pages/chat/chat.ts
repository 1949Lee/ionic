import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { avatarPath } from '../../common/assets';
import { ChatSessionPage } from './chat-session/chat-session';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    userinfo: Object;

    /** 会话页面 */
    chatSessionPage: any;
    avatarPath: string = avatarPath;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // 仅做聊天逻辑展示
        this.userinfo = {
            userid: '123321',
            username: '慕女神'
        }
        this.chatSessionPage = ChatSessionPage;
    }

    ionViewDidLoad() {
    }

}
