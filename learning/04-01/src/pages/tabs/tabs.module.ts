import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { MorePageModule } from '../more/more.module';
import { HomeModule } from '../home/home.module';
import { DiscoveryPageModule } from '../discovery/discovery.module';
import { ChatPageModule } from '../chat/chat.module';
import { NotificationPageModule } from '../notification/notification.module';
import { QuestionPageModule } from '../question/question.module';

@NgModule({
    declarations: [TabsPage],
    imports: [
        HomeModule,
        QuestionPageModule,
        DiscoveryPageModule,
        ChatPageModule,
        NotificationPageModule,
        MorePageModule,
        IonicPageModule.forChild(TabsPage)
    ],
    exports: [
        TabsPage,
        HomeModule,
        QuestionPageModule,
        DiscoveryPageModule,
        ChatPageModule,
        NotificationPageModule,
        MorePageModule
    ],
})
export class TabsModule {}
