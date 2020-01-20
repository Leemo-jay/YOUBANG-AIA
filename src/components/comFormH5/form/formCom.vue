<template>
	<div class="form-com-content">
		<!-- {{item.ruleArr}} -->
		<!-- 输入框 -->
		<comInput
			:reg='item.bds'
			:value.sync='item.value'
			:id='item.id'
			v-if="item.param_type == '1'"
			:showError.sync='item.error'
			:errorDesc="item.errorMsg"
			:title="item.param_name"
			:tip="item.tip"
			:ruleArr="item.ruleArr"
			:required="item.required"
			:widget.sync="item.widget"
      		:dataIndex="item.dataIndex"
			:grey="item.grey"
			:modefine="item.modefine"></comInput>
		<!-- 单选框 -->
		<comRadio
			:value.sync='item.value'
			v-else-if="item.param_type == '3'"
			:showError.sync='item.error' :errorDesc="item.errorMsg"
			:radioInfo="item.param_var"
			:title="item.param_name"
			 modefine="item.modefine"></comRadio>
		<!-- 时间框 -->
		<comTime
			:value.sync='item.value'
			v-else-if="item.param_type == '4' || item.param_type == 'dateever'"
			:minYear="item.minYear"
			:maxYear="item.maxYear"
			:widget.sync="item.widget"
			:showError.sync='item.error'
			:errorDesc="item.errorMsg"
			:errorMsg1="item.errorMsg1"
			:isRegister="item.isRegister"
			:ageT="item.ageT"
			:title="item.param_name"
			:id="item.id"
      :tip="item.tip"
      :defaultValue="item.defaultValue"
      :grey="item.grey"
			:otherSome="item.id == 'effectDate' ? true : false "
			:isSome="item.param_type == 'dateever' ? true : false "
			:modefine="item.modefine"></comTime>
		<!-- 下拉框 -->
		<comSelect
			:id='item.id'
			:value.sync='item.value'
			v-else-if="item.param_type == '2' || item.param_type == 'amount'"
			:showError.sync='item.error'
			:errorDesc="item.errorMsg"
			:title="item.param_name"
			:radioInfo="item.param_var"
      :tip="item.tip"
      :grey="item.grey"
			:modefine="item.modefine"></comSelect>
		<!-- 地区 -->
		<comArea
			:value.sync='item.value'
			:showError.sync='item.error'
			v-else-if="item.param_type == '7'"
			:errorDesc="item.errorMsg"
			:radioInfo="item.param_var"
			:title="item.param_name"
			:modefine="item.modefine"></comArea>
	</div>
</template>
<script>
	// import {
	// 	compress,
	// 	getfilesize
	// } from '@/commonJs/common.js'
	import comInput from './comInput.vue'
	// import comOCC from './comOCC.vue'
	import comArea from './chooseCity/comArea.vue'
	import comRadio from './comRadio.vue'
	import comTime from './comTime.vue'
	import comSelect from './comSelect.vue'
	export default {
		name: 'formCom',
		components: {
			comInput,
			comArea,
			comRadio,
			comTime,
			comSelect,
			// comOCC
		},
		props: {
			item: {
				type: Object,
				required: false
			}

		},
		data() {
			return {
				// 1法定受益人
				cardInfo: [0, 0],
				cardT: '',
				cardF: '',
				// 0 正 1 反
				type: '',
				isShow: true,
				canUp: true,
			}
		},
		watch: {
			'item.value': {
				handler: function() {},
				deep: true,
				immediate: true
			}
		},
		created() {
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
  /*.form-com-content /deep/ .weui-cell{
    padding: 14px 0 !important;

  }*/

	.redError {
		margin-bottom: px(30);
	}

	.thisCard {
		padding: px(29) 0;
		padding-bottom: 0;
		border-bottom: 1px solid #e8e8e8;
	}

	.hidden {
		position: fixed;
		left: -2000px;
	}

	.ThisTitle {

		text-align: left;
		font-size: px(28);
		color: #1c1c1c;
		padding-left: px(40);
	}

	.idcard {
		display: flex;
		justify-content: space-around;
		padding: px(40) 0;
		color: #858B9C;
		font-size: px(24);

		img {
			width: px(168);
			height: px(112);
			margin-bottom: px(15);
		}

	}
</style>
