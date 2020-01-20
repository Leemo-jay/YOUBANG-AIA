<template>
	<div class="pxborder">
		<!-- {{arrList}} -->
		<div :class="{pb0: !showError}" class="formDiv">
			<span class="titleFont">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span class="checkBox" >
				<span @click="changeIndex(item.id)" :key="index" :class="{chooseStyle : value == item.id}" v-for="(item,index) in arrList" class="boxItem">{{item.value}}</span>
			<div class="redError" v-if='showError'>{{errorDesc || '請選擇' + title}}</div>
			</span>
		</div>	
		<div v-if='false' @click="$toastStop" class="disabledCom"></div>
	</div>
</template>
<script>
	export default {
		name: 'comRadio',
		props: {
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
			},
			isHave: {
				type: Boolean,
				required: false,
				default: false
			},
			radioInfo: {
					type: Array,
					required: true
			},
			errorDesc: {
				type: String,
				required: false,
				default: '来啦老弟'
			},
			showError: {
				type: Boolean,
				required: false,
				default: false
			},
			value: {
				required: false,
				default: ''
			},
			modefine: {
				required: false,
				default: false
			},

		},
		data() {
			return {
				isShow: false,
				autofocus: false,
				// RadioList: {
			}
		},
		computed: {
			arrList() {
				let list =  JSON.parse(this.radioInfo);
				console.log(list)
				return list
			}
		},
		watch: {},
		methods: {
			clearInput: function() {
			},
			changeIndex(value){
				//console.log(value)
				// this.radioKey = value;
				if(value){
					this.$emit("update:showError", false)				
				}else{
					this.$emit("update:showError", true)
				}
				this.$emit('update:value',value)
			}
		},
		created() {
		}
	}
</script>

<style lang="scss" scoped>
	@import '../form.scss';
	
	.chooseStyle {
		color: #fff !important;
		background-color: red !important;
		border: 1px solid red !important;
	}
	.boxItem {
		padding: px(10) px(30);
		background-color: #fff;
		color:#6a6a6a;
		border-radius: px(6);
		border: 1px solid #e8e8e8;
		// margin-bottom: px(20);
		margin-right: px(20);
		display: inline-block;
		font-size: px(28);
	}
</style>
