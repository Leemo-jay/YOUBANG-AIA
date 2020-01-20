<template>
  <div @click="change" :style="{height: height + 'px'}" :class="{lvToggle:height==453}" class="thisItem pxborder">

    <!-- <div @click="change"  :style="{height: height + 'px'}"  class="thisItem pxborder"> -->
    <!-- 元素自动撑开 -->
    <!-- <div @click="change" class="thisItem pxborder"> -->
    <div class="this1">
      <div :class="{thisbtnActive: isAgree}" @click.stop='agree' class="comBtn thisbtn" style="background: #fff !important;">
        <!-- <comSvg v-if='isAgree' type="checked" class="check"> </comSvg>
        <comSvg v-else type="unchecked" class="check"> </comSvg> -->
        <div class="check" type="checked" v-if="ifAgree">
          <img src="@/assets/register/Account_Btn_Agree02.jpg" alt="">
        </div>
        <div class="check" type="unchecked" v-else>
          <img src="@/assets/register/Account_Btn_Agree01.jpg" alt="">
        </div>
      </div>
      <span class="font1">{{title}}</span>
      <div class="imgbox">
        <!-- <img :class="{open: isOpen}" class="selectImg clearfix" src="@/assets/youbang/toggle.png" alt=""> -->
        <!-- <a-icon class="selectImg clearfix" type="minus" v-if="height == 453" />
        <a-icon class="selectImg clearfix" type="plus" v-else/> -->
        <img class="selectImg clearfix" src="@/assets/register/reduce.png" v-if="height == 453" style="height:auto;" />
        <img class="selectImg clearfix" src="@/assets/register/add.png" v-else style="height:auto;" />
      </div>
    </div>

    <div @scroll='scroll' ref='content' class="oteh1r">
      <div ref="inner">
        <slot>保险内容</slot>
      </div>
    </div>

  </div>
</template>
<script>
// import comSvg from "./comSvg.vue";
export default {
  name: 'toggle',
  components: {
    // comSvg
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '標題'
    },
    index: {
      type: Number,
      required: false,
      default: 0
    },
    isAgree: {
      type: Boolean,
      required: false,
    },
    ifCant: {
      type: Boolean,
      required: false,
      default: false
    },
    openIndex: {
      type: Number,
      required: false,
      default: 0
    },
    initial: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      height: '',
      isOpen: false,
      HEIGHT: 90,
      ifAgree: false,
      isCanAgree: false,
      oweIndex: 0,
      hidden: false,
      htmlDom: parseInt(document.getElementsByTagName('html')[0].style.fontSize)
    }
  },
  // computed: {
  //   ownHeight() {
  //     return this.height
  //   }
  // },
  watch: {
    isOpen: {
      handler: function (value) {
        let doms = parseInt(this.htmlDom)

        this.height = value ? 453 : this.HEIGHT
        this.ownIndex = this.height == 453 ? this.index : -2
      },
      // immediate: true
    },
    openIndex: {
      handler: function (value) {
        let doms = parseInt(this.htmlDom)

        console.log(`openIndex`, value)
        this.height = this.index == this.openIndex ? 453 : this.HEIGHT
      }
    },
  },
  methods: {
    change() {
      this.isOpen = !this.isOpen
      if (this.ownIndex >= 0) {
        this.oweIndex = -2
      } else {
        this.ownIndex = this.index
      }
    },
    scroll() {
      let scrollTop = this.$refs.content.scrollTop;
      this.isCanAgree = scrollTop > 180
    },
    agree() {
      if (this.ifCant) return
      if (this.index > this.openIndex && !this.ifAgree) return
      if (this.ifAgree) {
        this.$emit('update:IsAgree', false)
        this.$emit('updateIsAgree', [false, this.index])
        this.ifAgree = false
        this.isOpen = true
        return
      } else {
        this.$emit('update:IsAgree', true)
        this.$emit('updateIsAgree', [true, this.index])
        this.isOpen = false;
      }
      this.ifAgree = !this.ifAgree;
      // this.isAgree && this.openClose()
      // this.openClose()
    },
  },
  mounted() {
    console.log(`index`, this.index)
    // this.openClose
    this.height = this.HEIGHT;
    this.ifAgree = this.isAgree
    this.oweIndex = this.index
    if (this.index == this.openIndex || this.initial) {
      this.isOpen = true
    }
    // console.log(this.$refs.inner.offsetHeight)
    // if(this.$refs.inner.offsetHeight < 253){
    //   this.isCanAgree = true
    // }

  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .thisItem /deep/ .this1 {
    height: 5.375rem !important;
  }
  .thisItem /deep/.oteh1r {
    height: 100% !important;
  }
}

.pxborder:before {
  border-bottom: 1px solid #dadada;
  // border-color: #3A3A3A
}
.check {
  position: absolute;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.25rem;
  top: 50%;
  transform: translate(0, -50%);
  img {
    height: 2.9375rem;
    width: 7.875rem;
  }
}

.font1 {
  position: absolute;
  left: 8.5rem;
  top: 50%;
  font-size: 1.25rem;
  transform: translate(0, -50%);
  width: 24.1875rem;
  margin-left: 0.625rem;
  font-weight: 600;
  font-family: 'Microsoft JhengHei' !important;
  // font-weight: 500;
  color: rgba(58, 58, 58, 1);
  line-height: 2.1875rem;
  // flex: 1;
}

