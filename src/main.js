import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import store from './store/index.js'
import 'mint-ui/lib/style.css';
import m_toast from './commonJs/message_toast.js'
import './commonJs/rem'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { PopupPicker  } from 'vux'
import {
  Lazyload,
  InfiniteScroll,
  MessageBox,
  Toast
} from 'mint-ui';
import {
  ConfirmPlugin,
  AlertPlugin,
  ToastPlugin,
  base64
} from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin, {
  position: 'middle'
})
Vue.use(Lazyload)
// Vue.use(ToastPlugin, {position: 'middle',time: 100000})
Vue.use(InfiniteScroll)
Vue.prototype.$MessageBox = MessageBox
Vue.component('popup-picker', PopupPicker)

Vue.use(VueAwesomeSwiper)
Vue.use(m_toast) //启用新的提示组件
Vue.use(Antd)
Vue.config.productionTip = false
import { Axios, deepClone, longData, Moment } from './commonJs/common.js'
Vue.prototype.$message.config({
  top: `7.5rem`,
  duration: 3,
  maxCount: 3
})
// Vue.prototype.$m_toast = m_toast
Vue.prototype.$test = CONFIG.basePath
Vue.prototype.$axios = axios
Vue.prototype.$deepClone = deepClone
Vue.prototype.$longData = longData
Vue.prototype.$moment = Moment
Vue.prototype.Axios = Axios
// bus
let vm = new Vue()
Vue.prototype.$bus = vm
// 全局变量
Vue.prototype.$baseUrl = CONFIG.baseUrl

// Vue.use(ToastPlugin, {position: 'middle',time: 100000})

Vue.mixin({
  mounted() {},
  methods: {
    $timeEnd() {
      this.Axios('logout')
        .then(res => {
          // alert(1)
          clearTimeout(CONFIG.clearTime)
          window.removeEventListener("touchend", CONFIG.timeOut);
          this.$longData(0, 'routerLength', -1)
          this.$store.state.customer.keepArr = ['no']
          this.$longData(2, 'token');
          this.$Toast('逾時登出')
          this.$router.push({
            name: 'loginIn'
          });

        })
    },
    $toastStop(value = '請先選擇行業別/職業別') {
      // Toast
      Toast({
        message: value,
        duration: 3000
      });
      // this.$vux.toast.text(value, 'middle')
    },
    $Toast(value) {
      // this.$vux.toast.text(value, 'middle')
      Toast({
        message: value,
        duration: 3000
      });
    },
    $isPad(value) {
      // alert(navigator.userAgent)
      // alert()
      return navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Macintosh") != -1
    },
    $toUrl(value) {
      console.log(value)
      if (value) {
        window.open(value)
      } else {
        this.$Toast('暫無地址')
      }

    },
    $loading(value, title) {
      if (value) {
        this.$vux.loading.show({
          text: title || 'Loading'
        })
      } else {
        this.$vux.loading.hide()
      }

    },
    $alert(value) {
      this.$vux.alert.show({
        title: '提示',
        content: value,
      })
    }
  }
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
