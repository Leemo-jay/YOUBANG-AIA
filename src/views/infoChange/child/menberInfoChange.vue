<template>
  <div class="menberInfoChange">
    <slot></slot>
    <div class="backbtn" id="lvqq-mobile-back" @click="back" >
        <!-- <a-icon type="left" /> -->
        << 返回 會員專區
      </div>
    <div class="infoDiv">
      <div class="infoList">
        <div class="list-item">會員編號</div>
        <div class="infoDetail">{{ userInfo.accountCode }}</div>
      </div>
      <div class="infoList">
        <div class="list-item">身分證字號</div>
        <div class="infoDetail">{{codeHidden('idCard', userInfo.ceriticateNo)}}</div>
      </div>
      <div class="infoList">
        <div class="list-item">姓名</div>
        <div class="infoDetail">{{codeHidden('name', userInfo.accountName)}}</div>
      </div>
      <div class="infoList">
        <div class="list-item">生日</div>
        <div class="infoDetail">{{codeHidden('birthday', userInfo.birthDay)}}</div>
        <div class="tip">(若您要修改姓名或生日，請洽詢客服人員)</div>
      </div>
      <com-form-l-v :productData='premData'></com-form-l-v>
      <!-- <div @click="change" :class="isFill||!Modeify?'isGrey':''" class="comBtn thisBtn" ref="postbtn">確認並發送動態密碼</div> -->
      <div @click="change" :class="{isGrey:chose_color==false||isFill,thisBtn:chose_color==true }" class="comBtn thisBtn" ref="postbtn">確認並發送動態密碼</div>

      <!-- <div @click="change" :class="{isGrey: !Modeify||isFill,thisBtn:!isFill }" class="comBtn thisBtn" ref="postbtn">確認並發送動態密碼</div> -->
      <div class="backbtn" id="lvqq-pc-back" v-if="!isFill">
        <!-- <a-icon type="left" /> -->
        <span class="left">
          <</span>
            <span @click="back" style="color:#6a6a6a">
              返回</span>
      </div>
      <!-- <code-verify :phoneP="premData.phone.value" :emailP="premData.email.value" :serialNumber="serialNumber" :accountId="accountId" v-if="ifShow" ref="codeVerify">
        <div @click="post2Register" class="comBtn thisBtn postbtn">送 出</div>
      </code-verify> -->
      <!-- </div>
    <div v-else> -->
      <div v-if="isFill&&(chose_color==true)">
        <codeVerify :phoneP="premData.phone.value?premData.phone.value:premData.phone.grey" :emailP="premData.email.value?premData.email.value:premData.email.grey" :serialNumber="serialNumber" :accountId="accountId" ref="changeVerifyCode">
          <div @click="post2Change" class="comBtn thisBtn postbtn" :class="errNum==5?'isGrey':''">送 出</div>
        </codeVerify>
        <div class="tipsbox">
          <p class="tips">
            注意事項：1.提醒您，本次僅就網路投保之會員資料進行修改，不會異動您的保單基本資料，若您欲修改保單基本資料，可下載填妥「契約內容變更申請書」後，交由我們為您服務，如有疑問，歡迎來電本公司客服專線0800-012-666。
          </p>
        </div>
      </div>
    </div>
    <!-- 确认框 -->
    <div class="sure">
      <a-modal v-model="visible" :closable="false" :centered="true">
        <template slot="footer">
          <p class="footbox" style="text-align: center;color: #161616;font-size: 1.5625rem;">
            <span style="border-radius: 1.875rem;width: 6.25rem;border: 0.0625rem solid #d81f49;padding: 0.625rem 3.75rem;cursor: pointer;" @click="hideModal">確 認</span>
          </p>
        </template>
        <p style="text-align: center;color: #161616;font-size: 1.5625rem;">會員資料修改完成！</p>
      </a-modal>
    </div>

    <!-- 發送動態密碼框 -->
    <!-- <div class="codeInfo">
      <div class="codebox">
        <div class="info">
          <p class="info-content">動態密碼已發送至您的手机：093***3888及</p>
          <p class="info-content">E-mail:******A1@AIA.COM，请您于10分钟内填寫，如逾时或填寫错误次数达5次，请重新發送動態密碼。</p>
        </div>
        <div class="password">
          <p class="title">動態密碼</p>
          <input class="input" type="text" placeholder="請填寫">
          <p class="tip">動態密碼剩余有效時間 {{time}}</p>
        </div>
        <div class="repostbtn">
          <img src="@/assets/youbang/reset.jpg" alt="">
          <span class="repost-content">重新發送動態密碼</span>
        </div>
      </div>
      <div class="postbtn thisBtn">送 出</div>
    </div> -->
  </div>
