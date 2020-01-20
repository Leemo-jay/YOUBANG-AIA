<template>
  <div class="active">
    <div class="activebox">
      <div class="title">活動專區</div>
      <div class="item" :class="index %2 ==0?'':'fr'" v-for="(item,index) in activeList" :key="index" @click="go2Url(item.url)">
        <img :src="item.img" alt="">
        <p class="state">{{item.text}}</p>
      </div>
    </div>
    <div class="more">
      <!-- <p>【加載更多】</p> -->
    </div>
  </div>
</template>
<script>
import img1 from '@/assets/active/huodong1.png'
import img2 from '@/assets/active/active_02.png'
import img3 from '@/assets/active/active_03.png'
import img4 from '@/assets/active/active_04.png'
export default {
  name: "active",
  components: {
  },
  watch: {},
  data() {
    return {
      activeList: [
        {
          img: img1,
          text: '自主投保，輕鬆上手｜YONii友你保 簡單、易懂、好操作',
          url: 'https://yonii.aia.com.tw/static/mkt/index.html'
        }
        // {
        //   img: img2,dsfdsf2132131
        //   text: '現在加入會員 LINE POINT20點',
        //   url: 'https://dc.aia.com.tw'
        // },sfdd12321
        // {
        //   img: img3,
        //   text: '現在加入會員 LINE POINT20點，任務活動交換方式一起擴大生活圈務墻活動交換方式壹起擴大生活圈！',
        //   url: 'https://dc.aia.com.tw'
        // },
        // {
        //   img: img4,
        //   text: '現在加入會員 LINE POINT20點',
        //   url: 'https://dc.aia.com.tw'
        // },
      ]
    }
  },
  methods: {
    go2Url(url) {
      window.open(url)
    }
  },
  created() { },
};
</script>
<style lang="scss" scoped>
@import 'index0-833.scss';
@import 'index1140+.scss';
</style>
