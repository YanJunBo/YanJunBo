import {
  Toast,
  MessageBox
} from 'mint-ui'
import jsonp from 'jsonp'
import Vue from 'vue'

import qs from 'qs'
var Indicator = require('../common/Indicator')
// const server = 'https://mall.jscntech.com/'
// export const https = {
//   shopApi: 'https://mall.jscntech.com/'
// }

export default {
  openToast: function (message, position, duration, iconClass) {
    if (!message || message === '') {
      message = ''
    }
    if (!position || position === '') {
      position = 'middle'
    }
    if (!duration || duration === '') {
      duration = 1000
    }
    if (!iconClass || iconClass === '') {
      iconClass = ''
    }
    var toast = Toast({
      message: message,
      position: position,
      duration: duration,
      iconClass: iconClass
    })
    return toast
  },
  openMessage: function (title, message, showCancelButton, cb) {
    MessageBox({
      title: title,
      message: message,
      showCancelButton: showCancelButton
    }).then(action => {
      if (action === 'confirm') {
        cb()
      }
    })
  },
  openAlert: function (message, title) {
    MessageBox.alert(message, title)
  },
  httpJsonp: function (url, data, successCb, errorCb) {
    Indicator.default.openIndicator()
    jsonp('https://api.douban.com' + url,
      data, (err, res) => {
        if (res) {
          Indicator.default.closeIndicator()
          successCb(res)
        }
        if (err) {
          Indicator.default.closeIndicator()
          errorCb(err)
        }
      }
    )
  },
  get: function (url, data, successCb, errorCb) {
    // $axios get请求
    Indicator.default.openIndicator()
    // 获取Main中设置的方法
    var $axios = Vue.prototype.$axios
    $axios.get(url, {
      params: data
    }).then(res => {
      Indicator.default.closeIndicator()
      successCb(res)
    }).catch(error => {
      Indicator.default.closeIndicator()
      if (errorCb) {
        errorCb(error)
      }
    })
  },
  post: function (url, data, successCb, errorCb) {
    // $axios post请求
    Indicator.default.openIndicator()
    var $axios = Vue.prototype.$axios
    $axios.post(url, qs.stringify(data)).then(function (response) {
      Indicator.default.closeIndicator()
      successCb(response)
    }).catch(function (error) {
      Indicator.default.closeIndicator()
      if (errorCb) {
        errorCb(error)
      }
    })
  },
  getCookie: function (name) {
    var strcookie = document.cookie
    var arrcookie = strcookie.split('; ')
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=')
      if (arr[0] === name) return unescape(arr[1])
    }
    return null
  },
  setCookie: function (name, value, expireHours) {
    var cookieString = name + '=' + escape(value) + '; path=/'
    if (expireHours > 0) {
      var date = new Date()
      date.setTime(date.getTime() + expireHours * 3600 * 1000)
      cookieString = cookieString + ';expires=' + date.toGMTString()
    }
    document.cookie = cookieString
  },
  delCookie: function (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.setCookie(name, '')
    if (cval != null) document.cookie = name + '=' + cval + '; path=/;expires=' + exp.toGMTString()
  },
  clearCookie: function () {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0; expire=' + date.toGMTString() + '; path=/'
    }
  },
  foreachDelCookie: function () {
    var strCookie = document.cookie
    var arrCookie = strCookie.split('; ') // 将多cookie切割为多个名/值对
    for (var i = 0; i < arrCookie.length; i++) { // 遍历cookie数组，处理每个cookie对
      var arr = arrCookie[i].split('=')
      if (arr.length > 0) {
        this.delCookie(arr[0])
      }
    }
  },
  DateTime: function (date, fmt) {
    // Date.prototype.Format = function (fmt) {
    var time = new Date(date)
    var o = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': Math.floor((time.getMonth() + 3) / 3),
      'S': time.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
    // }
  },
  sibling: function (elem) {
    var r = []
    var n = elem.parentNode.firstChild
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        r.push(n)
      }
    }

    return r
  },
  hasClass: function (obj, cls) {
    let objClass = obj.className
    let objClassLst = objClass.split(/\s+/)
    let x = 0
    for (x in objClassLst) {
      if (objClassLst[x] === cls) {
        return true
      }
    }
    return false
  }
}
