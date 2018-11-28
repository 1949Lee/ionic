import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading } from 'ionic-angular';
import { PageResult } from '../../common/utils/interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { PopOverService } from '../../share/service/pop-over.service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-question',
    templateUrl: 'question.html',
})
export class QuestionPage {

    /**问题表单 */
    questionForm: FormGroup;
    formBuilder: FormBuilder = new FormBuilder();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private storage: Storage,
        private viewCtrl: ViewController,
        private rest: RestProvider,
        private popover: PopOverService
    ) {
        this.questionForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]],
            userid: ['',[Validators.required]]
        });
    }

    ionViewDidLoad() {
        this.storage.get('userId').then((data)=>{
            this.questionForm.get('userid').setValue(data);
        });
    }

    /**取消并返回 */
    dismiss() {
        this.viewCtrl.dismiss({ result: 1, message: '用户取消提问' } as PageResult);
    }

    /**提交问题 */
    submit() {
        let loader: Loading = this.popover.loading({
            content: '拼命提交中...'
        });
        console.log(this.questionForm.value);
        this.rest.saveQuestion(this.questionForm.value).subscribe((data) => {
            console.log(data);
            loader.dismiss();
            if (data.Status === 'OK') {
                this.popover.toast({message:data.StatusContent});
                this.viewCtrl.dismiss({ result: 0, message: '提交问题成功' });
            } else {
                this.popover.toast({
                    message: data.StatusContent
                });
            }
        }, (error) => {
            loader.dismiss();
            console.log(error);
        });
    }

}
