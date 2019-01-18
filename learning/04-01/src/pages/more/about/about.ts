import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    app: any = {
        name: null,
        team: null,
        code: null,
        number: null,
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appVersion: AppVersion) {
    }

    ionViewDidLoad() {
        this.appVersion.getAppName().then(v => {
            this.app.name = v;
        });

        this.appVersion.getPackageName().then(v => {
            this.app.team = v;
        });

        this.appVersion.getVersionCode().then(v => {
            this.app.code = v;
        });

        this.appVersion.getVersionNumber().then(v => {
            this.app.number = v;
        });
    }

}
