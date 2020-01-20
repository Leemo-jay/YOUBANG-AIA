<template>
	<div class="">
		<!-- <div v-if='modefine' @click="$toastStop" class="disabledCom"></div>
		<div v-if='isSome' class="fontRight">
			<img class="imgT" v-if='value == "0000-00-00"' src="@/assets/radioChoose.png" />
			<img class="imgT" @click='changeIstrue(true)' v-else src="@/assets/noChoose.png" /> 長期
		</div> -->

		<div class="formDiv">
			<p :class="{required: required}" class="titleFont">{{title}}</p>
			<span class="rihgtThis" v-if="!ifshow">
				<input :type="type" ref="focus" @focus="changeFocus()" @blur="hideX" :disabled="disabled" :placeholder="grey || placeholder" @input="changeValue($event.target.value)" :value="value1" class="formInput" />
				<div :class="{start : isFocus,end: isFocus === false}" class="bgTest"></div>
				<div class="redError tip" v-if="showError && required">{{errorFinal || errorDesc || placeholder}}</div>

				<span class="dateIcon" @click="showPicker"></span>
			</span>
			<span class="rihgtThis" v-else>
				<div class="closeBtn" @click="closePicker">關閉</div>
				<div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px',marginTop: '15px'	 }">
					<a-calendar :validRange="validRange" :fullscreen="false" :mode="mode" @panelChange="panelChange" @select="select" />
				</div>
			</span>
		</div>
		<!-- <Datetime @on-hide="reset" @on-show="changeInnerHtml" v-model="value" :start-date="startDate" :end-date='endDate'>
			<slot>
				<div class="formDiv">
					<span class="titleFont required">{{title}}
						<span v-if="isHave" style="color: red;">*</span>
					</span>
					<span class="rihgtThis">
						<input :type="type" ref="focus" :disabled="true" :placeholder="grey || placeholder" :value="mingguoValue" class="formInput" />
						<img class="selectImg" style="height: 10px !important;width: auto;" src="@/assets/youbang/time.png" />
						<div class="tip">{{tip}}</div>
						<div class="redError" v-if="showError">{{errorDesc || placeholder}}</div>
					</span>
				</div>
			</slot>
		</Datetime> -->
	</div>
