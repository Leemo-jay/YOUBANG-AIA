<template>
  <div style="background: #f5f5f5;width: 100%">
    <div class="goodsList">
      <div class="tabDiv">
        <!-- <span :id='"tab" + index' @click="chooseTabIndex(index)" :class="{'tabItem-active': tabIndex == index}" :key='index' v-for='(item,index) in tabs' class="tabItem">
          {{item.name}}
        </span> -->
        <!-- <div
          :style="{width: borderWidth + 'px',left : borderLeft + 'px'}"
          class="borderB"
        ></div> -->
        <!-- <div :style="{width: (borderWidth-0) + 'px',left : (borderLeft+30) + 'px'}" class="borderB"></div> -->
        <a-menu v-model="menu_select" mode="horizontal" @select="handleSelect">
          <a-menu-item v-for='(item,index) in menu_list' :key="index">
            {{item}}
          </a-menu-item>
        </a-menu>
      </div>
      <div class="thisContent">
        <div :class="{noMar: index == goodsList.length - 1,item1: goodsList.length == 1,item2: goodsList.length == 2,
          item3: goodsList.length == 3}" :key="index" v-for="(item,index) in goodsList" class="contentItem">
          <img :src="'data:image/jpeg;base64,'+item.guideImageBase64" :alt="item.alt">
          <div class="font2">{{item.googsName|formatTitle}}</div>
          <div class="font33">{{item.descriptionv}}</div>
          <div class="font4">{{item.title}}</div>
          <div class="" @click="toProductDetail('true')"><router-link class="comBtn thisBtnList thisBtn1" :to="{ path: '/products/'+item.goodsCode}">保費試算</router-link></div>
          <div class="comBtn thisBtnList morebtn" @click="toProductDetail('')"><router-link  :to="{ path: '/products/'+item.goodsCode}">了解更多</router-link></div>
          <div class="tipBottom" v-if="item.goodsType == 1">註：以職業等級第1級，保額100萬元為例
          </div>
          <div class="tipBottom" v-else>註：以30歲男性，保額100萬元為例 </div>
        </div>
        <div v-if='goodsList.length == 0' class="nodata">
          暫無資訊
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'tbInfo',
  components: {},
  props: {},
  data() {
    return {
      sxList: [{
        name: '友邦人壽 e路寶傷害保險',
        name2: '1190',
        name1: '出國/通勤/走路/運動健身/天災地震都有保障，意外失能，保險金替你照顧自己，不拖累家人',
        src: 'static/img/5.jpg'
      }],
      goodsList: [],
      borderWidth: 0,
      borderLeft: 0,
      tabIndex: null,
      menu_select: [0],
      menu_list: ['全部商品', '意外險', '壽險'],
      tabs: [{
        name: '全部商品'
      },
      {
        name: '意外險'
      },
      {
        name: '壽險'
      }
      ]
    }
  },
  watch: {
    tabIndex: {
      handler: function (value) {
        try {
          console.log(`1`)
        } catch (e) {
          //TODO handle the exception
        }

        document.body.scrollTop = 0
        document.querySelector('html').scrollTop = 0
        this.getGoodsList(value)
      },
      // immediate: true
    }
  },
  computed: {},
  filters: {
    formatTitle(val) {
      return val.slice(4)
    }
  },
  methods: {
    chooseTabIndex(index) {
      this.tabIndex = index;
    },
    handleSelect(idx) {
      console.log(idx)
      this.tabIndex = idx.key;
      // this.getGoodsList(idx.key)

    },
    toProductDetail(type) {
      sessionStorage.setItem('setItem',type)
    },
    format(value) {
      value = value + '';
      return value.length > 3 ? value.substring(0, value.length - 3) + ',' + value.substring(value.length - 3) : value
    },
    async getGoodsList(value) {
      let tep = {
        "current": 1,
        "pageSize": 10,
        "goodsType": value,
        "sortType": 1,
        "mediaCode": this.$route.query.MEDIA_CODE ? this.$route.query.MEDIA_CODE : ''
      }

      this.Axios('getGoodsList', tep)
        .then(res => {
          this.goodsList = res.data.data.productListPageInfo.list
        })

    }
  },
  activated() { },
  deactivated() { },
  created() {
    this.getGoodsList(0)
  },
  mounted() {
    // this.borderWidth = document.getElementById('tab0').offsetWidth;
    this.$nextTick(() => {
      this.tabIndex = 0
    })
  },
}
</script>

<style lang="scss" scoped>
@import './index0-1023.scss';
@import './index1024+.scss';
</style>
