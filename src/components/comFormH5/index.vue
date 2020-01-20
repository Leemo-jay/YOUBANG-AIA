<template>
	<div>
		<!-- {{item.param_type}} -->
		<formCom :key='key' v-for="(item,key) in productData" :item="item"></formCom>
	</div>
</template>
<script>
	import formCom from './form/formCom.vue'
	export default {
		name: 'comFormH5',
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
				postData: {}
			};
		},
		watch: {

			},
			methods: {},
			created() {
			}
		};
</script>

<style lang="scss" scoped>

</style>
