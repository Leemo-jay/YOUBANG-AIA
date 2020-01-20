import router from "../router";
import store from "../store/index";
import axios from "axios";
import moment from "moment";
import Vue from "vue";
import mock from "../mock/Interface.js";
import { Base64 } from "js-base64";
import {
  Toast
} from 'mint-ui';
import Antd from "ant-design-vue";
import {
  ConfirmPlugin,
  AlertPlugin,
  ToastPlugin,
  base64
} from 'vux'
// import timestamp from '_time-stamp@2.2.0@time-stamp';
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, {
  position: 'middle'
})
let vm = new Vue();
Vue.use(Antd);
let token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token || "";
const alertAntH5 = (value) => {
  vm.$vux.alert.show({
    title: '',
    content: value,
    buttonText: '確定'
  })
}
const btoa = val => {
  return Base64.encode(val);
};

const atob = val => {
  return Base64.decode(val);
};
const reg_input = function(value, type) {
  console.log(value, type);
};
const toast = value => {
  vm.$message.error(value);
};
const alertAnt = value => {
  // Vue.$message.error(value);
  vm.$confirm({
    title: "错误提示",
    content: value,
    onOk() {
    },
    onCancel() {
    }
  });
};
// 实际调用后台地址
let http = "";
if (process.env.NODE_ENV !== "development") {
  http = CONFIG.baseUrl;
} else {
  http = "/api/";
}

const headerGet = {
  "Content-Type": "application/json"
};

const headerPost = {
  "Content-Type": "application/x-www-form-urlencoded"
};

