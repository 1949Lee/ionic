import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { MorePageModule } from '../more/more.module';
import { HomeModule } from '../home/home.module';
import { DiscoveryPageModule } from '../discovery/discovery.module';
import { ChatPageModule } from '../chat/chat.module';
import { NotificationPageModule } from '../notification/notification.module';

@NgModule({
    declarations: [TabsPage],
    imports: [
        HomeModule,
        DiscoveryPageModule,
        ChatPageModule,
        NotificationPageModule,
        MorePageModule,
        IonicPageModule.forChild(TabsPage)
    ],
    exports: [
        TabsPage,
        HomeModule,
        DiscoveryPageModule,
        ChatPageModule,
        NotificationPageModule,
        MorePageModule
    ],
})
export class TabsModule {}