</template>
<script>
import { codeHidden, get_ip } from '@/commonJs/common.js'
// import comForm from '@/components/comForm/index'
import ComFormLV from "../../../components/comFormLV/index";
import codeVerify from '@/views/loginIn/child/codeVerify.vue'
import regObj from '@/commonJs/regRule.js'
export default {
  name: 'menberInfoChange',
  components: {
    ComFormLV,
    codeVerify
  },
  data() {
    return {
      isFill: false,
      visible: false,
      chose_color: false,
      userInfo: {
        accountCode: '',
        ceriticateNo: '',
        accountName: '',
        birthDay: ''
      },
      premData: {
        phone: {
          value: '',
          grey: '',
          required: false,
          param_type: 1,
          errorMsg: '請填寫正確手機門號',
          param_name: '手機',
          tip: '(限台灣手機門號)',
          bds: 'tel',
          disabled: false,
          error: false
        },
        email: {
          value: '',
          grey: '',
          required: false,
          param_type: 1,
          errorMsg: '請填冩有效的E-mail',
          param_name: 'E-mail',
          tip: '',
          bds: 'email',
          disabled: false,
          error: false
        },
        referrerCode: {
          value: '',
          grey: '',
          required: false,
          param_type: 1,
          errorMsg: '請填寫正確會員編號！',
          param_name: '推薦人會員編號（選填）',
          tip: '',
          bds: 'member',
          disabled: false,
          error: false
        },
      },
      caheData: '',
      time: '09:51',
      ifShow: false,
      serialNumber: '',
      accountId: '',
      changePhone: true,
      errNum: 0,
      errTime: 0,
      ip: '',
      ifchecking: false
    }
  },
  watch: {
    premData: {
      handler: function (n, o) {
        // console.log(`this.premData`, n)
        // console.log(`bol`, Object.entries(n).some(el => el[1].value !== ''))
        //console.log(`arr1`, Object.entries(n).filter(el => el[1].value !== ''))
        //console.log(`arr2`, Object.entries(n).filter(el => el[1].value !== '').every(el => !el[1].error && regObj[el[1].bds].test(el[1].value)))
        console.log(`-----------------------------------------------------------`)

        for (let item in n) {
          console.log('=======================', n[item].value)
          if (n[item].value !== '') {
            this.chose_color = true
            return
          }
          this.chose_color = false
        }
      },
      deep: true,
      immediate: false
    }
  },
  computed: {
    Modeify() {
      if (Object.entries(this.premData).some(el => el[1].value !== '')) {
        return Object.entries(this.premData).filter(el => el[1].value !== '').every(el => !el[1].error && regObj[el[1].bds].test(el[1].value))
      } else {
        return false
      }


      // if (this.premData.phone.value) {
      //   return !this.premData.phone.error
      // } else if (this.premData.email.value) {
      //   return !this.premData.email.error
      // } else if (this.premData.referrerCode.value) {
      //   return !this.premData.referrerCode.error
      // } else  {
      //   return (this.premData.phone.value && !this.premData.phone.error) && (this.premData.email.value && !this.premData.email.error)
      // }
    },
    ifLogin() {
      return this.$store.state.customer.ifLogin
    }
  },
  methods: {
    hideModal() {
      this.visible = false
    },
    back() {
      this.$router.push({
        name: 'infoChange'
      })
    },
    codeHidden(type, value) {
      return codeHidden(type, value)
    },
    async checkReferrerCode() {
      console.log(`test`, 123)
      try {
        this.ifchecking = true
        let tep = {
          step: 'update',
          referrerCode: this.premData.referrerCode.value
        }
        let res = await this.Axios('checkReferrerCode', tep)
        console.log(`_____________`, res)
        this.ifchecking = false
        let resp = await this.Axios('getSerialNumber', {})
        if (this.chose_color == true) {
          this.serialNumber = resp.data.data
          this.premData.phone.disabled = true
          this.premData.email.disabled = true
          this.premData.referrerCode.disabled = true
          this.isFill = true
        }
        console.log(`res`, res)
      } catch (error) {
        this.premData.referrerCode.error = true
        this.ifchecking = false
        console.log(`err`, error)
      }
    },
    async change() {
      try {
        if (!this.Modeify) {
          if (this.premData.phone.value != '' && this.premData.phone.error) {
            return this.$myToast.success('電話號碼格式錯誤');
          }
          if (this.premData.email.value != '' && this.premData.email.error) {
            return this.$myToast.success('Email格式錯誤或不存在');
          }
          if (this.premData.referrerCode.value != '' && this.premData.referrerCode.error) {
            return this.$myToast.success('請填寫正確會員編號!');
          }
          // this.$message.error('請檢查資訊');
          // return
        }
        if (this.ifchecking) return
        if (this.Modeify && this.isFill) return
        return this.checkReferrerCode()
      } catch (error) {
        console.log(error)
      }

    },
    async post2Change() {
      try {
        console.log(`this.$refs.changeVerifyCode.ifPast`, this.$refs.changeVerifyCode.ifPast)
        if (this.$refs.changeVerifyCode.ifPast) {
          return this.$myToast.success('動態密碼已失效，請重發動態密碼')
        }
        if (this.$refs.changeVerifyCode.code == '') {
          return this.$myToast.success('請填寫動態密碼')
        }
        if (this.errNum == 5) {
          return this.$myToast.success('動態密碼已失效,請重發動態密碼')
        }
        let postData = {
          "otpCode": this.$refs.changeVerifyCode.code,
          "otpKey": this.$refs.changeVerifyCode.otpKey,
          "serialNumber": this.serialNumber,
          // "ip": returnCitySN["cip"],
          // "ip": this.ip,
          "referrerCode": this.premData.referrerCode.value !== '' ? this.premData.referrerCode.value : this.userInfo.referrerCode,
          "phone": this.premData.phone.value !== '' ? this.premData.phone.value : this.userInfo.phone,
          "email": this.premData.email.value !== '' ? this.premData.email.value : this.userInfo.email
        }
        let resp = await this.Axios('newPhone', postData)
        console.log(`newPhone`, resp)
        // this.$message.error('會員資料修改完成！')
        // this.$success({
        //   title: '',
        //   closable: false,
        //   centered: true,
        //   content: (  // JSX support
        //     <div>
        //       <p>會員資料修改完成！</p>
        //     </div>
        //   ),
        // });
        if (this.premData.referrerCode.value !== '') {
          this.premData.referrerCode.grey = this.premData.referrerCode.value
          this.premData.referrerCode.value = ''
        }
        if (this.premData.phone.value !== '') {
          this.premData.phone.grey = this.premData.phone.value
          this.premData.phone.value = ''
        }
        if (this.premData.email.value !== '') {
          this.premData.email.grey = this.premData.email.value
          this.premData.email.value = ''
        }
        this.isFill = false;
        this.premData.phone.disabled = false
        this.premData.email.disabled = false
        this.premData.referrerCode.disabled = false
        // this.visible = true
        this.$message.success('會員資料修改完成！')
        return this.getUserInfo()

      } catch (err) {
        console.log(`err`, err)
        console.log(`this.$refs.changeVerifyCode.errTime`, this.$refs.changeVerifyCode)
        this.errNum++
        if (this.errNum == 5) {
          this.$refs.changeVerifyCode.ifPast = true
          this.$refs.changeVerifyCode.ifPost = false
          console.log(`this.$refs.changeVerifyCode.ifPast`, this.$refs.changeVerifyCode.ifPast)
          this.errTime++
          if (this.errTime == 5 || this.$refs.changeVerifyCode.errTime == 6) {
            this.$myToast.error('動態密碼已重發多次，若您仍無法收到，請洽詢服務人員。')
            this.$store.commit('logOut')
            // this.$router.push({
            //   name: 'loginIn'
            // })
          }
        }
      }
    },
    async getUserInfo() {
      try {
        let resp = await this.Axios('getUserInfo', {})
        console.log(`getUserInfo`, resp)
        this.userInfo = resp.data.data
        let arr = String(this.userInfo.birthDay).split('-')
        this.userInfo.birthDay = `${(parseInt(arr[0]) - 1911)}/${arr[1]}/${arr[2]}`
        this.accountId = resp.data.data.accountCode
        this.premData.phone.grey = codeHidden('phone', resp.data.data.phone)
        this.premData.email.grey = codeHidden('email', resp.data.data.email)
        this.premData.referrerCode.grey = resp.data.data.referrerCode
        if (resp.data.data.referrerCode) {
          this.premData.referrerCode.disabled = true
        }
        this.caheData = {
          phone: resp.data.data.phone,
          email: resp.data.data.email,
          referrerCode: resp.data.data.referrerCode
        }
      } catch (error) {
        console.log(error)
        // return this.$message.error(error)
      }
    },
  },
  activated() { },
  deactivated() { },
  created() {
    this.getUserInfo()
  },
  mounted() {
    // get_ip((ip)=>{
    //   this.ip = ip
    //   console.log('get_ip',ip)
    // })
  }
}
</script>

