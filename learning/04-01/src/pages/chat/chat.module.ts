import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ChatSessionPageModule } from './chat-session/chat-session.module';
import { ShareModule } from '../../share/share.module';

@NgModule({
    declarations: [
        ChatPage,
    ],
    imports: [
        IonicPageModule.forChild(ChatPage),
        ChatSessionPageModule
    ],
    exports:[
        ChatPage,
        ChatSessionPageModule
    ]
})
export class ChatPageModule { }
