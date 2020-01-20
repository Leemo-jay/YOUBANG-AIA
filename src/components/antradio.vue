<template>
  <div>
    <div v-if="name=='sameAsCustomer'" class="switch">
      <div class="box lb" v-if="value==2" @click="change(1)">
        <span class="left circle"></span>
        <span class="text">聯絡資料同要保人</span>
      </div>
      <div class="box rb" v-if="value==1" @click="change(2)">
        <span class="right circle"></span>
        <span class="text">聯絡資料同要保人</span>
      </div>
    </div>
    <div v-else>
      <a-radio-group @change="onChange" :value="value" class="radio">
        <a-radio-button v-for="(item,index) in options" :key="index" :value="item.value" class="buttoms">{{item.name}}</a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'antradio',
  props: {
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    value: {
      required: false
    },
    hasShowError: {
      required: false
    },
    name: {
      required: false
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    change(value) {
      console.log(`value____0000`, value)
      this.$emit('update:value', value)
      if (value == 2) {
        this.$emit('update:show_value', '關閉')
      } else {
        this.$emit('update:show_value', '打開')
      }
    },
    onChange(e) {
      console.log(`radio---`, e.target.value)

      this.$emit('update:value', e.target.value)
      for (let option of this.options) {
        if (option.value == e.target.value) {
          this.$emit('update:show_value', option.name)
        }
      }
      this.$emit('update:hasShowError', false)
    },
  },
  created() { }
}
</script>

<style lang="scss" scoped>
@media screen and(max-width:1023px) {
  .radio {
    .buttoms {
      width: 8rem;
      height: 2.25rem;
      line-height: 2.25rem;
      font-size: .875rem
    }
  }
}


.switch {
  padding-bottom: 3rem !important;
  .box {
    position: absolute;
    width: 247px;
    height: 48px;
    padding: 0px 12px;
    margin-bottom: 3rem !important;
    border-radius: 24px;
    line-height: 44px !important;
    cursor: pointer;
    .circle {
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 14px;
      cursor: pointer;
    }
    .text {
      display: inline-block;
      margin-left: 3rem;
      line-height: 2.75rem !important;
      cursor: pointer;
    }
    .left {
      position: absolute;
      top: 8px;
      left: 12px;
      border: 2px solid rgba(204, 204, 204, 1);
    }
    .right {
      position: absolute;
      top: 8px;
      left: 12px;
      border: 2px solid $primary-color;
      background: $primary-color;
    }
  }
  .lb {
    color: #6a6a6a;
    // background: #fff;
    border: 2px solid rgba(204, 204, 204, 1);
  }
  .rb {
    color: $primary-color;
    // background: $primary-color;
    border: 2px solid $primary-color;
  }
  /deep/ .ant-switch {
    height: 2.375rem !important;
    &::after {
      width: 1.5rem;
      height: 1.5rem;
      left: 0.375rem;
      top: 0.375rem;
    }
    .ant-switch-inner {
      margin-left: 2.5rem;
      margin-right: 0.375rem;
      font-size: 1rem;
    }
    &.ant-switch-checked {
      &::after {
        width: 1.5rem;
        height: 1.5rem;
        right: 0.375rem;
        top: 0.375rem;
      }
      .ant-switch-inner {
        margin-left: 0.375rem;
        margin-right: 2.5rem;
        font-size: 1rem;
      }
    }
  }
}
.ant-radio-group {
  width: 100%;
}
.ant-radio-button-wrapper {
  width: 45%;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.125rem;
  border-radius: 0 !important;
  text-align: center;
}
.buttoms:nth-child(2) {
  float: right;
}

.ant-radio-button-wrapper:first-child {
  margin: 0 2.1875rem 0 0;
}
.question {
  line-height: 1.625rem;
}
.ant-radio-button-wrapper:not(:first-child)::before {
  left: 0 !important;
  width: 0 !important;
}
</style>
