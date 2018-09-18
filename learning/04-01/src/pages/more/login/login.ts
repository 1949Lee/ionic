import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    userPhone:string = null; // 登录手机号
    password:string = null; // 登录密码

    loginForm:FormGroup; // 登录form
    formBuilder:FormBuilder = new FormBuilder();

    constructor(
        public navCtrl: NavController, // ionic导航服务
        public navParams: NavParams,  // ionic导航参数
        public viewCtrl: ViewController, // ionic视图服务
        public loadingCtrl: LoadingController // ionic加载服务
        ) {
            this.loginForm = this.formBuilder.group({
                userPhone:['',[Validators.required]],
                password:['',[Validators.required]]
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(){
        console.log(this.loginForm.value);
        let loader: Loading = this.loadingCtrl.create({
            content:'拼命登录中...',
            dismissOnPageChange:true
        });
        loader.present();
    }

    dismiss(){
        this.viewCtrl.dismiss({result:1,message:'用户取消，未登录'});
    }

}
