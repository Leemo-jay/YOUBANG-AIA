<template>
  <span class="timer">
    <span>
      <span v-if="(minute + '').length == 1">0</span>{{minute}}</span>
    :
    <span>
      <span v-if="(second + '').length == 1">0</span>{{second}}</span>
  </span>
</template>
<script>
export default {
  name: 'timer',
  props: {

  },
  data() {
    return {
      minute: 10,
      second: 0,
      ifpast: false
    }
  },
  watch: {},
  methods: {
    changeSecond() {
      if (this.second > 0) {
        this.second--;
      } else {
        if (this.minute == 0) {
          clearInterval(this.timer)
          // this.$Toast('結束')
          this.ifpast = true
          this.$emit('ifHasPast', true)
          this.$myToast.success('動態密碼已失效，請重發動態密碼')
          return
        } else {
          this.ifpast = false
          this.$emit('ifHasPast', false)
        }
        this.second = 59
        this.minute--;
      }
    },
    startTimer() {
      this.minute = 10,
        this.second = 0,
        clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.changeSecond()
      }, 1000)
    }
  },
  created() {
    // this.startTimer()
  },
  mounted() {
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
</style>
