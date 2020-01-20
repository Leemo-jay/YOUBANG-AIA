<template>
	<div class="inputBox" style="width:100%">
		<!-- <a-row class="telephone" style="{width:100%}"> -->
		<!-- <a-col :span="4"><input @blur="validatefirst" class="ant-input" :reg='reg' :value="first" /></a-col>
			<a-col :span="2" style="text-align: center;">—</a-col>
			<a-col :span="8"><input @blur="validatesecond" class="ant-input" :reg='reg' :value="second" /></a-col>
			<a-col :span="1"> </a-col>
			<a-col :span="4"><input placeholder="分機" @blur="validatelast" class="ant-input" :value="last" /></a-col> -->
		<div style="width:100%">
			<div class="phone" style="width:15.8%">
				<input @focus="isFocus=true" @blur="validatefirst" class="phone_input" placeholder="區碼" :reg='reg' :value="first" style="{width:100%}" :class="{redbtbd:!isFocus&&hasShowError}" />
			</div>
			<div class="phone" style="width:4.32%,text-algin:center">
				<span class="hx">-</span>
			</div>
			<div class="phone" style="width:50.6%">
				<input @focus="isFocus=true" @blur="validatesecond" class="phone_input" :reg='reg' placeholder="電話" :value="second" style="{width:100%}" :class="{redbtbd:!isFocus&&hasShowError}" />
			</div>
			<div class="phone" style="width:4.16% "> </div>
			<div class="phone" style="width:23%">
				<input @focus="isFocus=true" placeholder="分機" @blur="validatelast" class="phone_input" style="{width:100%}" :value="last" :class="{redbtbd:!isFocus&&hasShowError}" />
			</div>
		</div>
		<!-- jaja -->
		<!-- <a-col :span="5"><input @blur="validatefirst" class="ant-input" :reg='reg' :value="first" /></a-col>
			<a-col :span="2" style="text-align: center;" class="one">—</a-col>
			<a-col :span="10"><input @blur="validatesecond" class="ant-input" :reg='reg' :value="second" /></a-col>
			<a-col :span="1"> </a-col>
			<a-col :span="5"><input placeholder="分機" @blur="validatelast" class="ant-input" :value="last" /></a-col> -->
		<!-- </a-row> -->
		<p class="tip">{{tip}}</p>
	</div>
</template>