<style lang="scss" scoped>
@import '../index.scss';
@import '../lv-add.scss';

// @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
//   .menberInfoChange {
//     .infoDiv {
//       margin-left: 0 !important;
//     }
//   }
// }

.menberInfoChange {
  min-height: 43.75rem;
  /deep/ .codeSure {
    width: 100%;
    font-size: 1rem;
  }
  .left {
    font-size: 1.6rem;
    font-weight: 600;
  }
  .infoDiv {
    // width: 456px;
    height: auto;
    // margin: auto;
    // margin-left: 0;
    .backbtn {
      margin-top: 3.125rem;
      font-size: 1.375rem;
      color: #6a6a6a;
      span:nth-child(2) {
        cursor: pointer;
        // border-bottom: 0.0625rem solid #6a6a6a;
        text-decoration: underline;
      }
    }
  }
  .codeInfo {
    min-height: 43.75rem;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .codebox {
      height: 31.25rem;
      width: 80%;
      border: 0.0625rem solid #dadada;
      padding: 3.125rem 2.5rem;
      .info {
        .info-content {
          line-height: 1.875rem;
        }
      }
      .password {
        margin-top: 3.125rem;
        .title {
          font-size: 1.375rem;
        }
        .input {
          margin-top: 0.9375rem;
          height: 1.875rem;
          width: 100%;
          outline: none;
          border: none;
          border-bottom: 0.0625rem solid #dadada;
        }
        .tip {
          margin-top: 0.9375rem;
          font-size: 1.125rem;
          color: $primary-color;
        }
      }
      .repostbtn {
        margin-top: 4.375rem;
        vertical-align: middle !important;
        line-height: 1.875rem;
        cursor: pointer;
        img {
          height: 1.875rem;
          width: 1.875rem;
        }
        .repost-content {
          margin-left: 0.3125rem;
          margin-top: 0.1875rem;
          padding-bottom: 0.125rem;
          line-height: 1.875rem;
          font-size: 1.375rem;
          border-bottom: 0.0938rem solid #dadada;
          // text-decoration:underline;
          &:hover {
            color: $primary-color;
            border-bottom: 0.0938rem solid $primary-color;
          }
        }
      }
    }
    .postbtn {
      margin: 3.125rem 0;
    }
    .grey {
      background: rgba(#6a6a6a, 0.3) !important;
      color: #6a6a6a !important;
    }
  }
  .tipsbox {
    margin: 7.8125rem 0 6.25rem 0;
    .tips {
      padding-top: 4.6875rem;
      font-size: 0.9375rem !important;
      line-height: 1.875rem;
      color: #bebebe;
    }
  }
}
</style>
<style>
.ant-modal-content {
  padding: 3.125rem;
}
.ant-modal-footer {
  border-top: none;
}

</style>
