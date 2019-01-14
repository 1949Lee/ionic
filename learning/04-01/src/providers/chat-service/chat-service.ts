import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessage, ChatMessageStatus } from '../../common/utils/interface';
import { avatarPath } from '../../common/assets';
import { Events } from 'ionic-angular';

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider {

    avatarPath: string = avatarPath;

    constructor(public http: HttpClient,private events:Events) {

    }

    /**用户发送消息 */
    send(message:ChatMessage): Promise<any> {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                reslove(message);
            }, Math.random() * 1000);
        }).then(() =>{
            this.autoSendAnwser(message);
        });
    }

    /**自动产生回复消息 */
    autoSendAnwser(message:ChatMessage) {
        const id = Date.now().toString();
        let messageAnwser: ChatMessage = {
          messageId: id,
          userId: '520',
          userName: '女神',
          userImgUrl: avatarPath,
          toUserId: message.userId,
          time: Date.now(),
          message: message.message,
          status: ChatMessageStatus.success
        }
        this.events.publish('chatSession.anwser',messageAnwser);
    }

}
