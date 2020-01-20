<template>
  <div class="stepthree">
    <div>
      <p class="title">您已完成網路投保會員註冊</p>
      <p class="number">會員編號：{{memberNumber}}</p>
      <div class="nextbtnbox">
        <button class="nextbtn" @click="go2next()">立即投保</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'stepthree',
  props: {
    premData: {
      type: Object,
      required: false,
      // default: function () {
      //   return {
      //     certificateNo: {
      //       value: 'B201258719',
      //       required: true,
      //       param_type: 1,
      //       errorMsg: '請填寫正確身分證字號',
      //       param_name: '身分證字號',
      //       tip: '(外籍人士尚未開放網路投保，請您與我們的客服人員聯系)',
      //       bds: 'idCard',// 校验正则规则
      //       error: false
      //     },
      //     name: {
      //       value: 'test',
      //       required: true,
      //       param_type: 1,
      //       errorMsg: '請填寫正確姓名',
      //       param_name: '姓名',
      //       tip: '',
      //       bds: 'name',
      //       error: false
      //     },
      //     birthday: {
      //       value: '1980-01-01',
      //       required: true,
      //       param_type: 'dateever',
      //       errorMsg: '',
      //       param_name: '生日',
      //       tip: '(需年滿20歲才可申請為網路投保會員)',
      //       bds: '',
      //       grey: '請填寫民國年格式0780101',
      //       minYear: -105,
      //       maxYear: -20,
      //       error: false
      //     },
      //     phone: {
      //       value: '0932123456',
      //       required: true,
      //       param_type: 1,
      //       errorMsg: '請填寫正確手機門號',
      //       param_name: '手機',
      //       tip: '(限台灣手機門號)',
      //       bds: 'tel',
      //       error: false
      //     },
      //     email: {
      //       value: 'test@qq.com',
      //       required: true,
      //       param_type: 1,
      //       errorMsg: '請填寫有效的E-mail',
      //       param_name: 'E-mail',
      //       tip: '',
      //       bds: 'email',
      //       error: false
      //     },
      //     referrerCode: {
      //       value: '',
      //       required: false,
      //       param_type: 1,
      //       errorMsg: '例如B999999',
      //       param_name: '推薦人會員編號（選填）',
      //       tip: '',
      //       bds: '',
      //       error: false
      //     },
      //   }
      // }
    },
    memberNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // memberNumber: '',
    }
  },
  mounted() {

  },
  methods: {
    go2next() {
      let name = this.$store.getters.getRouterName
      let query = this.$store.getters.getQuery
      console.log(`name`, name)
      console.log(`query`, query)
      if (name !== '') {
        this.$router.push({
          name,
          query,
        })
      } else {
        this.$router.push({
          name: 'home',
        });
      }
    },
  },

}
</script>
<style lang="scss" scoped>
.stepthree {
  width: 100%;
  // padding-bottom: 3.125rem;
  // min-height: 100%;
  margin-bottom:6.25rem;
  .title {
    font-size: 2.625rem;
    margin-top: 3.125rem;
    font-weight: 600;
    color: #161616

  }
  // .number {
  //   margin-top: 1.25rem;
  //   font-size: 1.25rem;
  //   color: #3a3a3a;
  // }
  .nextbtnbox {
    // margin-top: 4.375rem;
  }
  // .nextbtn {
  //   font-size: 1.25rem;
  //   width:20.25rem;
  //   height:3.6875rem;
  //   background:rgba(216,31,73,1);
  // }
}
</style>
