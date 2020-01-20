<template>
  <div class="">
    <div class="formDiv">
      <span :class="{required: required}" class="titleFont">{{title}}</span>
      <span class="rihgtThis">
				<input :type="type" ref="focus" @focus="changeFocus()" @blur="hideX" :disabled="disabled" :placeholder="grey || placeholder" @input="changeValue($event.target.value)" :value="value" class="formInput" />
				<div :class="{start : isFocus,end: !isFocus &&!showError,bgError:!isFocus&&showError&&required,isfocus:isFocus}" class="bgTest"></div>
        <!-- <img @click="clearInput" v-show="showX" class="selectImg" src="@/assets/inputDel.png" /> -->
				<div class="tip">{{tip}}</div>
				<div class="redError tip" v-if="showError">{{errorFinal || errorDesc || placeholder}}</div>
        <!-- <span class="dateIcon" @click="showPicker"></span> -->
        <!-- <span class="dateIcon" :style="{'top':top}"></span> -->
			</span>
      <div class="rihgtThis1" v-if="ifshowPick" id="selectreleasedate">
        <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px',marginTop: '0px'}" class="pickbox">
          <!-- <span class="closeBtn" @click="closePicker">關閉</span> -->
          <!-- <a-calendar :validRange="validRange" :defaultValue="defaultY" :fullscreen="false" :mode="mode" @panelChange="panelChange" @select="select" /> -->
          <!-- <p>test</p> -->
          <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeMonth">
          </Calendar>
        </div>
      </div>
    </div>
    <div v-if='modefine' @click="$toastStop" class="disabledCom"></div>

  </div>
