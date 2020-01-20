let mockObj = {
  // fillINfo
  jsonTest: {
    url: "/call/callCursor",
    ifconfirm: false,
    auth: true,
    method: "post",
    confirm: false
  },
  countrylist: {
    isJson: true,
    ifconfirm: true,
    url: "country/list",

    // auth: true,

    method: "post",

    confirm: false
  },
  getGoodsList: {
    isJson: true,
    ifconfirm: true,
    url: "zatech-life-market/goods/getGoodsList",
    // auth: true,
    method: "post",
    confirm: false
  },
  changePhone: {
    isJson: true,
    ifconfirm: true,
    url: "zatech-life-account/user/sendUpdateAccountOtp",
    // auth: true,
    method: "post",
    confirm: false
  },
  newPhone: {
    isJson: true,
    ifconfirm: false,
    url: "zatech-life-account/user/accountInfo",
    // auth: true,
    method: "post",
    confirm: false
  },
  listPolicyByToken: {
    isJson: true,
    ifconfirm: false,
    url: "policy/listPolicyByToken",
    // auth: true,
    method: "post",
    confirm: false
  },
  getUserInfo: {
    url: "zatech-life-account/user/accountInfo",
    ifconfirm: false,
    auth: true,
    method: "get",
    confirm: false
  },
  getCustomerInfo: {
    ifconfirm: false,
    url: "qh/querymyQianhai.do",
    // auth: true,
    method: "post",
    confirm: false
  },
  Register: {
    ifconfirm: false,
    isJson: true,
    url: "zatech-life-account/user/Register",
    // auth: true,
    method: "post",
    confirm: false
  },
  login: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/loginService/login",
    // auth: true,
    method: "post",
    confirm: false
  },
  logout: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/loginService/loginOut",
    // auth: true,
    method: "post",
    confirm: false
  },
  getSerialNumber: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/AccountPasswordAuthentication/getSerialNumber",
    // auth: true,
    method: "post",
    confirm: false
  },
  loginSendOpt: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/loginService/loginSendOpt",
    // auth: true,
    method: "post",
    confirm: false
  },
  loginCheckOpt: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/loginService/loginCheckOpt",
    // auth: true,
    method: "post",
    confirm: false
  },
  verifyIdentity: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/user/verifyIdentity",
    // auth: true,
    method: "post",
    confirm: false
  },

  registerSengOpt: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/AccountPasswordAuthentication/registerSengOtp",
    // auth: true,
    method: "post",
    confirm: false
  },

  premiumCalc: {
    ifconfirm: false,
    isJson: true,
    url: "zatech-life-market/goods/premiumTrial",
    // auth: true,
    method: "post",
    confirm: false
  },

  listProfessional: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/tProfessionalService/arrayProfessional",
    // auth: true,
    method: "post",
    confirm: false
  },
  findByFunctionType: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/functionAgreement/findByFunctionType",
    // auth: true,
    method: "post",
    confirm: false
  },
  getTrialInit: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-market/tGoodsTrial/getTrialInit",
    // auth: true,
    method: "post",
    confirm: false
  },
  getPolicyFactor: {
    ifconfirm: true,
    isJson: true,
    url: "frontPolicyService/getPolicyFactor",
    // auth: true,
    method: "post",
    confirm: false
  },
  addFirstTab: {
    ifconfirm: true,
    isJson: true,
    url: "frontPolicyService/addFirstTab",
    // auth: true,
    method: "post",
    confirm: false
  },
  getInfomationPageFactor: {
    ifconfirm: true,
    isJson: true,
    url: "frontPolicyService/getInfomationPageFactor",
    // auth: true,
    method: "post",
    confirm: false
  },
  informationCommit: {
    ifconfirm: true,
    isJson: true,
    url: "frontPolicyService/informationCommit",
    // auth: true,
    method: "post",
    confirm: false
  },
  getArea: {
    ifconfirm: true,
    isJson: true,
    url: "getArea",
    // auth: true,
    method: "post",
    confirm: false
  },
  getVerifyCode: {
    ifconfirm: true,
    isJson: true,
    url: "getVerifyCode",
    // auth: true,
    method: "post",
    confirm: false
  },
  countrylist: {
    ifconfirm: true,
    isJson: true,
    url: "country/list",
    // auth: true,
    method: "post",
    confirm: false
  },
  riskAgreementList: {
    ifconfirm: false,
    isJson: true,
    url: "riskAgreement/riskAgreementList",
    // auth: true,
    method: "post",
    confirm: false
  },
  informationConfirmSendOtp: {
    ifconfirm: true,
    isJson: true,
    url: "frontPolicyService/informationConfirmSendOtp",
    // auth: true,
    method: "post",
    confirm: false
  },
  getcoOperativeBankList: {
    ifconfirm: false,
    isJson: true,

    url: "coOperativeBank/getcoOperativeBankList",

    // auth: true,

    method: "post",

    confirm: false
  },
  pay: {
    ifconfirm: true,
    isJson: true,

    url: "payment/pay",

    // auth: true,

    method: "post",

    confirm: false
  },
  informationConfirmCheckOtp: {
    ifconfirm: true,
    isJson: true,
    url: "frontPolicyService/informationConfirmCheckOtp",
    // auth: true,
    method: "post",
    confirm: false
  },
  getPolicyDetail: {
    ifconfirm: true,
    isJson: true,
    url: "policy/getPolicyDetail",
    // auth: true,
    method: "post",
    confirm: false
  },
  listProfessionalLevel: {
    ifconfirm: true,
    isJson: true,
    url: "zatech-life-account/tProfessionalService/listProfessionalLevel",
    method: "post",
    confirm: false
  },
  // 掉接口记录错误資訊
  addCheckRecord: {
    ifconfirm: false,
    isJson: true,
    url: "frontPolicyService/addCheckRecord",
    method: "post",
    confirm: false
  },
  // 校验会员编号
  checkReferrerCode: {
    ifconfirm: false,
    isJson: true,
    url: "zatech-life-account/user/checkReferrerCode",
    method: "post",
    confirm: false
  },
  // 投保上一步修改订单状态
  toPrevious: {
    ifconfirm: false,
    isJson: true,
    url: "orderService/toPrevious",
    method: "post",
    confirm: false
  },
  //投保流程保費及年齡更新
  getInsureAgeAndPremium: {
    ifconfirm: false,
    isJson: true,
    url: "frontPolicyService/getInsureAgeAndPremium ",
    method: "post",
    confirm: false
  },
  // 投保第三步更新生效日期
  frontPolicyService: {
    ifconfirm: false,
    isJson: true,
    url: "frontPolicyService/updateEffectiveTime",
    method: "post",
    confirm: false
  },

  test: {
    ifconfirm: false,
    isJson: true,
    url: "frontPolicyService/emptyInterface",
    method: "post",
    confirm: false
  }
};

export default mockObj;
