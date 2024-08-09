// 项目域名

// 测试
// export const BASE_URL = 'http://192.168.0.17:9001'
// export const BASE_URL_ZLF = 'http://192.168.0.17:9004'  
// 正式
export const BASE_URL = 'https://shandongtibohui.zsyflive.com'
export const BASE_URL_ZLF = 'https://frdzlfapi.zsyflive.com'
//----------项目接口请求路径-----------
// 验证验证码  
const sendmsggetphone=BASE_URL + '/miniapp/getphone/sendmsg'
// 提交企业信息
const loginsubscribe=BASE_URL_ZLF + '/api/subscribe/56ys5YWr5bGK5YWo5bGL/login'
// 查询展位是否呗占用  
const boothsubscribe=BASE_URL_ZLF + '/api/subscribe/56ys5YWr5bGK5YWo5bGL/booth'
// 锁定展位
const locksubscribe=BASE_URL_ZLF + '/api/subscribe/56ys5YWr5bGK5YWo5bGL/lock'
// 分享获取具体参数
const ticketwxminiapp=BASE_URL + '/miniapp/wx/ticket'
// 获取开始预定时间
const subscribetimeapi=BASE_URL_ZLF + '/api/subscribe/56ys5YWr5bGK5YWo5bGL/time'


export default {
 	sendmsggetphone,loginsubscribe,boothsubscribe,locksubscribe,ticketwxminiapp,
	subscribetimeapi,
}
 