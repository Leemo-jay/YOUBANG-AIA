<template>
  <div class="home">
    <swiper class="swiperPC" :options="swiperOptionPC" v-if="bannerPCData.length > 1" :style="bannerImgHeight ? bannerImgHeight :'height:auto'">
      <swiper-slide v-for="(item,index) of bannerPCData" :key="index">
        <router-link :to="'/products/' + `${item.goodsCode}`"><img :src="'data:image/png;base64,' + `${item.tagUrlBase64}`" :alt="item.alt" ref="bannerImg"></router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <swiper class="swiperMB" :options="swiperOptionMB" v-if="bannerMBData.length > 1" :style="bannerImgHeight ? bannerImgHeight :'height:auto'">
      <swiper-slide v-for="(item,index) of bannerMBData" :key="index">
        <router-link :to="'/products/' + `${item.goodsCode}`"><img :src="'data:image/png;base64,' + `${item.tagUrlBase64}`" :alt="item.alt" ref="bannerImg"></router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <div class="swipperbox">
      <a-carousel :autoplay="true" :autoplaySpeed="20000" class="swipper" arrows @click.capture>
        <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 0.625rem;z-index: 1">
          <a-icon type="left" />
        </div>
        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 0.625rem;z-index: 1">
          <a-icon type="right" />
        </div>
        <div v-for="(item,index) in banner" :key="index" @click.capture="toProductDetail(item.goodsId,'more')">
          <img :src="item.tagUrl" alt="">
        </div>
      </a-carousel>
    </div> -->
    <div class="onlineGoods">
      <div class="title">即刻升級 線上自主保險</div>
      <div class="onlineItembox">
        <div :class="item.class" v-for="(item,index) in onlineList" :key="index">
          <img :src="item.img" alt="">
          <div class="right">
            <p class="top">{{item.title}}</p>
            <p class="state">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content recomendGoods">
      <span class="title">
        推薦商品
      </span>
      <div class="coin_tips"><span>本網頁金額皆以新台幣計</span></div>
      <div class="thisContent">
        <div :class="{noMar: index == goodsList.length - 1, item1: goodsList.length == 1,item2: goodsList.length == 2,
          item3: goodsList.length == 3}" :key="index" v-for="(item, index) in goodsList" class="contentItem">
          <img :src="'data:image/png;base64,' + `${item.guideImageBase64}`" :alt="item.alt">
          <div class="font2">{{item.googsName|formatTitle}}</div>
          <div class="font3">{{item.descriptionv}}</div>
          <div class="fontTitle">{{item.title}}</div>
          <div class="comBtn thisBtn thisBtn1" @click="toProductDetail(item.goodsCode, 'trial', 'true')"><router-link :to="`/products/${item.goodsCode}`">保費試算</router-link></div>
          <div class="comBtn thisBtn morebtn" @click="toProductDetail(item.goodsCode, 'more')"><router-link :to="`/products/${item.goodsCode}`">了解更多</router-link></div>
          <div class="tipBottom" v-if="item.goodsType == 1">註：以職業等級第1級，保額100萬元為例 </div>
          <div class="tipBottom" v-else>註：以30歲男性，保額100萬元為例</div>
        </div>
        <div v-if='goodsList.length == 0' class="nodata">
          暫無資訊
        </div>
      </div>
      <div class="all">
        <span @click="go2Router('goods-list')">了解所有保險商品</span>
        <a-icon type="right-circle" />
      </div>
    </div>
    <div class="more">
      <div class="title">需要更多幫助？</div>
      <div class="helpListbox">
        <div class="cont_left">
          <img class="help_img" src="@/assets/home/Together_Icon01@2.png" alt="">
          <div class="left_bottom" @click="go2Router('help')">
            <router-link :to="{name:'help',params: {id:1}}" class="ybhelp">友邦幫忙 ></router-link>
          </div>
          <!-- <router-link :to="{name:'help',params: {id:1}}" class="left_bottom ybhelp">友邦幫忙 ></router-link> -->
        </div>
        <div class="cont_right">
          <ul>
            <li>客服專線：0800-012-666</li>
            <li>週一至週五，上午9點~下午5點30分</li>
            <li>台灣台北市大安區敦化南路二段333號16樓</li>
          </ul>
          <div class="icon">
            <div class="route_l" @click="jumb2(1)"><img class="rout_img" src="@/assets/home/Index_Icon-Small02@2x.png" alt=""><span class="rout_info">關於友邦人壽</span> </div>
            <div class="route_r" @click="jumb2(2)"><img class="rout_img" src="@/assets/home/Index_Icon-Small03@2x.png" alt=""><span class="rout_info">友邦人壽粉絲專頁</span></div>
          </div>
        </div>
        <!-- <div class="back"></div> -->
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import './index.scss'
</style>
<script>
import banner4 from '@/assets/home/Index_Banner04.jpg'
import banner3 from '@/assets/home/Index_Banner03.jpg'
import banner2 from '@/assets/home/Index_Banner02.jpg'
import bannerMobile4 from '@/assets/home/Index_Banner04_Mobile.jpg'
import bannerMobile3 from '@/assets/home/Index_Banner03_Mobile.jpg'
import bannerMobile2 from '@/assets/home/Index_Banner02_Mobile.jpg'
import icon1 from '@/assets/home/Index_Icon-Big01.jpg'
import icon2 from '@/assets/home/Index_Icon-Big02.jpg'
export default {
  name: "home",
  components: {},
  watch: {},
  data() {
    return {
      bannerImgHeight: '',
      clientWidth: document.documentElement.clientWidth,
      bannerPC: [],
      bannerMB: [],
      bannerPCData: [],
      bannerMBData: [],
      swiperOptionPC: {
        loop : true,
        speed: 600,
        autoplay:true,
        preloadImages: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',

        }
      },
      swiperOptionMB: {
        loop : true,
        speed: 200,
        autoplay: true,
        preloadImages: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        paginationClickable :true,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // }
      },
      onlineList: [
        {
          img: icon1,
          title: '自主快速',
          content: '全程只需5分鐘即可完成網路投保，一切由你自主。',
          class: 'online_left'
        },
        {
          img: icon2,
          title: '彈性不受限',
          content: '使用手機或電腦即可投保，快速辦妥，立即得到保障。',
          class: 'online_right'
        },
      ],
      // goodsList: [
      //   {
      //     googsName: '友邦人壽 FUN心假日傷害保險',
      //     title: '360',
      //     descriptionv: '一天不到一塊錢(註)，假日安心一整年，假日交通意外身故保障加倍',
      //     guideImage: 'static/img/3.jpg'
      //   },
      //   {
      //     googsName: '友邦人壽 佑你定期壽險',
      //     title: '1000',
      //     descriptionv: '超高CP值，意外或疾病先離開了，保險金替你照顧家人',
      //     guideImage: 'static/img/4.jpg'
      //   },
      //   {
      //     googsName: '友邦人壽 e路寶傷害保險',
      //     title: '1190',
      //     descriptionv: '出國/通勤/走路/運動健身/天災地震都有保障，意外失能，保險金替你照顧自己，不拖累家人',
      //     guideImage: 'static/img/5.jpg'
      //   },
      // ],
      goodsList: []
    }
  },
  methods: {
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
    jumb2(type) {
      if (type === 1) {
        window.open('https://www.aia.com.tw/zh-tw/about-aia.html')
        // window.open('https://www.aia.com.tw/zh-tw/index.html')
      } else {
        window.open('https://www.facebook.com/Taiwan.AIA/')
      }
    },
    go2Router(val) {
      this.$store.commit('setTabIndex', val === 'goodsList' ? 0 : 2)
      this.$router.push({
        name: val
      })
    },
    format(value) {
      value = value + '';
      return value.length > 3 ? value.substring(0, value.length - 3) + ',' + value.substring(value.length - 3) : value
    },
    toProductDetail(id, name, type) {
      sessionStorage.setItem('pro_id',id)
      sessionStorage.setItem('setItem',type)
      // this.$router.push({
        // name: `productDetail`,
        // path: `productDetail/${id}`,
        // query: {
          // id,
          // from: name
        // }
      // });
    },
    async getGoodsList(value) {
      let tep = {
        "current": 1,
        "pageSize": 10,
        "goodsType": value,
        "sortType": 2,
        "mediaCode": this.$route.query.MEDIA_CODE ? this.$route.query.MEDIA_CODE : ''
      }
      this.Axios('getGoodsList', tep)
        .then(res => {
          this.bannerPCData = res.data.data.PCdetails
          this.bannerMBData = res.data.data.details
          this.goodsList = res.data.data.productListPageInfo.list
        })
    }
  },
  filters: {
    formatTitle(val) {
      return val.slice(4)
    }
  },
  created() {
    this.getGoodsList(0)
  },
  mounted() {
  }
};
</script>

