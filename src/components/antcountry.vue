<template>
	<div class="commentBox commselectBox">
		<span class="searchCountry" @click="visible=true">
			<a-icon type="search" class="searchBtn" />搜尋國籍
		</span>
		<a-select style="width: 100%" :placeholder="show_value || placeholder" :class="show_value?'countryChecked':''" :value="show_value">
			<!-- <div slot="dropdownRender" slot-scope="menu">
			</div> -->
			<select-icon slot="suffixIcon" />

			<a-select-option v-for="(item,ind) in options" :key="ind" :value="item.value" @click="clickOne(item)">
				{{item.name}}
			</a-select-option>
		</a-select>
		<p class="tip">{{tip}}</p>
		<a-modal :visible="visible" :closable="closable" style="text-align: center;">
			<p class="mtitle">選擇國籍</p>
			<a-input class="components-input" :placeholder="grey" v-model="countryName" ref="countryNameInput">
				<a-icon slot="prefix" type="search" />
				<a-icon v-if="countryName" slot="suffix" type="close-circle" @click="emitEmpty" />
			</a-input>
			<a-table :columns="columns" v-if="countryName" :dataSource="data" :customRow="click" :pagination='pagination' size="small" rowKey='id' />
			<template slot="footer">
				<a-button class="canclemodalbtn" @click="handleCancel">取消</a-button>
			</template>
		</a-modal>
	</div>
</template>

<script>
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
			flag
		}
	}
}
export default {
	name: 'antcountry',
	props: {
		tip: {
			type: String
		},
		placeholder: {
			type: String
		},
		value: {
			required: false
		},
		show_value: {
			required: false
		},
		hasShowError: {
			required: false,

		}
	},
	components: {
		selectIcon
	},
	data() {
		return {
			closable: false,
			grey: "搜尋國籍關鍵詞",
			options: [],
			data: [],
			visible: false,
			countryName: '',
			pagination: false,
			block: false,
			columns: [{
				"title": "國籍",
				"align": 'center',
				"dataIndex": "name",
			}]
		}
	},
	methods: {
		emitEmpty() {
			this.$refs.countryNameInput.focus()
			this.countryName = ''
		},
		handleCancel(e) {
			this.visible = false
		},
		getData(coun) {
			let tepData = {
				"name": coun ? coun : this.countryName
			};
			this.Axios('countrylist', tepData)
				.then((res) => {
					this.data = res.data.data
				})
		},
		clickOne(value) {
			console.log(`value`, value)
			if (value === this.value) return
			this.$emit('update:value', value.code)

			this.$emit('update:show_value', value.name)

			this.$emit('update:hasShowError', false)
		},
		click(record, index) {
			return {
				on: {
					click: () => {
						console.log(`record`, record)
						this.$emit('update:value', record.code)
						this.$emit('update:show_value', record.name)
						this.$emit('update:hasShowError', false)
						if (record.code == '001') {
							this.$emit('checkIdcard')
						}
						this.visible = false
					}
				}
			}
		},
		sure() {
			this.visible = false
		},
		initdata() {
			let tepData = {
				"name": ''
			};
			this.Axios('countrylist', tepData)
				.then((res) => {
					this.options = res.data.data
				})
		}
	},
	watch: {
		countryName: {
			handler: function (value) {
				if (value) {
					this.getData()
				}
			},
			immediate: true
		}
	},
	mounted() {

	},
	updated() {
		let doc = document.getElementsByClassName('ant-table-placeholder')
		if (doc.length > 0) {
			doc[0].innerHTML = '暫無資訊'
		}

	},
	created() {
		if (this.value) {
			this.initdata()
			this.getData('本國人')
			this.$emit('update:show_value', '本國人')
		}
	}
}
</script>

<style lang="scss" scoped>

@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape){
.commselectBox .searchCountry{
	right: -15rem!important;
}
}


.commselectBox {
  position: relative;
  .searchCountry {
    position: absolute;
    top: -2.125rem;
    right: -11rem;
    font-size: 1rem;
    cursor: pointer;
  }
}
.content {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.title {
  margin: 0.625rem 0.625rem 0.625rem 0;
}

.mtitle {
  margin: 2.5rem;
  font-size: 1.875rem;
  font-weight: 600;
  color: #3a3a3a;
}
.span.components-input .ant-input,
.ant-input::placeholder {
  font-size: 1.25rem;
}
// {
// 		font-size: 1.25rem
// 	}

.components-input {
  width: 29.8125rem !important;
  height: 3rem !important;
  margin: 0.625rem 0 2.5rem 0 !important;
  .anticon {
    font-size: 1.25rem;
  }
}

.ant-btn > .anticon + span,
.ant-btn > span + .anticon {
  float: right;
  margin: 0.25rem 0 0 0;
}

.tip {
  font-size: 0.75rem;
  color: $primary-color;
  margin: 0.625rem 0 0.625rem 0;
  line-height: 1rem;
}
</style>
<style lang="scss">
.ant-modal-mask {
  background: #fff;
}
// .ant-modal-body {
// 	text-align: center;
// }
.ant-modal-content {
  border: 0.0938rem solid #dadada;
  box-shadow: none;
}
.ant-modal {
  width: 63.875rem !important;
  top: 13.125rem;
}
.ant-select.countryChecked .ant-select-selection__placeholder {
  color: rgba(0, 0, 0, 0.65);
}
.ant-modal-body {
  text-align: center !important;
  margin: 1.5rem 0 3.125rem !important;
}
.ant-modal-footer {
  position: absolute !important;
  left: 50%;
  padding-top: 1.875rem;
  transform: translateX(-50%);
  border-top: 0;
  padding-top: 3rem !important;
  margin-bottom: 5rem !important;
  .canclemodalbtn {
    width: 12.5rem;
    color: #808080;
    height: 3.125rem;
    line-height: 3.125rem !important;
    border-radius: 1.875rem;
  }
  span {
		display: block;
    height: 3.125rem;
    line-height: 3.025rem;
  }
}

.ant-table-body {
  margin: 0 !important;
  tr td {
    text-align: center;
    font-size: 0.875rem;
  }
}
.ant-table-thead {
  tr th {
    font-size: 1.0625rem;
    background: #e4e4e4 !important;
    border-radius: 0;
    font-weight: 400;
    letter-spacing: 0.0625rem;
    color: #272727 !important;
    text-align: center;
  }
}
</style>
