import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../../providers/rest/rest';
import { PopOverService } from '../../../share/service/pop-over.service';
import { Storage } from '@ionic/storage';
import { PageResult } from '../../../common/utils/interface';

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

    loginForm: FormGroup; // 登录form
    formBuilder: FormBuilder = new FormBuilder();

    constructor(
        public navCtrl: NavController, // ionic导航服务
        public navParams: NavParams,  // ionic导航参数
        public viewCtrl: ViewController, // ionic视图服务
        private storage: Storage, // ionic存储
        public rest: RestProvider, // rest服务
        private popover:PopOverService // 公共弹出服务
    ) {
        this.loginForm = this.formBuilder.group({
            userPhone: ['', [Validators.required]],// 登录手机号
            password: ['', [Validators.required]] // 登录密码
        });
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter(){
    }

    // 登录
    login() {
        console.log(this.loginForm.value);
        let loader: Loading = this.popover.loading({
            content: '拼命登录中...',
            // callback:(data) => {
            //     // console.log('弹窗消失了');
            // }
        });
        let param: any = {};
        param.mobile = this.loginForm.get('userPhone').value;
        param.password = this.loginForm.get('password').value;
        // 手机号 15910241024 密码 1
        this.rest.login(param).subscribe((data) => {
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

    // 导航到注册页面
    navRegister() {
        this.navCtrl.push('RegisterPage');
    }

    // 在注册界面pop之前调用
    afterRegister(data:PageResult){
        if(data&&data.data){
            this.loginForm.patchValue(data.data);
            this.login();
        }
    }

    // 取消并返回
    dismiss() {
        this.viewCtrl.dismiss({ result: 1, message: '用户取消，未登录' } as PageResult);
    }

}