<script>
import regObj from '@/commonJs/regRule.js'
export default {
	name: 'antphone',
	props: {
		placeholder: {
			type: String,
		},
		tip: {
			type: String,
			required: false,
			defalut: '連絡住所電話'
		},
		reg: {
			required: false,
			default: null
		},
		value: {
			required: false
		},
		first: {
			required: false,
			default: ''
		},
		second: {
			required: false,
			default: ''
		},
		last: {
			required: false,
			default: ''
		},
		name: {
			required: false
		},
		errorMsg: {
			required: false
		},
		hasShowError: {
			required: false
		}
	},
	data() {
		return {
			errMsg: '',
			isFocus: false
		}
	},
	computed: {
		ifError() {
			if (this.first != '' || this.last != '') {
				console.log(`1||3`)
				console.log(`1--------`, this.first)
				console.log(`2--------`, this.second)
				console.log(`3--------`, this.last)
				return this.first != '' && this.second != '' && regObj.first.test(this.first) && regObj.second.test(this.second) && regObj.last.test(this.last) && (String(this.first).length + String(this.second).length) >= 9
			}
			if (this.second != '') {
				console.log(`2`)
				console.log(`2`, this.second)
				return regObj.tel.test(this.second)
			}
			if (this.first == '' && this.second == '' && this.last == '') return false

		}
	},
	watch: {
		first(n, o) {
			this.$emit('update:hasShowError', !this.ifError)
		},
		second(n, o) {
			this.$emit('update:hasShowError', !this.ifError)
		},
		last(n, o) {
			console.log(`new`, n)
			console.log(`old`, o)
			// if(n){}
			this.$emit('update:hasShowError', !this.ifError)
		},
	},
	methods: {
		validatefirst(e) {
			this.isFocus = false
			console.log(`this.name`, this.name)
			e.target.value = e.target.value.replace(/[^\x00-\xff]/g, "")
			let first = e.target.value
			let rul = /^[0-9]*$/
			let lengthErr1 = this.name != 'phone' ? '受益人聯絡電話，區碼至少填寫2碼' : '要被保險人聯絡電話，區碼至少填寫2碼'
			let lengthErr2 = this.name != 'phone' ? '受益人聯絡電話，電話至少填寫5碼' : '要被保險人聯絡電話，電話至少填寫5碼'
			let lengthErr3 = this.name != 'phone' ? '受益人聯絡電話，分機號長度超過最高限制' : '要被保險人聯絡電話，分機號長度超過最高限制'
			let lengthErr4 = this.name != 'phone' ? '受益人聯絡電話，區碼+電話至少填寫9碼' : '要被保險人聯絡電話，區碼+電話至少填寫9碼'
			this.$emit('update:first', first)
			this.$emit('update:value', `${first}-${this.second}${this.last != '' ? `-${this.last}` : ''}`)
			if (first == '' && this.second == '' && this.last == '') {
				this.$emit('update:errorMsg', '請填寫聯絡電話')
				this.$emit('update:hasShowError', true)
			} else if ((first && !rul.test(first)) || (this.second && !rul.test(this.second)) || (this.last && !rul.test(this.last))) {
				this.$emit('update:errorMsg', '請填寫聯絡電話')
				this.$emit('update:hasShowError', true)
			} else if (String(first).length < 2 || String(first).length > 4) {
				this.$emit('update:errorMsg', lengthErr1)
				this.$emit('update:hasShowError', true)
			} else if (String(this.second).length < 5 || String(this.second).length > 10) {
				this.$emit('update:errorMsg', lengthErr2)
				this.$emit('update:hasShowError', true)
			} else if (this.last && String(this.last).length > 6) {
				this.$emit('update:errorMsg', lengthErr3)
				this.$emit('update:hasShowError', true)
			} else if (first && this.second && [...String(first), ...String(this.second)].length < 9) {
				this.$emit('update:errorMsg', lengthErr4)
				this.$emit('update:hasShowError', true)
			} else {
				this.$emit('update:errorMsg', this.errMsg)
				this.$emit('update:hasShowError', false)
			}
			// this.$emit('update:hasShowError', bol)
		},
		validatesecond(e) {
			this.isFocus = false
			e.target.value = e.target.value.replace(/[^\x00-\xff]/g, "")
			let second = e.target.value
			if (this.first != '' || this.last != '') {
				this.$emit('update:second', second)
				this.$emit('update:value', `${this.first}-${second}${this.last != '' ? `-${this.last}` : ''}`)
			} else {
				this.$emit('update:second', second)
				this.$emit('update:value', second)
			}
			let rul = /^[0-9]*$/
			let lengthErr1 = this.name != 'phone' ? '受益人聯絡電話，區碼至少填寫2碼' : '要被保險人聯絡電話，區碼至少填寫2碼'
			let lengthErr2 = this.name != 'phone' ? '受益人聯絡電話，電話至少填寫5碼' : '要被保險人聯絡電話，電話至少填寫5碼'
			let lengthErr3 = this.name != 'phone' ? '受益人聯絡電話，分機號長度超過最高限制' : '要被保險人聯絡電話，分機號長度超過最高限制'
			let lengthErr4 = this.name != 'phone' ? '受益人聯絡電話，區碼+電話至少填寫9碼' : '要被保險人聯絡電話，區碼+電話至少填寫9碼'
			if (this.first == '' && second == '' && this.last == '') {
				this.$emit('update:errorMsg', '請填寫聯絡電話')
				this.$emit('update:hasShowError', true)
			} else if ((this.first && !rul.test(this.first)) || (second && !rul.test(second)) || (this.last && !rul.test(this.last))) {
				this.$emit('update:errorMsg', '請填寫聯絡電話')
				this.$emit('update:hasShowError', true)
			} else if (String(this.first).length < 2 || String(this.first).length > 4) {
				this.$emit('update:errorMsg', lengthErr1)
				this.$emit('update:hasShowError', true)
			} else if (String(second).length < 5 || String(second).length > 10) {
				this.$emit('update:errorMsg', lengthErr2)
				this.$emit('update:hasShowError', true)
			} else if (this.last && String(this.last).length > 6) {
				this.$emit('update:errorMsg', lengthErr3)
				this.$emit('update:hasShowError', true)
			} else if (this.first && second && [...String(this.first), ...String(second)].length < 9) {
				this.$emit('update:errorMsg', lengthErr4)
				this.$emit('update:hasShowError', true)
			} else {
				this.$emit('update:errorMsg', this.errMsg)
				this.$emit('update:hasShowError', false)
			}
			// this.$emit('update:hasShowError', bol)
		},
		validatelast(e) {
			this.isFocus = false
			e.target.value = e.target.value.replace(/[^\x00-\xff]/g, "")
			let last = e.target.value
			this.$emit('update:last', last)
			this.$emit('update:value', `${this.first}-${this.second}${last != '' ? `-${last}` : ''}`)
			// this.$emit('update:hasShowError', bol)
			let rul = /^[0-9]*$/
			let lengthErr1 = this.name != 'phone' ? '受益人聯絡電話，區碼至少填寫2碼' : '要被保險人聯絡電話，區碼至少填寫2碼'
			let lengthErr2 = this.name != 'phone' ? '受益人聯絡電話，電話至少填寫5碼' : '要被保險人聯絡電話，電話至少填寫5碼'
			let lengthErr3 = this.name != 'phone' ? '受益人聯絡電話，分機號長度超過最高限制' : '要被保險人聯絡電話，分機號長度超過最高限制'
			let lengthErr4 = this.name != 'phone' ? '受益人聯絡電話，區碼+電話至少填寫9碼' : '要被保險人聯絡電話，區碼+電話至少填寫9碼'
			if (this.first == '' && this.second == '' && last == '') {
				this.$emit('update:errorMsg', '請填寫聯絡電話')
				this.$emit('update:hasShowError', true)
			} else if ((this.first && !rul.test(this.first)) || (this.second && !rul.test(this.second)) || (last && !rul.test(last))) {
				this.$emit('update:errorMsg', '請填寫聯絡電話')
				this.$emit('update:hasShowError', true)
			} else if (String(this.first).length < 2 || String(this.first).length > 4) {
				this.$emit('update:errorMsg', lengthErr1)
				this.$emit('update:hasShowError', true)
			} else if (String(this.second).length < 5 || String(this.second).length > 10) {
				this.$emit('update:errorMsg', lengthErr2)
				this.$emit('update:hasShowError', true)
			} else if (last && String(last).length > 6) {
				this.$emit('update:errorMsg', lengthErr3)
				this.$emit('update:hasShowError', true)
			} else if (this.first && this.second && [...String(this.first), ...String(this.second)].length < 9) {
				this.$emit('update:errorMsg', lengthErr4)
				this.$emit('update:hasShowError', true)
			} else {
				this.$emit('update:errorMsg', this.errMsg)
				this.$emit('update:hasShowError', false)
			}
		},
	},
	created() {
		this.errMsg = this.errorMsg
		console.log(`errMsg`, this.errMsg)
	}
}
</script>

