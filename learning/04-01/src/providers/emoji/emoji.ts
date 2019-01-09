import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { emoji } from '../../common/utils/emoji.utils';

@Injectable()
export class EmojiProvider {

    /**emoji数组 */
    emoji:any[] = emoji;

    constructor(public http: HttpClient) {

    }

    /** 获取表情分组数组，一页表情一组，默认一页 8 * 3 = 24个表情 */
    getEmojiArray(fontSize:number = 1, width:number = 15) {
        const rowLength:number = Math.floor((width + fontSize) / (fontSize * 2));
        const pageSize = rowLength * 3;
        const pagelegth = Math.ceil( this.emoji.length / pageSize);
        const result = [];
        for (let index = 0; index < pagelegth; index++) {
            result.push(this.emoji.slice(index * pageSize, (index + 1) * pageSize));
        }
        return result;
    }

}
