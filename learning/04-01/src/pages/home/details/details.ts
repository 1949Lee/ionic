import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { avatarPath } from '../../../common/assets';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-details',
    templateUrl: 'details.html',
})
export class DetailsPage {

    avatarPath: string = avatarPath;

    question:any = null;

    answerList:any = [{}];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rest: RestProvider) {
        this.rest.getQuestion({ id: this.navParams.data.id }).subscribe((question) => {
            console.log(question);
            this.question = question;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');
    }

}
