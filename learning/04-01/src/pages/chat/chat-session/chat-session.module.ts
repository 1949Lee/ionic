import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatSessionPage } from './chat-session';
import { ShareModule } from '../../../share/share.module';

@NgModule({
    declarations: [
        ChatSessionPage,
    ],
    imports: [
        IonicPageModule.forChild(ChatSessionPage),
        ShareModule
    ],
})
export class ChatSessionPageModule { }
