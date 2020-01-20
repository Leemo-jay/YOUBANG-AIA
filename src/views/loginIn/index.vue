<template>
  <div class="container">
    <div class="content" :class="ifShow? 'content1':''">
      <div class="loginDiv" v-if="!ifShow">

        <div class="bigFont">會員登入</div>
        <div class="littleFont">還不是會員嗎?
          <span class="spFont" @click="goRouter">請先加入</span>
        </div>
        <comForm  :productData='premData' @updateDate="updateDate" class="comfrom"></comForm>
        <!--<comForm :productData='premData'></comForm>-->
        <com-form-h5 :productData='premDataH5' class="comfromH5"></com-form-h5>
        <div class="codecontainer">
          <p class="name">驗證碼</p>
          <div class="codebox">
            <div class="code-inpbox">
              <input class="codeInput h5HolderClass" :placeholder="h5Holder" type="text" v-model="code" @focus="showError = false,isFocus = true" @blur="isFocus = false">
              <input class="codeInput PCHolderClass" type="text" v-model="code" @focus="showError = false,isFocus = true" @blur="isFocus = false" @keydown.enter="checkNum">
              <div :class="{start : isFocus,end: isFocus === false&&!showError,bgError:!isFocus&&showError,isfocus:isFocus}" class="bgTest"></div>
            </div>
            <!--<SIdentify class="code" :identifyCode="identifyCode" v-if="reset"></SIdentify>-->
            <img class="imgBase64" :src="'data:image/jpeg;base64,'+varifyCodeInfo.codeBase64">
            <img src="@/assets/youbang/reset.jpg" alt="" class="resetimg" @click="changeCode">
          </div>
          <div class="redError tip" v-if="showError">
            <img src="@/assets/youbang/err.jpg" alt="" style="width:0.9375rem" class="err"> {{codeErrorMsg}}
          </div>
        </div>
        <div class="loginbtn" @click="checkNum">確 認</div>
      </div>

      <div class="loginDiv1" v-else>
        <div class="login_content">
          <code-verify class="if_login" :phoneP="userInfo.phone" :emailP="userInfo.email" :serialNumber="serialNumber" :accountId="String(accountId)" v-if="Modeify||ModeifyH5" ref="loginCodeVerify" @songchu="checkIFneedLogout">
          </code-verify>
          <div @click="checkIFneedLogout" class="comBtn thisBtn postbtn" :class="errNum==5?'grey':''">送 出</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import comForm from '@/components/comForm/index'
