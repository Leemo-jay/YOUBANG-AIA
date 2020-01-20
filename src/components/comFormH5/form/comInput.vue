<template>
  <div class="">
    <div v-if="!isCode">
      <div :class="{t20: (dataIndex == 'addressText' || dataIndex == 'beneficiaryAddressText')}" class="formDiv">
        <span v-if="dataIndex != 'addressText' && dataIndex != 'beneficiaryAddressText'" :class="{required: required}"
              class="titleFont">{{title}}</span>
        <span class="rihgtThis" :class="{disabledCom: disabled}">
          <span v-if='unit' class="unit">{{unit}}</span>
          <input :class="{leng100: !unit,disabledCom1: disabled,reda: showError && required,fffBG: $route.name == 'productDetail'}" :type="type" ref="focus"
                 @focus="changeFocus()" @blur="hideX" :disabled="disabled" :placeholder="grey || placeholder" @input="changeValue($event.target.value)"
                 :value="value" class="formInput" />
          <div :class="{start : isFocus,end: isFocus === false,leng100: !unit}" class="bgTest"></div>
          <!-- {{errorFinal}} -->
          <!-- {{widget}}
            {{errorDesc}} -->
          <!--          {{dataIndex}}-->
          <!-- <img @click="clearInput" v-show="showX" class="InputImg" src="@/assets/inputDel.png" /> -->
          <div :class="{red: isTb}" class="tip">{{tip}}</div>
          <!-- {{showError}} -->
          <div class="redError tip" v-if="CITYTHIS || (showError && (required || OQ))">{{errorFinal ||  errorDesc || placeholder}}</div>
        </span>
      </div>
      <div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
    </div>
    <div v-else>
      <div class="formDiv">
        <span :class="{required: required}" class="titleFont">{{title}}</span>
        <span class="rihgtThis">
          <input :class="{reda: showError && required}" type="number" ref="focus" @focus="changeFocus()" @blur="hideX"
                 :disabled="disabled" :placeholder="grey || placeholder" @input="changeValue($event.target.value)" :value="value"
                 class="formInput" />
          <div :class="{start : isFocus,end: isFocus === false}" class="bgTest"></div>
          <!-- <div class="redError tip" v-if="showError && required">{{errorFinal ||  errorDesc || placeholder}}</div> -->
        </span>
      </div>
      <div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
    </div>

  </div>