</template>
<script>
  import regObj from '@/commonJs/regRule.js'
  import Calendar from 'vue-calendar-component'
  import {
    getAge,
    getTwAge,
    judgeyear,
    timeOperation,
    formatmyyear,
    IEVersion
  } from '@/commonJs/common.js'
  import moment from "moment"
  export default {
    name: 'comInput',
    props: {
      title: {
        type: String,
        required: false,
        default: '打开App, 浏览更多'
      },
      errorDesc: {
        type: String,
        required: false
      },
      required: {
        type: Boolean,
        required: false,
        default: true
      },
      showError: {
        type: Boolean,
        required: false,
        default: false
      },
      isCode: {
        type: Boolean,
        required: false,
        default: false
      },
      type: {
        required: false,
        default: false
      },
      value: {
        required: false
      },
      isRight: {
        required: false,
        default: false
      },
      tip: {
        required: false,
      },
      grey: {
        required: false,
      },
      disabled: {
        required: false,
        default: false
      },
      isHave: {
        required: false,
        default: true
      },
      reg: {
        required: false,
        default: null
      },
      modefine: {
        required: false,
        default: false
      },
      minAge: {
        required: false,
      },
      maxAge: {
        required: false,
      },
      name: {
        required: false,
        default: ''
      },
      testFree: {
        type: Boolean,
        required: false,
        default: false
      },
    },
    components: {
      Calendar
    },
    data() {
      return {
        top: '2.5rem',
        isFocus: '',
        showX: false,
        autofocus: false,
        placeholder: '',
        errorFinal: '',
        ifshowPick: false,
        validRange: [moment(timeOperation('year', -100)), moment(timeOperation('year', -20))],
        defaultY: '',
        mode: 'month',
        headerY: () => moment(timeOperation('year', -1911))

      }
    },
    watch: {
      // ifshowPick: {
      // 	handler: function (value) {
      // 		if (value) {
      // 			console.log(`im true now`)
      // 			this.$nextTick(() => {
      // 				let doc = document.querySelector('.formDiv .ant-select-selection-selected-value')
      // 				doc.innerText = `${this.lt100(parseInt(doc.innerText.replace('年', '')) - 1911 - 20)}年`
      // 				let ybtn = document.querySelector('.formDiv .ant-select-selection')
      // 				let downbtn = document.querySelector('.formDiv .ant-select-arrow')
      // 				ybtn.addEventListener('click', () => {
      // 					// console.log(`im click now`)
      // 					let timer = setTimeout(() => {
      // 						let arr = document.querySelectorAll('.formDiv .ant-select-dropdown-menu-item')
      // 						console.log(`arr1`, arr.length)
      // 						arr.forEach(el => {
      // 							if ((parseInt(el.innerText.replace('年', '')) - 1911) > 0) {
      // 								el.innerText = `${this.lt100(parseInt(el.innerText.replace('年', '')) - 1911)}年`
      // 							} else {
      // 								return
      // 							}
      // 						})
      // 						clearTimeout(timer)
      // 					}, 0)
      // 				})
      // 				downbtn.addEventListener('click', () => {
      // 					// console.log(`im click now`)
      // 					let timer = setTimeout(() => {
      // 						let arr = document.querySelectorAll('.formDiv .ant-select-dropdown-menu-item')
      // 						arr.forEach(el => {
      // 							if ((parseInt(el.innerText.replace('年', '')) - 1911) > 0) {
      // 								el.innerText = `${this.lt100(parseInt(el.innerText.replace('年', '')) - 1911)}年`
      // 							} else {
      // 								return
      // 							}
      // 						})
      // 						clearTimeout(timer)
      // 					}, 0)
      // 				})
      // 			})
      // 		}
      // 	},
      // 	immediate: true
      // }
      "ifshowPick": {
        handler: function (val) {
          if (val) {
            let doc = document.querySelector('.wh_content_li')
            console.log(`doc----------------------`, doc)
          }
        },
        immediate: true
      },
      "errorFinal": {
        handler: function (val) {
          console.log(`+++____++++____+++++____+++++`)
          if (this.type == 'loginIn') {
            this.$emit('update:errorDesc', this.errorFinal)
          }
        }
      }
    },
    created() {
      this.placeholder = '請填寫' + this.title;
      this.defaultY = moment(timeOperation('year', -1911))
      console.log(`______________________________`, this.$router)
      if ((IEVersion() > 0 || IEVersion() == 'edge') && this.$router.currentRoute.name == 'register') {
        this.top = '8.25rem !important'
      } else if (this.$router.currentRoute.name == 'productDetail') {
        this.top = '0.3rem !important'
      } else if (this.$router.currentRoute.name == 'insure') {
        this.top = '1.5rem !important'
      }
    },
    methods: {
      judgeTime(data) {
        console.log(`data---0000000000000000000000000000000000000000`, data)
        // let date = data.toString();
        // let year = date.substring(0, 4);
        // let month = date.substring(4, 6);
        // let day = date.substring(6, 8);
        // let d1 = new Date(year + '/' + month + '/' + day);
        let d1 = new Date(data.replace('-', '/'))
        let dd = new Date();
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;
        let d = dd.getDate();
        let d2 = new Date(y + '/' + m + '/' + d);
        let iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
        return iday;
      },
      clickDay(data) {
        console.log(`選擇日期：`, data) //選中某天
      },
      changeMonth(data) {
        console.log(`選擇月份`, data) //左右点击切换月份
      },
      changeFocus() {
        this.isFocus = true;
      },
      changeError(value) {
        this.$emit('update:errorDesc', this.errorFinal)
        this.$emit("update:showError", value)
      },
      changeValue: function (name) {
        name = name.replace(/[^\w\-\_\.\']/ig, "")
        if (name) {
          this.showX = true;
        } else {
          this.changeError(false)
          this.showX = false;
        };
        //console.log(name)
        this.$emit("update:value", name)
      },
      clearInput: function () {
        // alert(1)
        this.$emit("update:value", '')
        this.showX = false;
      },
      hideX: function () {
        if (this.value) {
          this.value = this.value.replace(/[^\w\-\_\.\']/ig, "")
        }
        console.log(`this.value`, this.value)
        this.isFocus = false;
        // 解决ios 上虚拟键盘消失頁面不回弹问题
        document.body.scrollTop = document.body.scrollTop - 1;
        this.showX = false;
        if (!this.value) {
          if (this.name && this.name == 'beneficiaryBirthday') {
            console.log(`beneficiaryBirthday`)
            this.errorFinal = '請填寫受益人生日'
          } else {
            if (this.type == 'register') {
              // this.errorFinal = '請填寫被保險人生日'
              this.errorFinal = '請填寫生日'
            } else if (this.type == 'loginIn') {
              this.errorFinal = '請填寫生日'
            } else {
              this.errorFinal = '不可為空'
            }
          }
          this.changeError(true)
          return
        } else {
          this.errorFinal = ''
          this.changeError(false)
        }
        // if (!this.reg) return
        let reg = regObj[this.reg];
        // let validRange = [moment(timeOperation('year', -100)), moment(timeOperation('year', -20))]
        // console.log(`validRange`, validRange)
        // let arr = validRange.map(el => {
        // 	return {
        // 		year: el.getFullYear(),
        // 		month: el.getMonth() + 1,
        // 		date: el.getDate()
        // 	}
        // })
        // let str = String(this.value)
        // let bol = true
        // if (str.length !== 7) {
        // 	bol = false
        // } else {
        // 	let y = str.substr(0, 3)
        // 	let md = str.substr(3, )
        // 	let reg = /(0?[1-9]|1[0-2])((0?[1-9])|((1|2)[0-9])|30|31)/
        // 	if (!rer.test(md)) {
        // 		bol = false
        // 	} else if () { }
        // }
        // let bol = this.testValue()
        // if (!bol) {

        if (!reg.test(this.value)) {
          console.log(`not right`)
          let rul = /^(([0]{2}[1-9])|([0][1-9][0-9])|([1-9][0-9]{2}))([0][1-9]|[1][0-2])(([0][1-9])|(([1]|[2])[0-9])|30|31)$/
          let rul1 = /^[0-9]{7}$/
          if (!rul.test(this.value)) {
            if (String(this.value).length == 7 && rul1.test(this.value)) {
              let cachMonth = parseInt(String(this.value).substr(3, 2))
              let day = parseInt(String(this.value).substr(-2, 2))
              if (
                (cachMonth == 2 && day > 28) ||
                ((cachMonth == 4 || cachMonth == 6 || cachMonth == 9 || cachMonth == 11) && day > 30) ||
                ((cachMonth == 1 || cachMonth == 3 || cachMonth == 5 || cachMonth == 7 || cachMonth == 8 || cachMonth == 10 || cachMonth == 12) && day > 31) || (cachMonth > 12 || day > 31)
              ) {
                this.errorFinal = '日期不存在'
                this.changeError(true)
              }
            } else {
              this.errorFinal = '請輸入有效的格式 (YYYMMDD)'
            }
          } else {
            console.log(`1233231`)
            this.errorFinal = this.errorDesc || this.placeholder
          }
          if (this.type == 'loginIn') {
            this.$emit('update:errorDesc', this.errorFinal)
          }
          this.changeError(true)
          return
        } else {
          this.errorFinal = ''
          if (this.type == 'loginIn') {
            this.$emit('update:errorDesc', this.errorFinal)
          }
          this.changeError(false)
        }
        let rul = /^(([0]{2}[1-9])|([0][1-9][0-9])|([1-9][0-9]{2}))([0][1-9]|[1][0-2])(([0][1-9])|(([1]|[2])[0-9])|30|31)$/
        if (String(this.value).length == 7 && rul.test(this.value)) {
          let year = parseInt(String(this.value).substr(0, 3)) + 1911
          let month = parseInt(String(this.value).substr(3, 2)) - 1
          let day = parseInt(String(this.value).substr(-2, 2))
          let age = getTwAge(new Date(year, month, day), new Date())
          let bol = judgeyear(year) // 是否闰年
          console.log(`年龄为：`, age)
          console.log(`闰年：`, year, bol)
          console.log(`月-日：`, month, day)
          let cachMonth = month + 1
          console.log(`月份：`, month, cachMonth)
          console.log(`日期：`, day)
          if (bol) {
            if (cachMonth == 2 && day > 29) {
              this.errorFinal = '日期不存在'
              this.changeError(true)
              return
            } else {
              if ((cachMonth == 4 || cachMonth == 6 || cachMonth == 9 || cachMonth == 11) && day > 30) {
                this.errorFinal = '日期不存在'
                this.changeError(true)
                return
              } else {
                this.errorFinal = this.errorDesc || this.placeholder
                this.changeError(false)
              }
            }
          } else {
            if (cachMonth == 2 && day > 28) {
              this.errorFinal = '日期不存在'
              this.changeError(true)
              return
            } else {
              if ((cachMonth == 4 || cachMonth == 6 || cachMonth == 9 || cachMonth == 11) && day > 30) {
                this.errorFinal = '日期不存在'
                this.changeError(true)
                return
              } else {
                this.errorFinal = this.errorDesc || this.placeholder
                this.changeError(false)
              }
            }
          }
          if (this.minAge && age < this.minAge) {
            this.errorFinal = this.errorDesc
            this.changeError(true)
            return
          } else if (this.minAge && this.maxAge) {
            console.log(`shisuan`)
            if (age < (parseInt(this.minAge.replace("-", ""))) || age > (parseInt(this.maxAge.replace("-", "")))) {
              this.errorFinal = '很抱歉,您填寫的生日已超過商品投保年齡的限制'
              this.changeError(true)
              return
            } else {
              this.errorFinal = ''
              this.changeError(false)
              return
            }
          } else {
            if (this.name && this.name == 'beneficiaryBirthday' && rul.test(this.value)) {
              console.log(`123`)
              let arr = moment().format('YYYY-MM-DD').split('-')
              console.log(`date`, arr, `${arr[0]}-${arr[1]}-${arr[2]}`)
              // let bol1 = moment(`${arr[0]}-${arr[1]}-${arr[2]}`).isAfter(moment(`${year}-${month + 1}-${day}`));
              let bol1 = this.judgeTime(`${year}-${month + 1}-${day}`)
              console.log(`bol------------11111----------------`, bol1)
              console.log(`age------------11111----------------`, age)
              if (bol1 < 0 || age > 100) {
                console.log(`false`)
                this.errorFinal = '很抱歉,您填寫的生日已超過商品受益人年齡的限制'
                this.changeError(true)
              } else {
                console.log(`not `)
                this.errorFinal = ''
                this.changeError(false)
              }
              return
            } else if (this.type == 'register') {
              console.log(`this is register`)
              let age = getAge(`${year}-${month + 1}-${day}`)
              console.log(`register age: `, age)
              if (age < 20) {
                // this.errorFinal = '申請網路投保會員須年滿20足歲'
                // this.errorFinal = '須年滿20歲才可成為會員，不可選擇小於實歲小於20歲的生日'
                this.errorFinal = '須年滿20歲才可申請為網路投保會員'
                this.changeError(true)
              } else {
                this.errorFinal = this.errorDesc || this.placeholder
                this.changeError(false)
              }
            } else {
              console.log(`321`)
              this.changeError(false)
              return
            }
          }

        } else {

        }
      },
      // 显示時間组件
      showPicker() {
        if (this.testFree) {
          console.log(`试算頁面`)
          this.ifshowPick = true
        }
      },
      closePicker() {
        this.ifshowPick = false
      },
      panelChange(moment, mode) {
        console.log(`moment`, moment)
        console.log(`mode`, mode)
      },
      select(date) {
        console.log(`date`, date)
      },
      // testValue() {
      // 	let validRange = [moment(timeOperation('year', -100)), moment(timeOperation('year', -20))]
      // 	console.log(`validRange`, validRange)
      // 	if (String(this.value.length).length !== 7) {
      // 		return false
      // 	} else if () {

      // 	}
      // }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../form.scss';
  .formDiv {
    position: relative;
    margin: 3.5rem 0;
    .dateIcon {
      position: absolute;
      // bottom: 45px;
      top: 40px;
      right: 0;
      height: 20px;
      width: 20px;
      background: url('../../../assets/youbang/time.png') no-repeat center / 100%
      100%;
    }
  }
  .rihgtThis1 {
    width: 100%;
    .pickbox {
      margin-top: 0px;
      position: relative;
    }
    .pikerDate {
      margin-top: 10px;
      width: 100%;
      /deep/ .ant-input {
        padding-left: 0;
        border-style: none !important;
        border-bottom: 1px solid #e4e4e4 !important;
      }
      // /deep/ .ant-select {
      //   margin-right: 10px;
      // }
      /deep/ .ant-fullcalendar-year-select {
        margin-right: 10px !important;
      }
    }
    .closeBtn {
      position: absolute;
      top: 14px;
      left: 10px;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      color: skyblue;
    }
  }
</style>
<style>
  #selectreleasedate .wh_content_all {
    background-color: #fff;
  }
  #selectreleasedate .wh_top_changge .wh_jiantou1 {
    /* display: none; */
    border-top: 2px solid #aaa;
    border-left: 2px solid #aaa;
  }
  #selectreleasedate .wh_top_changge .wh_jiantou2 {
    /* display: none; */
    border-top: 2px solid #aaa;
    border-right: 2px solid #aaa;
  }
  #selectreleasedate .wh_top_changge .wh_content_li {
    color: #333333;
  }
  #selectreleasedate .wh_content {
    /*padding: 1.2rem 0;*/
    /*border-top: 1px solid rgba(0,0,0,0.05);*/
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    display: -moz-flex;
    display: -webkit-flex;
    justify-content: space-around;
  }
  #selectreleasedate .wh_content .wh_content_item {
    color: #333333;
  }
</style>

