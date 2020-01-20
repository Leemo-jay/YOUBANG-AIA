<template>
  <div class="stepone">
    <p class="title">歡迎您申請加入</p>
    <p class="title">友邦人壽網路投保會員</p>
    <p class="state">為保障您的權益，請您於加入會員前，詳細閲讀以下各項條款，再點選「我同意」後進入下一步。</p>
    <div class="listContainer">
      <div v-if="infoList.length > 0">
        <div v-for="(item,index) in infoList" :key="index">
          <toggle :isAgree.sync="isAgreeList[index]" :title="item.name" :index="index" @updateIsAgree="updateIsAgree" :openIndex="openIndex">
            <div v-html="item.content">
            </div>
          </toggle>
        </div>
      </div>
    </div>
    <div class="nextbtnbox">
      <button :disabled="ifcanNext" class="nextbtn" @click="go2next()">下一步</button>
    </div>
  </div>
</template>
<script>
import toggle from "@/components/toggle.vue";
export default {
  name: 'stepone',
  components: {
    toggle,
  },
  data() {
    return {
      infoList: [],
      isAgreeList: [],
      title: 'test',
      index: 1,
      openIndex: 0,
      // ifcanNext: false
    }
  },
  computed: {
    ifcanNext() {
      return false
    }
  },
  mounted() {
    this.getInfoList()
  },
  methods: {
    go2next() {
      console.log(`this.isAgreeList`, this.isAgreeList)
      if (this.isAgreeList.every(el => el === true) && this.infoList.length > 0) {
        this.$emit('todoList', this.infoList)
        this.$parent.changeStep(2)
        return
      }
      let arr = []
      this.isAgreeList.forEach((el, index) => {
        if (el === false) {
          return arr.push(index)
        }
      });
      console.log(`this.infoList`, this.infoList)
      // return this.$myToast.success(`『請閲讀並同意』${this.infoList[arr[0]].name}`)

      return  this.$myToast.success(`『請閲讀並同意』${this.infoList[arr[0]].name}`)

    },
    updateIsAgree(value) {
      console.log(`value`, value)
      if (parseInt(value[1]) > this.openIndex && value[0] == true) return
      this.isAgreeList[value[1]] = value[0]
      // if (value[0]) {
      let arr = []
      this.isAgreeList.forEach((el, index) => el == false ? arr.push(index) : '')
      arr.length >= 1 ? this.openIndex = arr[0] : this.openIndex = this.isAgreeList.length
      // } else {
      //   let arr = []
      //   this.isAgreeList.forEach((el, index) => el == false ? arr.push(index) : '')
      //   console.log(`this.isAgreeList`, this.isAgreeList)
      //   arr.length >= 1 ? this.openIndex = arr[0] : this.openIndex = this.isAgreeList.length
      //   console.log(`this.isAgreeList`, this.isAgreeList)
      // }
    },
    // 獲取声明列表
    async getInfoList() {
      try {
        let tepData = {
          functionType: 'register'
        }
        let { data: { data } } = await this.Axios('findByFunctionType', tepData)
        console.log(`resp`, data)
        this.infoList = data
        this.isAgreeList = data.map(() => false)
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
