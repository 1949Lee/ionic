import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../../providers/rest/rest';
import { PopOverService } from '../../../share/service/pop-over.service';
import { Storage } from '@ionic/storage';

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

    userPhone: string = null; // 登录手机号
    password: string = null; // 登录密码

    loginForm: FormGroup; // 登录form
    formBuilder: FormBuilder = new FormBuilder();

    constructor(
        public navCtrl: NavController, // ionic导航服务
        public navParams: NavParams,  // ionic导航参数
        public viewCtrl: ViewController, // ionic视图服务
        private storage: Storage, // ionic存储
        public loadingCtrl: LoadingController, // ionic加载服务
        public rest: RestProvider, // rest服务
        private popover:PopOverService // 公共弹出服务
    ) {
        this.loginForm = this.formBuilder.group({
            userPhone: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login() {
        console.log(this.loginForm.value);
        let loader: Loading = this.popover.loading({
            content: '拼命登录中...',
            // callback:(data) => {
            //     // console.log('弹窗消失了');
            // }
        });
        this.rest.login(this.loginForm.value).subscribe((data) => {
            console.log(data);
            loader.dismiss();
            if(data.Status === 'OK'){
                // 跳转登陆后界面
                this.storage.set('userId',data.UserId);
                this.viewCtrl.dismiss({ result: 0, message: '用户登录成功' });
            } else {
                this.popover.toast({
                    message:data.StatusContent
                });
            }
        }, (error) => {
            loader.dismiss();
            console.log(error);
        })
    }

    dismiss() {
        this.viewCtrl.dismiss({ result: 1, message: '用户取消，未登录' });
    }

}
