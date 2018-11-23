import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ViewController, normalizeURL } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { PopOverService } from '../../../share/service/pop-over.service';

import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';

declare let cordova: any;

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

    lastImg: any = null;
    lastImgURL: string = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        private storage: Storage,
        private rest: RestProvider,
        private viewCtrl: ViewController,
        private popOver: PopOverService,
        private actionSheetCtrl: ActionSheetController,
        private file: File,
        private filePath: FilePath,
        private fileTransfer: FileTransfer,
        private camera: Camera) {
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
                        this.tackePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: '从相册选择',
                    handler: () => {
                        this.tackePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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
            correctOrientation: true, // 拍照角度不对时是否纠正
            allowEdit: true,
            destinationType: this.camera.DestinationType.FILE_URI
        }
        this.camera.getPicture(options).then((imgPath) => {

            let resPath, resName;
            // 得到正确图片的路径
            resPath = imgPath.substr(0, imgPath.lastIndexOf('/') + 1);
            // 得到正确的图片文件名。
            resName = imgPath.substring(imgPath.lastIndexOf('/') + 1);
            this.copyFileToLocal(resPath, resName, this.createName());
        }, error => {
            this.popOver.toast({ message: '请在app中操作或检查app相关权限' });
        })
    }

    copyFileToLocal(path, name, resultName) {
        this.file.copyFile(path, name, this.file.dataDirectory, resultName).then((res) => {
            this.lastImgURL = res.toURL();
            const resPath = this.lastImgURL.substr(0, this.lastImgURL.lastIndexOf('/') + 1);
            console.log(resPath,res.name);
            this.file.readAsDataURL(resPath,res.name).then((_:string)=>{
                this.lastImg = _;
            },error => {
                this.popOver.toast({ message: '缓存图片出错，请重试' });
            });
        }, error => {
            this.popOver.toast({ message: '缓存图片出错，请重试' });
        });
    }

    createName() {
        return `${(new Date()).getTime()}.jpg`
    }

    uploadIamge() {
        let url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface'; // 上传请求地址
        let targetPath = this.lastImgURL; // 最终文件路径
        let fileName = this.userId + '.jpg';
        let options: FileUploadOptions = {
            fileKey: "file",
            fileName: fileName,
            chunkedMode: false,
            mimeType: 'multipart/form-data',
            params: { fileName: fileName, userId: this.userId }
        };

        const fileTransfer: FileTransferObject = this.fileTransfer.create();
        let loader = this.popOver.loading({ content: '玩命上传中' });
        fileTransfer.upload(targetPath, url, options).then(() => {
            loader.dismiss();
            this.popOver.toast({
                message: '上传头像成功'
            });
            this.navCtrl.pop();
        }, error => {
            loader.dismiss();
            this.popOver.toast({ message: '上传图片出错，请重试' });
            console.log(error);
        });
    }

}
