import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { PopOverService } from '../../share/service/pop-over.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage {

    notificationList:any[] = [];

    constructor(
        private navCtrl: NavController,
        private rest: RestProvider,
        private storage: Storage
    ) {
    }

    ionViewWillEnter() {
        this.storage.get('userId').then((val) => {
            if(val){
                this.rest.getUserNotifications({userid:val}).subscribe((list)=>{
                    this.notificationList = list;
                });
            }
        })
    }

    navDetails(id) {
        this.navCtrl.push('DetailsPage',{id});
    }

}
