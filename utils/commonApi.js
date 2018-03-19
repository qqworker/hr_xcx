/* 全局公用接口 */

let network = require('./network.js')


/**
 * 解密授权手机号
 * @param {Object} e - {iv:'', encryptedData:''}
 * @param {Function} success - 授权解密之后的回调函数
 * @param {Function} cancel - 取消授权之后的回调函数
 */
export function getSpFansPhone(e,success,cancel) {
  if (e.detail.errMsg == "getPhoneNumber:ok") {
    let globalData = getApp().globalData
    let params = {
      appid: globalData.appId,
      code: globalData.code,
      spFansId: globalData.fansId,
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    }
    // console.log('params',params)
    network.post('/smallProgramAudit/getSpFansPhone.do', params, (res) => {
      // console.log('getSpFansPhone', res)
      if (res.code == 0 && res.data.phone) {
        globalData.phoneNumber = res.data.phone
        globalData.fansId = res.data.id
        console.log('你的手机号是：' + res.data.phone)
        wx.showToast({
          title: '授权成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            if (success) {
               success()
            }
          },
        })
      }
    })
  }else{
    if(cancel){
      cancel()
    }
  }
}
