import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  login({userPhone,password}): Observable<{ [key: string]: any }> {
    return this.getUrlReturn(this.apiUrlLogin + `?mobile=${userPhone}&password=${password}`);
  }

  constructor(public http: HttpClient) { }

  /**
   * 根据API得到数据
   *
   * @private 私有
   * @param {string} url 入参api的URL
   * @returns {Observable<any>} 返回字符串数组
   */
  private getUrlReturn(url: string): Observable<any> {
    return this.http.get<string>(url).pipe(
      map(data => {return JSON.parse(data);}),
      catchError(this.handleError(url, []))
    );
  }

  /**
   * 接口报错处理
   *
   * @private 私有
   * @template T
   * @param {*} url 接口路径
   * @param {T} [result]
   * @returns {T} 错误时返回一个空数组，以便app继续处理
   */
  private handleError<T>(url, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // 打印错误
      console.log(`${url} failed: ${error.message || ''}`); // 打印错误信息
      return of(result as T); // 错误时返回一个空数组，以便app继续处理
    };
  }

}
