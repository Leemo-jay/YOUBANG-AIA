import { longData, Axios, codeHidden } from "@/commonJs/common.js";
import router from "../../router";
import store from "..";

let userInfo = longData(1, "userInfo") || "";
// let stateLocal = longData(1, 'state')
let stateLocal = JSON.parse(sessionStorage.getItem("state"));
// var storageHandler = function() {
//   state.loginName = localStorage.name
// }
// window.addEventListener('storage', storageHandler, false)

const state = {
  userInfo: userInfo ? userInfo : null,
  ifrelaod: false,
  ifLogin: false,
  tabIndex: null,
  trial:
    stateLocal && sessionStorage.getItem("token") ? stateLocal.trial : null,
  vocationInfo:
    stateLocal && sessionStorage.getItem("token")
      ? stateLocal.vocationInfo
      : null,
  routerName:
    stateLocal && sessionStorage.getItem("token") ? stateLocal.routerName : "",
  query: stateLocal && sessionStorage.getItem("token") ? stateLocal.query : {},
  timer: null,
  ifTb: "",
  step_1: 0,
  step_2: 0
};

const mutations = {
  set_address1(state, setInfo) {
    state.step_1 = setInfo;
  },
  set_address2(state, setInfo) {
    state.step_2 = setInfo;
  },
  setUserInfo(state, userInfo) {
    if (!userInfo) return;
    state.userInfo = userInfo;
    state.ifLogin = true;
  },
  setTabIndex(state, index) {
    state.tabIndex = index;
  },
  setReload(state, bol) {
    state.ifrelaod = bol;
  },
  setLogin(state, bol) {
    state.ifLogin = bol;
  },
  setTrial(state, obj) {
    state.trial = JSON.stringify(obj);
  },
  setVocationInfo(state, obj) {
    state.vocationInfo = JSON.stringify(obj);
  },
  async getUserInfo() {
    try {
      let resp = await Axios("getUserInfo", {});
      // if (resp.data.code !== '200') throw resp.data.message
      state.userInfo = resp.data.data;
      state.ifLogin = true;
    } catch (error) {
      // longData(2, 'token')
      sessionStorage.getItem("token") ? sessionStorage.removeItem("token") : "";
      state.ifLogin = false;
    }
  },
  setRouterName(state, name) {
    state.routerName = name;
  },
  setRouterQuery(state, query) {
    state.query = query;
  },
  go2Login() {
    router.push({
      name: "loginIn"
    });
  },
  async logOut() {
    try {
      let resp = await Axios("logout", {});
      sessionStorage.getItem("token") ? sessionStorage.removeItem("token") : "";
      sessionStorage.getItem("routerName")
        ? sessionStorage.removeItem("routerName")
        : "";
      sessionStorage.getItem("query") ? sessionStorage.removeItem("query") : "";
      // 清空資訊
      longData(2, "token");
      // longData(2, 'state')
      sessionStorage.getItem("state") ? sessionStorage.removeItem("state") : "";
      longData(2, "userInfo");
      // longData(2, 'policyNo')
      // longData(2, 'accountCode')
      // longData(2, 'sumPremium')
      // longData(2, 'goodsId')
      sessionStorage.getItem("policyNo")
        ? sessionStorage.removeItem("policyNo")
        : "";
      sessionStorage.getItem("accountCode")
        ? sessionStorage.removeItem("accountCode")
        : "";
      sessionStorage.getItem("sumPremium")
        ? sessionStorage.removeItem("sumPremium")
        : "";
      sessionStorage.getItem("goodsId")
        ? sessionStorage.removeItem("goodsId")
        : "";
      longData(2, "accountId"); // 删除账号
      state.userInfo = null;
      state.ifLogin = false;
      state.trial = null;
      state.vocationInfo = null;
      state.routerName = "";
      state.query = {};
      router.push({
        name: "loginIn"
      });
    } catch (error) {
      console.log(error);
    }
  },
  async setTimer(state, obj) {
    try {
      if (obj) {
        clearTimeout(state.timer);
        state.timer = setTimeout(async () => {
          await store.dispatch("logOut");
          clearTimeout(state.timer);
          state.timer = null;
        }, 30 * 60 * 1000);
        // }, 3 * 1000)
      } else {
        clearTimeout(state.timer);
        state.timer = null;
      }
    } catch (error) {
      console.log(`error--`, error);
    }
  },
  setIFtb(state, name) {
    state.ifTb = name;
  }
};

const actions = {
  setTabIndex({ commit }, index) {
    commit("setTabIndex", state, index);
  },
  setLogin({ commit }, bol) {
    commit("setLogin", bol);
  },
  getUserInfo({ commit }) {
    commit("getUserInfo");
  },
  logOut({ commit }) {
    console.log(`ogOut`);
    commit("logOut");
  }
};

const getters = {
  userName() {
    if (state.userInfo.accountName)
      return codeHidden("name", state.userInfo.accountName);
    return "";
  },
  userIdcard() {
    if (state.userInfo) return state.userInfo.ceriticateNo;
    return "";
  },
  getTrial() {
    if (state.trial) return JSON.parse(state.trial);
    return {};
  },
  getVocationInfo() {
    if (state.vocationInfo) return JSON.parse(state.vocationInfo);
    return {};
  },
  getRouterName() {
    if (state.routerName) return state.routerName;
    return "";
  },
  getQuery() {
    if (state.query) return state.query;
    return {};
  },
  userBirthday() {
    if (state.userInfo) return state.userInfo.birthDay;
    return "";
  },
  ifLogin() {
    let sess = sessionStorage.getItem("token");
    let local = longData(1, "token");
    console.log(`homepahge`, sess);
    console.log(`homepahge`, local);
    return sess && local && sess == local;
  },
  getIftb() {
    return state.ifTb;
  }
};
export default {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters
};
