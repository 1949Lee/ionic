import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageResult } from '../../../common/utils/interface';
import { compare } from '../../../share/validators';
import { PopOverService } from '../../../share/service/pop-over.service';
import { RestProvider } from '../../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    registerForm: FormGroup; // 登录form
    formBuilder: FormBuilder = new FormBuilder();
    private parentPage = null;

    constructor(
        public navCtrl: NavController, // ionic导航服务
        public navParams: NavParams,  // ionic导航参数
        public viewCtrl: ViewController, // ionic视图服务
        private popOver: PopOverService,
        private rest: RestProvider
    ) {
        this.registerForm = this.formBuilder.group({
            userPhone: ['', [Validators.required]],// 登录手机号
            nickname: ['', [Validators.required]],// 昵称
            passwordInfo: this.formBuilder.group({
                password: ['', [Validators.required]], // 登录密码
                passwordConfirm: ['', [Validators.required]] // 登录密码
            }, { validator: compare({ passwordConfirm: '密码不一致' }, ['password', 'passwordConfirm']) })
        });
    }

    ionViewDidLoad() {
        this.parentPage = this.navCtrl.getPrevious(this.viewCtrl).instance;
    }

    // 注册
    register() {
        let loader = this.popOver.loading({ content: '玩命注册中...' });
        let param: any = {};
        param.mobile = this.registerForm.get('userPhone').value;
        param.nickname = this.registerForm.get('nickname').value;
        param.password = this.registerForm.get('passwordInfo').get('password').value;
        this.rest.register(param).subscribe((data) => {
            console.log(data);
            let result: PageResult = {
                result: null
            }
            loader.dismiss();
            if (data.Status === 'OK') {
                // 跳转登陆后界面
                this.popOver.toast({message:'注册成功',callback:()=>{
                    result.result = 0;
                    result.data = {userPhone:param.mobile,password:param.password};
                    this.navCtrl.pop({},()=>{
                        this.parentPage.afterRegister(result);
                    });
                }});
            } else {
                this.popOver.toast({
                    message: data.StatusContent
                });
            }
        }, (error) => {
            console.log(error);
        })
    }

    // 跳转到登录
    navLogin() {
        let result: PageResult = {
            result: 1,
            message: '已有账号，跳转到登录'
        }
        this.parentPage.afterRegister(result);
        this.navCtrl.pop();
    }

}