const get_ip = function(onNewIP) {
  let MyPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  let pc = new MyPeerConnection({
    iceServers: []
  });
  let noop = () => {};
  let localIPs = {};
  let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  let iterateIP = ip => {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  };
  pc.createDataChannel("");
  pc.createOffer()
    .then(sdp => {
      sdp.sdp.split("\n").forEach(function(line) {
        if (line.indexOf("candidate") < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });
      pc.setLocalDescription(sdp, noop, noop);
    })
    .catch(reason => {});
  pc.onicecandidate = ice => {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
};

const Axios = function(url, tepData = {}, ifconfirm) {
  let params = "";
  let realUrl;
  let tokenObj = {
    // token: token
    // Authorization: longData(1, 'token') || ''
    Authorization: sessionStorage.getItem("token") || ""
    // Authorization:
    //   'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoie1wiYmlydGhkYXlcIjpcIjE5OTAtMDItMDJcIixcImNyZWF0b3JcIjpcInN5c3RlbVwiLFwibW9kaWZpZXJcIjpcInN5c3RlbVwiLFwic2V4XCI6XCIxXCIsXCJwYWdlU2l6ZVwiOjAsXCJ1cGRhdGVUaW1lXCI6e1wiZGF0ZVwiOjIyLFwiaG91cnNcIjoxMCxcInNlY29uZHNcIjoyMCxcIm1vbnRoXCI6NyxcInRpbWV6b25lT2Zmc2V0XCI6LTQ4MCxcInllYXJcIjoxMTksXCJtaW51dGVzXCI6NTMsXCJ0aW1lXCI6MTU2NjQ0MjQwMDA2MCxcImRheVwiOjR9LFwicmVhbE5hbWVTdGF0dXNcIjowLFwiY2VydGlmaWNhdGVOb1wiOlwiVTE5MzY4MzQ1M1wiLFwiY3VycmVudFwiOjAsXCJpc0RlbGV0ZWRcIjpcIk5cIixcImNyZWF0ZVRpbWVcIjp7XCJkYXRlXCI6MjIsXCJob3Vyc1wiOjEwLFwic2Vjb25kc1wiOjIwLFwibW9udGhcIjo3LFwidGltZXpvbmVPZmZzZXRcIjotNDgwLFwieWVhclwiOjExOSxcIm1pbnV0ZXNcIjo1MyxcInRpbWVcIjoxNTY2NDQyNDAwMDYwLFwiZGF5XCI6NH0sXCJuYW1lXCI6XCLkvZXotoVcIixcImlkXCI6MzgsXCJjZXJ0aWZpY2F0ZVR5cGVcIjpcIjFcIn0iLCJpc3MiOiJ1c2VyIiwiaWF0IjoxNTY2NjMyMzI3LCJleHAiOjE1NjY2MzI1MDd9.pMujuB0VsYn6_wRcn82Dm2y_eB-tOa1NwVP5J6X3quQ'
    // Authorization: sessionStorage.getItem('token')
  };
  let tokenObj1 = {
    Authorization: longData(1, "token") || ""
  };
  try {
    realUrl = mock[url].url;
  } catch (e) {
    throw new Error("此接口未定义");
  }
  // let token = longData(1, 'userInfo').token
  // let token = tokenObj.Authorization
  tepData = Object.assign(tepData, {
    channelCode: longData(1, "MEDIA_CODE")
  });
  // 	if (!mock[url].isJson) {
  //
  // 		tepData = JSON.stringify(tepData)
  // 		params = new URLSearchParams();
  // 		params.append('data', tepData);
  // 	} else {
  // 		tepData = Object.assign(tepData, {
  // 			methodName: mock[url].methodName
  // 		});
  // 	}
  return new Promise(function(resolve, reject) {
    axios({
      url: http + realUrl, //仅为示例，并非真实的接口地址
      data: params || tepData,
      // data: { data: btoa(params) || btoa(JSON.stringify(tepData)) },
      // params: tepData,
      // header: method == 'get' ? headerGet : headerPost,
      header: headerPost,
      headers: url == "logout" ? tokenObj1 : tokenObj,
      method: mock[url].method,
      timeout: url == "pay" ? 660000 : 65000
    })
      // .then(res => {
      //   let data = res
      //   data.data = JSON.parse(atob(data.data))
      //   return Promise.resolve(data)
      // })
      .then(res => {
        // 状态码成功时执行
        if (res.status == 200) {
          // resolve(res)
          //console.log(res.data)
          if (res.data.code == "200") {
            resolve(res);
          } else {
            if (
              res.data.code == "4301" ||
              res.data.code == "4032" ||
              res.data.code == "1007"
            ) {
              // vm.$myToast.success('請重新登錄')
              store.commit("setLogin", false);
              // longData(2, 'accountId') // 删除账号
              sessionStorage.removeItem("token");
              store.commit("setUserInfo", null);
              router.push({
                name: "loginIn"
              });
            }
            if (
              res.data.code == "1005" ||
              res.data.code == "1006"
            ) {
              if((document.body.clientWidth+getScrollWidth())>1023) {//大于1023走pc的逻辑
                vm.$message.error(res.data.message);
                return;
              }else {
                Toast({
                  message: res.data.message,
                  duration: 3000
                });

                reject(res.data.message);
                return
              }
            }

            //支付超時
            if (res.data.code == "918") {
              router.push({
                name: "home"
              });
            }
            console.log(mock[url])
            if (mock[url].confirm) {
              alertAnt(res.data.message);
            } else {
              if (
                res.data.message == "" ||
                res.data.message == "undefined" ||
                res.data.message == undefined
              ) {
                vm.$myToast.success(
                  "很抱歉，因系統問題目前暫時無法提供服務，請您稍後再繼續使用。"
                );
              } else {
                if (mock[url].ifconfirm || ifconfirm) {
                  // 注册接口，返回1008
                  //alert(33)
                  if((document.body.clientWidth+getScrollWidth())>1023) {//大于1023走pc的逻辑
                    vm.$myToast.success(res.data.message, 2000, res.data.code);
                  }else {
                    //alert(res.data.message)
                    try {
                      alertAntH5(res.data.message)
                    }catch (e) {
                      console.log(e)
                    }

                  }
                } else {
                 //alert(333)
                  vm.$message.error(res.data.message);
                }
              }
            }
            reject(res.data.message);
          }
          //
        } else {
          // vm.$myToast.success(res.status)
          vm.$myToast.success(
            "很抱歉，因系統問題目前暫時無法提供服務，請您稍後再繼續使用。"
          );
          reject(1);
        }
      })
      .catch(e => {
        reject(1);
        if (e) {
          if (
            e.response != undefined &&
            e.response.status != undefined &&
            e.response.status != 200
          ) {
            return vm.$myToast.success(
              "很抱歉，因系統問題目前暫時無法提供服務，請您稍後再繼續使用。"
            );
          }
          if (
            e == "" ||
            e == "undefined" ||
            e == "Error: timeout of 65000ms exceeded" ||
            e == "Error: timeout of 660000ms exceeded"
          ) {
            return vm.$myToast.success(
              "很抱歉，因系統問題目前暫時無法提供服務，請您稍後再繼續使用。"
            );
          }
          return this.$message.error(e);
          // vm.$myToast.success(e)
        } else if (e == "" || e == undefined) {
          vm.$myToast.success(
            "很抱歉，因系統問題目前暫時無法提供服務，請您稍後再繼續使用。"
          );
        } else {
          return this.$message.error(e);
        }
      });
  });
};
function getScrollWidth() {
  var noScroll, scroll, oDiv = document.createElement("DIV");
  oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
  noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = "scroll";
  scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  //console.log(noScroll-scroll)
  return noScroll-scroll;
}
// 延时函數
const timeout = async function(ms) {
  await new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

// 缓存封装
const longData = (type, key, value) => {
  try {
    let obj = {
      0: () => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      1: () => {
        return JSON.parse(localStorage.getItem(key));
      },
      2: () => {
        localStorage.removeItem(key);
      }
    };
    return obj[type]();
  } catch (e) {
    //TODO handle the exception
    return "";
  }
};

// form 表單提交
const formSubmmit = (url, param) => {
  let temp = document.createElement("form"); //创建form标签
  temp.action = url; //这里写URL
  temp.method = "post"; //post方式提交
  temp.style.display = "none"; //设置為不可见

  for (let k in param) {
    //创建input标签并设置相关参數
    let inputTemp = document.createElement("input");
    // inputTemp.setAttribute("type", "text");
    inputTemp.setAttribute("name", k);
    inputTemp.setAttribute("value", param[k]);
    temp.appendChild(inputTemp); //把input标签添加到form标签内
  }
  document.body.appendChild(temp); //将form标签添加到body标签内
  temp.submit(); //提交form
};

const formatmyyear = function formatmyyear(data) {
  if (data) {
    var date = new Date(data);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var mydate = y + "-" + m + "-" + d;
    return mydate;
  } else {
    return null;
  }
};
const getfilesize = function getfilesize(size) {
  if (!size) return "";

  var num = 1024.0; //byte

  if (size < num) return size + "B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "K"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
};
const dataURLtoFile = function dataURLtoFile(dataurl, filename) {
  //将base64轉换為文件
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = windown.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
};
const compress = function compress(file) {
  return new Promise((resolve, reject) => {
    try {
      var windowURL = window.URL || window.webkitURL;
      var dataURL = windowURL.createObjectURL(file);
      var img = new Image();
      img.src = dataURL;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var base64 = canvas.toDataURL("image/jpeg", 0.8);
        let filr = dataURLtoFile(base64, "99");
        // this.src = windowURL.createObjectURL(filr);
        resolve(filr);
      };
    } catch (e) {
      //TODO handle the exception;
      resolve(file);
    }
  });
};

const debonce = (fn, delay, atOnce = false) => {
  let time = "";
  const layOut = value => {
    time = setTimeout(() => {
      fn(...value);
      time = "";
    }, delay);
  };
  return function() {
    if (!time) {
      if (atOnce) {
        fn(...arguments);
        time = 1;
      } else {
        layOut(arguments);
      }
    } else {
      clearTimeout(time);
      layOut(arguments);
    }
  };
};

const intervaControl = function(fn, delay, words) {
  let time = "";
  return function() {
    if (!time) {
      fn();
      time = setTimeout(() => {
        clearTimeout(time);
        time = "";
      }, delay);
    } else {
      // vm.$myToast.success(words)
      return;
    }
  };
};
const getUrlParam = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let url = window.location.href.split("#")[0];
  let search = url.split("?")[1];
  if (search) {
    var r = search.substr(0).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  } else {
    return null;
  }
};

const getAge1 = (strBirthday) => {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; //返回周岁年龄
}
const getAge = strBirthday => {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0; //同年 则為0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期填寫错误 晚于今天
    }
  }

  return returnAge; //返回周岁年龄
};
const deepClone = function(data) {
  var type = typeof data;
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    if (data === null) {
      obj = null;
    } else {
      obj = {};
    }
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

const Moment = (value, format) => {
  if (!value) {
    return null;
  } else {
    return moment(value, format);
  }
};

const setThem = them => {
  if (them) {
    longData(0, "them", them);
    window.document.body.setAttribute("data-theme", them);
  } else {
    window.document.body.setAttribute(
      "data-theme",
      longData(1, "them") || "default"
    );
  }
};
const parseObj = value => {
  Object.entries(value).forEach(([key, value1]) => {
    try {
      value[key] = JSON.parse(value1);
    } catch (e) {}
  });
  return value;
};

const timeOperation = (type = "year", value) => {
  let date = new Date();
  date.setFullYear(date.getFullYear() + value);
  return formatmyyear(date);
};

const codeHidden = (type, value) => {
  if (!value) return "";
  const REPLACECODE = "O";
  let obj = {
    name: () => {
      value = value.replace(/\s*/g, "");
      let isChinesse = escape(value).indexOf("%u") < 0 ? false : true;
      // 中文处理
      if (isChinesse) {
        let length = value.length;
        if (length == 2) {
          value = REPLACECODE + value[1];
        } else if (length == 3) {
          value = value[0] + REPLACECODE + value[2];
        } else if (length > 3) {
          value =
            value.substring(0, 2) +
            [...value.substring(2)]
              .map((item, index) => {
                return index % 2 == 0 ? REPLACECODE : item;
              })
              .join("");
        }
      } else {
        // english
        value = [...value]
          .map((item, index) => {
            return index % 2 != 0 ? "*" : item;
          })
          .join("");
      }
      return value;
    },
    address: () => {
      return value.replace(/\d/g, REPLACECODE);
    },
    idCard: () => {
      return value.substring(0, 2) + "*****" + value.substring(7);
    },
    bankCard: () => {
      return (
        value.substring(0, 6) +
        "****" +
        value.substring(10, 12) +
        "*" +
        value.substring(13, 14) +
        (value.length == 15 ? "*" : "**")
      );
    },
    email: () => {
      let arr = value.split("@");
      let strArr = [...arr[0]];
      let str = "";
      strArr.forEach((el, index) => {
        if (index < strArr.length - 2) {
          return (str += "*");
        }
        return (str += el);
      });
      return `${str}@${arr[1]}`;
    },
    birthday: () => {
      let index =
        value.lastIndexOf("/") == -1
          ? value.lastIndexOf("-")
          : value.lastIndexOf("/");
      return value.substring(0, index + 1) + "**";
    },
    phone: () => {
      value = value.replace(/\s*/g, "");
      return value.substring(0, 2) == "09"
        ? value.substring(0, 3) + "***" + value.substring(6)
        : value.substring(0, 2) + "***" + value.substring(5);
    }
  };
  return obj[type]();
};
const getIp = () => {
  return new Promise(resolve => {
    var RTCPeerConnection =
      window.RTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.mozRTCPeerConnection;
    if (RTCPeerConnection)
      (function() {
        var rtc = new RTCPeerConnection({
          iceServers: []
        });
        if (1 || window.mozRTCPeerConnection) {
          rtc.createDataChannel("", {
            reliable: false
          });
        }

        rtc.onicecandidate = function(evt) {
          if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
        };
        rtc.createOffer(
          function(offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
          },
          function(e) {
            console.warn("offer failed", e);
          }
        );

        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;

        function updateDisplay(newAddr) {
          if (newAddr in addrs) return;
          else addrs[newAddr] = true;
          var displayAddrs = Object.keys(addrs).filter(function(k) {
            return addrs[k];
          });
          for (var i = 0; i < displayAddrs.length; i++) {
            if (displayAddrs[i].length > 16) {
              displayAddrs.splice(i, 1);
              i--;
            }
          }
          resolve(displayAddrs[0]);
        }

        function grepSDP(sdp) {
          var hosts = [];
          sdp.split("\r\n").forEach(function(line, index, arr) {
            if (~line.indexOf("a=candidate")) {
              var parts = line.split(" "),
                addr = parts[4],
                type = parts[7];
              if (type === "host") updateDisplay(addr);
            } else if (~line.indexOf("c=")) {
              var parts = line.split(" "),
                addr = parts[2];
              updateDisplay(addr);
            }
          });
        }
      })();
    else {
      console.log("请使用主流浏览器：chrome,firefox,opera,safari");
    }
  });
};

const getTwAge = (birthday, effectDate) => {
  //首先計算EFF-DATE-YYYY 是否為閏年
  var effYear = effectDate.getFullYear();
  var effMonth = effectDate.getMonth() + 1;
  var effDay = effectDate.getDate();
  var cliYear = birthday.getFullYear();
  var cliMonth = birthday.getMonth() + 1;
  var cliDay = birthday.getDate();
  var no = 0;
  var type = "";
  if (judgeyear(effYear)) {
    type = "B";
  } else {
    type = "A";
  }
  var attAgeYear = effYear - cliYear;
  var attAgeMonths = effMonth - cliMonth;
  var attAgeDays = 0;
  //獲取上個月對應的天數
  if (effMonth == 1) {
    no = 12;
  } else {
    no = effMonth - 1;
  }
  var date = new Date(effYear, no, 0);
  var tbttbDays1 = date.getDate();
  if (cliDay > effDay && cliDay > tbttbDays1) {
    attAgeDays = effDay - tbttbDays1;
  } else {
    attAgeDays = effDay - cliDay;
  }

  //獲取當月對應的天數
  no = effMonth;
  date = new Date(effYear, no, 0);
  var tbttbDays2 = date.getDate();
  if (cliDay > tbttbDays2 && effDay == tbttbDays2) {
    attAgeDays = 0;
  } else {
    if (cliDay > effDay) {
      attAgeMonths = attAgeMonths - 1;
      attAgeDays = attAgeDays + tbttbDays1;
      if (attAgeMonths < 0) {
        attAgeYear = attAgeYear - 1;
        attAgeMonths = attAgeMonths + 12;
      }
    }
  }
  if (attAgeMonths > 6 || (attAgeMonths == 6 && attAgeDays > 0)) {
    attAgeYear = attAgeYear + 1;
  }
  return attAgeYear;
};
//判断年份是否為闰年
const judgeyear = year => {
  var leadyear;
  if (year % 4 == 0 && year % 100 != 0) {
    leadyear = true;
  } else if (year % 400 == 0) {
    leadyear = true;
  } else leadyear = false;
  return leadyear;
};
const strleng = str => {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //單字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
};
const IEVersion = function() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
};
const checkIdcard = function(value) {
  let map1 = new Map([
    ["A", 10],
    ["B", 11],
    ["C", 12],
    ["D", 13],
    ["E", 14],
    ["F", 15],
    ["G", 16],
    ["H", 17],
    ["J", 18],
    ["K", 19],
    ["L", 20],
    ["M", 21],
    ["N", 22],
    ["P", 23],
    ["Q", 24],
    ["R", 25],
    ["S", 26],
    ["T", 27],
    ["U", 28],
    ["V", 29],
    ["X", 30],
    ["W", 32],
    ["Y", 31],
    ["Z", 33],
    ["I", 34],
    ["O", 35]
  ]);
  let code = map1.get(value.substr(0, 1));
  let sex = parseInt(value.substr(1, 1));
  let ten = parseInt((code / 10) % 10);
  let one = code % 10;
  let totalNum = ten;
  totalNum += one * 9;
  totalNum += sex * 8;
  let number = 7;
  for (let i = 2; i < 9; i++) {
    if (number < 1) {
      break;
    }
    totalNum += parseInt(value.substr(i, 1)) * number;
    number--;
  }
  let idcardLastNum = parseInt(value.substr(9, 1));
  let lastNum = totalNum % 10;
  if (lastNum != 0) {
    lastNum = 10 - lastNum;
  }
  if (lastNum == idcardLastNum) {
    // alert('正确的卡号')
    return true;
  } else {
    // alert('错误的卡号')
    return false;
  }
};
export {
  timeout,
  reg_input, //校验input长度
  get_ip, //获取ip地址
  Axios,
  regTemplate,
  longData,
  formSubmmit,
  formatmyyear,
  compress,
  getfilesize,
  debonce,
  getUrlParam,
  getAge,
  getTwAge,
  deepClone,
  Moment,
  setThem,
  parseObj,
  timeOperation,
  intervaControl,
  codeHidden,
  getIp,
  judgeyear,
  strleng,
  getAge1,
  IEVersion,
  checkIdcard
};
