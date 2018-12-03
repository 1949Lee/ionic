import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';

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

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private rest:RestProvider) {
      this.rest.getQuestion({id:this.navParams.data.id}).subscribe((question) => {
          console.log(question);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
