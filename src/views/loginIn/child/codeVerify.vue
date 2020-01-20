<template>
  <div class="heightThis">
    <div v-show="isShow" class="codeSure">
      動態密碼已發送至您的手機 ：{{phone}} 及 E-mail ：{{email}}，請您於10分鐘內填寫，如逾時或填寫錯誤次數達5次，請重發動態密碼。
      <div class="codeDiv">動態密碼</div>
      <div class="inputDiv">
        <div>
          <input
            type="text"
            v-model="code"
            class="thisInput"
            placeholder="請填寫"
            @focus="isFocus = true"
            @blur="isFocus = false"
            :class="{isfoucs : isFocus,isblur: isFocus === false,}"
            @keydown.enter="lvEnter"
          />
          <!-- <div :class="{start : isFocus,end: isFocus === false,}" class="bgTest"></div> -->
        </div>
        <div class="tipFont" v-if="!ifPast">
          動態密碼剩餘有效時間
          <timer ref="timer" @ifHasPast="ifHasPast"></timer>
        </div>
        <div class="tipFont" v-else>動態密碼已失效，請重發動態密碼</div>
        <div @click="intep" class="reset">
          <img src="@/assets/youbang/reset.jpg" alt />
          <span :class="errTime==6||ifPost?'isGrey':'redtip'">重新發送動態密碼</span>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import timer from "@/components/timer.vue";
import { intervaControl, codeHidden } from "@/commonJs/common.js";

export default {
  name: "codeVerify",
  components: {
    timer
  },
  props: {
    identifyCode: {
      // 默认注册码
      type: String,
      default: "1234"
    },
    phoneP: {
      // 默认注册码
      type: String,
      required: false
    },
    emailP: {
      // 默认注册码
      type: String,
      required: false
    },
    ifShow: {
      type: Boolean,
      required: false
    },
    serialNumber: {
      type: String,
      required: false
    },
    accountId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      // inner: {},
      code: "",
      otpKey: "",
      isShow: true,
      errTime: 0,
      ifPast: false,
      ifPost: false,
      isFocus: false
    };
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
    ifHasPast(val) {
      console.log(`val`, val);
      this.ifPast = val;
    },
    getCode() {
      this.ifPost = true;
      let that = this;
      setTimeout(() => {
        that.ifPost = false;
      }, 61000);
      if (this.ifPast) {
        this.ifPast = false;
      }
      this.errTime++;
      let mock = this.$parent.accountId ? "loginSendOpt" : "registerSengOpt";
      let tepData;
      console.log(`D187826055`, this.serialNumber);
      try {
        tepData = {
          serialNumber: this.$parent.serialNumber,
          accountId: this.$parent.accountId,
          phone: this.$parent.premData.phone.value,
          email: this.$parent.premData.email.value,
          infoKey: this.$parent.infoKey
        };
      } catch (e) {
        //TODO handle the exception
        tepData = {
          serialNumber: this.$parent.serialNumber,
          accountId: this.$parent.accountId
        };
      }
      if (this.$parent.changePhone) {
        mock = "changePhone";
        tepData = {
          email:
            this.$parent.premData.email.value !== ""
              ? this.$parent.premData.email.value
              : this.$parent.userInfo.email,
          phone:
            this.$parent.premData.phone.value !== ""
              ? this.$parent.premData.phone.value
              : this.$parent.userInfo.phone,
          serialNumber: this.$parent.serialNumber,
          referrerCode:
            this.$parent.premData.referrerCode.value !== ""
              ? this.$parent.premData.referrerCode.value
              : this.$parent.premData.referrerCode.grey
        };
      }
      if (this.$parent.informationConfirmSendOtp) {
        mock = "informationConfirmSendOtp";
        tepData = {
          serialNumber: this.$parent.serialNumber
        };
      }
      this.Axios(mock, tepData)
        .then(res => {
          this.otpKey = res.data.data;
          // this.$emit('otpKey',res.data.data)
          if((document.body.clientWidth+this.getScrollWidth())<1024) {
            this.$Toast("動態密碼已發送之您的手機和E-mail，請注意查收")
            //this.vuxAlert()
          }else {
            this.$message.success("動態密碼已發送之您的手機和E-mail，請注意查收");
          }
          //this.$message.success("動態密碼已發送之您的手機和E-mail，請注意查收");
          // this.intep();
          // if (this.$parent.errNum == 5) {
          this.$parent.errNum = 0;
          // }
          this.isShow = true;
          this.$refs.timer.ifpast = false;
          this.$refs.timer.startTimer();
        })
        .catch(err => {
          console.log(`err__`, err);
        });
    },
    getCode1() {
      let tepData = {
        serialNumber: this.$parent.serialNumber,
        accountId: this.$parent.accountId,
        phone: this.$parent.premData.phone.value,
        email: this.$parent.premData.email.value
      };
      this.Axios("registerSengOpt", tepData).then(res => {
        this.otpKey = res.data.data;
        // this.$Toast('發送成功')
        this.$message.success("發送成功"); //提示

        this.intep();
        this.isShow = true;
      });
    },
    resetTimer() {
      // this.getCode
      this.$refs.timer.startTimer();
    },
    getCodeDe() {
      if (this.$parent.accountId) {
        this.getCode();
      } else {
        this.getCode1();
      }
    },
    intep() {
      console.log(`intep`, this.errTime);
      if (this.errTime == 6) return;
      if (this.ifPast) {
        this.inner = {};
        let self = this;
        this.inner = intervaControl(
          self.getCode,
          60000,
          "動態密碼已發送之您的手機和E-mail，請注意查收"
        );
        this.inner();
      } else {
        this.inner();
      }
    },
    lvEnter() {
      try{
        this.$emit('songchu');
      }catch(e){}
    }
    // inner() {
    //   let self = this;
    //   return this.intervaControl(self.getCode, 60000, '壹分鐘內不可再次發送');
    // }
  },
  computed: {
    phone() {
      return codeHidden("phone", this.phoneP);
    },
    email() {
      return codeHidden("email", this.emailP);
    }
  },
  watch: {},
  created() {},
  mounted() {
    // this.resetTimer();
    let self = this;
    // this.inner = intervaControl(self.getCode, 60000, '壹分鐘內不可再次發送');
    this.inner = intervaControl(
      self.getCode,
      60000,
      "動態密碼已發送之您的手機和E-mail，請注意查收"
    );
    this.inner();
  }
};
</script>

