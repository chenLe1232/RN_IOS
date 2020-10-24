/**
 * 发送风控信息的api
 */
export const RISK_API = '/risk/addRecord'
export const RISK_DATA_API = '/risk/addData'
/**
 * 绑卡
 */
export const CARD_CONFIRM = '/bind/card/confirm'

/**
 * 用户风控
 */
export const USER_RISK = '/user/risk/access'
/**
 * 四要素鉴权
 */
export const REAL_NAME = '/user/verification/real-name-and-card'
/**
 * 查询审核步骤
 */
export const USER_STATUS = '/user/userInfo'
/**
 * 查询四要素 
 */
export const USER_INFO = '/user/verification/real-name-and-card-msg'
/**
 * 校验是否手机号是否已注册
 */
export const MOBILE_EXIST = '/user/mobile/exist'
/**
 * 手机号登录发送验证码
 */
export const CODE_SEND = '/user/login/mobile/code-send'
/**
 * 手机号登录校验验证码 
 */
export const CODE_VERIFY = '/user/login/mobile/code-verify'

/**
 * 四要素鉴权h5版本
 */
export const BANK_VERIFY = '/user/verification/bind-name-card'

/**
 * 提供信息
 */
export const COMMIT_INFO = '/seller/open-api/bind-order'

/**
 * 获取商品信息接口
 */
export const PAYMENTS = '/seller/open-api/payments/confirm';