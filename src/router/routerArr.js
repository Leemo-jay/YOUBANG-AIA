let arr = [
  {
    name: "loginIn",
    // title: '帳號登錄',
    title: "AIA 友邦人壽網路投保｜會員登入",
    login: false
  },
  {
    name: "home",
    // title: '首頁',
    title: "AIA 友邦人壽網路投保｜首頁",
    login: false
  },
  {
    name: "register",
    // title: '帳號註冊',
    title: "AIA 友邦人壽網路投保｜加入會員",
    login: false
  },
  {
    name: "help",
    // title: '友邦帮忙',
    title: 'AIA 友邦人壽網路投保｜友邦幫忙',
    child: true,
    login: false
  },
  {
    name: "goods-list",
    // title: '商品列表',
    title: "AIA 友邦人壽網路投保｜商品總覽",
    login: false
  },
  {
    name: "infoChange",
    path: "personal-info",
    // title: '會員專區',
    title: "AIA 友邦人壽網路投保｜會員專區",
    login: true
  },
  // {
  //   name: 'error',
  //   title: '404'
  // },
  {
    name: "productDetail",
    // child: 'id',
    title: "商品詳情",
    login: false
  },
  {
    name: "insure",
    path: "tb",
    // title: '投保流程',
    login: true
  },
  {
    name: "active",
    path: "activity",
    // title: '活動專區',
    title: "AIA 友邦人壽網路投保｜活動專區",
    login: false
  },
  {
    name: "policyDetails",
    path: "insurance-detail",
    title: "AIA 友邦人壽網路投保｜保單詳情",
    login: true
  }
];
export default arr;
