<template>
	<div class="commselectBox">
		<a-select style="width: 100%" @select="handleChange" :placeholder="placeholder" :value="value" :getPopupContainer="triggerNode => triggerNode.parentNode"  @dropdownVisibleChange=" chose_h5(options)">
			<select-icon slot="suffixIcon" />
			<!-- <a-icon slot="suffixIcon" type="smile" /> -->

			<a-select-option v-for="(item,ind) in options" :key="ind" :value="item.value" :disabled="cantIndex==0&&item.value=='04'">
				{{item.name}}
			</a-select-option>
			<p class="errorMsg" v-if="show">{{errorMsg}}</p>
		</a-select>
			<PopupPicker class='thisThis' title="demo"  :data="poupValue" v-model="poupValue1" :columns="1" :show.sync="show_picker" show-name @on-change="h5_get_select_value" ></PopupPicker>

	</div>
</template>


<script>
import { PopupPicker } from 'vux'

const flag = {
	template: `
		<svg t="1570848075961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2915" width="48" height="48"><path d="M259.38971 374.52151c-11.954677 0-23.909355-17.932016-11.954677-35.864032L492.505917 9.903852c5.977339-11.954677 17.932016-11.954677 29.886694-5.977338l5.977338 5.977338 245.070885 328.753626c11.954677 11.954677 0 35.864032-11.954677 35.864032H259.38971z m502.096447 274.957578c11.954677 0 23.909355 17.932016 11.954677 35.864032l-245.070885 328.753625c-5.977339 11.954677-17.932016 11.954677-29.886693 5.977339l-5.977339-5.977339-245.070884-328.753625c-11.954677-11.954677 0-35.864032 11.954677-35.864032h502.096447z" p-id="2916" fill="#727272"></path></svg>
	`
}
const selectIcon = {
	template: `
		 <a-icon :component="flag" />
	`,
	data() {
		return {
			flag,
		
		}
	}
}

export default {
	name: 'antselect',
	components: {
		selectIcon,
		PopupPicker
	},
	props: {
		options: {
			type: Array,
		},
		placeholder: {
			type: String
		},
		value: {
			required: false
		},
		hasShowError: {
			required: false
		},
		cantIndex: {
			required: false,
			type: Number
		},
		show: {
			required: false,
			type: Boolean,
			default: false
		},
		errorMsg: {
			required: false,
			type: String,
			default: ''
		},
	},
	data() {
		return {
			poupValue1:[],
				poupValue: [
					{
          name: '中国',
          value: 'china',
        }, {
          name: '美国',
          value: 'USA',
        },
				],
			show_picker:false
		}
	},
	computed: {},
	watch: {},
	methods: {
		chose_h5(value) {
			this.show_picker = true
			this.poupValue = value
		},
		h5_get_select_value(value) {
					this.poupValue.map(item => {
			this.$emit('update:value', value[0])

						if(item.value == value[0]) {
								this.$emit('update:show_value', item.name)
						}
					})
			this.$emit('update:hasShowError', false)


		},
		handleChange(value) {
			if (value === this.value) return
			this.$emit('update:value', value)
			for (let option of this.options) {
				if (option.value == value) {
					this.$emit('update:show_value', option.name)
				}
			}
			this.$emit('update:hasShowError', false)
		},
	},
	mounted() {
let mWidth = document.body.clientWidth;

      window.onresize = () => {
			this.show_picker = false
		}
	},
	created() {
		// if (this.index === 0) {
		// 	let arr = this.options.filter(el => {
		// 		return el.name != '法定繼承人'
		// 	})
		// 	this.$emit('update:options', arr)
		// }
	}
}
</script>

<style lang="scss">

@media screen and (max-width: 1023px){
	.ant-select-dropdown-menu {
		display: none!important;
	}
	.ant-select-arrow {
		margin-top: -.37rem
	}
	
}



.commselectBox .ant-select-selection {
  border-radius: 0 !important;
  height: 2.9375rem;
  color: #606060 !important;
  font-size: 1.125rem;
  border: 0.0875rem solid #727272 !important;
}
.ant-select-selection__rendered {
  color: #606060 !important;
  line-height: 2.9375rem !important;
}

.commselectBox .ant-select-focused .ant-select-selection {
  border: 0.0625rem solid #e64565;
}
.ant-select-arrow {
  font-size: 1.0625rem !important;
  top: 45% !important;
}
.commselectBox .errorMsg {
  margin-top: 0.625rem;
  color: $primary-color;
}
.ant-select-dropdown-menu-item {
  font-size: 1rem;
}
.ant-select-selection__rendered {
  color: #606060 !important;
  font-size: 1.125rem;
}
.ant-select-selection__placeholder,
.ant-select-search__field__placeholder {
  color: #606060 !important;
  font-size: 1.125rem;
}
</style>
