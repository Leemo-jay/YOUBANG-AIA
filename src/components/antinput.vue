<template>
	<div class="inputBox">
		<div v-if="rules == 'rate'">
			<input :placeholder="placeholder" @focus="isFocus = true" @blur="validate" class="ant-input" :value.sync="value" :disabled="readonly" @input="checkNum" onpaste="return false" />
			<div :class="{start : isFocus,end: isFocus === false&&!hasShowError,bgError:!isFocus&&hasShowError,isfocus:isFocus}" class="bgTest" :style="{'margin-top':mt}"></div>
		</div>
		<div v-else>
			<input :placeholder="placeholder" @focus="isFocus = true" @blur="validate" class="ant-input" :value.sync="value" :disabled="readonly" @input="checkNu" />
			<div :class="{start : isFocus,end: isFocus === false&&!hasShowError,bgError:!isFocus&&hasShowError,isfocus:isFocus}" class="bgTest" :style="{'margin-top':mt}"></div>
		</div>

		<span class="afterunit">{{unit}}</span>
		<p class="tip">{{tip}}</p>
	</div>
</template>

<script>
import regObj from '@/commonJs/regRule.js'
import { strleng, checkIdcard, IEVersion } from '@/commonJs/common.js'
export default {
	name: 'antinput',
	props: {
		placeholder: {
			type: String,
		},
		unit: {
			type: String,
		},
		tip: {
			type: String,
		},
		rules: {
			required: false,
		},
		value: {
			required: false
		},
		hasShowError: {
			required: false,
			type: Boolean
		},
		readonly: {
			required: false
		},
		errorMsg: {
			required: false
		},
		name: {
			required: false
		},
		ruleArr: {
			required: false
		}
	},
	data() {
		return {
			errMsg: '',
			isFocus: false,
			mt: '-0.125rem'
		}
	},
	computed: {

	},
	watch: {},
	methods: {
		validate(e) {
			this.isFocus = false
			if (this.rules != 'address' && this.rules != 'areaDetail' && this.rules != 'name') {
				e.target.value = e.target.value.replace(/[^\x00-\xff]/g, "")
			}
			this.$emit('update:value', e.target.value)
			let error = false
			if (this.rules) {
				let reg = regObj[this.rules];
				if (reg) {
					if (!reg.test(e.target.value)) {
						error = true
					}
					if (this.rules == 'height') {
						// let reg = regObj[this.rules];
						if (reg.test(e.target.value)) {
							if (parseInt(e.target.value) < 143 || parseInt(e.target.value) > 202) {
								// this.$emit('update:errorMsg', '填寫的身高不在143<=身高<=202範圍內')
								this.$emit('update:errorMsg', this.ruleArr[2].message)
								this.$emit('update:hasShowError', true)
								error = true
								return
							} else {
								this.$emit('update:errorMsg', this.errMsg)
								error = false
							}
						}
					}
				}
			}
			if (error) {
				let nan = /^[0-9]*$/
				if (e.target.value == '') {
					if (this.name == 'personalIncome' || this.name == 'familyIncome' || this.name == 'height' || this.name == 'weight' || this.name == 'benefitsRate') {
						this.$emit('update:errorMsg', this.ruleArr[0].message)
					} else {
						this.$emit('update:errorMsg', '不可為空')
					}
				} else if ((this.rules == 'height' || this.rules == 'weight') && !nan.test(e.target.value)) {
					console.log(`2------------`)
					this.$emit('update:errorMsg', this.ruleArr[1].message)
				} else {
					this.$emit('update:errorMsg', this.errMsg)
				}
				this.$emit('update:value', e.target.value)
				this.$emit('update:hasShowError', true)
			} else {
				this.$emit('update:value', e.target.value)
				this.$emit('update:hasShowError', false)
			}
			if (this.rules == 'rate') {
				let rul = /^(([1-9][0-9]{1,2})|[0])$/
				if (rul.test(e.target.value)) {
					if (parseInt(e.target.value) > 100 || parseInt(e.target.value) == 0) {
						this.$emit('update:errorMsg', this.ruleArr[1].message)
						this.$emit('update:hasShowError', true)
					} else {
						this.$emit('update:errorMsg', this.errMsg)
						this.$emit('update:hasShowError', false)
					}
				}
				this.$emit('checkSum')
			}
			if (this.rules == 'idCard') {
				if (this.ruleArr.length > 0) {
					if (e.target.value == '') {
						this.$emit('update:errorMsg', this.ruleArr[0].message)
					} else {
						let reg = regObj[this.rules];
						if (!reg.test(e.target.value)) {
							this.$emit('update:errorMsg', this.ruleArr[1].message)
						} else {
							let bol = checkIdcard(e.target.value)
							if (bol) {
								this.$emit('update:errorMsg', this.errMsg)
								this.$emit('update:hasShowError', false)
							} else {
								this.$emit('update:errorMsg', '請填寫正確受益人身分證號碼')
								this.$emit('update:hasShowError', true)
								return
							}
						}
					}
				}
				this.$emit('checkIdcard')
			}
			if (this.rules == 'areaDetail') {
				if (String(e.target.value).length > 50) {
					this.$emit('update:errorMsg', this.ruleArr[1].message)
					this.$emit('update:hasShowError', true)
				} else if (String(e.target.value).length < 2 || !String(e.target.value).includes('號')) {
					this.$emit('update:errorMsg', this.ruleArr[0].message)
					this.$emit('update:hasShowError', true)
				} else {
					this.$emit('update:errorMsg', this.errMsg)
					this.$emit('update:hasShowError', false)
				}
				this.$emit('checkAddress')
			}
			if (this.rules == 'name') {
				// let rul1 = /(^[\u4e00-\u9fa5\\.\\,\\ ]$)/     //中文
				// let rul2 = /^[a-zA-Z\\.\\,\\ ]$/   // 英文
				// let rul = /^[\u4e00-\u9fa5\\.\\,\\ ]{2,100}$|^[a-zA-Z\\.\\,\\ ]{4,200}$/
				let rul = /^[\u4E00-\u9FA5]{2,100}$|^[a-zA-Z]{4,200}$|^(([\u4E00-\u9FA5a-zA-Z ]))*$/
				let len = strleng(e.target.value)
				if (rul.test(e.target.value)) {
					if (len > 200) {
						this.$emit('update:errorMsg', this.ruleArr[1].message)
						this.$emit('update:hasShowError', true)
						// } else if (!rul.test(e.target.value)) {
					} else if (len < 4) {
						this.$emit('update:errorMsg', this.ruleArr[0].message)
						this.$emit('update:hasShowError', true)
					} else {
						this.$emit('update:errorMsg', this.ruleArr[0].message)
						this.$emit('update:hasShowError', false)
					}
				} else {
					this.$emit('update:errorMsg', this.ruleArr[0].message)
					this.$emit('update:hasShowError', true)
				}
			}
			if (this.rules == 'inCome' && this.name == 'personalAsset') {
				let rul = /^(([1-9][0-9]{0,5})|([1-9][0-9]{0,5}[.][0-9]{1})|([0])|([0][.][0-9]{1}))$/
				if (e.target.value == '') {
					this.$emit('update:errorMsg', this.ruleArr[0].message)
					this.$emit('update:hasShowError', true)
				} else {
					if (!rul.test(e.target.value)) {
						this.$emit('update:errorMsg', this.ruleArr[1].message)
						this.$emit('update:hasShowError', true)
					} else {
						this.$emit('update:errorMsg', this.ruleArr[0].message)
						this.$emit('update:hasShowError', false)
					}
				}
			}
			if (this.rules == 'inCome' && (this.name == 'personalIncome' || this.name == 'familyIncome')) {
				let rul = /^(([1-9][0-9]{0,5})|([1-9][0-9]{0,5}[.][0-9]{1})|([0])|([0][.][0-9]{1}))$/
				if (!rul.test(e.target.value)) {
					this.$emit('update:errorMsg', this.ruleArr[1].message)
					this.$emit('update:hasShowError', true)
				} else {
					this.$emit('update:errorMsg', this.ruleArr[0].message)
					this.$emit('update:hasShowError', false)
				}
			}

		},
		checkNu(e) {
			// let rul = /^\d\.[0-9]$/
			// let rul = /^((([0][\.]([0-9]){1})|([1-9]{1,})[\.][0-9]{1}))$/
			// if (rul.test(e.target.value)) {
			// 	console.log(`yes`, e.target.value)
			// 	return false
			// }
			//判断只能是数字3位且小数最多一位
			if (this.rules == 'height' || this.rules == 'weight') {
				e.target.value = e.target.value.replace(/[^\d.]/g, ""); //清除“數字”和“.”以外的字符
				e.target.value = e.target.value.replace(/\.{1,}/g, "."); //只保留第一个. 清除多余的   /^[0-9]{1,20}$/
				var index = e.target.value.indexOf(".");
				if (index == -1 && e.target.value.length > 3) {
					// e.target.value = e.target.value.split('');
					// console.log(`e--------------------`, e.target.value)
					// e.target.value.splice(3, e.target.value.length - 3);
					// console.log(`e--------------------`, e.target.value)
					// e.target.value = e.target.value.join('')
					e.target.value = e.target.value.substr(0, 3)
				}
				e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能填寫1个小數
				// value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能填寫两个小數
				return e.target.value
			}
			if (this.rules == 'inCome') {
				let rul = /^([\d]|[\d][\.][\d])*$/g
				if (rul.test(e.target.value)) {
					e.target.value = e.target.value.replace(/[^\d.]/g, ""); //清除“數字”和“.”以外的字符
					e.target.value = e.target.value.replace(/\.{1,}/g, "."); //只保留第一个. 清除多余的   /^[0-9]{1,20}$/
					var index = e.target.value.indexOf(".");
					if (index == -1 && e.target.value.length > 6) {
						// e.target.value = e.target.value.split('');
						// console.log(`e--------------------`, e.target.value)
						// e.target.value.splice(3, e.target.value.length - 3);
						// console.log(`e--------------------`, e.target.value)
						// e.target.value = e.target.value.join('')
						e.target.value = e.target.value.substr(0, 6)
					}
					e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能填寫1个小數
					// value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能填寫两个小數
					return e.target.value
				}
			}

		},
		checkNum(e) {
			// let rul = /^(([1][0][0])|([1][0][0][\.][0]{1,2})|([1-9][0-9]{0,1})|([0][\.](([1-9][0-9]{0,1})|([0][1-9])))|([1-9][0-9]{0,1}[\.][\d]{1,2}))$/
			// let rul = /^([1][0][0]|([1-9][0-9]{0,1}))$/
			e.target.value = e.target.value.replace(/[^\d]/g, "");
			if (e.target.value.indexOf(".")) {
				let arr = e.target.value.split('.')
				e.target.value = arr[0]
			}
			if (String(e.target.value).length > 3) {
				e.target.value = e.target.value.substr(0, 3)
			}
			// return e.target.value
			// e.target.value = e.target.value.replace(/[^\d.]/g, ""); //清除“數字”和“.”以外的字符
			// e.target.value = e.target.value.replace(/\.{1,}/g, "."); //只保留第一个. 清除多余的   /^[0-9]{1,20}$/
			// var index = e.target.value.indexOf(".");
			// if (index == -1 && e.target.value.length > 3) {
			// 	console.log(`get`)
			// 	// e.target.value = e.target.value.split('');
			// 	// e.target.value.splice(3, e.target.value.length - 3);
			// 	// e.target.value = e.target.value.join('')
			// 	e.target.value = e.target.value.substr(0, 3)
			// }
			// e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			// // e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能填寫1个小數
			// e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能填寫两个小數
			return e.target.value
		},
	},
	created() {
		this.errMsg = this.errorMsg
		if (IEVersion() > 0 || IEVersion() == 'edge') {
			this.mt = '-0.3rem !important'
		}

	}
}
</script>

