import { Injectable } from '@angular/core';
import { LoadingController, ToastController, Loading, Toast } from 'ionic-angular';

@Injectable()
export class PopOverService {
    constructor(
        private loadingCtrl:LoadingController, // loading
        private toastCtrl: ToastController // toast
        ){
    }

    /**创建等待动画，并返回动画对象 */
    loading(opt:PopLoader): Loading{
        let loader:Loading = this.loadingCtrl.create({
            spinner: opt.spinner || 'dots',
            content:opt.content || '马上就好哦，别急啦',
            cssClass: opt.cssClass || 'lee-loading',
            showBackdrop: opt.showBackdrop || true,
            enableBackdropDismiss: opt.enableBackdropDismiss || false,
            dismissOnPageChange: opt.dismissOnPageChange || true,
            duration: opt.duration || undefined,
        });
        if(opt.callback){
            loader.onDidDismiss(opt.callback);
        }
        loader.present();
        return loader;
    }

    /**创建黑色悬浮提示，并返回对象。默认显示在底部，3秒后消失 */
    toast(opt:PopToaster): Toast{
        let toaster: Toast = this.toastCtrl.create({
            message:opt.message,
            cssClass: opt.cssClass || 'lee-toast',
            dismissOnPageChange:false,
            showCloseButton: opt.showCloseButton || false,
            closeButtonText: opt.closeButtonText || undefined,
            duration:opt.duration || 3000,
            position:opt.position || 'bottom'
        });
        if(opt.callback){
            toaster.onDidDismiss(opt.callback);
        }
        toaster.present();
        return toaster;
    }
}

/**
 * @interface longding的配置对象
 * @member spinner 选传，string，loading的动画样式,可传:`ios,dots,bubbles,circles,crecent`
 * @member content 选传，string，显示的内容，默认为`马上就好哦，别急啦`
 * @member cssClass 选传，string，额外的自定义类名
 * @member showBackdrop 选传，boolean，是否显示遮罩层，默认显示
 * @member enableBackdropDismiss 选传，boolean，点击遮罩层是否取消动画，默认不能
 * @member dismissOnPageChange 选传，boolean，导航到新页面时是否关闭loading，默认不关闭
 * @member duration 选传，number，loading显示的时间，默认一直显示直到手动调用`dismiss()`关闭
 * @member callback 选传，回调函数，loading消失后回调,默认没有回调
 */
export interface PopLoader{
    spinner?: string;
    content?: string;
    cssClass?: string;
    showBackdrop?: boolean;
    enableBackdropDismiss?: boolean;
    dismissOnPageChange?: boolean;
    duration?: number;
    callback?:(data: any, role: string) => void;
}

/**
 * @interface toast的配置对象
 * @member message 选传，string，文字过多会换行，toast会变高。
 * @member cssClass 选传，string，额外的自定义类名
 * @member duration 选传，number，toast显示的时间，默认一直显示直到手动调用`dismiss()`关闭
 * @member showCloseButton 选传，boolean，是否显示关闭按钮，默认不显示
 * @member closeButtonText 选传，string，关闭按钮的文字，默认为`关闭`
 * @member dismissOnPageChange 选传，boolean，导航到新页面时是否关闭toast，默认不关闭
 * @member position 选传，string，显示的位置，可接受:`bottom,middle,top`，默认`bottom`
 * @member callback 选传，回调函数，toast消失后回调
 */
export interface PopToaster{
    message?: string;
    cssClass?: string;
    duration?: number;
    showCloseButton?: boolean;
    closeButtonText?: string;
    dismissOnPageChange?: boolean;
    position?: string;
    callback?:(data: any, role: string) => void;
}