</template>
<script>
import moment from "moment"
import {
	getAge,
	timeOperation
} from '@/commonJs/common.js'
// import {
// 	Datetime
// } from 'vux'
export default {
	components: {
		// Datetime
		// DatePicker
	},
	name: 'comTime',
	props: {
		required: {
			type: Boolean,
			required: false,
			default: true
		},
		disabledDay: {
			type: String,
			required: false,
		},
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
		tip: {
			required: false,
		},
		grey: {
			required: false,
		},
		type: {
			required: false,
			default: false
		},

		value: {
			required: false,
			default: ''
		},
		isSome: {
			required: false,
			default: false
		},
		minYear: {
			required: false,
		},
		maxYear: {
			required: false,
		},
		modefine: {
			required: false,
			default: false
		},
		isHave: {
			required: false,
			default: false
		},

	},
	data() {
		return {
			isSelect: true,
			IsTrue: false,
			isShow: false,
			isFocus: false,
			autofocus: false,
			disabled: true,
			minYearL: 0,
			placeholder: '',
			pickdate: null,
			dateFormat: 'YYYY/MM/DD',
			validRange: [moment(timeOperation('year', -100)), moment(timeOperation('year', -20))],
			ifshow: false,
			mode: 'month',
			ifchange: false,
			value1: '',
		}
	},
	watch: {
		value: {
			handler: function (value) {
				if (value) {
					this.$emit("update:showError", false)
				}
				this.$emit('update:value', value)
			},
			immediate: true
		},
		ifshow: {
			handler: function (value) {
				if (value) {
					console.log(`im true now`)
					this.$nextTick(() => {
						let doc = document.querySelector('.formDiv .ant-select-selection-selected-value')
						doc.innerText = `${this.lt100(parseInt(doc.innerText.replace('年', '')) - 1911 - 20)}年`
						let ybtn = document.querySelector('.formDiv .ant-select-selection')
						let downbtn = document.querySelector('.formDiv .ant-select-arrow')
						ybtn.addEventListener('click', () => {
							// console.log(`im click now`)
							let timer = setTimeout(() => {
								let arr = document.querySelectorAll('.formDiv .ant-select-dropdown-menu-item')
								console.log(`arr1`,arr.length)
								arr.forEach(el => {
									if ((parseInt(el.innerText.replace('年', '')) - 1911) > 0) {
										el.innerText = `${this.lt100(parseInt(el.innerText.replace('年', '')) - 1911)}年`
									} else {
										return
									}
								})
								clearTimeout(timer)
							}, 0)
						})
						downbtn.addEventListener('click', () => {
							// console.log(`im click now`)
							let timer = setTimeout(() => {
								let arr = document.querySelectorAll('.formDiv .ant-select-dropdown-menu-item')
								arr.forEach(el => {
									if ((parseInt(el.innerText.replace('年', '')) - 1911) > 0) {
										el.innerText = `${this.lt100(parseInt(el.innerText.replace('年', '')) - 1911)}年`
									} else {
										return
									}
								})
								clearTimeout(timer)
							}, 0)
						})
					})
				}
			},
			immediate: true
		}
	},
	created() {
		this.placeholder = '請選擇' + this.title;
		this.value1 = this.value
	},
	mounted() { },
	methods: {
		changeInnerHtml() {
			let length = document.querySelector("div[data-role=year]").getElementsByClassName('scroller-item').length;
			for (let i = 0; i < length; i++) {
				let innerHtml = document.querySelector("div[data-role=year]").getElementsByClassName('scroller-item')[i]
				document.querySelector("div[data-role=year]").getElementsByClassName('scroller-item')[i].innerHTML = + innerHtml.innerHTML - 1911
			}

		},
		reset() {
			let length = document.querySelector("div[data-role=year]").getElementsByClassName('scroller-item').length;
			for (let i = 0; i < length; i++) {
				let innerHtml = document.querySelector("div[data-role=year]").getElementsByClassName('scroller-item')[i]
				document.querySelector("div[data-role=year]").getElementsByClassName('scroller-item')[i].innerHTML = + innerHtml.innerHTML + 1911
			}
		},
		isCanLong(value) { },
		changeIstrue(value) { },
		checkLen: function (value, len) { },
		changeValue: function (name) { },
		clearInput: function () { },
		hideX: function () { },
		showPicker() {
			if (!this.ifshow) {
				this.ifshow = true
			}
		},
		closePicker() {
			this.ifchange = false
			this.ifshow = false
		},
		// onChange(date, dateString) {
		// 	console.log(`date`, date)
		// 	console.log(`dateString`, dateString)
		// 	this.pickdate = date
		// },
		changeFocus() { },
		panelChange(value, mode) {
			console.log(`value`, value)
			console.log(`mode`, mode)
			let doc = document.querySelector('.formDiv .ant-select-selection-selected-value')
			doc.innerText = `${this.lt100(parseInt(value._d.getFullYear()) - 1911)}年`

		},
		select(date) {
			console.log(`date`, date._d)
			this.pickdate = date._d
			this.value1 = `${this.lt100(date._d.getFullYear() - 1911)}-${this.lt10(date._d.getMonth() + 1)}-${this.lt10(date._d.getDate())}`
			this.$emit('update', date._d)
			this.ifchange = false
			this.ifshow = false
		},
		lt10(num) {
			if (num < 10) return `0${num}`
			return num
		},
		lt100(num) {
			if (num < 10) { return `00${num}` }
			else if (num < 100) { return `0${num}` }
			else {
				return num
			}
		},

	},
	computed: {
		mingguoValue() {
			if (this.value.length == 0) return ''
			let stringEnd = this.value.substring(4)
			let stringStart = this.value.substring(0, 4)
			stringStart = + stringStart - 1911
			return stringStart + stringEnd
		},
		startDate() {
			let minYear = (this.minYear !== 0 && this.minYear !== '0') ? (this.minYear || -100) : 0
			return timeOperation('year', minYear)
		},
		endDate() {
			let maxYear = (this.maxYear !== 0 && this.maxYear !== '0') ? (this.maxYear || 100) : 0
			return timeOperation('year', maxYear)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../form.scss';
@media screen and (max-width: 320px) {
  .fontRight {
    width: px(150) !important;
  }

  .imgT {
    width: px(46);
    height: px(46);
    margin-right: px(16) !important;
  }
}

.fontRight {
  z-index: 1;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  // float: right;
  height: px(92);
  display: flex;
  align-items: center;
  width: px(194);
  justify-content: center;
  border-left: 1px solid #e8e8e8;

  // display: inline-block;
  .imgT {
    // width: px(46);
    height: px(46);
    margin-right: px(30);
  }
}
.formDiv {
  position: relative;

  .titleFont {
    width: 100%;
  }
  .dateIcon {
    position: absolute;
    bottom: 5px;
    right: 0;
    height: 20px;
    width: 20px;
    background: url('../../../assets/youbang/time.png') no-repeat center / 100%
      100%;
  }
  .rihgtThis {
    width: 100%;
    // position: relative;
    .pikerDate {
      margin-top: 10px;
      width: 100%;
      /deep/ .ant-input {
        padding-left: 0;
        border-style: none !important;
        border-bottom: 1px solid #e4e4e4 !important;
      }
    }
    .closeBtn {
      position: absolute;
      top: 50px;
      left: 15px;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      color: skyblue;
    }
  }
}
</style>