</template>
<script>
  import regObj from '@/commonJs/regRule.js'
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
        default: false
      },
      OQ: {
        type: Boolean,
        required: false,
        default: false
      },
      showError: {
        type: Boolean,
        required: false,
        default: false
      },
      isSp: {
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
      unit: {
        required: false,
      },
      isTb: {
        required: false,
      },
      dataIndex: {
        required: false,
      },
      ruleArr: {
        required: false,
      },
      widget: {
        required: false,
      },
      jobLevel: {
        required: false,
      },

    },
    data() {
      return {
        isFocus: '',
        showX: false,
        autofocus: false,
        placeholder: '',
        errorFinal: ''
      }
    },
    watch: {
      value: {
        handler: function() {
          this.$emit("update:showError", false)
        },
      },
      showError: {
        handler: function(value) {
          if(value){
            // alert(this.errorFinal || this.errorDesc || this.placeholder)
            this.$emit("update:widget", this.errorFinal || this.errorDesc || this.placeholder)
          }
        },
      },
      errorFinal: {
        handler: function() {
          this.$emit("update:widget", this.errorFinal)
        },
      }
    },
    computed: {
      CITYTHIS() {
        // if(this)
        return (this.dataIndex == 'addressText' || this.dataIndex == 'beneficiaryAddressText') && this.jobLevel === true
      }
    },
    created() {
      this.placeholder = '請填寫' + this.title;
      if (this.dataIndex == 'personalAsset') {
        this.type = 'number'
      }
    },
    methods: {
      changeFocus() {
        this.showX = true
        this.isFocus = true;
      },
      changeError(value) {
        this.$emit("update:showError", value)
        // alert(this.errorFinal)
        if (value && this.$route.name == 'tb' && this.required) {
          this.$emit("update:widget", this.errorFinal)
          let self = this;
          let tabIndex = this.$longData(1, 'tabIndex');
          let obj = {
            0: 'proFirTab',
            1: 'proSecTab',
            2: 'proThrTab',
            3: 'proPayTab',
          }
          let tep = {
            "subno": this.$longData(1,'numADD'),
            "orderNo": self.$longData(1, 'orderNum'),
            "tabNo": obj[tabIndex],
            "checkList": [{
              "functionCode": self.dataIndex,
              "functionName": self.title,
              "checkFaceMsg": self.errorFinal || self.errorDesc || self.placeholder,
              //"checkFaceMsg": functionName,
              "checkMsg": this.dataIndex == 'personalAsset' ? '資產總額未填寫或填寫非數字' : '',
            }]

          }
          // this.Axios('addCheckRecord', tep)

        }
      },
      changeValue: function(name) {
        if(this.isCode){
          let changeVALR = name.substr(0,4)
          this.$emit("update:value", changeVALR)
          // changeVALR = checkNu(this.value)
          // console.error(this.value)
          return
        }
        if (this.dataIndex == 'beneficiaryName') {
          let changeVALR = name.replace(/\d/g, "").substr(0,200)
          this.$emit("update:value", changeVALR)
          // changeVALR = checkNu(this.value)
          // console.error(this.value)
          return
        }
        if (this.dataIndex == 'addressText') {
          let changeVALR = name.substr(0,50)
          this.$emit("update:value", changeVALR)
          return
        }

        if (this.dataIndex == 'card' || this.dataIndex == 'beneficiaryIdNo' || this.dataIndex == 'certificateNo' ) {
          let changeVALR = name.substr(0,20)
          this.$emit("update:value", changeVALR)
          // changeVALR = checkNu(this.value)
          // console.error(this.value)
          return
        }

        if (this.dataIndex == 'name' || this.dataIndex == 'beneficiaryName') {
          let changeVALR = name.replace(/\d/g, "")
          this.$emit("update:value", changeVALR)
          // changeVALR = checkNu(this.value)
          // console.error(this.value)
          return
        }
        if (this.dataIndex == 'personalAsset' || this.dataIndex == 'familyIncome' || this.dataIndex == 'personalIncome') {
          function checkNu(value) {
            //判断只能是数字3位且小数最多一位
            value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
            value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   /^[0-9]{1,20}$/
            var index = value.indexOf(".");
            if (index == -1 && value.length > 6) {
              value = value.split('');
              value.splice(6, value.length - 6);
              value = value.join('')
            }
            if (index != -1 && value.length > 6) {
              value = value.split('');
              // value.splice(6,value.length-6);
              value = [...value.slice(0, 6), ...['.'], ...value.slice(index, value.length)]
              value = value.join('')
            }
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入1个小数
            //				value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
            return value

          }
          // console.log(checkNu(this.value))
          this.$emit("update:value", checkNu(name))
          return
          // changeVALR = checkNu(this.value)
        }
        if (this.dataIndex == 'height' || this.dataIndex == 'weight') {
          function checkNu(value) {
            //判断只能是数字3位且小数最多一位
            value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
            value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   /^[0-9]{1,20}$/
            var index = value.indexOf(".");
            if (index == -1 && value.length > 3) {
              value = value.split('');
              value.splice(3, value.length - 3);
              value = value.join('')
            }
            if (index != -1 && value.length > 3) {
              value = value.split('');
              // value.splice(6,value.length-6);
              value = [...value.slice(0, 3), ...['.'], ...value.slice(index, value.length)]
              value = value.join('')
            }
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入1个小数
            //				value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
            return value

          }

          this.$emit("update:value", checkNu(name))
          // changeVALR = checkNu(this.value)
          return
        }
        if (this.dataIndex == 'benefitsRate') {
          function checkNu(value) {
            value = value + ''
            value = value.replace(/[^\d]/g, ""); //清除“数字”和“.”以外的字符
            value = value.substr(0, 3)
            return value
          }

          this.$emit("update:value", checkNu(name))
          // changeVALR = checkNu(this.value)
          // console.error(this.value)
          return
        }
        this.$emit("update:value", name)

      },
      clearInput: function() {
        // alert(1)
        this.$emit("update:value", '')
        this.showX = false;
      },
      hideX: function() {
        let changeVALR = ''
        this.isFocus = false;
        // 解决ios 上虚拟键盘消失页面不回弹问题
        document.body.scrollTop = document.body.scrollTop - 1;


        if (this.isSp && this.value) {
          let tep = {
            referrerCode: this.value
          }
          this.Axios('checkReferrerCode', tep)
            .then(res => {

            })
            .catch(res => {

            })
        }
        let self = this;

        this.showX = false;
        if (!this.value) {
          this.changeError(true)
          // if()
          try {
            this.errorFinal = this.ruleArr[0].message
          } catch (e) {
            //TODO handle the exception
            this.errorFinal = this.placeholder
          }

          return
        } else {
          // 有值的时候判断是否有全角
          for (var i = this.value.length - 1; i >= 0; i--) {
            let unicode = this.value.charCodeAt(i);
            if (unicode > 65280 && unicode < 65375) {
              this.$Toast('不能填寫全形字填寫半形字')
              this.$emit("update:value", this.value.substr(0, i))
            }
          }
          this.changeError(false)
        }
        if(!changeVALR) changeVALR = this.value
        if (this.ruleArr) {
          for (let i = 0; i < this.ruleArr.length; i++) {
            let item = this.ruleArr[i];
            let reg = regObj[item.name];
            if (reg) {
              showError = !reg.test(changeVALR)
              // if(showError)
            } else {
              //js校验input
              let OtherObj = {
                'notHao': () => {
                  let isExit = changeVALR.indexOf('號') != -1;
                  return isExit
                },
                'moreRate': () => {
                  let reg1 = /^(([0-9]{1,2})(\.\d{1,2})?)$|^100$/;
                  let isExit = reg1.test(changeVALR);
                  return changeVALR != 0 && isExit
                },
                'heightRanage': () => {
                  return changeVALR <= 202 && changeVALR >= 143
                },
                'moreLimit': () => {
                  return changeVALR.length <= 50
                },
                'littleLimit': () => {
                  return changeVALR.length >= 2
                },

                'not2English': () => {
                  return changeVALR.length >= 2
                },
                'nameMoreLimit': () => {
                  return changeVALR.length <= 200
                },
                'idCard': () => {
                  const checkIdcard = function(value) {
                    let map1 = new Map([
                      ['A', 10],
                      ['B', 11],
                      ['C', 12],
                      ['D', 13],
                      ['E', 14],
                      ['F', 15],
                      ['G', 16],
                      ['H', 17],
                      ['J', 18],
                      ['K', 19],
                      ['L', 20],
                      ['M', 21],
                      ['N', 22],
                      ['P', 23],
                      ['Q', 24],
                      ['R', 25],
                      ['S', 26],
                      ['T', 27],
                      ['U', 28],
                      ['V', 29],
                      ['X', 30],
                      ['W', 32],
                      ['Y', 31],
                      ['Z', 33],
                      ['I', 34],
                      ['O', 35]
                    ])
                    let code = map1.get(value.substr(0, 1))
                    let sex = parseInt(value.substr(1, 1))
                    let ten = parseInt((code / 10) % 10)
                    let one = code % 10
                    let totalNum = ten
                    totalNum += one * 9
                    totalNum += sex * 8
                    let number = 7
                    for (let i = 2; i < 9; i++) {
                      if (number < 1) {
                        break
                      }
                      totalNum += parseInt(value.substr(i, 1)) * number
                      number--
                    }
                    let idcardLastNum = parseInt(value.substr(9, 1))
                    let lastNum = totalNum % 10
                    if (lastNum != 0) {
                      lastNum = 10 - lastNum
                    }
                    if (lastNum == idcardLastNum) {
                      // alert('正确的卡号')
                      return true
                    } else {
                      // alert('错误的卡号')
                      return false
                    }
                  }
                  return checkIdcard(changeVALR)
                },
                'notNull': () => {
                  return changeVALR.length >0
                },
                'name': () => {
                  const strleng = str => {
                    var len = 0
                    for (var i = 0; i < str.length; i++) {
                      var c = str.charCodeAt(i)
                      //单字节加1
                      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                        len++
                      } else {
                        len += 2
                      }
                    }
                    return len
                  }
                  return strleng(changeVALR) >= 4 && strleng(changeVALR) <= 200
                },
              }
              showError = !OtherObj[item.name]()
            }
            this.changeError(showError)
            this.errorFinal = item.message
            if (showError) return

          }

          return
        }
        // ruleArr:[{ name : 'notNull', message:'請填寫家庭年收入'},{ name : 'notNumber', message: '請正確填寫家庭年收入'}]
        // 没有正则 不往下走
        if (!this.reg) return
        let reg = '';
        let showError = false;
        reg = regObj[this.reg];
        // alert(this.reg)
        if (reg) {
          showError = !reg.test(this.value)
          // if(showError)
        } else {
          let OtherObj = {
            'areaDetail': () => {
              let isExit = changeVALR.indexOf('號') != -1;
              return changeVALR.length >= 2 && changeVALR.length <= 50 && isExit
            },
            'rate': () => {
              let reg = /^(([0-9]{1,2})(\.\d{1,2})?)$|^100$/;
              let isExit = reg.test(changeVALR);
              return changeVALR != 0 && isExit
            },
            'height': () => {
              let reg = /^\d{1,100}$/;
              let isExit = reg.test(changeVALR);
              return changeVALR != 0 && changeVALR <= 202 && changeVALR >= 143
            },
            'idCard': () => {
              const checkIdcard = function(value) {
                let map1 = new Map([
                  ['A', 10],
                  ['B', 11],
                  ['C', 12],
                  ['D', 13],
                  ['E', 14],
                  ['F', 15],
                  ['G', 16],
                  ['H', 17],
                  ['J', 18],
                  ['K', 19],
                  ['L', 20],
                  ['M', 21],
                  ['N', 22],
                  ['P', 23],
                  ['Q', 24],
                  ['R', 25],
                  ['S', 26],
                  ['T', 27],
                  ['U', 28],
                  ['V', 29],
                  ['X', 30],
                  ['W', 32],
                  ['Y', 31],
                  ['Z', 33],
                  ['I', 34],
                  ['O', 35]
                ])
                let code = map1.get(value.substr(0, 1))
                let sex = parseInt(value.substr(1, 1))
                let ten = parseInt((code / 10) % 10)
                let one = code % 10
                let totalNum = ten
                totalNum += one * 9
                totalNum += sex * 8
                let number = 7
                for (let i = 2; i < 9; i++) {
                  if (number < 1) {
                    break
                  }
                  totalNum += parseInt(value.substr(i, 1)) * number
                  number--
                }
                let idcardLastNum = parseInt(value.substr(9, 1))
                let lastNum = totalNum % 10
                if (lastNum != 0) {
                  lastNum = 10 - lastNum
                }
                if (lastNum == idcardLastNum) {
                  // alert('正确的卡号')
                  return true
                } else {
                  // alert('错误的卡号')
                  return false
                }
              }
              return checkIdcard(changeVALR)
            }


          }
          showError = !OtherObj[this.reg]()
        }
        this.changeError(showError)
        this.errorFinal = this.errorDesc
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../form.scss';

  .InputImg {
    position: absolute !important;
    top: 25px;
    right: 52px !important;
  }

  .red {
    color: #d81f49;
  }

  .disabledCom {
    margin-top: 10px;
    background: #e1e1e1 !important;
  }

  .disabledCom1 {

    background: transparent;
    position: relative;
    top: -10px;
    left: 10px;
    border-bottom: 0;

    // background: red;
  }
  .disabledCom{
    box-sizing: border-box;
    height: 52px;
  }
</style>
