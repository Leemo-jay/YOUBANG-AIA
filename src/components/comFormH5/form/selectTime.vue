<template>
  <div class="">
    <div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
    <div v-if="cansee && isYX" class="canSee"></div>
    <Datetime ref='date' :cancel-text='Clear' :confirm-text="Done" month-row="{value}月" day-row="{value}日"
      :default-selected-value="defaultValue" @on-hide="reset" @on-show="changeInnerHtml" v-model="valueData" :start-date="startDate"
      :end-date='endDate'>
      <!-- <Datetime ref='date' month-row="{value}月" day-row="{value}日" :default-selected-value="defaultValue" @on-hide="reset"
      @on-show="changeInnerHtml" v-model="value" :start-date="startDate" :end-date='endDate'> -->
      <slot>
        <div id="aa" class="formDiv" :class="{ISSS: $route.name == 'productDetail' }">
          <span class="titleFont">{{title}}</span>
          <span class="rihgtThis" :class="{daw: $route.name == 'productDetail'}">
            <input :class="{reda: showError && this.$route.name != 'productDetail',fffBG: $route.name == 'productDetail'}"
              :type="type" ref="focus" :disabled="true" :placeholder="grey || placeholder" :value="mingguoValue" class="formInput leng100" />
            <img class="selectImg selectImg12" :class="{dawwr: this.$route.name == 'productDetail'}" style="height: 1.25rem!important;width: auto;"
              src="@/assets/youbang/time.png" />
            <div class="tip">{{tip}}</div>
            <div class="redError" v-if="showError && value && this.$route.name == 'tb'">{{errorMsg1 || errorDesc || placeholder}}</div>
            <div class="redError" v-if="showError && !value && this.$route.name == 'tb'">{{errorDesc || placeholder}}</div>
            <div class="redError" v-if="showError && !value && this.$route.name != 'tb' && this.$route.name != 'productDetail'">{{errorDesc || placeholder}}</div>
            <div class="redError" v-if="showError && value && this.$route.name != 'tb' && this.$route.name != 'productDetail'">{{errorMsg1 || errorDesc || placeholder}}</div>
          </span>
        </div>
      </slot>
    </Datetime>
    <!-- </div> -->
  </div>
