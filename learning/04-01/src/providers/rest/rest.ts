import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, tap} from 'rxjs/operators';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * 根据API得到数据
   *
   * @private 私有
   * @param {string} url 入参api的URL
   * @returns {Observable<string[]>} 返回字符串数组
   */
  private  getUrlReturn(url:string): Observable<string[]>{
    return this.http.get<string[]>(url).pipe(
      // tap(heroes => this.log(``)),
      catchError(this.handleError(url,[]))
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
  private handleError<T> (url, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // 打印错误
      console.log(`${url} failed: ${error.message || ''}`); // 打印错误信息
      return of(result as T); // 错误时返回一个空数组，以便app继续处理
    };
  }

}
