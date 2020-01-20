var CONFIG = {
  baseUrl: 'https://yoniiuat.aia.com.tw/aia/',
  pdfUrl: '',
  basePath: '/rwd'
}
var locationAddress = window.location.hostname
// console.log(locationAddress)
//http://tst-twaia.zaouter.com/这一个的话，把CONFIG.js里调用的地址写為http://tst-twaia.zaouter.com/aia/
if (locationAddress == 'tst-twaia.zaouter.com') {
  CONFIG.baseUrl = 'https://tst-twaia.zaouter.com/aia/'
  // CONFIG.baseUrl = window.location.host + '/aia/'
} else if (locationAddress == '10.138.1.34') {
  CONFIG.baseUrl = 'http://10.138.1.34/aia/'
  // CONFIG.baseUrl = window.location.host + '/aia/'
} else if (locationAddress == 'yoniiuat.aia.com.tw') {
  CONFIG.baseUrl = 'https://yoniiuat.aia.com.tw/aia/'
  // CONFIG.baseUrl = window.location.host + '/aia/'
}
