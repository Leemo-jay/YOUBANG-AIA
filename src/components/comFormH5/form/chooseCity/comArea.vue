<template>
	<div class="pxborder">
		<div class="formDiv">
			<span class="titleFont">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span @click="openArea" class="rihgtThis" >
				<input :disabled="true" :placeholder="placeholder"
				 @input="changeValue($event.target.value)" :value="valueName" class="formInput" />
				<img class="selectImg" src="@/assets/selectArr.png" />
				<div class="redError" v-if="showError">{{errorDesc || placeholder}}</div>
			</span>
		</div>
		<Distpicker :isShowArea.sync="isShowArea" v-model="city" title='選擇城市'></Distpicker>
	</div>
</template>
<script>
	import Distpicker from './Distpicker.vue'
	export default {
		name: 'comArea',
		components: {
			Distpicker
		},
		props: {
			title: {
				type: String,
				required: false,
				default: '打开App, 浏览更多'
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
			type: {
				required: false,
				default: false
			},
			value: {
				required: false
			},
			isRight: {
				required: false,
				default: true
			},
			disabled: {
				required: false,
				default: true
			},
			isHave: {
				required: false,
				default: false
			},
			isTime: {
				required: false,
				default: false
			},
			isSS: {
				required: false,
				default: false
			},
		},
		watch: {
			city: {
				handler: function(value) {
					if(value){
						this.$emit("update:showError", false)
					}
					// console.error(value)
					this.valueName = value.name;
					this.isShowArea = false;
					this.$emit('update:value', value.value)
				},
			},
			value: {
				handler: function(value) {
					if(!this.value) return
					var self = this;
					this.Axios('getCityNamesByCodes',`codes=${self.value}`).then(function(res){
						//console.log(res.data.data)
						self.valueName = res.data.data
					})
				},
				immediate: true
			},
			isShowArea: {
				handler: function(value) {
					//console.error(value);
					this.$bus.$emit('fixedFill',value)
				}
			}
		},
		created() {
			this.placeholder = '请选择' + this.title;
		},
		data() {
			return {
				city: '',
				cityInfo: '',
				isShow: false,
				autofocus: false,
				isShowArea: false,
				valueName: ''
			}
		},
		methods: {
			openArea: function() {
				this.isShowArea = true;
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../form.scss';
</style>