<style scoped lang="scss">
@import "./lv-add.scss";
.codeSure {
  overflow: hidden;
  width: 28.9375rem;
  line-height: 2.125rem;
  margin: 2.5rem 0;
  background: #fff;
  padding: 1.25rem 0.875rem;
  border: 0.0625rem solid #dadada;
  font-size: 1rem;
  color: #6a6a6a;
  word-break: break-all;
  transition: all 0.4s;
  box-sizing: border-box;

  .codeDiv {
    margin-top: 3.375rem;
    margin-bottom: 0.9375rem;
    font-size: 1.25rem;
    font-family: "Microsoft JhengHei" !important;
    font-weight: 600;
    color: rgba(58, 58, 58, 1);
    line-height: 2.1875rem;
  }
  .isGrey {
    cursor: not-allowed;
    color: #6a6a6a;
    font-size: 1.25rem;
  }
  .redtip {
    color: $primary-color !important;
    cursor: pointer;
    font-size: 1.25rem;
  }
  .thisInput {
    // margin-top: 1.25rem;
    background-color: #ffffff;
    padding: 0.125rem;
    padding-left: 0;
    position: relative;
    border: none;
    font-size: 1.125rem;
    // font-size: px(28);
    //height: px(46);
    outline: 0;
    // -webkit-opacity: 1;
    width: 85%;
    border-radius:0!important;
    border-bottom: 0.0625rem solid #e8e8e8;
    // padding-bottom: 0.25rem !important;
  }
  .thisInput::placeholder {
    font-size: 1.125rem !important;
  }
  .isfoucs {
    border-bottom: 0.0625rem solid #a2b5f9;
  }
  .isblur {
    border-bottom: 0.0625rem solid #e8e8e8;
  }
}
.step-right .heightThis .codeSure {
  margin-top: 4.8125rem;
  padding: 2.5rem;
  width: 28.9375rem;
  font-size: 1rem;
  line-height: 2.125rem;
  .codeDiv {
    font-size: 1.25rem;
    font-family: "Microsoft JhengHei" !important;
    font-weight: 600;
    color: rgba(58, 58, 58, 1);
    line-height: 2.1875rem;
  }
  .reset {
    margin-top: 4.375rem;
  }
}
.step-right .check .postbtn {
  width: 20.25rem;
}
.tipFont {
  font-size: 1.125rem;
  margin-top: 1rem;

  color: $primary-color !important;
}
// .heightThis {
// height: 16.4375rem;
// }
.reset {
  font-size: 1.25rem;
  margin-top: 3.125rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.875rem;
  cursor: pointer;
  &:hover {
    color: skyblue;
  }
  img {
    width: 1.075rem;
    margin-right: 0.55rem;
  }

  span {
    color: #6a6a6a;
    // border-bottom: .0625rem solid #6A6A6A;
    // color: $primary-color;
    text-decoration: underline;
  }
}


.bgTest {
  // margin-top: 0.625rem;
  // background: #e8e8e8;
  // background: linear-gradient(90deg,#e8e8e8 0%,blue 10% ,#e8e8e8 0%);
  // width: 85%;
  width: 100%;
  height: 0.0625rem;
  top: -0.0625rem;
  position: relative;
  // animation: deep1 4s ease-in-out infinite alternate;
}

.bgTest::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  height: 100%;
  // background: blue;
  // background: $primary-color;
  background: #a2b5f9;
  // animation: deep1 1s forwards;
}

.bgError::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  // background: blue;
  // background: $primary-color;
  background: $primary-color !important;
  animation: in 0.4s forwards;
}

.start::before {
  animation: in 0.4s forwards;
}

.end::before {
  animation: out 0.4s forwards;
}

@keyframes in {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes out {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}
</style>