import SIdentify from './child/SIdentify.vue'
import codeVerify from './child/codeVerify.vue'
import { formatmyyear, get_ip } from '@/commonJs/common.js'
import ComFormH5 from "../../components/comFormH5/index";
import {
  Toast
} from 'mint-ui';
const toast = (value) => {
  Toast({
    message: value,
    duration: 3000
  });
}
export default {
  name: "loginIn",
  components: {
    ComFormH5,
    comForm,
    codeVerify,
    SIdentify,

  },
  watch: {
    cardH5:function (newValue, oldValue) {
      //this.vuxAlert(4444)
      //toast(11111)
      //alertAnt(444)
      //return this.$message.error('請填寫驗證碼')
      //this.$Toast('請完善表單請完善表單請完善表單請完善表單請完善表單請完善表單請完善表單請完善表單')
      /*Toast({
        message: '323213',
        duration: 3000
      })*/
      if((document.body.clientWidth+this.getScrollWidth())<1024) {
        this.premData.card.value = this.premDataH5.card.value
      }
    },
    birthdayH5:function (newValue, oldValue) {
      if((document.body.clientWidth+this.getScrollWidth())<1024) {
        let arrBirthday = this.premDataH5.bir.value.split("-");
        //alert(arrBirthday)
        if((parseInt(arrBirthday[0])-1911)>99){
          this.premData.birthday.value = parseInt(arrBirthday[0]) - 1911 + arrBirthday[1] + arrBirthday[2]
        }else {
          this.premData.birthday.value = "0"+(parseInt(arrBirthday[0]) - 1911).toString() + arrBirthday[1] + arrBirthday[2]
        }
      }
    },
    cardPC:function (newValue, oldValue) {
      if((document.body.clientWidth+this.getScrollWidth())>=1024){
      this.premDataH5.card.value=this.premData.card.value
      }
    },
    birthdayPC:function (newValue, oldValue) {
      if((document.body.clientWidth+this.getScrollWidth())>=1024){
        let arrBirthday=this.premData.birthday.value.toString().split("");
        let year=arrBirthday[0]+arrBirthday[1]+arrBirthday[2]
        let month=arrBirthday[3]+arrBirthday[4]
        let day=arrBirthday[5]+arrBirthday[6]
        this.premDataH5.bir.value=parseInt(year)+1911+"-"+month+"-"+day
      }
    },
  },
  data() {
    return {
      varifyCodeInfo:{},
      h5Holder:'請填寫驗證碼',
      premDataH5: {
        card: {
          value: '',
          param_type: 1,
          errorMsg: '請填寫身分證字號',
          ruleArr: [
            {
              message: '請填寫身分證字號',
              name: 'notNull',
            },
            {
              message: '請填寫正確身分證字號',
              name: 'idCard',
            },

          ],
          dataIndex:'card',
          param_name: '身分證字號',
          // tip: '外籍人士尚未开房网路投保，请您与我们的客服人员联系',
          bds: 'idCard',
          required: true,
          error: false,
          widget: ''
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
      },
      premData: {
        card: {
          value: '',
          required: true,
          param_type: 1,
          errorMsg: '請填寫正確身分證字號',
          param_name: '身分證字號',
          // tip: '外籍人士尚未開放網路投保，請您與我們的客服人員聯繫',
          bds: 'idCard',
          error: false
        },
        birthday: {
          value: '',
          required: true,
          // param_type: 'dateever',
          type: 'loginIn',
          param_type: 8,
          errorMsg: '請填寫正確生日',
          param_name: '生日',
          tip: '(須年滿20歲才可申請為網路投保會員)',
          bds: 'birthday',
          grey: '請填寫民國年格式0780101',
          error: false
        },
        phone: {
          value: '0932123456',
        },
        email: {
          value: 'test@qq.com'
        }
      },
      userInfo: {
        phone: '0932123456',
        email: 'test@qq.com',
      },
      identifyCode: '',// 生成的驗證碼
      code: '',// 填寫的驗證碼
      codeErrorMsg: '驗證碼錯誤，請重新填寫',
      showError: false,
      isFocus: false,
      reset: true,
      ifShow: false,
      ifrequest: false,
      accountId: '',
      serialNumber: '',
      wrongTime: 0,
      errNum: 0,
      errTime: 0,
      cacheCode: '',
      ip: ''
    }
  },
  computed: {
    cardH5(){
      return this.premDataH5.card.value
    },
    birthdayH5(){
      return this.premDataH5.bir.value
    },
    cardPC(){
      return this.premData.card.value
    },
    birthdayPC(){
      return this.premData.birthday.value
    },
    Modeify() {
      return (this.premData.card.value && !this.premData.card.error) && (this.premData.birthday.value && !this.premData.birthday.error) && this.code
    },
    ModeifyH5() {
      return (this.premDataH5.card.value && !this.premDataH5.card.error) && (this.premDataH5.bir.value && !this.premDataH5.bir.error) && this.code
    },
    ifLogin() {
      return this.$store.state.customer.ifLogin
      // let sess = sessionStorage.getItem('token')
      // let local = this.$longData(1, 'token')
      // return sess && local && sess == local
    },
  },
  inject: ['reload'], //注入reload方法
  methods: {
    vuxAlert(value){
      this.$vux.alert.show({
        title: '',
        content: value,
        buttonText: '確定'
      })
    },
    getVerifyCode: function () {
      this.Axios('getVerifyCode').then(res => {
        this.varifyCodeInfo=res.data.data
      });

    },
    test(e) {
      console.log(`e`, e)
      return false

    },
    checkCode() {
      console.log(`cachCode`, this.cacheCode)
      if (this.code == '') {
        this.codeErrorMsg = '請填寫驗證碼'
        this.showError = true
      } else {
        let arr = this.identifyCode.split(',')
        let arr2 = [...this.code]
        if ((arr2.every((el, index) => el.toLowerCase() == arr[index].toLowerCase())) && arr.length == arr2.length) {
          console.log(`1`)
          this.codeErrorMsg = '驗證碼錯誤，請重新填寫'
          this.showError = false
        } else {
          console.log(`2`)
          this.codeErrorMsg = '驗證碼錯誤，請重新填寫'
          this.showError = true
        }
      }
    },
    updateDate(val) {
      // console.log(`i get val-----------`, val)
      this.premData.birthday.value = formatmyyear(val)
    },
    goRouter() {
      if (this.ifLogin) return this.$message.error('請退出登錄後再申請新的註冊！')
      this.$router.push({
        name: 'register'
      })
    },
    async checkNum() {
      //alert()
      if((document.body.clientWidth+this.getScrollWidth())>1023){//大于1023走pc的逻辑
        try {
          if (!this.Modeify) {
            if (this.premData.card.value == '') {
              this.premData.card.error = true
              return this.$message.error('請填寫身分證字號!')
            }
            if (this.premData.card.error == true) {
              return this.$message.error(this.premData.card.errorMsg)
            }
            if (this.premData.birthday.value == '') {
              this.premData.birthday.error = true
              return this.$message.error('請填寫生日!')
            }
            if (this.premData.birthday.error == true) {
              return this.$message.error(this.premData.birthday.errorMsg)
            }
            if (this.code == '') {
              this.codeErrorMsg = '請填寫驗證碼'
              this.showError = true
              return this.$message.error('請填寫驗證碼')
            } else {
              this.codeErrorMsg = '驗證碼錯誤，請您重新填寫'
              this.showError = false
            }
          }
        } catch (error) {
          console.log(`err`, error)
        }
      }else{//走h5逻辑
        try {
          if (!this.ModeifyH5) {
            if (this.premDataH5.card.value == '') {
              this.premDataH5.card.error = true
              return this.vuxAlert('請填寫身分證字號!')
              //return this.$message.error('請填寫身分證字號!')
            }
            if (this.premDataH5.card.error == true) {
              return this.vuxAlert(this.premDataH5.card.ruleArr[1].message)
              //return this.$message.error(this.premDataH5.card.errorMsg)
            }
            if (this.premDataH5.bir.value == '') {
              this.premDataH5.bir.error = true
              return this.vuxAlert('請填寫生日!')
              //return this.$message.error('請填寫生日!')
            }
            if (this.premDataH5.bir.error == true) {
              return this.vuxAlert(this.premData.birthday.errorMsg)
             // return this.$message.error(this.premData.birthday.errorMsg)
            }
            if (this.code == '') {
              this.codeErrorMsg = '請填寫驗證碼'
              this.showError = true
              return this.vuxAlert('請填寫驗證碼')
              //return this.$message.error('請填寫驗證碼')
            } else {
              this.codeErrorMsg = '驗證碼錯誤，請您重新填寫'
              this.showError = false
            }
            //信息检验
            // this.$message.error('請檢查資訊');
            // return
          }
        } catch (error) {
          console.log(`err`, error)
        }
      }
      //校验验证码
      if(this.code===this.varifyCodeInfo.codeValue){
        if (this.$longData(1, 'token')) {
          let res = await this.$store.commit('logOut')
          this.$longData(2, 'token')
          return this.go2Step2()
        }
        return this.go2Step2()
      }else{
        this.wrongTime++
        if (this.wrongTime === 5) {
          this.changeCode()
          this.wrongTime = 0
        }
        this.showError = true

        if((document.body.clientWidth+this.getScrollWidth())>1023) {//大于1023走pc的逻辑
          return this.$message.error('驗證碼錯誤，請您重新填寫！')
        }else {
          return this.vuxAlert('驗證碼錯誤，請您重新填寫')
        }



      }
     /* console.log(`code`, [...this.code].join())
      console.log(`identifyCode`, this.identifyCode)
      let arr = this.identifyCode.split(',')
      let arr2 = [...this.code]
      if (((arr2.every((el, index) => el.toLowerCase() == arr[index].toLowerCase())) && arr.length == arr2.length) || ((window.location.hostname == '10.138.1.34' || window.location.hostname == 'yoniiuat.aia.com.tw') && String(this.code) == '11111')) {
        if (this.$longData(1, 'token')) {
          let res = await this.$store.commit('logOut')
          this.$longData(2, 'token')
          return this.go2Step2()
        }
        return this.go2Step2()
      } else {
        this.wrongTime++
        if (this.wrongTime === 5) {
          this.changeCode()
          this.wrongTime = 0
        }
        this.showError = true
        return this.$message.error('驗證碼錯誤，請您重新填寫！')
      }*/
    },
    changeCode() {
      this.getVerifyCode()
     /* let arr = []
      this.reset = false
      // for (let i = 0; i < 5; i++) {
      //   // let a = parseInt(Math.random() * 75 + 48)//獲取48-123的随机数
      //   //将58-65,91-97之间的数剔除
      //   if ((a >= 58 && a < 65) || (a >= 91 && a < 97)) {
      //     i -= 1
      //     continue
      //   } else {
      //     arr.push(String.fromCharCode(a))
      //   }
      // }
      for (let i = 0; i < 5; i++) {
        let a = parseInt(Math.random() * 9 + 0)//獲取48-123的随机数
        arr.push(a)
      }
      this.identifyCode = arr.join()
      this.reset = true
      console.log(`arr`, arr)*/
      // console.log(`identifyCode`, this.identifyCode)
    },
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
    // 獲取seariasNumber
    async go2Step2() {
      try {
        console.log(`login`)
        /*if((document.body.clientWidth+getScrollWidth())>1023) {//大于1023走pc的逻辑
          if (!this.Modeify) {
            this.$message.error('請檢查資訊');
            return
          }
          if (this.Modeify && this.ifrequest) return
        }else{
          if (!this.ModeifyH5) {
            this.$message.error('請檢查資訊');
            return
          }
          if (this.ModeifyH5 && this.ifrequest) return
        }*/

        this.ifrequest = true
        let bstr=''
        let birthday=''
        let tepData={}
        if((document.body.clientWidth+this.getScrollWidth())>1023) {//大于1023走pc的逻辑
           bstr = String(this.premData.birthday.value)
           birthday = `${parseInt(bstr.substr(0, 3)) + 1911}-${bstr.substr(3, 2)}-${bstr.substr(-2, 2)}`
           tepData = {
            birthday: birthday,
            certificateNo: this.premData.card.value,
            certificateType: '1',
          };
        }else {
          console.log(this.premDataH5)
           bstr = String(this.premDataH5.bir.value)//"1990-09-01"
           //birthday = `${parseInt(bstr.substr(0, 3)) + 1911}-${bstr.substr(3, 2)}-${bstr.substr(-2, 2)}`
           tepData = {
            birthday: bstr,
            certificateNo: this.premDataH5.card.value,
            certificateType: '1',
          };
        }
        let [res, resp] = await Promise.all([
          this.Axios('login', tepData),
          this.Axios('getSerialNumber', {})
        ])
        this.serialNumber = resp.data.data;
        // this.accountId = res.data.data;
        this.accountId = res.data.data.id;
        this.userInfo.phone = res.data.data.phone
        this.userInfo.email = res.data.data.email
        this.ifShow = true;
        this.ifrequest = false
      } catch (error) {
        console.log(error)
        this.ifrequest = false
      }

    },
    // 登錄
    async post2Login() {
      try {
        console.log(`this.$refs.loginCodeVerify.ifPast`, this.$refs.loginCodeVerify.ifPast)
        if (this.$refs.loginCodeVerify.ifPast) {
          if((document.body.clientWidth+this.getScrollWidth())>1023) {//大于1023走pc的逻辑
            return this.$message.error('動態密碼已失效，請重發動態密碼')
          }else {
            return this.$Toast('動態密碼已失效，請重發動態密碼')
          }
        }
        if (this.$refs.loginCodeVerify.code == '') {
          if((document.body.clientWidth+this.getScrollWidth())>1023) {//大于1023走pc的逻辑
            return this.$message.error('請填寫動態密碼')
          }else {
            return this.$Toast('請填寫動態密碼')
          }
        }
        if (this.errNum == 5) {
          if((document.body.clientWidth+this.getScrollWidth())>1023) {//大于1023走pc的逻辑
            return this.$message.error('動態密碼已失效，請重發動態密碼')
          }else {
            return this.$Toast('動態密碼已失效，請重發動態密碼')
          }
        }
        let tepData = {
          serialNumber: this.serialNumber,
          accountId: this.accountId,
          otpCode: this.$refs.loginCodeVerify.code,
          otpKey: this.$refs.loginCodeVerify.otpKey,
          // ipAddr: returnCitySN["cip"],
          // ipAddr: this.ip,
        };
        let resp = await this.Axios('loginCheckOpt', tepData)
        this.ifrequest = false
        // let accountNum = this.$longData(1, 'accountNum')
        // this.$store.state.customer.ifLogin = true
        // if (!accountNum) {
        //   console.log(`not accountNum`)
        //   this.$longData(0, 'accountNum', this.premData.card.value)
        // } else {
        //   if (this.premData.card.value != accountNum) {
        //     console.log(`not a people`)
        //     this.$longData(2, 'userInfo')
        //     this.$longData(2, 'token')
        //     this.$store.commit('setLogin', false)
        //     this.$store.commit('setUserInfo', null)
        //     this.$store.commit('setRouterName', '')
        //     this.$store.commit('setRouterQuery', {})
        //     this.$longData(2, 'state')
        //     this.$longData(2, 'policyNo')
        //     this.$longData(2, 'accountCode')
        //     this.$longData(2, 'sumPremium')
        //     this.$longData(2, 'goodsId')
        //   }
        //   this.$longData(0, 'accountNum', this.premData.card.value)
        // }
        this.$longData(0, 'token', resp.data.data)
        sessionStorage.setItem('token', resp.data.data)
        await this.$store.dispatch('getUserInfo', true)

        // sessionStorage.setItem('token', resp.data.data)
        let name = JSON.parse(sessionStorage.getItem('routerName')) || this.$store.getters.getRouterName
        let query = JSON.parse(sessionStorage.getItem('query')) || this.$store.getters.getQuery
        console.log(`routerName`, name)
        console.log(`query`, query)
        if (name !== '') {
          this.$router.push({
            name,
            query,
          })
        } else {
          this.$router.push({
            name: 'home',
          });
        }
        //this.$forceUpdate()
        //this.reload()
        if((document.body.clientWidth+this.getScrollWidth())>1023) {//大于1023走pc的逻辑
            this.$message.success('登入成功')
        }else {
            this.$Toast('登入成功')
        }

      } catch (error) {
        console.log(error)
        console.log(`this.$refs.loginCodeVerify.errTime`, this.$refs.loginCodeVerify)
        this.errNum++
        if (this.errNum == 5) {
          this.$refs.loginCodeVerify.ifPast = true
          this.$refs.loginCodeVerify.ifPost = false
          console.log(`this.$refs.loginCodeVerify.ifPast`, this.$refs.loginCodeVerify.ifPast)
          this.errTime++
          console.log(`this.errTime`, this.errTime)
          if (this.errTime == 5 || this.$refs.loginCodeVerify.errTime == 6) {
            this.$message.error('動態密碼已重發多次，若您仍無法收到，請洽詢服務人員。')
            location.reload()
          }
          this.ifrequest = false
        }
      }
    },
    async checkIFneedLogout() {
      try {
        if (this.$longData(1, 'token')) {
          let res = await this.$store.commit('logOut')
          console.log(`res`, res)
          if (res.data.success) {
            // if (res.data.data) {
            return this.post2Login()
          }
          // }
        } else {
          return this.post2Login()
        }

      } catch (error) {
        console.log(error)
      }
    },
    // 獲取ip地址
    // getUserIP(onNewIP) {
    //   let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    //   let pc = new MyPeerConnection({
    //     iceServers: []
    //   });
    //   let noop = () => {
    //   };
    //   let localIPs = {};
    //   let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
    //   let iterateIP = (ip) => {
    //     if (!localIPs[ip]) onNewIP(ip);
    //     localIPs[ip] = true;
    //   };
    //   pc.createDataChannel('');
    //   pc.createOffer().then((sdp) => {
    //     sdp.sdp.split('\n').forEach(function (line) {
    //       if (line.indexOf('candidate') < 0) return;
    //       line.match(ipRegex).forEach(iterateIP);
    //     });
    //     pc.setLocalDescription(sdp, noop, noop);
    //   }).catch((reason) => {
    //   });
    //   pc.onicecandidate = (ice) => {
    //     if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    //     ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    //   };
    // }
  },
  created() {
    this.getVerifyCode()
    this.changeCode()
    // this.premData.card.value = this.$longData(1, 'accountId') || ''
  },
  mounted() {
    // console.log(`ip---sohu`, returnCitySN["cip"])
    // this.getUserIP((ip) => {
    //   this.ip = ip;
    //   console.log(`ip`, this.ip)
    // });
    // get_ip((ip)=>{
    //   this.ip = ip
    //   console.log('get_ip',ip)
    // })

    // this.$message.success('这是提示資訊')

  }
};
</script>
<style lang="scss" scoped>
@import './index0-1023.scss';
@import './index1024+.scss';
</style>
