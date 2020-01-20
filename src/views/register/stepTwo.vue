<template>
  <div>
    <div class="steptwo" v-if="status === 0">
      <p class="title">為維護您的權益，</p>
      <p class="title">請您務必填寫正確資料</p>
      <div class="listContainer" id="listContainer">
        <com-form-l-v :productData="premData" @updateDate="updateDate"></com-form-l-v>
      </div>
      <div class="nextbtnbox">
        <button :disabled="ifcanNext" class="nextbtn" @click="go2next()">下一步</button>
      </div>
    </div>
    <div class="check" id="check" v-else>
      <p class="title">請確認您的會員資料</p>
      <div class="item-box">
        <div
          class="item-list"
          v-for="(item,index) in userInfo"
          :key="index"
        >{{item.key|mapName}} ：{{item.value}}</div>
      </div>
      <div @click="postPassword" :class="{isGrey:Modeify}" class="comBtn thisBtn">確認並發送動態密碼</div>
      <div class="backbtn" v-if="!Modeify">
        <a-icon type="left" />

        <span @click="status = 0">返回修改資料</span>
      </div>
      <code-verify
        :phoneP="premData.phone.value"
        :emailP="premData.email.value"
        :serialNumber="serialNumber"
        :accountId="accountId"
        v-if="Modeify"
        ref="codeVerify"
      >
        <div
          @click="post2Register"
          class="comBtn thisBtn postbtn"
          :class="errNum==5?'isGrey':''"
        >送 出</div>
      </code-verify>
    </div>
  </div>
