import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../../providers/rest/rest';
import { PopOverService } from '../../../share/service/pop-over.service';
import { PageResult } from '../../../common/utils/interface';

@IonicPage()
@Component({
    selector: 'page-anwser',
    templateUrl: 'anwser.html',
})
export class AnwserPage {

    /**回答表单 */
    anwserForm: FormGroup;
    formBuilder: FormBuilder = new FormBuilder();

    constructor(
        private navParams: NavParams,
        private storage: Storage,
        private viewCtrl: ViewController,
        private rest: RestProvider,
        private popover: PopOverService
    ) {
        this.anwserForm = this.formBuilder.group({
            questionid: ['', [Validators.required]],
            content: ['', [Validators.required]],
            userid: ['',[Validators.required]]
        });
        this.anwserForm.get('questionid').setValue(this.navParams.get('questionId'));
    }

    ionViewDidLoad() {
        this.storage.get('userId').then((data)=>{
            this.anwserForm.get('userid').setValue(data);
        });
    }

    /**取消并返回 */
    dismiss() {
        this.viewCtrl.dismiss({ result: 1, message: '用户取消填写回答' } as PageResult);
    }

    /**发布回答 */
    submit() {
        let loader: Loading = this.popover.loading({
            content: '拼命提交中...'
        });
        console.log(this.anwserForm.value);
        this.rest.saveAnwser(this.anwserForm.value).subscribe((data) => {
            console.log(data);
            loader.dismiss();
            if (data.Status === 'OK') {
                this.popover.toast({message:data.StatusContent});
                this.viewCtrl.dismiss({ result: 0, message: '发布回答成功' });
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
