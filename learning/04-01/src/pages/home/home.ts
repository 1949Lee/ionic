import { Component } from '@angular/core';
import { NavController, IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
    ) {

    }

    nav() {
        // (this.navCtrl.parent as Tabs).select(2);
    }

}