<style lang="scss" scoped>

@media only screen and (max-width:1023px) {
	.inputBox {
		.phone {
			.redbtbd {
				border-bottom: .0625rem solid #d81f49
			}
			.phone_input  {
				&::placeholder {
					font-size: .9375rem
				}
				&:focus {
					border-bottom: .0625rem solid #a2b5f9
				}
				border-bottom: .0625rem solid #E4E4E4;
				font-size: .9375rem;
			}
			&:nth-child(1) {
				width: 3rem!important
			}
			&:nth-child(2) {
				width: .5rem!important
			}
			&:nth-child(3) {
				width: 5.8125rem!important
			}
			&:nth-child(4) {
				width: .2rem!important
			}
			&:nth-child(5) {
				width: 6.375rem!important
			}

		}
	}

}















@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .phone_input {
    border-radius: 0 !important;
  }
}
.phone {
  display: inline-block;
}
.phone_input {
  // border-radius: 0!important;
  padding-left: 0.625rem;
  border: none;
  border-bottom: .125rem solid #E4E4E4;
  width: 100%;
  height: 100%;
  font-size: 1.125rem;
  background: rgba(0, 0, 0, 0);
	padding-bottom: 0.25rem;
	color: #606060
}
.redbtbd {
  border-bottom: .125rem solid $primary-color;
}
.phone_input:focus {
  // border-bottom: 0.0625rem solid red;
  border-bottom: .125rem solid #a2b5f9;
}
.phone_input::placeholder {
	font-size: 1.125rem;
	color: #BEBEBE;
}
.hx {
  width: 100%;
  text-align: center;
}
.ant-input,
.ant-input:focus {
  width: 100%;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;

  box-shadow: none;
  font-size: 1rem;
  -webkit-box-shadow: none;
  background: none;
}
.telephone {
  // width: auto !important
}

.ant-input:focus {
  border-bottom: 0.0625rem solid $primary-color;
}

.inputBox {
  position: relative;
}

.afterunit {
  position: absolute;
  right: 0;
  top: 0;
}
.one {
  font-size: 0.75rem;
  font-weight: 600;
}
.tip {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #546c9d;
}
.bgTest {
  // margin-top: 0.625rem;
  // background: #e8e8e8;
  // background: linear-gradient(90deg,#e8e8e8 0%,blue 10% ,#e8e8e8 0%);
  // width: 85%;
  width: 100%;
  height: 0.06rem;
  margin-top: -0.3rem;
  position: relative;
  // animation: deep1 4s ease-in-out infinite alternate;
}

.bgTest::before {
  content: '';
  position: absolute;
	top: 0;
	// top: -0.125rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0%;
  height: 100%;
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
  height: 100%;
  // background: blue;
  // background: $primary-color;
  background: $primary-color !important;
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