</template>
<script>
  import {
    getAge,
    getAge1,
    timeOperation,
    formatmyyear
  } from '@/commonJs/common.js'
  import {
      Toast
  } from 'mint-ui';
  import {
    Datetime
  } from 'vux'
  export default {
    components: {
      Datetime
    },
    name: 'comTime',
    props: {
      title: {
        type: String,
        required: false,
        default: '打开App, 浏览更多'
      },
      errorDesc: {
        type: String,
        required: false,
        default: '来啦老弟'
      },
      showError: {
        type: Boolean,
        required: false,
        default: false
      },
      widget: {
        required: false,
      },
      tip: {
        required: false,
      },
      grey: {
        required: false,
      },
      type: {
        required: false,
        default: false
      },

      value: {
        required: false,
        default: ''
      },
      isSome: {
        required: false,
        default: false
      },
      minYear: {
        required: false,
      },
      name: {
        required: false,
      },
      errorMsg1: {
        required: false,
      },
      maxYear: {
        required: false,
      },
      modefine: {
        required: false,
        default: false
      },
      isHave: {
        required: false,
        default: false
      },
      defaultValue: {
        required: false,
        default: ''
      },
      isYX: {
        required: false,
        default: false
      },
      isym: {
        required: false,
        default: false
      },
      isRegister: {
        required: false,
        default: false
      },

    },
    data() {
      return {
        isSelect: true,
        IsTrue: false,
        isShow: false,
        autofocus: false,
        minYearL: 0,
        placeholder: '',
        cansee: false,
        inder: '',
        Clear: 'Clear',
        Done: 'Done',
        valueData:this.value
      }
    },
    // this.$emit("update:widget", this.errorFinal ||  this.errorDesc || this.placeholder)
    watch: {
      value :{
        handler: function(value) {
          // console.log(value)
        }
      },


      showError: {
        handler: function(value) {
          if (this.value) {
            this.$emit("update:widget", this.errorMsg1 || this.errorDesc || this.placeholder)
          } else {
            this.$emit("update:widget", this.errorDesc || this.placeholder)
          }

        },
        immediate: true
      },
      valueComp:{
        handler: function(value) {
          alert(value)
        },
        deep: true
      },
      valueData: {
        handler: function(value) {
          value=this.valueData
          if (value) {
            this.$emit("update:showError", false)
          }
          this.$emit('update:value', value)
          if (this.isRegister) {
            if (getAge1(value) > -this.minYear || getAge1(value) < -this.maxYear) {
              this.$emit("update:showError", true)
              this.$emit("update:widget", this.errorMsg1 || this.errorDesc || this.placeholder)
            } else {

            }
          } else {
            if (getAge(value) > -this.minYear || getAge(value) < -this.maxYear) {
              this.$emit("update:showError", true)
              this.$emit("update:widget", this.errorMsg1 || this.errorDesc || this.placeholder)
            } else {

            }
          }
        },
        deep:true
      }
    },
    computed:{
      valueComp:function () {
        return this.value
      }
    },
    created() {
      this.placeholder = '請選擇' + this.title;
      if (this.isAndroid()) {
        this.Clear = '取消'
        this.Done = '完成'
      }
    },
    methods: {
      isAndroid() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          return true;
        }
        return false
      },
      lengthO(value) {
        let length = (value + '').length;
        let obj = {
          1: '00',
          2: '0',
          3: '',
        }
        return obj[length]
      },
      watchHtml() {
        let length = document.getElementsByClassName('dp-container').length;
        for (var i = 0; i < length; i++) {
          if (document.getElementsByClassName('dp-container')[i].style.display == 'block') {
            let lengthS = document.getElementsByClassName('dp-container')[i].getElementsByClassName(
              "scroller-item-selected").length
            let result = ''
            for (var j = 0; j < lengthS; j++) {
              result =
                `${result} ${document.getElementsByClassName('dp-container')[i].getElementsByClassName("scroller-item-selected")[j].innerHTML}`
            }
            var css = function(t, s) {
              s = document.createElement('style');
              s.innerText = t;
              document.body.appendChild(s);
            };

            css(`.dp-container:after{content: \'${result}\'}`);
          }

        }
      },
      changeInnerHtml() {
        let self = this;
        this.cansee = true;
        if (this.isYX) return
        this.$nextTick(() => {
          let thisContainer = document.querySelectorAll(".dp-container");
          var index = -1;
          for (let i = 0; i < thisContainer.length; i++) {
            if (thisContainer[i].style.display == 'block') {
              index = i;
            }
          }
          let length = document.querySelectorAll(".dp-container")[index].querySelector("div[data-role=year]").getElementsByClassName(
            'scroller-item').length;
          if (+document.querySelectorAll(".dp-container")[index].querySelector("div[data-role=year]").getElementsByClassName(
              'scroller-item')[0].innerHTML > 1000) {
            for (let i = 0; i < length; i++) {

              let innerHtml = document.querySelectorAll(".dp-container")[index].querySelector("div[data-role=year]")
                .getElementsByClassName('scroller-item')[i]
              document.querySelectorAll(".dp-container")[index].querySelector("div[data-role=year]").getElementsByClassName(
                  'scroller-item')[i].innerHTML =
                `民國${self.lengthO(innerHtml.innerHTML - 1911)}${+ innerHtml.innerHTML - 1911}年`
            }
          }
          if (this.isAndroid()) {
            this.inder = setInterval(() => {
              this.watchHtml()
            }, 500)
          }

        })
      },
      reset() {
        clearInterval(this.inder)
        this.cansee = false;
      },
    },
    /*created() {
        //alert(document.body.clientWidth)
        window.addEventListener('resize', function () {
            //alert(this.$route.path)
            /!*if(document.body.clientWidth>document.body.clientHeight){
                if(document.location.href.indexOf('/pages/loginIn')>0){
                  Toast('宽比高要大，请注意！');
                }
                if(document.location.href.indexOf('/pages/register')>0){
                  Toast('宽比高要大，请注意！');
                }
            }*!/
        })
        /!*this.screenWidth = document.body.clientWidth + this.getScrollWidth();
        this.screenHeight = document.body.clientHeight;
        window.onresize = () => {
            return (() => {
                if(document.body.clientWidth>document.body.clientHeight){
                    alert(321)
                }
                //this.screenWidth = document.body.clientWidth;
                //this.screenHeight = document.body.clientHeight;
            })();
        };*!/
    },*/
    computed: {
      mingguoValue() {
        try {
          if (this.valueData.length == 0) return ''
          let stringEnd = this.valueData.substring(4)
          let stringStart = this.valueData.substring(0, 4)
          stringStart = +stringStart - 1911;
          let isym = this.isym;
          let result = stringStart + stringEnd;
          let index = result.indexOf('-');
          result = isym ? `${this.valueData.substring(2, 4)}${result.substring(index+ 1, index + 3)}` : result
          return result
        } catch (e) {
          //TODO handle the exception
          return ''
        }

      },
      startDate() {
        let minYear = ''
        let specialYear = ''
        if (this.name == 'validityPeriod') {
          let date = new Date();
          date.setDate(date.getDate() + 1);
          specialYear = formatmyyear(date)
          // console.error(specialYear)
        } else {
          minYear = -100
        }
        return specialYear || timeOperation('year', minYear)
      },
      endDate() {
        let maxYear = ''
        let specialYear = ''
        if (this.name == 'validityPeriod') {
          maxYear = 10;
        } else if (this.name == 'beneficiaryBirthday') {
          let date = new Date();
          date.setDate(date.getDate() - 1);
          specialYear = formatmyyear(date)
        } else {
          maxYear = 100
        }
        return specialYear || timeOperation('year', maxYear)
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../form.scss';
  .canSee {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 250px;
    width: 100px;
    background: #fff;
    z-index: 99999;
  }

  @media screen and (max-width: 320px) {
    .fontRight {
      width: px(150) !important;
    }

    .imgT {
      width: px(46);
      height: px(46);
      margin-right: px(16) !important;
    }
  }

  .fontRight {
    z-index: 1;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    // float: right;
    height: px(92);
    display: flex;
    align-items: center;
    width: px(194);
    justify-content: center;
    border-left: 1px solid #e8e8e8;
    ;

    // display: inline-block;
    .imgT {
      // width: px(46);
      height: px(46);
      margin-right: px(30);
    }
  }

  .selectImg12 {
    width: 16px;
    position: absolute;
    top: 0.75rem;
    right: 10px;
  }

  .dad {
    min-width: 70px !important;
  }
  .redError{
    margin-top: 10px;
  }
</style>
