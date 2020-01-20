<template>
	<a-checkbox @change="onChange" :checked='checked' class="antcheckBox">
		<span class="checkicon" v-if="checked">
			<a-icon type="check" /></span>
		<a-icon v-else type="check-circle" class="uncheckicon" /><span class="checktext">我同意</span></a-checkbox>
</template>

<script>
	export default {
		name: 'antcheck',
		props: {
			checked:{
				type:Boolean
			},
		},
		data() {
			return {

			}
		},
		computed: {},
		watch: {},
		methods: {
			onChange(e) {
				this.$emit('update:checked', e.target.checked)
			}
		},
		created() {}
	}
</script>

<style lang="scss">
	.antcheckBox.ant-checkbox-wrapper {
		position: relative;
		height: 30px;
		.ant-checkbox {
			width: 100px;
			height: 30px;
			border: 1px solid #6a6a6a;
			border-radius: 20px;
		}
		.ant-checkbox-inner {
			display: none;
		}
		.ant-checkbox.ant-checkbox-checked {
			border-color: $primary-color
		}
		.anticon.anticon-check-circle {
			font-size: 20px;
		}
		.checkicon {
			border-radius: 20px;
			width: 20px;
			height: 20px;
			display: inline-block;
			line-height: 26px;
			font-size: 12px;
			padding: 0 0 4px 3px;
			background: $primary-color;
			color: #fff;
		}
		.anticon {
			vertical-align: initial;
		}
		.anticon.anticon-check{
			transform: scale(0.8);
			-webkit-transform:scale(0.8);
			margin: 0 0 0 1px;
		}
		.uncheckicon {
			background: #fff;
			color: #6a6a6a;
			vertical-align: sub;
		}
		.ant-checkbox+span {
			position: absolute;
			top: 0;
			left: 0;
			width: 100px;
			line-height: 30px;
		}
		.ant-checkbox.ant-checkbox-checked+span {
			color: $primary-color;
		}
		.checktext{
			margin: 0 0 0 6px;
			line-height: 26px;
		}
		.ant-checkbox-checked:after{
			content: none;
		}
	}
</style>
