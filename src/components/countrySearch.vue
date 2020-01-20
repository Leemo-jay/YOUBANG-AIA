<template>
  <div class="countrySearch">
    <div class="box">
      <p class="title">選擇國籍</p>
      <div class="selectbox">
        <a-select class="select" showSearch :value="code" placeholder="input search text" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @search="handleSearch" @change="handleChange" :notFoundContent="null" :allowClear="true">
          <a-icon slot="suffixIcon" type="close-circle" />
          <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
        </a-select>
        <a-icon type="search" class="search" />
      </div>
    </div>
    <div class="btnbox" @click="hide">取消</div>
  </div>
</template>
<script>
// import jsonp from 'fetch-jsonp';
// import querystring from 'querystring';
import { Axios } from '@/commonJs/common.js'

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    let tepData = {
      "name": value
    }
    // const str = querystring.encode({
    //   code: 'utf-8',
    //   q: value,
    // });
    Axios('countrylist', tepData)
      // .then(response => response.json())
      .then(res => {
        if (currentValue === value) {
          const result = res.data.data;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r.code, // 绑定code,传给后台
              text: r.name,
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}
export default {
  name: 'countrySearch',
  props: {
    country: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: [],
      // value: undefined,
    }
  },
  // computed: {
  //   dataList() {
  //     let _data = this.data
  //     let filterTag = this.value
  //     if (filterTag) {
  //       _data = _data.filter(row => {
  //         return Object.keys(row).some(key => {
  //           return String(row['tag']).indexOf(filterTag) > -1
  //         })
  //       })
  //     }
  //     return _data
  //   },
  // },
  methods: {
    handleSearch(value) {
      console.log(`search`, value)
      fetch(value, data => this.data = data);
    },
    handleChange(value) {
      console.log(`change`, value)
      if (value) {
        let country = this.data.find(el => el.value === value)
        this.$emit('change', country)
        return
      } else {
        console.log(`clear`)
        this.$parent.clear()
        return
      }
      // fetch(value, data => this.data = data);
    },
    hide(){
      this.$parent.hide()
    }
  },
  mounted() {
    fetch('', data => this.data = data)
  }

}

</script>
<style lang="scss" scoped>
.countrySearch {
  min-height: 700px;
  width: 100%;
  height: auto;
  padding-top: 100px;
  padding-bottom: 150px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box {
    width: 50%;
    height: 460px;
    padding: 87px 182px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid rgba(218, 218, 218, 1);
    /deep/ .ant-select-selection__rendered {
      margin-left: 25px;
    }
    .title {
      // position: absolute;
      // margin-top: 87px;
      font-size: 30px;
      font-family: 'Microsoft JhengHei' !important;
      font-weight: 500;
      color: rgba(58, 58, 58, 1);
      line-height: 35px;
    }
    .selectbox {
      position: relative;
      width: 100%;
      display: flex;
      .select {
        position: relative;
        width: 100% !important;
        margin-top: 54px;
      }
      .search {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 24px;
        width: 24px;
      }
    }
  }
  .btnbox {
    margin-top: 66px;
    width: 233px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 2px solid rgba(151, 151, 151, 1);
    border-radius: 30px;
    cursor: pointer;
  }
}
</style>

    <!-- <div v-if="ifshow">
      <country-search :country="country" :code="String(code)" @change="change"></country-search>
    </div>
<!--
        import countrySearch from "@/components/countrySearch.vue"
        // country: '本国人',
        // code: '001'
        change(val) {
          console.log(`接收到子组件传参`, val)
          this.country = val.text
          this.code = val.value
        },
            clear() {
      console.log(`清除`)
      this.country = ''
      this.code = ''
    },
    hide() {
      this.ifshow = false
    }
-->