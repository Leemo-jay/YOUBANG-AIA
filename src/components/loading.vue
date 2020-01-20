<template>
  <div class="loading">
    <div class="gif">
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss" scoped>
.loading {
  z-index: 99999;
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  // top: 80px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .gif {
    height: 100%;
    width: 100%;
    background: url('../assets/loading.gif') no-repeat center / 40%;
  }
}
@media screen and(max-width: 1023px) {
  .loading {
    display: none
  }
}
</style>