.thisItem {
  position: relative;
  background: rgba(255, 255, 255, 1);
  // box-shadow:0rem 0rem 2.5rem 0rem rgba(0,0,0,0.1);
  border-radius: 0.3125rem;
  border: 0.0625rem solid transparent;
  padding: 0.9375rem 0 0;
  box-sizing: border-box;
  transition: all 0.4s;
  color: #111a34;
  overflow: hidden;
}
.pxborder:before {
  border-bottom: 0.125rem solid #dadada;
}
.imgbox {
  line-height: 3rem;
  position: absolute;
  right: 2.125rem;
  top: 50%;
  transform: translate(0, -50%);
  .selectImg {
    cursor: pointer;
    color: $primary-color;
    width: 1.25rem !important;
    position: relative;
    transition: all 0.4s;
  }
}

.thisbtn {
  padding-left: 0.125rem;
  width: px(190);
  height: px(76);
  background: #fff !important;
  margin-right: 0.6875rem;
  // border: 0.0625rem solid currentColor;
  color: #6a6a6a;
  transition: all 0.4s;
}

.thisbtnActive {
  color: $primary-color;
}

.open {
  transform: rotate(180deg);
}

.this1 {
  cursor: pointer;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  position: relative;
  top: -0.0625rem;
  padding-left: 0rem;
  padding-right: 0rem;
  height: 4.375rem;
}

.oteh1r {
  float: left;
  position: relative;
  overflow: auto;
  margin-top: 1.5625rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding: 1.875rem;
  // background: #f6f6f6;
  border-top: 0.0625rem solid #dadada;
  height: 22.5rem;
  width: 100%;
  font-family: 'Microsoft JhengHei' !important;
  div {
    color: #6a6a6a;
  }
  /deep/ p {
    span {
      // display:inline-block;
      color: #6a6a6a;
      // font-size: 0.8125rem !important;
      font-size: 14px !important;
      line-height: 1.75rem !important;
    }
    strong {
      span {
        color: #3a3a3a !important;
      }
    }
  }
  /deep/ table {
    width: 100%
  }
  /deep/ p {
    font-family: 'Microsoft JhengHei' !important;
    span {
      font-family: 'Microsoft JhengHei' !important;
      span {
        color: #6a6a6a;
        // font-size: 0.8125rem;
        font-size: 14px !important;
        // display: inline-block;
        line-height: 1.75rem;

        font-family: 'Microsoft JhengHei' !important;
      }
    }
  }
}

.oteh1r::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 0.125rem;
  border-bottom: 0.0625rem solid #e8e8e8;
  // -webkit-transform-origin: 0 0;
  // -moz-transform-origin: 0 0;
  // -ms-transform-origin: 0 0;
  // -o-transform-origin: 0 0;
  transform-origin: 0 0;
  // -webkit-transform: scale(0.5, 0.5);
  // -ms-transform: scale(0.5, 0.5);
  // -o-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  // -webkit-box-sizing: border-box;
  // -moz-box-sizing: border-box;
  box-sizing: border-box;
}
@media only screen and (max-width: 1023px) {
  .thisItem {
            width: 100%;
            height: calc(100vw / 320 * 59)!important;
            padding: calc(100vw / 320 * 11) 0 0!important;
            border: none!important;
            border-top: calc(100vw / 320 * 2) solid transparent!important;
            .this1 {
              height: calc(100vw / 320 * 33)!important;
              padding: 0 calc(100vw / 320 * 22)!important;
              .thisbtn {
                width: calc(100vw / 320 * 81)!important;
                height: calc(100vw / 320 * 33)!important;
                padding-left: 0!important;
                .check {
                  img {
                    width: calc(100vw / 320 * 81)!important;
                    height: calc(100vw / 320 * 33)!important;
                  }
                }
              }
              .font1 {
                width: calc(100vw / 320 * 150)!important;
                left: calc(100vw / 320 * 111)!important;
                font-size: calc(100vw / 320 * 14)!important;
                line-height: calc(100vw / 320 * 18)!important;
                margin-left: 0!important;
              }
              .imgbox {
                line-height: 0!important;
                right: calc(100vw / 320 * 22)!important;
                .selectImg {
                  width: calc(100vw / 320 * 11)!important;
                }
              }
            }
            .oteh1r {
              margin-top: calc(100vw / 320 * 11)!important;
              border-top: calc(100vw / 320 * 1) solid #dadada!important;
              background-color: #F6F6F6;
              padding: calc(100vw / 320 * 9) calc(100vw / 320 * 22)!important;
              p {
                margin: 0!important;
                padding: 0!important;
                line-height: calc(100vw / 320 * 20)!important;
                letter-spacing: calc(100vw / 320 * 1)!important;
                span {
                  line-height: calc(100vw / 320 * 20)!important;
                }
              }
            }
            .oteh1r::before {
              height: calc(100vw / 320 * 1)!important;
            }
          }
          .lvToggle {
            height: calc(100vw / 320 * 230)!important;
          }
}
</style>
