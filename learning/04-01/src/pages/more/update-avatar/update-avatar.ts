import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { PopOverService } from '../../../share/service/pop-over.service';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare let cordova :any;

/**
 * Generated class for the UpdateAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-update-avatar',
    templateUrl: 'update-avatar.html',
})
export class UpdateAvatarPage {

    userId: string = null;

    UpdateAvatar = {
        nickname: '未登录',
        avatar: '../../assets/imgs/avatar.png'
    }
    avatar = `../../assets/imgs/avatar.png?${Math.random()}`;

    random = Math.random;

    lastImg:any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        private storage: Storage,
        private rest: RestProvider,
        private popOver: PopOverService,
        private actionSheetCtrl: ActionSheetController,
        private file: File,
        private filePath: FilePath,
        private camera: Camera) {
        // console.log();
        // const data = this.navParams.data.UpdateAvatar;
        // this.UpdateAvatar.nickname = data.nickname
        // this.UpdateAvatar.avatar = data.avatar
        // this.avatar = `${data.avatar}?${Math.random()}`
    }

    ionViewDidEnter() {
        this.storage.get('userId').then((val) => {
            this.userId = val;
        })
    }

    navUpdateAvatar() {
    }

    showActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            title: '选择头像来源',
            buttons: [
                {
                    text: '拍照',
                    role: 'destructive',
                    handler: () => {
                        console.log('拍照');
                    }
                },
                {
                    text: '从相册选择',
                    handler: () => {
                        console.log('从相册选择');
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('取消');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    update() {
        // this.storage.get('userId').then((data)=>{
        //     let loader = this.popOver.loading({content:'努力保存中...'});
        //     this.rest.updateUserInfo({
        //         userId:data,
        //         nickname:this.UpdateAvatar.nickname
        //     }).subscribe((res)=>{
        //         loader.dismiss();
        //         if(res.Status = 'OK'){
        //             this.popOver.toast({message:'保存成功'});
        //             this.navCtrl.pop();
        //         }
        //     })
        // })
    }

    tackePicture(sourceType) {
        let options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false, // 若是拍照，拍照的图片是否保存到相册
            correctOrientation: true // 拍照角度不对时是否纠正
        }
        this.camera.getPicture(options).then((imgPath) => {

            let resPath,resName;
            // 安卓进行特别处理
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imgPath).then((fPath) => {

                    // 得到正确图片的路径
                    resPath = fPath.substr(0, fPath.lastIndexOf('/') + 1);

                    // 得到正确的图片文件名。
                    resName = imgPath.substring(imgPath.lastIndexOf('/') + 1, imgPath.lastIndexOf('?'));
                });
            } else {
                // 得到正确图片的路径
                resPath = imgPath.substr(0, imgPath.lastIndexOf('/') + 1);

                // 得到正确的图片文件名。
                resName = imgPath.substring(imgPath.lastIndexOf('/') + 1);
            }

            this.copyFileToLocal(resPath, resName, this.createName());
        },error =>{
            this.popOver.toast({message:'请在app中操作或检查app相关权限'});
        })
    }
    copyFileToLocal(path,name,resultName){
        this.file.copyFile(path,name,cordova.file.data.dataDirectory,resultName).then((res)=>{
            this.lastImg = res;
        },error => {
            this.popOver.toast({message:'缓存图片出错，请重试'});
        });
    }

    createName(){
        return `${(new Date()).getTime()}.jpg`
    }

}
