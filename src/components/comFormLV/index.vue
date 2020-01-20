<template>
  <div>
    <!-- {{item.param_type}} -->
    <formCom :key='key' v-for="(item,key) in productData" :item="item" @checkReferrerCode="checkReferrerCode"></formCom>
  </div>
</template>
<script>
import formCom from './form/formCom.vue'
export default {
  name: 'comFormLV',
  components: {
    formCom
  },
  props: {
    productData: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      postData: {},
      isPassword: false,
      randowCode: '',
      userInfo: {
        phone: '09123456789',
        email: '1832485@qq.com',
      },
      accountId: '',
      serialNumber: '',
      code: {
        value: '',
        param_type: 1,
        errorMsg: '請填寫正確驗證碼',
        param_name: '驗證碼',
        bds: '',
        error: false,
      },
      premData: {
        card: {
          value: 'U193683453',
          param_type: 1,
          errorMsg: '請填寫正確身分證字號',
          param_name: '身分證字號',
          // tip: '外籍人士尚未開放網路投保，請您與我們的客服人員聯繫',
          bds: 'idCard',
          error: false
        },
        bir: {
          value: '1990-01-01',
          param_type: 4,
          errorMsg: '',
          param_name: '生日',
          // tip: '需年滿20歲才可申請為網路投保會員',
          bds: '',
          grey: '請填寫民國年格式。。',
          minYear: -105,
          maxYear: -20,
          error: false
        },
      }
    };
  },
  watch: {

  },
  methods: {
    update(val) {
      this.$emit('updateDate', val)
    },
    checkReferrerCode() {
      this.$emit('checkReferrerCode')
    }
  },
  created() {
    // console.log(this.productData)
  }
};
</script>

<style lang="scss" scoped>
</style>