<style lang="scss" scoped>

@media screen and (max-width: 1023px) {
	   .bgError,.bgTest {
			 margin-top: -.23rem!important;
			 &::before{
               height: .0625rem!important;
               top: .0625rem!important;
             }
		 }
	
}
.focusInput {
  border-width: 50% !important;
  border-color: $primary-color !important;
}
// .ant-input,
// .ant-input:focus {
.ant-input {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  background: rgba(0, 0, 0, 0) !important;
  font-size: 1.125rem;
}
.ant-input::placeholder {
  font-size: 1.125rem;
  font-family: 'Microsoft JhengHei' !important;
  font-weight: 400;
  color: rgba(190, 190, 190, 1);
  line-height: 2.1875rem;
}

// .ant-input:focus {
//   border-bottom: 0.0625rem solid $primary-color;
// }

.inputBox {
  position: relative;
  .ant-input {
    border-bottom: 0.125rem solid #e4e4e4;
    width: 92%;
  }
}

.afterunit {
  position: absolute;
  right: 0;
  top: 0;
}
.tip {
  margin-top: 0.3125rem;
  margin-bottom: 0.3125rem;
  color: $primary-color;
  // color:#476195;
  font-size: 1rem;
  letter-spacing: 0.0625rem;
  line-height: 1.4375rem;
  font-family: 'Microsoft JhengHei' !important;
  font-weight: 400;
}
.ant-input[disabled='disabled'] {
  background: #e1e1e1;
}
.bgTest {
  // margin-top: 0.625rem;
  // background: #e8e8e8;
  // background: linear-gradient(90deg,#e8e8e8 0%,blue 10% ,#e8e8e8 0%);
  // width: 85%;
  width: 30rem;
  height: 0.125rem;
  margin-top: -0.125rem;
  margin-top: -0.3rem \9;
  -ms-margin-top: -0.3rem;
  position: relative;
  // animation: deep1 4s ease-in-out infinite alternate;
}

.bgTest::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  // height: 100%;
  height: 0.125rem;
  // background: blue;
  // background: $primary-color;
  background: #a2b5f9;
  // animation: deep1 1s forwards;
}

.bgError::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  // height: 100%;
  height: 0.125rem;

  // background: blue;
  // background: $primary-color;
  background: $primary-color !important;
}
.isfocus::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  // background: blue;
  // background: $primary-color;
  background: #a2b5f9;
}

.start::before {
  animation: in 0.4s forwards;
}

.end::before {
  animation: out 0.4s forwards;
}

@keyframes in {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes out {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}
</style>
