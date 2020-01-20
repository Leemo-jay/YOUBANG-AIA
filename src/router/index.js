import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
import { longData, IEVersion } from "@/commonJs/common.js";

import homePage from "@/views/homePage";
import error from "@/views/error";
import products from "@/views/productDetail/index.vue"

import white from "@/views/white/index";
import tepArr from "./routerArr.js";
import { message } from "ant-design-vue";
let vm = new Vue();
Vue.prototype.$message = message;
let routerArr = tepArr.map(item => {
  return {
    path: item.child ? `${item.name}/:id` : item.path || item.name,
    //path: item.path || item.name,
    name: item.name,
    component: () => import(`@/views/${item.name}/index`),
    meta: {
      title: item.title,
      login: item.login
    }
  };
});
const router = new Router({
  mode: "history",
  // base: '/rwd',
  base: CONFIG.basePath,
  // mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  // scrollBehavior: (to, from, savePosition) => {
  //   if (to.name == 'productDetail' && to.query.from == 'trial') {
  //     return {
  //       y: 526
  //       // document.body.clientHeight - 300 ||
  //       // document.documentElement.clientHeight - 300
  //     }
  //   } else {
  //     return { y: 0 }
  //   }
  // },
  routes: [
    {
      path: "",
      redirect: "/pages"
    },
    {
      path: "/white",
      name: "white",
      component: white
    },
    {
      path: "/pages",
      name: "pages",
      component: homePage,
      children: [
        {
          path: "",
          redirect: "home"
        },
        {
          path: "/products/yo-term-life-insurance",
          name: "productYO",
          component: products,
          meta: {
            title: "友邦人壽佑你定期壽險",
          }
        },
        {
          path: "/products/elu-injury-insurance",
          name: "productElu",
          component: products,
          meta: {
            title: "友邦人壽e路寶傷害保險",
          }
        },
        {
          path: "/products/fun-injury-insurance",
          name: "productFun",
          component: products,
          meta: {
            title: "友邦人壽FUN心假日傷害保險",
          }
        },
        ...routerArr
      ]
    },
    {
      path: "/error",
      name: "error",
      title: "404",
      component: error
    },
    {
      path: "*",
      // redirect: '/error'
      redirect: "/pages"
    }
  ]
});
let map1 = new Map([
  ["home", null],
  ["goodsList", 0],
  ["active", 1],
  ["infoChange", 2],
  ["loginIn", 2],
  ["help", 3]
]);

router.beforeEach((to, from, next) => {
  document.body.style.overflow = '' //默认 body 样式为空
  // let htmlDom = document.getElementsByTagName('html')[0]
  // let mwidth = document.body.clientWidth
  // if(mwidth > 1023){
  //   if(to.path == '/pages/home'){
  //     htmlDom.style.fontSize = '16px'
  //   }else{
  //     htmlDom.style.fontSize = (16 * (mwidth / 1680)) + 'px'
  //   }
  // }else {
  //   htmlDom.style.fontSize = (20 * (mwidth / 640)) > 48 ? 30 + 'px' : (16  * (mwidth / 320)) + 'px';
  // }
  var os = (function() {
    var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
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
   /* Vue.prototype.$myToast.success(
      "您好，為了提供最佳的網站服務，本網站不支援平板瀏覽器版本，請您使用手機或桌上型電腦進行瀏覽，謝謝"
    );*/
  } else if (os.isPc) {
    // pc
    let mwidth = window.screen.width;
    if (mwidth > 750 && mwidth <= 1024) {
      var ua = navigator.userAgent.toLowerCase();
      if (/mac/i.test(ua)) {
       /* Vue.prototype.$myToast.success(
          "您好，為了提供最佳的網站服務，本網站不支援平板瀏覽器版本，請您使用手機或桌上型電腦進行瀏覽，謝謝"
        );*/
      }
    }
  }
  try {
    // 设置浏览器标题
    if (to.name == "infoChange") {
      if (to.query.type == 1) {
        window.document.title = "AIA 友邦人壽網路投保｜個人資料修改";
      } else if (to.query.type == 2) {
        window.document.title = "AIA 友邦人壽網路投保｜保單記錄查詢";
      } else {
        window.document.title = to.meta.title;
      }
    } else if (to.name == "productDetail") {
      if (to.query.id == 1) {
        window.document.title = "AIA 友邦人壽網路投保｜e路寶傷害保險";
      } else if (to.query.id == 2) {
        window.document.title = "AIA 友邦人壽網路投保｜ Fun心假日意外險";
      } else {
        window.document.title = "AIA 友邦人壽網路投保｜佑你定期壽險";
      }
    } else {
      window.document.title = to.meta.title;
    }
    if (to.query.MEDIA_CODE) {
      longData(0, "MEDIA_CODE", to.query.MEDIA_CODE);
    }
    let loggin1 = longData(1, "token");
    let loggin = sessionStorage.getItem("token");
    store.commit("setTabIndex", map1.get(to.name));
    if (
      to.matched.some(item => {
        return item.meta.login;
      }) &&
      to.name != store.getters.getRouterName &&
      to.query != store.getters.getQuery
    ) {
      store.commit("setRouterName", to.name);
      store.commit("setRouterQuery", to.query);
      sessionStorage.setItem("routerName", JSON.stringify(to.name));
      sessionStorage.setItem("query", JSON.stringify(to.query));
    }
    if (
      (!loggin &&
        to.matched.some(item => {
          return item.meta.login;
        })) ||
      (loggin && loggin1 && loggin1 != loggin)
    ) {
      store.commit("setLogin", false);
      if (loggin1) {
        sessionStorage.removeItem("token");
      }
      vm.$message.error("您還未登入，請先登入！");
      next({
        name: "loginIn"
      });
    } else {
      if (loggin && loggin1 && loggin1 == loggin && to.name == "loginIn") {
        window.history.go(-2);
      } else {
        next();
      }
    }
  } catch (err) {
    console.log(err);
  }
});
router.afterEach((to, from) => {
  let loggin1 = longData(1, "token");
  let loggin = sessionStorage.getItem("token");
  if (from.name == "loginIn" && loggin1 && loggin && loggin == loggin1) {
    let navigation = IEVersion();
    if (navigation > 0 || navigation == "edge") {
      window.location.reload();
    }
  }
  store.commit("setIFtb", to.name);
  // let bodySrcollTop = document.body.scrollTop
  // if (bodySrcollTop !== 0) {
  //   alert(`1`, bodySrcollTop)
  //   if (to.name == 'productDetail' && from.name == 'home') {
  //     document.body.scrollTop =
  //       document.documentElement.clientHeight - 300 ||
  //       document.body.clientHeight - 300
  //   } else {
  //     document.body.scrollTop = 0
  //   }
  //   return
  // }
  // let docSrcollTop = document.documentElement.scrollTop
  // if (docSrcollTop !== 0) {
  //   alert(`2`, docSrcollTop)
  //   if (to.name == 'productDetail' && from.name == 'home') {
  //     document.documentElement.scrollTop =
  //       document.documentElement.clientHeight - 300 ||
  //       document.body.clientHeight - 300
  //   } else {
  //     document.documentElement.scrollTop = 0
  //   }
  // }
});
Vue.use(Router);
export default router;
