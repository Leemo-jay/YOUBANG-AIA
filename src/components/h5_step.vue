<template>
  <div class="tabDiv">
    <template v-for='(item,index) in tabArr' >
      <!-- {{index}} -->
      <!-- 调试--进入选中页面 -->
      <span :key="index" @click="$emit('update:tabIndex',index)" :class="{'step-active': tabIndex == index}" class="tabItem">
      <!-- <span :key="index" :class="{'step-active': tabIndex == index}" class="tabItem"> -->
             <span v-if='tabIndex == index'>{{item.tab_name}}</span>
             <span style="color: #fff;" v-else>閱讀聲</span>
            <template v-if="index != 4">
             <span v-if='tabIndex <index + 1' :class="{'tabItem-active': tabIndex == index}" class="stepItem">{{index + 1}} </span>
                <img src="../assets/register/Reserve_Flow_Icon-Tick.jpg"  v-else  class="thisSvg stepItem" style="border:none" alt="">
              </template>
              <template v-else>
                    <img v-if='tabIndex == 4'  class="stepItem" style="border: none;width: 22px;height: 22px;" src="@/assets/youbang/su2.jpg" alt="">
                    <img v-else  class="stepItem" style="border: none;width: 22px;height: 22px;;" src="@/assets/youbang/su1.jpg" alt="">
              </template>
      </span>
     </template>
  </div>
</template>
<script>
  export default {
    name: 'superTab',
    props: {
      tabArr: {
        type: Array,
        required: true
      },
      tabIndex: {
        type: Number,
        required: false,
        default: 2
      },
    },
    data() {
      return {
        borderPosition: 0,
      }
    },
    watch: {},
    methods: {

    },
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .tabDiv {

    z-index: 85;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    top: 3rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    overflow: auto;
    padding: 0.4688rem 0.875rem;
    // padding-left: 1.25rem;
    border-bottom: 0.0625rem solid rgba(#000, 0.1);
    padding-top: 2rem;
    padding-bottom: 0;
    box-shadow: 0rem 0rem 0.625rem 0rem rgba(220, 220, 220, 1);

    .tabItem {
      text-align: center;
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #858B9C;
      font-size: 1rem;
      // height: 1.625rem;
      line-height: 1.5rem;
      transition: all 0.2s;
      font-size: 0.875rem;
      color: #3A3A3A;
    }
   /deep/  .thisSvg{

      svg{
        width: 1.375rem !important;
        height: 1.375rem !important;
        margin-top: 0.25rem;
      }
    }
    .stepItem{
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-111%);
      border-radius: 50%;
      width: 1.0625rem!important;
      height: 1.0625rem!important;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.75rem;
      border: 0.0625rem solid #ccc;
      color: #adadad
      // background: #e8e8e8
    }
    .itemGreyLine{
      min-width: 12%;
      // width: 2.9375rem;
      // margin: 0 1.25rem;
    }
    .tabItem-active {
       border: 0.0625rem solid #d81f49;
      background: #d81f49;
      color: #fff;
      font-weight: 600;
    }
    .step-active{
      color: #d81f49;
    }

    .chooseBorder {
      position: absolute;
      display: inline-block;
      width: 7rem;
      height: 0.125rem;
      background: #005DFF;
      opacity: 0.8;
      bottom: -0.4375rem;
      transition: all 0.3s
    }
  }
</style>
