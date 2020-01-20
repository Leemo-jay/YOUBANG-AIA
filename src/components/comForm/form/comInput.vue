<template>
	<div class="">
		<div v-if="!isCode">
			<div class="formDiv">
				<span :class="{required: required}" class="titleFont">{{title}}</span>
				<span class="rihgtThis">
					<input :type="type" ref="focus" @focus="changeFocus()" @blur="hideX" :disabled="disabled" :placeholder="grey || placeholder" @input="changeValue($event.target.value)" :value="value" class="formInput" />
					<div :class="{start : isFocus,end: isFocus === false&&!showError,bgError:!isFocus&&showError&&required,isfocus:isFocus}" class="bgTest"></div>
					<!-- <img @click="clearInput" v-show="showX" class="selectImg" src="@/assets/inputDel.png" /> -->
					<div class="tip">{{tip}}</div>
					<div class="redError" v-if="(showError && required)|| ((reg=='member'||reg=='tel'||reg=='email') && value!='' && showError)">{{errorFinal || errorDesc || placeholder}}</div>
				</span>
			</div>
			<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
		</div>
		<div v-else>
			<div class="formDiv" style="width: 160px;">
				<span :class="{required: required}" class="titleFont">{{title}}</span>
				<span class="rihgtThis">
					<input :type="type" ref="focus" @focus="changeFocus()" @blur="hideX" :disabled="disabled" :placeholder="grey || placeholder" @input="changeValue($event.target.value)" :value="value" class="formInput" />
					<div :class="{start : isFocus,end: isFocus === false&&!showError,bgError:!isFocus&&showError&&required,isfocus:isFocus}" class="bgTest"></div>
					<div class="redError" v-if="(showError && required)|| ((reg=='member'||reg=='tel'||reg=='email') && value!=''&& showError)">{{errorFinal || errorDesc || placeholder}}</div>
				</span>
			</div>
			<div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
		</div>

	</div>
</template>
<script>
import regObj from '@/commonJs/regRule.js'
import { strleng, reg_input, checkIdcard } from '@/commonJs/common.js'
export default {
	name: 'comInput',
	props: {
		title: {
			type: String,
			required: false,
			default: '打开App, 浏览更多'
		},
		errorDesc: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false,
			default: true
		},
		showError: {
			type: Boolean,
			required: false,
			default: false
		},
		isCode: {
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
			default: false
		},
		tip: {
			required: false,
		},
		grey: {
			required: false,
		},
		disabled: {
			required: false,
			default: false
		},
		isHave: {
			required: false,
			default: true
		},
		reg: {
			required: false,
			default: null
		},
		modefine: {
			required: false,
			default: false
		},
	},
	data() {
		return {
			isFocus: '',
			showX: false,
			autofocus: false,
			placeholder: '',
			errorFinal: '',
			errMSg: ''
		}
	},
	watch: {},
	created() {
		this.placeholder = '請填寫' + this.title;
		if (this.errorDesc) {
			this.errMSg = this.errorDesc
		}
	},
	methods: {
		changeFocus() {
			this.isFocus = true;
		},
		changeError(value) {
			this.$emit("update:showError", value)
		},
		changeValue: function (name) {
			reg_input(name, 1)
			if (this.reg != 'name') {
				name = name.replace(/[^\x00-\xff]/g, "")
			}
			if (name) {
				this.showX = true;
			} else {
				this.changeError(false)
				this.showX = false;
			};
			//console.log(name)
			this.$emit("update:value", name)
		},
		clearInput: function () {
			// alert(1)
			this.$emit("update:value", '')
			this.showX = false;
		},
		hideX: function () {
			this.isFocus = false;
			// 解决ios 上虚拟键盘消失頁面不回弹問題
			document.body.scrollTop = document.body.scrollTop - 1;
			this.showX = false;
			if (!this.value) {
				if (this.reg == 'name') {
					this.errorFinal = this.errorDesc
				} else if (this.reg == 'tel') {
					this.errorFinal = '請填寫手機號碼'
				} else if (this.reg == 'email') {
					this.errorFinal = '請填寫電子郵件信箱'
				} else {
					this.errorFinal = this.placeholder
				}
				this.$emit('update:errorDesc', this.errorFinal)
				this.changeError(true)
				return
			} else {
				this.$emit('update:errorDesc', this.errMSg)
				this.changeError(false)
			}
			if (!this.reg) return
			let reg = regObj[this.reg];
			if (!reg.test(this.value)) {
				if (this.reg == 'name') {
					// let rul1 = /(^[\u4e00-\u9fa5\\.\\,\\ ]$)/     //中文
					// let rul2 = /^[a-zA-Z\\.\\,\\ ]$/   // 英文
					let rul = /^[\u4E00-\u9FA5]{2,100}$|^[a-zA-Z]{4,200}$|^(([\u4E00-\u9FA5a-zA-Z ]))*$/
					let len = strleng(this.value)
					if (rul.test(this.value)) {
						if (len > 200) {
							this.errorFinal = '姓名長度超過限制，請重新填寫'
							this.$emit('update:errorDesc', this.errorFinal)
							this.changeError(true)
							// } else if (!rul.test(this.value)) {
						} else if (len < 4) {
							this.errorFinal = '姓名請至少填寫2個中文字（4個英文字）'
							this.$emit('update:errorDesc', this.errorFinal)
							this.changeError(true)
						} else {
							this.errorFinal = this.errorDesc
							this.$emit('update:hasShowError', false)
						}
					} else {
						this.errorFinal = '姓名請至少填寫2個中文字（4個英文字）'
						this.$emit('update:errorDesc', this.errorFinal)
						this.changeError(true)
					}
				} else if (this.reg == 'email') {
					this.errorFinal = 'Email格式錯誤或不存在'
					this.$emit('update:errorDesc', this.errorFinal)
					this.changeError(true)
				} else if (this.reg == 'tel') {
					this.errorFinal = '電話號碼格式錯誤'
					this.$emit('update:errorDesc', this.errorFinal)
					this.changeError(true)
				}
				else {
					this.errorFinal = this.errorDesc
					this.$emit('update:errorDesc', this.errorFinal)
					this.changeError(true)
				}
			} else {
				if (this.reg == 'idCard') {
					let bol = checkIdcard(this.value)
					if (bol) {
						// alert('正确的卡号')
						this.errorFinal = this.errorDesc
						this.$emit('update:errorDesc', this.errorFinal)
						this.changeError(false)
					} else {
						// alert('错误的卡号')
						this.errorFinal = '請填寫正確身分證字號'
						this.$emit('update:errorDesc', this.errorFinal)
						this.changeError(true)
					}

				} else {
					if (this.reg == 'member') {
						this.$emit('checkReferrerCode')
					}
					this.errorFinal = this.errorDesc
					this.changeError(false)
				}
			}


		}
	},
}
</script>

<style lang="scss" scoped>
@import '../form.scss';
</style>
