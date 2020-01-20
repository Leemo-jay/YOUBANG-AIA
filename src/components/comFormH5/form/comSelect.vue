<template>
	<div class="pxborder">
		<!-- {{arrList}} -->
		<div @click="isOpen = true" class="formDiv">
			<span class="titleFont">{{title}}<span v-if="isHave" style="color: red;">*</span></span>
			<span class="rihgtThis">
				<input :type="type" ref="focus" :disabled="true" :placeholder="placeholder" :value="valueName" class="formInput" />
				<img class="selectImg" src="@/assets/selectArr.png" />
				<div class="redError" v-if="showError">{{errorDesc || placeholder}}</div>
			</span>
		</div>
		<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
		<PopupPicker class='thisThis' title="" v-model="poupValue" :data="[arrList]" v-if="isOpen" :show.sync="isOpen"></PopupPicker>
	</div>
</template>
<script>
	import {
		PopupPicker
	} from 'vux';
	export default {
		name: 'comInput',
		components: {
			PopupPicker
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
			isHave: {
				required: false,
				default: false
			},
			modefine: {
				required: false,
				default: false
			},
			radioInfo: {
				type: Array,
				required: true,
			},

		},
		data() {
			return {
				isOpen: false,
				placeholder: '',
				poupValue: [],
			}
		},
		computed: {
			// let self = this;
			valueName: {
				get: function() {
					try {
						return this.arrList.filter(item => item.value == this.value)[0].name
					} catch (e) {
						return null
					}
				},
				set: function() {}
			},
			arrList() {
				let list = JSON.parse(this.radioInfo);
				return list.map(item => {
					return {
						value: item.id,
						name: item.value
					}
				})
			}
		},
		watch: {

			radioInfo: {
				handler: function(value) {
					value.length > 0 && this.$emit('update:value', value[0].value)
				},
				deep: true,
				// immediate: true
			},
			poupValue: {
				handler: function(value) {
					this.$emit('update:value', value[0])
					this.$emit("update:showError", false)
				},
				deep: true,
			}
		},
		created() {
			this.placeholder = '請選擇' + this.title;
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	@import '../form.scss';
</style>
