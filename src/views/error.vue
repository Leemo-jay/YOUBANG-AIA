<template>
	<div class="content">
		<div class="errorBox">
			<img class="helpIcon" src="@/assets/youbang/error.jpg" />
			<p class="boldTip">非常抱歉！網頁維護中</p>
			<p class="tip">造成您的不便我們深感抱歉！如需服務，請於營業日上午09:00至下午5:30撥打免費客服專線</p>
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
// @import './index.scss';
.content {
	// min-height: 43.75rem;
	height: 100%;
  background: #fff;
}
.errorBox {
  width: max-content;
  margin: 0 auto;
  text-align: center;
}
.helpIcon {
  width: 8.5rem;
  margin-top: 10rem;
}
.boldTip {
	font-size:2.625rem;
	color: #161616;
  line-height: 2.875rem;
  font-weight: 800;
}
.tip {
	font-size:1.25rem;
	line-height: 1.85rem;
	margin: 0 auto;
	color:#3A3A3A;
	margin-top: 1.25rem;
  width: 29.6875rem;
}
.phone {
  color: $primary-color;
	line-height: 2rem;
	font-size: 1.0625rem;
}
</style>
