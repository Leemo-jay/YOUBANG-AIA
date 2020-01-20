<template>
  <div>
    <div class="infoChange" v-if="navIndex">
      <div class="nav-left">
        <div
          class="nav-item"
          :class="index+1 == navIndex?'nav-item-select':''"
          @click="go2Router(index+1)"
          v-for="(item,index) in navList"
          :key="index"
        >{{item}}</div>
      </div>
      <div class="nav-right">
        <menber-info-change v-if="navIndex == 1">
          <p class="title ml20">會員資料修改</p>
        </menber-info-change>
        <bill-list v-else-if="navIndex == 2">
          <p class="title">投保記錄查詢</p>
          <p class="coin">幣別：新台幣</p>
          <div id="lvqq-record-back" @click="back" >
          <!-- <a-icon type="left" /> -->
          << 返回 會員專區
          </div>
        </bill-list>
      </div>
    </div>
    <div class="menu" v-else>
      <div class="menubox">
        <div class="item item_m">
          <div class="img">
            <img src="@/assets/youbang/info1.jpg" alt @click="go2Router(1)" />
          </div>
          <div class="text" @click="go2Router(1)">個人資料修改 ></div>
        </div>
        <div class="item item_m">
          <div class="img">
            <img src="@/assets/youbang/info2.jpg" alt @click="go2Router(2)" />
          </div>
          <div class="text" @click="go2Router(2)">投保記錄查詢 ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import menberInfoChange from "./child/menberInfoChange.vue";
import billList from "./child/billList.vue";
export default {
  name: "infoChange",
  components: {
    billList,
    menberInfoChange
  },
  data() {
    return {
      navList: ["會員資料修改", "投保記錄查詢"]
      // navIndex: 0
    };
  },
  watch: {},
  computed: {
    navIndex() {
      if (this.$route.query.type) return this.$route.query.type;
      return 0;
    }
  },
  methods: {
    changeNav(index) {
      this.navIndex = index + 1;
    },
    go2Router(val) {
      if (this.navIndex == val) return;
      this.$router.push({
        name: "infoChange",
        query: {
          type: val
        }
      });
    },
    back() {
      this.$router.push({
        name: 'infoChange'
      })
    }
  },
  activated() {},
  deactivated() {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./lv-add.scss";
@import "./index0-1023.scss";
@import "./index1024+.scss";

</style>
