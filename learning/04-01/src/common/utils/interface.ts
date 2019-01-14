/**页面的结果。用于页面pop消失时，向父页面时传递数据 */
export interface PageResult {

    /**传递到父页面的结果码，number类型*/
    result: number;

    /**传递到父页面的返回消息  string类型*/
    message?: string;

    /**传递到父页面的数据 json对象*/
    data?: { [key: string]: any }
};

/**
 * 下拉刷新的文案
 * @member pulling 下拉刷新
 * @member ready 释放更新
 */
export const PageRefreshText: any = {

    /**下拉时候的文案 */
    pulling: '下拉刷新',

    /**下拉到有效位置后的文案 */
    ready: '释放更新'
}

/**
 * 消息状态枚举
 * 1-pending 2-success 3-failed
 */
export enum ChatMessageStatus {

    /**处理中 */
    pending = 1,

    /**成功 */
    success = 2,

    /**失败 */
    failed = 3,
}


/**
 * 聊天消息类型
 * @member messageId （string）消息Id
 * @member userId （string）消息发送者的Id
 * @member userName （string）消息发送者的昵称
 * @member userImgUrl （string）消息发送者的头像
 * @member toUserId （string）消息接受者的Id
 * @member time （nummber|string）消息发送的时间
 * @member message （string）消息内容
 * @member status （number）消息状态：1-pending 2-success 3-failed
 */
export interface ChatMessage {

    /**消息Id */
    messageId: string;

    /**消息发送者的Id */
    userId: string;

    /**消息发送者的昵称 */
    userName: string;

    /**消息发送者的头像 */
    userImgUrl: string;

    /**消息接受者的Id */
    toUserId: string;

    /**消息发送的时间 */
    time: number | string;

    /**消息内容 */
    message: string;

    /**消息状态：1-pending 2-success 3-failed */
    status: ChatMessageStatus;
}