</template>
<script>
import codeVerify from "@/views/loginIn/child/codeVerify.vue";
import { formatmyyear, get_ip } from "@/commonJs/common.js";
import ComFormLV from "../../components/comFormLV/index";
export default {
  name: "steptwo",
  components: {
    ComFormLV,
    codeVerify
  },
  props: {
    todoList: {
      type: Array
    }
  },
  data() {
    return {
      premData: {
        certificateNo: {
          value: "",
          required: true,
          param_type: 1,
          errorMsg: "請填寫正確身分證字號",
          param_name: "身分證字號",
          tip: "（外籍人士尚未開放網路投保，請您與我們的客服人員聯繫）",
          bds: "idCard", // 校验正则规则
          error: false
        },
        name: {
          value: "",
          required: true,
          param_type: 1,
          errorMsg: "請填寫中文或英文姓名",
          param_name: "姓名",
          grey: "請填寫真實姓名",
          tip: "",
          bds: "name",
          error: false
        },
        bir: {
            widget: '',
            value: '',
            param_type: 4,
            errorMsg: '請填寫生日',
            errorMsg1: '很抱歉,您填寫的生日已超過商品投保年齡的限制',
            param_name: '生日',
            tip: '（須年滿20歲才可申請為網路投保會員）',
            bds: '',
            grey: '請填寫民國年格式0780101',
            minYear: -105,
            maxYear: -20,
            error: false,
            defaultValue: ''
        },
        birthday: {
          value: "",
          required: true,
          // param_type: 'dateever',
          type: "register",
          param_type: 8,
          errorMsg: "請填寫正確生日",
          param_name: "生日",
          tip: "（須年滿20歲才可申請為網路投保會員）",
          bds: "birthday",
          grey: "請填寫民國年格式0780101",
          minYear: 20,
          // maxYear: -20,
          error: false
        },
        phone: {
          value: "",
          required: true,
          param_type: 1,
          errorMsg: "請填寫正確手機門號",
          param_name: "手機",
          tip: "(限台灣手機門號)",
          grey: "例:0909123456",
          bds: "tel",
          error: false
        },
        email: {
          value: "",
          required: true,
          param_type: 1,
          errorMsg: "請填寫有效的E-mail",
          param_name: "E-mail",
          tip: "",
          grey: "請填寫有效的E-mail",
          bds: "email",
          error: false
        },
        referrerCode: {
          value: "",
          required: false,
          param_type: 1,
          errorMsg: "請填寫正確會員編號！",
          param_name: "推薦人會員編號（選填）",
          tip: "",
          grey: "例:B999999",
          bds: "member",
          error: false
        }
      },
      user: [],
      Modeify: false,
      infoKey: "",
      otpKey: "",
      accountId: "",
      serialNumber: "",
      status: 0,
      ifcanNext: false,
      errNum: 0,
      errTime: 0,
      ip: ""
    };
  },
  computed: {
    birthdayH5(){
        return this.premData.bir.value
    },
    birthdayPC(){
        return this.premData.birthday.value
    },
    userInfo() {
      if (this.premData) {
          delete this.premData.bir
        /*if((document.body.clientWidth+this.getScrollWidth())<1024) {
            delete this.premData.birthday
        }else{
            delete this.premData.bir
        }*/
        let arr = Object.entries(this.premData).map(el => {
          return {
            key: el[0],
            value: el[1].value
          };
        });
        console.log(arr)
        arr[0] = arr.splice(1, 1, arr[0])[0];
        arr[1] = arr.splice(2, 1, arr[1])[0];
        /*let arr1 = this.premData.birthday.value.split('-')
        arr[1].value = `${this.lt100(parseInt(arr1[0]) - 1911)}/${arr1[1]}/${arr1[2]}`*/
        let bstr = String(arr[1].value);
        arr[1].value = `${bstr.substr(0, 3)}/${bstr.substr(3, 2)}/${bstr.substr(
          -2,
          2
        )}`;
        console.log(`user`, arr);
        arr.splice(3, 0, {
          key: "sex",
          value: arr[2].value.substr(1, 1) == 1 ? "男" : "女"
        });
        return arr;
      }
    }
  },
  filters: {
    mapName(el) {
      let arr = new Map([
        ["name", "姓名"],
        ["birthday", "生日"],
        ["certificateNo", "身分證字號"],
        ["sex", "性别"],
        ["phone", "手機"],
        ["email", "E-mail"],
        ["referrerCode", "推薦人會員編號"]
      ]);
      return arr.get(el);
    }
  },
  watch: {
    birthdayH5:function (newValue, oldValue) {
        if((document.body.clientWidth+this.getScrollWidth())<1024) {
            let arrBirthday = this.premData.bir.value.split("-");
            //alert(parseInt((parseInt(arrBirthday[0])-1911)))
            if((parseInt(arrBirthday[0])-1911)>99){
                this.premData.birthday.value = parseInt(arrBirthday[0]) - 1911 + arrBirthday[1] + arrBirthday[2]
            }else {

                this.premData.birthday.value = "0"+(parseInt(arrBirthday[0]) - 1911).toString() + arrBirthday[1] + arrBirthday[2]
            }
        }
        //alert('h5')
    },
    birthdayPC:function (newValue, oldValue) {
        if((document.body.clientWidth+this.getScrollWidth())>=1024){
            //判断是否输入的有误
            let rul = /^(([0]{2}[1-9])|([0][1-9][0-9])|([1-9][0-9]{2}))([0][1-9]|[1][0-2])(([0][1-9])|(([1]|[2])[0-9])|30|31)$/
            let rul1 = /^[0-9]{7}$/
            if (!rul.test(this.premData.birthday.value)) {
                if (String(this.value).length == 7 && rul1.test(this.value)) {
                    let cachMonth = parseInt(String(this.value).substr(3, 2))
                    let day = parseInt(String(this.value).substr(-2, 2))
                    if (
                        (cachMonth == 2 && day > 28) ||
                        ((cachMonth == 4 || cachMonth == 6 || cachMonth == 9 || cachMonth == 11) && day > 30) ||
                        ((cachMonth == 1 || cachMonth == 3 || cachMonth == 5 || cachMonth == 7 || cachMonth == 8 || cachMonth == 10 || cachMonth == 12) && day > 31) || (cachMonth > 12 || day > 31)
                    ) {
                        //this.errorFinal = '日期不存在'
                        //this.changeError(true)
                    }
                } else {
                    //this.errorFinal = '請輸入有效的格式 (YYYMMDD)'
                }
                this.premData.bir.value=''
            } else {
                let arrBirthday=this.premData.birthday.value.toString().split("");
                //alert(arrBirthday)
                let year=arrBirthday[0]+arrBirthday[1]+arrBirthday[2]
                let month=arrBirthday[3]+arrBirthday[4]
                let day=arrBirthday[5]+arrBirthday[6]
                this.premData.bir.value=parseInt(year)+1911+"-"+month+"-"+day
            }
        }
        //alert('pc')
    },
    status(newl, oldv) {
      console.log(`newl`, newl);
      console.log(`oldv`, oldv);
      $(window).scrollTop(0);
      let arr = this.premData.birthday.value.split("-");
      console.log(`this.premData.birthday.value`, this.premData.birthday.value);
      if (newl !== 0 && arr[0].length === 3) {
        this.premData.birthday.value = `${parseInt(arr[0]) + 1911}-${arr[1]}-${
          arr[2]
        }`;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let doc = document.getElementsByTagName("input");
      console.log(`doc`, doc);
      if (doc.length > 0) {
        doc[0].focus();
      }
    });
    // get_ip((ip)=>{
    //   this.ip = ip
    //   console.log('get_ip',ip)
    // })
  },
  methods: {
      getScrollWidth() {
          var noScroll, scroll, oDiv = document.createElement("DIV");
          oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
          noScroll = document.body.appendChild(oDiv).clientWidth;
          oDiv.style.overflowY = "scroll";
          scroll = oDiv.clientWidth;
          document.body.removeChild(oDiv);
          //console.log(noScroll-scroll)
          return noScroll-scroll;
      },
    lt10(num) {
      if (num < 10) return `0${num}`;
      return num;
    },
    lt100(num) {
      if (num < 10) {
        return `00${num}`;
      } else if (num < 100) {
        return `0${num}`;
      } else {
        return num;
      }
    },
    // 校验身分证
    async go2next() {
        /*let arrBirthday = this.premData.bir.value.split("-");
        //alert(arrBirthday)
        if(parseInt(arrBirthday[0])>99){
            this.premData.birthday.value = parseInt(arrBirthday[0]) - 1911 + arrBirthday[1] + arrBirthday[2]
        }else {
            this.premData.birthday.value = "0"+parseInt(arrBirthday[0]) - 1911 + arrBirthday[1] + arrBirthday[2]
        }*/

        //this.premData.birthday.value=this.premData.bir.value
        console.log(this.premData)
      try {
        let newarr = Object.entries(this.premData).map(el => {
          return {
            value: el[1].value,
            error: el[1].error,
            required: el[1].required
          };
        });
        let test = newarr.map(el =>
          el.required ? el.value != "" && !el.error : true
        );
        if (test.every(el => el == true)) {
          let tep = {
            referrerCode: this.premData.referrerCode.value
          };
          let resp = await this.Axios("checkReferrerCode", tep, true);
          console.log(`this.referenceCode---结果：`, resp.data);
          this.$emit("premData", this.premData);
          console.log(`this.todoList`, this.todoList);
          let data = this.premData;
          let tepData = {
            certificateType: "1",
            age: 21,
            channelCode: "web",
            accountAgreementDTOList: this.todoList
            // "accountAgreementDTOList": [{
            //   "subType": "register_interest",
            //   "name": "ceshi",
            //   "version": "1"
            // }]
          };
          console.log(`22222222222222222222222`);
          Object.entries(data).forEach(([key, item]) => {
            if (key === "birthday") {
                //tepData[key]=
              let bstr = String(item.value);
              tepData[key] = `${parseInt(bstr.substr(0, 3)) +
                1911}-${bstr.substr(3, 2)}-${bstr.substr(-2, 2)}`;
            } else {
              tepData[key] = item.value;
            }
          });
          let res = await this.Axios("verifyIdentity", tepData);
          // .then(res => {
          console.log(`res11111--------`, res.data);
          this.infoKey = res.data.data;
          this.sureContent = false;
          this.status = 1;
          // return this.register()
        } else {
          // this.$myToast.success('請按照正確格式填寫表格')
          let arr = [];
          Object.entries(this.premData).forEach(el => {
            console.log(`el________`, el[1]);
            if (el[1].error == true || (el[1].required && el[1].value == "")) {
              this.premData[el[0]].error = true;
              arr.push(el[1]);
              return;
            }
          });
          console.log(`arr____`, arr);
          let doc = document.getElementById("listContainer");
          console.log(`doc___`, doc.offsetTop);
          $(window).scrollTop(doc.offsetTop - 80);
          this.$myToast.success(arr[0].errorMsg);
        }
      } catch (err) {
        if (err == "請填寫正確會員編號！") {
          this.premData.referrerCode.error = true;
        }
        $(window).scrollTop(doc.offsetTop - 80);
        console.log(`err`, err);
      }
    },
    updateDate(val) {
      console.log(`i get val-----------`, val);
      this.premData.birthday.value = formatmyyear(val);
    },
    getOtpKey(value) {
      this.otpKey = value;
    },
    async postPassword() {
      try {
        if (this.Modeify) return;
        let resp = await this.Axios("getSerialNumber", {});
        // .then(res => {
        console.log(`resp111111------------------`, resp);
        this.serialNumber = resp.data.data;
        console.log(`serialNumber`, this.serialNumber);
        this.Modeify = true;
        // this.$refs.codeVerify.inner();
        // })
        // })
        console.log(`123`);
      } catch (error) {
        console.log(error);
        return;
      }
    },
    async post2Register() {
      try {
        console.log(
          `this.$refs.codeVerify.ifPast`,
          this.$refs.codeVerify.ifPast
        );
        if (this.$refs.codeVerify.ifPast) {
          return this.$myToast.success("動態密碼已失效，請重發動態密碼");
        }
        if (this.$refs.codeVerify.code == "") {
          return this.$myToast.success("請填寫動態密碼");
        }
        if (this.errNum == 5) {
          return this.$myToast.success("動態密碼已失效,請重發動態密碼");
        }
        console.log(`post2Register`);
        let tepData = {
          serialNumber: this.serialNumber,
          accountId: this.accountId,
          otpCode: this.$refs.codeVerify.code,
          otpKey: this.$refs.codeVerify.otpKey,
          infoKey: this.infoKey
          // ipAddr: returnCitySN["cip"], // 新加参數
          // ipAddr: this.ip, // 新加参數
        };
        let resp = await this.Axios("Register", tepData);
        // .then(res => {
        // this.memberNumber = resp.data.data;
        this.$parent.memberNumber = resp.data.data.accountCode;
        this.status = 1;
        if((document.body.clientWidth+this.getScrollWidth())<1024) {
            this.$Toast("您已完成網路投保YONii會員註冊！")
        }else{
            this.$message.success("您已完成網路投保YONii會員註冊！");
        }

        // this.$longData(0, 'accountId', this.premData.certificateNo.value)
        this.$longData(2, "policyNo");
        this.$longData(2, "state");
        this.$longData(2, "accountCode");
        this.$longData(2, "goodsId");
        this.$longData(2, "token");
        // this.$store.commit('setVocationInfo', {})
        // this.$store.commit('setRouterQuery', '')
        // this.$store.commit('setRouterName', '')
        this.$store.commit("setLogin", false);
        // this.$longData(0, 'accountNum', this.premData.certificateNo.value)
        this.$longData(0, "token", resp.data.data.token);
        sessionStorage.setItem("token", resp.data.data.token);
        await this.$store.dispatch("getUserInfo", true);
        this.$parent.changeStep(3);
      } catch (error) {
        console.log(error);
        console.log(`this.$refs.codeVerify.errTime`, this.$refs.codeVerify);
        this.errNum++;
        if (this.errNum == 5) {
          this.$refs.codeVerify.ifPast = true;
          this.$refs.codeVerify.ifPost = false;
          console.log(
            `this.$refs.codeVerify.ifPast`,
            this.$refs.codeVerify.ifPast
          );
          this.errTime++;
          if (this.errTime == 5 || this.$refs.codeVerify.errTime == 6) {
            this.$myToast.success(
              "動態密碼已重發多次，若您仍無法收到，請洽詢服務人員。"
            );
            this.$router.push({
              name: "loginIn"
            });
          }
        }
      }

      // })
    }
  }
};
</script>
<style lang="scss" scoped>
@media only screen and (min-width: 1024px) {
  .lv-pc {
    display: block;
  }
  .lv-mb {
    display: none;
  }
}
@media only screen and (max-width: 1023px) {
  .lv-pc {
    display: none;
  }
  .lv-mb {
    display: block;
  }
  .listContainer {
    color: #3a3a3a;
    width: 100%;
    box-sizing: border-box;
    padding: 0 calc(100vw / 320 * 23) !important;
    margin-top: calc(100vw / 320 * 34) !important;
    font-size: calc(100vw / 320 * 16) !important;
    /deep/ .form-com-content{
      .comTimeH5{
        .weui-cell{
          padding: 0 !important;
          margin: 0!important;
        }
      }
    }

    /deep/ .formDiv {
      /*margin: calc(100vw / 320 * 29) 0;*/
      padding: 0 !important;
      .titleFont {
        margin: 0 !important;
        font-size: calc(100vw / 320 * 16);
      }
      .required::before {
        font-size: calc(100vw / 320 * 14);
        margin-right: 0;
      }
      .formInput {
        font-size: calc(100vw / 320 * 14) !important;
        margin-top: calc(100vw / 320 * 15) !important;
        line-height: calc(100vw / 320 * 18) !important;
        border-radius: 0 !important;
      }
      .formInput::placeholder {
        font-size: calc(100vw / 320 * 14) !important;
      }
      .tip {
        max-width: 100% !important;
        font-size: calc(100vw / 320 * 12) !important;
        margin-top: 0 !important;
      }
      .redError {
        font-size: calc(100vw / 320 * 12) !important;
        margin-top: calc(100vw / 320 * 2) !important;
        padding: 0 !important;
      }
    }
  }
  .thisBtn {
    margin: calc(100vw / 320 * 40) auto 0 !important;
    width: calc(100vw / 320 * 274) !important;
    height: calc(100vw / 320 * 42) !important;
    background-color: #d72049 !important;
    color: #fff !important;
    border-radius: calc(100vw / 320 * 21) !important;
    font-size: calc(100vw / 320 * 17) !important;
    line-height: calc(100vw / 320 * 42) !important;
    text-align: center !important;
    padding: 0 !important;
    letter-spacing: calc(100vw / 320 * 1) !important;
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .steptwo {
    /deep/ .listContainer {
      .dateIcon {
        //  background: red!important;
        top: 64% !important;
        width: 2rem !important;
        height: 2rem !important;
        right: 2rem;
      }
    }
  }

  // .product-content {
  //   .product-detail-content {
  //     .banner {
  //       height: 30.75rem !important;
  //     }
  //     .product-detail-left {
  //       .detailBox {
  //         font-weight: 600;
  //         width: 57.5rem !important;
  //       }
  //     }
  //   }
  // }
}

.steptwo {
  width: 100%;
  min-height: 100%;
  .title {
    font-size: 2.625rem;
    font-weight: 600;
    color: #161616;
  }
  .listContainer {
    // width: 80%;
    // margin-top: 2.6042vw;
    // font-size: 1.125rem;
  }
  .nextbtnbox {
    margin-top: 4.5625rem;
  }
}
.title {
  line-height: 3.75rem;
  font-size: 2.625rem;
  font-weight: 600;
}
.check {
  .item-box {
    margin-top: 2.5rem;
    .item-list {
      font-size: 1.25rem;
      line-height: 3rem;
      color: #3a3a3a;
    }
  }
  .thisBtn {
    height: 3.6875rem;
    width: 20.25rem;
    margin-top: 5rem;
    padding: 0 3.125rem;
    font-size: 1.25rem;
    line-height: 3.6875rem;
    text-align: center;
    background-color: $nextbtn-color;
    outline: none;
    border-style: none;
    border-radius: 1.875rem;
    color: #fff;
    cursor: pointer;
  }

  .isGrey {
    height: 3.6875rem;
    line-height: 3.6875rem;
    width: 20.25rem;
    // background: rgba(#6a6a6a, 0.3) !important;
    color: #6a6a6a;
  }
  .postbtn {
    text-align: center;
  }
  .backbtn {
    margin-top: 3.5625rem;
    margin-bottom: 3rem;
    font-size: 1.3rem;

    color: #6a6a6a;
    span {
      font-size: 1.5rem;

      cursor: pointer;
      border-bottom: 0.0625rem solid #6a6a6a;
    }
  }
  .heightThis {
    // margin-top: 12.5rem
    /deep/ .codeSure {
      padding-bottom: 5.125rem !important;
      font-size: 1rem !important;
      .codeDiv {
        margin-top: 2.5rem;
      }
      .thisInput::placeholder {
        color: #bebebe;
      }
      .reset {
        margin: 1.25rem 0 0;
      }
    }
  }
}
.step-right .check .isGrey {
  font-size: 1.25rem;
  background: #f2f2f2;
  color: #cfcfcf;
  width: 20.25rem;
  height: 3.6875rem;
}

.steptwo /deep/.listContainer {
  /deep/.formDiv {
    // margin-top: 3.6875rem;
  }
  /deep/.titleFont {
    margin-top: 0 !important;
    font-size: 1.25rem;
  }
  .formInput::placeholder {
    font-size: 1.125rem;
  }
  /deep/.formInput {
    // margin-top: 1.125rem !important;
  }
  /deep/.dateIcon {
    top: 2.0625rem !important;
    width: 2.125rem !important;
    height: 1.9375rem !important;
    right: 2rem;
  }
  /deep/ .tip {
    // max-width: 100% !important;
    // margin-right: 0 !important;
    // font-size: 1rem !important;
  }
}
</style>
