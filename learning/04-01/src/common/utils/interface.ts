/**页面的结果。用于页面pop消失时，向父页面时传递数据 */
export interface PageResult {

    /**传递到父页面的结果码，number类型*/
    result:number;

    /**传递到父页面的返回消息  string类型*/
    message?:string;

    /**传递到父页面的数据 json对象*/
    data?:{[key:string]:any}
}
