<template>
  <div class="all_tips" v-show="visible">
    <!-- 全局提示框 -->
    <div class="tos_tips">
      <!-- <a-icon type="close" class="close_icon" @click="visible=false"/> -->
      <p class="msg">{{message}}</p>
      <button class="btn" v-show="type==1" @click="jump">確定</button>
      <div class="login_out" v-show=" type==2">
        <button class="btn_out btn_left" @click="visible=false">取消</button>
        <button class="btn_out" @click="login_out">確定</button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store/index";
export default {
  data() {
    return {
      code: '',
      visible: false,
      message: "",
      type: 1
    };
  },
  methods: {
    jump() {
      var os = (function () {
        var ua = navigator.userAgent,
          isWindowsPhone = /(?:Windows Phone)/.test(ua),
          isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
          isAndroid = /(?:Android)/.test(ua),
          isFireFox = /(?:Firefox)/.test(ua),
          isChrome = /(?:Chrome|CriOS)/.test(ua),
          isTablet = /(?:iPad|PlayBook)/.test(ua) ||
            (isAndroid && !/(?:Mobile)/.test(ua)) ||
            (isFireFox && /(?:Tablet)/.test(ua)),
          isPhone = /(?:iPhone)/.test(ua) && !isTablet,
          isPc = !isPhone && !isAndroid && !isSymbian;
        return {
          isTablet: isTablet,
          isPhone: isPhone,
          isAndroid: isAndroid,
          isPc: isPc
        };
      })();
      if (os.isTablet) {
        window.location.href = "https://www.aia.com.tw/zh-tw/index.html";
      } else if (os.isPc) {
        let mwidth = window.screen.width;
        if (mwidth > 750 && mwidth <= 1024) {
          var ua = navigator.userAgent.toLowerCase();
          if (/mac/i.test(ua)) {
            window.location.href = "https://www.aia.com.tw/zh-tw/index.html";
          }
        }
      }
      if (this.code == '1008') {
        store.commit("go2Login");
      }
      this.visible = false;
    },
    login_out() {
      store.dispatch("logOut");
      this.visible = false;
    }
  },
  mounted() { }
};
</script>
<style lang="less">
@media screen and (min-width: 320px) and (max-width: 1023px) {
  .all_tips {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .tos_tips {
    position: fixed;
    display: table;
    z-index: 5000;
    /*width: 16rem;*/
    /*height: 10.75rem;*/
    width: calc(100vw / 320 * 256)!important;
    height: calc(100vw / 320 * 226)!important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;

    .close_icon {
      float: right;
      font-size: 1.25rem;
      color: #d81f49;
    }
    .msg {
      margin-top: 2.5rem!important;
      // letter-spacing: 0.0625rem;
      //margin-top: 2.5rem;
      line-height: 2.1875rem;
      font-size: 1rem;
      text-align: center;
      color: #353535!important;
      font-weight: 700 !important;
    }
    .btn {
      margin: 2.875rem auto 0;
      width: 12.5rem;
      height: 2.5rem;
      border: 1px solid #d81f49;
      font-size: 1.25rem;
      font-weight: 600;
      background: #fff;
      border-radius: 1.875rem;
      color: #d81f49;
    }
    .login_out {
      margin-top: 1.25rem;
      font-size: 0.875rem;
      font-weight: 600;
      .btn_left{
        margin-right: 1.25rem;
      }
      .btn_out {
        width: 6.125rem;
        // margin-left: 1.25rem;
        height: 2.75rem;
        border: 1px solid #d81f49;
        background: #fff;
        border-radius: 1.875rem;
        color: #d81f49;
        font-weight: 700;
      }
    }
  }
}
@media screen and (min-width: 1024px){
  .all_tips {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .tos_tips {
    position: fixed;
    z-index: 9999;
    text-align: center;
    padding: 1.25rem;
    top: 50%;
    left: 50%;
    margin-top: -10.9375rem;
    margin-left: -12.5rem;
    width: 25rem !important;
    min-height: 20.625rem;
    background: #fff;
    .close_icon {
      float: right;
      font-size: 1.25rem;
      color: #d81f49;
    }
    .msg {
      // letter-spacing: 0.0625rem;
      margin-top: 7.6875rem;
      line-height: 2.1875rem;
      font-size: 1.5625rem;
      text-align: center;
      //color: #161616;
      color: #353535!important;
      font-weight: 700 !important;
    }
    .btn {
      margin: 2.875rem auto 0;
      width: 12.5rem;
      height: 2.5rem;
      border: 1px solid #d81f49;
      font-size: 1.25rem;
      font-weight: 600;
      background: #fff;
      border-radius: 1.875rem;
      color: #d81f49;
    }
    .login_out {
      margin-top: 1.25rem;
      font-size: 1.25rem;
      font-weight: 600;
      .btn_out {
        width: 42%;
        margin-left: 1.25rem;
        height: 2.5rem;
        border: 1px solid #d81f49;
        background: #fff;
        border-radius: 1.875rem;
        color: #d81f49;
      }
    }
  }
}

// .dialog-tips{
//     position:absolute;
//     z-index: 100;
//     max-width: 90vw;
//     height:6vw;
//     white-space: nowrap;
//     background-color: #fff;
//     border-radius:3vw;
//     padding-left:10vw;
//     padding-right:3vw;
//     left:50%;
//     top:8vw;
// 	// transform: translate(-50%);
// 	animation: name 2s ease-in;
//     div{
//     	font-size:2.6vw;
//     	line-height:6vw;
//     	width:100%;
//     	overflow:hidden;
//     	color:rgba(182, 142, 100, 1);
//     	img{
//     		display:block;
//     		position:absolute;
//     		bottom:0;
//     		left:0;
//     		width:8vw;
//     	}
//     }
// }
// @-webkit-keyframes name{
// 	0%{left:100%;}
// 	20%{left:50%;}
// 	80%{left:50%;}
// 	// 100%{left:-100%;}
// }
</style>
