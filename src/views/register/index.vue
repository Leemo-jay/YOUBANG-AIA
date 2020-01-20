<template>
  <div class="register">
    <div class="container">
      <div class="step-left">
        <div class="lvqq-register-pc">
          <div class="step one">
          <img src="../../assets/register/Account_Flow_Icon-RedA_PC.jpg" alt="" v-if="step ===1">
          <img src="../../assets/register/Account_Flow_Icon-Grey_Tick1_PC.jpg" alt="" v-else>
          <!-- <img src="../../assets/register/" alt="" v-else> -->
        </div>
        <div class="grayLine">
          <div class="line"></div>
        </div>
        <div class="step two">
          <img src="../../assets/register/Account_Flow_Icon-Red2_PC.jpg" alt="" v-if="step ===2">
          <img src="../../assets/register/Account_Flow_Icon-Grey_Tick2_PC.jpg" alt="" v-else-if="step===3">
          <img src="../../assets/register/Account_Flow_Icon-Grey2_PC.jpg" alt="" v-else>
        </div>
        <div class="grayLine">
          <div class="line"></div>
        </div>
        <div class="step three">
          <img src="../../assets/register/Account_Flow_Icon-Red3_PC.jpg" alt="" v-if="step ===3">
          <img src="../../assets/register/Account_Flow_Icon-Grey3_PC.jpg" alt="" v-else>
        </div>
        </div>
        <div class="lvqq-register-mb">
          <div class="lv-tab" :class="{'lv-current':step === 1}">
            <div class="lv-number" v-if="step === 1">1</div>
            <div class="lv-done" v-else><img src="../../assets/register/Reserve_Flow_Icon-Tick.jpg" alt=""></div>
            <div class="lv-name">閱讀聲明</div>
          </div>
          <div class="lv-line"></div>
          <div class="lv-tab" :class="{'lv-current':step === 2}">
            <div class="lv-number" v-if="step <= 2">2</div>
            <div class="lv-done" v-else><img src="../../assets/register/Reserve_Flow_Icon-Tick.jpg" alt=""></div>
            <div class="lv-name">填寫資料</div>
          </div>
          <div class="lv-line"></div>
          <div class="lv-tab" :class="{'lv-current':step === 3}">
            <div class="lv-number" v-if="step <= 3">3</div>
            <div class="lv-done" v-else><img src="../../assets/register/Reserve_Flow_Icon-Tick.jpg" alt=""></div>
            <div class="lv-name">完成註冊</div>
          </div>
        </div>
      </div>
      <!-- <div class="graylinear"></div> -->
      <div class="step-right">
        <stepOne v-if="step === 1" @todoList="todoList" />
        <stepTwo v-else-if="step===2" @premData="getUserInfo" :todoList="todoList1" />
        <stepThree v-else :premData="premData" :memberNumber='memberNumber' />
        <!-- <stepThree v-else/> -->
      </div>
    </div>
  </div>
</template>
<script>
import stepOne from './stepOne.vue'
import stepTwo from './stepTwo.vue'
import stepThree from './stepThree.vue'
export default {
  name: "register",
  components: {
    stepOne,
    stepTwo,
    stepThree
  },
  watch: {},
  data() {
    return {
      step: 1,
      memberNumber: '',
      todoList1: [],
      tabArr: [{
            key: 1,
            tab_name: '閱讀聲明'
          },
          {
            key: 2,
            tab_name: '填寫資料'
          },
          {
            key: 3,
            tab_name: '完成註冊'
          },]
    }
  },
  computed: {
    ifLogin() {
      return this.$store.state.customer.ifLogin
    },
  },
  methods: {
    changeStep(num) {
      this.step = num
      $(window).scrollTop(0)
    },
    getUserInfo(obj) {
      this.premData = obj
    },
    todoList(arr) {
      this.todoList1 = arr
    }
  },
  created() { },
};
</script>
<style lang="scss" scoped>
@import './lv-regist-320-1024.scss';
@import './lv-regist-1024^.scss';
.register {
  height: 100%;
  width: 100%;
  // padding: 7.1875rem 0;
  background-color: #fff;
  overflow: hidden;
  & ::-webkit-scrollbar {
    width: 0rem;
    height: 0.625rem;
    background-color: #3c3c3c;
  }
  .container {
    // width: 1016px;
    // min-height: 100vh;
    // margin: 0 auto;
    // display: flex;
    // position: relative;
    overflow-x: hidden;
    .step-left {
      // flex: 1;
      // position: absolute;
      // padding-top: 12.8875rem;
      // min-width: 14.5625rem;
      // width: 25%;
      // min-height: 85vh;
      // height: 100vh;
      // height: 100%;

      // border-right: 0.0625rem solid #fefefe;
      // box-shadow: 0.425rem 0rem 0.975rem -0.3125rem #ebe8e8;
      // float: left;
      .step {
        // height: 1.9375rem;
        // width: 100%;
        // padding-right: 2rem;
        // text-align: center;

        img {
          object-fit: fill;
          width: 8.75rem;
        }
      }
      .grayLine {
        // height: 5.375rem;
        // width: 100%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // overflow-x: hidden;
        // .line {
        //   margin: 0.75rem 49%;
        //   height: 3.125rem;
        //   width: 0.125rem;
        //   line-height: 3.875rem;
        //   background-color: #e9e9e9;
        // }
      }
    }
    .graylinear {
      min-height: 43.75rem;
      height: auto;
      width: 0.9375rem;
      float: left;
      background: #cecece;
      background: linear-gradient(to right, #cecece 0%, #fefefe 100%);
    }
    .step-right {
      // height: 100%;
      // min-height: 100vh;
      // margin-left: 25%;
      // margin-bottom: 6.25rem;
      // width: 47.6875rem;
      // padding-top: 12.1875rem;
      // padding-left: 7.8125rem;
      // font-size: 1.25rem;

      // height: auto;
      // padding-bottom: 7.1875rem;
      .check {
        .item-box {
          font-size: 1.25rem;
        }
      }
      // border-left: 0.0625rem solid #cecece;
      // box-shadow: 0 0 3.125rem #cecece;
      // overflow: auto;
      // background-color: orange;
    }
  }

  /deep/.check {
    /deep/.title {
      // font-size: 2.125rem !important;
      // font-weight: 37.5rem!important;
    }
    .item-box {
      font-size: 1.25rem;
    }
  }
}
</style>
