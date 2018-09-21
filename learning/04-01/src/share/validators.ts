/**
 * @file 通用的表单验证器
 */
import { FormGroup, FormControl } from "@angular/forms";



/**
 * @method 判断两个表单项的值是否全等的验证器 如密码和确认密码是否一致
 * @param error 验证器不通过时返回的错误，形如：`{passwordConfirm:'密码不一致'}`
 * @param names 表单项的名称字符串数组，数组长度必须是2个
 * @returns null，或者入参error
 */
export function compare(error: any, names: string[]): any {
    return function (info: FormGroup): any {
        let first: FormControl = info.get(names[0]) as FormControl;
        let second: FormControl = info.get(names[1]) as FormControl;
        if (first != null && second != null) {
            let valid: boolean = first.value === second.value;
            return valid ? null : error;
        }
        return null;
    }
}
