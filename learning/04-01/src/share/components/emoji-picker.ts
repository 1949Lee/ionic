import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from "../../providers/emoji/emoji";

//实现 EmojiPickerComponent 的 providers
export const EMOJI_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmojiPickerComponent),
    multi: true
}

@Component({
    selector: 'emoji-picker',
    templateUrl: 'emoji-picker.html',
    providers: [EMOJI_ACCESSOR]
})
// 实现接口 ControlValueAccessor
export class EmojiPickerComponent implements ControlValueAccessor {

    emojiArray = [];
    value: string;
    onChanged: Function;

    constructor(private emojiService: EmojiProvider) {
        this.emojiArray = this.emojiService.getEmojiArray();
    }

    writeValue(obj: string): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }
    registerOnTouched(fn: any): void {
        // this.onTouched = fn;
    }
    /**添加表情，点击表情后将数据反馈到组件 */
    addEmoji(val: any): any {
        if (!this.value) {
            this.value = val;
        } else {
            this.value += val;
        }
        if (this.value) {
            // 点击表情后将数据反馈到组件
            this.onChanged(this.value);
        }
    }
}
