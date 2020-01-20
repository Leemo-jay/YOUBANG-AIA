<template>
	<div class="content">
		<div class="errorBox">
			<img class="helpIcon" src="@/assets/youbang/help.png" />
			<p class="boldTip">非常抱歉！網頁維護中</p>
			<p class="tip">造成您的不便，我們深感抱歉！如需即時服務請撥打免費客服專線</p>
			<p class="phone">0800-012-666</p>
		</div>
	</div>
</template>
<script>
export default {
	name: "error",
	components: {
	},
	watch: {},
	data() {
		return {
		}
	},
	methods: {},
	created() { },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
.content {
	// min-height: 700px;
	height: 100%;
  background: #fff;
}
.errorBox {
  width: max-content;
  margin: 0 auto;
  text-align: center;
}
.helpIcon {
  width: 120px;
  margin-top: 60px;
}
.boldTip {
  font-size: 22px;
  line-height: 46px;
  font-weight: 800;
}
.tip {
  width: 260px;
}
.phone {
  color: $primary-color;
  line-height: 32px;
}
</style>
