import { Injectable } from '@angular/core';
import { LoadingController, ToastController, Loading } from 'ionic-angular';

@Injectable()
export class PopOverService {
    constructor(
        private loadingCtrl:LoadingController, // loading
        private toastCtrl: ToastController // toast
        ){  
    }

    loading(opt:PopLoader): Loading{
        let loader:Loading = this.loadingCtrl.create({
            content:opt.message,
            dismissOnPageChange: true,
        });
        if(opt.callback !== undefined){
            loader.onDidDismiss(opt.callback);
        }
        loader.present();
        return loader;
    }
}

export interface PopLoader {
    message:string;
    callback?:any;
}