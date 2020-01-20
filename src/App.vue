<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view v-if="isRouterAlive" />
    </div>
  </a-locale-provider>
</template>

<script>
import zh_TW from "ant-design-vue/lib/locale-provider/zh_TW";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  name: "App",
  // provide() {
  //   return {12321321234
  //     reload: this.reload
  //   }
  // },
  data() {
    return {
      locale: zh_TW,
      isRouterAlive: true
    };
  },
  computed: {
    ifrelaod() {
      return this.$store.ifrelaod;
    },
    ifLogin() {
      return this.$store.state.customer.ifLogin;
    }
  },
  watch: {
    ifLogin(n, o) {
      let timer = {};
      if (n) {
        this.$forceUpdate();
        // let that = this
        // timer = setTimeout(() => {
        //   that.$store.commit('logOut')
        // }, 30 * 60 * 1000);
        // this.$store.commit('setTimer', true)
        window.addEventListener("click", this.mylog);
        window.addEventListener("scroll", this.mylog);
        window.addEventListener("keydown", this.mylog);
      } else {
        // clearTimeout(timer)
        this.$store.commit("setTimer", false);
        window.removeEventListener("click", this.mylog, false);
        window.removeEventListener("scroll", this.mylog, false);
        window.removeEventListener("keydown", this.mylog, false);
      }
    }
  },
  methods: {
    mylog() {
      this.$store.commit("setTimer", true);
    },
    async getUserInfo() {
      try {
        let resp = await this.Axios("getUserInfo", {});
        // this.$store.commit('setLogin',true)
        this.$store.commit("setUserInfo", resp.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getTest() {
      try {
        let res = await this.Axios("test");
      } catch (error) {
        console.log(`test________________`, error);
      }
    },

    // reload() {
    //   this.isRouterAlive = false
    //   this.$nextTick(function () {
    //     this.isRouterAlive = true;
    //   })
    // },
  },
  mounted() {
    // this.getTest()
    // let timer = setTimeout(() => {
    //   this.$store.commit('setReload', true)
    //   clearTimeout(timer)
    // }, 100)
    if (
      sessionStorage.getItem("token") &&
      this.$longData(1, "token") &&
      sessionStorage.getItem("token") == this.$longData(1, "token")
    ) {
      this.$store.commit("setTimer", true);
      window.addEventListener("click", this.mylog);
      window.addEventListener("scroll", this.mylog);
      window.addEventListener("keydown", this.mylog);
    }
  },
  created() {
    // this.$store.state.customer = this.$longData(2, 'state')
    // this.$longData(1, 'token') ? this.getUserInfo() : ''
    this.$longData(1, "token") && sessionStorage.getItem("token")
      ? this.$store.dispatch("getUserInfo")
      : "";
    // sessionStorage.getItem('token') ? this.$store.dispatch('getUserInfo') : ''
    // var _beforeUnload_time = 0, _gap_time = 0;
    // let that = this
    // window.onunload = function () {
    //   _gap_time = new Date().getTime() - _beforeUnload_time;
    //   if (_gap_time <= 5) {
    //     //浏览器关闭
    //     that.$store.dispatch('logOut')
    //   }

    // }
    // var flag = false
    window.addEventListener("beforeunload", () => {
      //在頁面刷新前将vuex里的資訊保存到sessionStorage里
      // _beforeUnload_time = new Date().getTime();
      console.log(`刷新`);
      // flag = true
      this.$longData(0, "fresh", "刷新");
      // this.$longData(0, "state", this.$store.state.customer);
      this.$store.commit('setUserInfo', {})
      sessionStorage.setItem("state", JSON.stringify(this.$store.state.customer));
      // this.$store.commit('setTimer', true)
    });

    // window.addEventListener("unload", () => {   //在頁面刷新前将vuex里的資訊保存到sessionStorage里
    //   console.log(`關閉`)
    //   this.$store.commit('logOut')
    //   if (!flag) {
    //     this.$longData(0, 'test', moment().format('YYYY--MM--DD--HH--mm--ss'))
    //   }
    //   flag = false
    // })
    // window.onbeforeunload = function (e) {
    //   var e = window.event || e;
    //   // e.returnValue = ("確定离开当前頁面吗？");
    //   e.returnValue = (e);
    // }
  }
  // beforeDestroy() {
  //   this.$longData(0, 'test', moment().format('YYYY--MM--DD--HH--mm--ss'))
  //   alert(`销毁了`)
  //   this.$store.dispatch('logOut')
  // }
};
</script>

<style lang="scss">
.vux-popup-header-right {
  color: #d81f49!important
}

@media only screen and (min-device-width: 320px) and (max-device-width: 1024px) {
  #app{
    width: 100vw;
    max-width: 100vw!important;
    min-width: 100vw!important;
  }
}
//禁止竖屏
// #app {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
// }

// @media screen and (orientation: portrait) {
//   * {
//     touch-action: auto !important;
//   }
//   .formInput {
//     border-radius: 0 !important;
//   }
//   /*竖屏样式*/
//   body {
//     transform-origin: 0 0;
//     transform: rotateZ(90deg) translateY(-100%);
//   }
// }

@media screen and (min-width: 1024px) {
  .v-transfer-dom {
    display: none
  }

  .vux-popup-mask {
    display: none!important
  }
}
@media only screen and (min-device-width: 320px) and (max-device-width: 1024px) and (orientation: landscape) {
  .formInput,
  .thisInput {
    border-radius: 0 !important;
  }
}
@media only screen and(max-width:1140px) {
  #app {
    min-width: 100%!important
  }
  .ant-input {
    font-size:14px!important;
    &::placeholder{
    font-size:14px!important;

    }
  }
}

.vux-cell-box {
  display: none
}



#app {
  // font-family: Microsoft YaHei UI !important;
  font-family: Microsoft JhengHei !important;
  background-color: #f6f6f6;
  width: 100%;
  // height: 100%;
  .ant-menu-submenu {
    background-color: transparent !important;
    background: transparent !important;
    box-shadow: none !important;

    .ant-menu {
      z-index: 9999;
      color: #fff !important;
      box-shadow: none !important;
      background-color: transparent !important;
    }
  }

  .ant-menu-submenu-popup {
    z-index: 9999;
    background: transparent !important;
  }
}
.ant-table-thead > tr > th {
  color: #09346e;
  font-weight: 600;
}
.copy .ant-modal-body {
  padding: 0 !important;
}

* {
  outline: none;
  // font-family: Microsoft YaHei UI;
  font-family: Microsoft JhengHei !important;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
html {
  font-size: 12px;
  height: 100%;
}

ul,
ol,
li {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  border: none;
}

p {
  margin-bottom: 0rem !important;
  padding: 0;
}
.ant-form-item-required::before {
  color: #d81f49 !important;
}
.addbtn {
  font-weight: 400 !important;
}
.addbtn:hover {
  font-weight: 600 !important;
}
.ant-input,
.codeInput,
.bank-input {
  border-radius: 0 !important;
}
.ant-input:focus {
  box-shadow: none !important;
}
.ant-input:hover {
  // boder
}
.ant-input::placeholder {
  font-family: Microsoft JhengHei !important;
}
.ant-modal-body {
  padding: 20px !important;
}
</style>
