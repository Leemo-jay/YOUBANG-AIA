<template>
  <div>
    <!-- <div class="cascaderBox">
			<a-cascader style="width: 100%" :options="options?options:[]" :fieldNames='fieldNames' :loadData="loadData" :value="selectedoption" @change="onChange" :placeholder="placeholder" @popupVisibleChange="popupVisibleChange" changeOnSelect /> -->
    <ant-select-address :options_list="options" @get_city="getCity" @get_info="getInfo" @updateOne="updateOne" @updateTwo="updateTwo" @updateThree="updateThree" :postcode="postcode" :first-word.sync="firstWord" :second-word.sync="secondWord" :last-word.sync="lastWord" @updateCity="updateCity" />
    <!-- <p class="address">
				<span class="label">郵遞區saf 號：</span>
				<input v-model="postcode" type="text" class="input" disabled placeholder="郵遞區號">
			</p> -->

  </div>
  </div>
</template>

<script>
import antSelectAddress from './antselectaddress.vue'
export default {
  name: "antcascader",
  components: {
    antSelectAddress
  },
  props: {
    placeholder: {
      type: String
    },
    value: {
      required: false
    },
    selectedoption: {
      required: false
    },
    options: {
      required: false,
    },
    options1: {
      required: false,
    },
    options2: {
      required: false,
    },
    options3: {
      required: false,
    },
    hasShowError: {
      required: false,
    },
    postcode: {
      required: false,
      default: ''
    },
    show_value: {
      required: false,
      default: ''
    },
    firstWord: {
      type: String,
      required: false
    },
    secondWord: {
      type: String,
      required: false
    },
    lastWord: {
      type: String,
      required: false
    },
    postcode: {
      required: false
    },

  },
  watch: {},
  data() {
    return {
      fieldNames: {
        label: 'areaName',
        value: 'areaCode',
        children: 'children'
      }
    }
  },
  methods: {
    updateCity(obj) {
      if (obj.ste == 1) {
        this.$emit(`update:firstWord`, obj.city)
        this.$emit(`update:secondWord`, undefined)
        this.$emit(`update:lastWord`, undefined)
      } else if (obj.ste == 2) {
        this.$emit(`update:secondWord`, obj.city)
        this.$emit(`update:lastWord`, undefined)
      } else {
        this.$emit(`update:lastWord`, obj.city)
      }
    },
    getInfo(info) {
      console.log(`info------------------------address`, info)
      this.$emit('update:selectedoption', info.values.join(','))
      this.$emit('update:value', info.values.join(','))
      this.$emit('update:postcode', info.code)
      this.$emit('update:show_value', info.address)
      this.$emit('update:hasShowError', false)
      this.$emit('updateErrorAddress', false)
      console.log(`this.show_value____`, this.show_value)
    },
    updateOne(val) {
      if (val) {
        console.log(`val -------11111111 --111--111111- --------- `, val)
        // this.$emit('update:value', record.id)
        this.$emit('update:show_value', val.areaName)
        this.$emit('update:postcode', '')
        // this.$emit('update:jobType', '')
        this.$emit('update:firstWord', val.areaName)
        this.$emit('update:secondWord', undefined)
        this.$emit('update:lastWord', undefined)
        this.$emit('update:value', '')
        // this.$emit('select', record)
        this.$emit('update:hasShowError', true)
        this.$emit('updateErrorAddress', true)
      } else {
        // this.$emit('update:secondWord', undefined)
        // this.$emit('update:lastWord', undefined)
        // this.$emit('update:postcode', '')
      }
      // this.$emit('update:errorMsg', '請選擇職業別')
      // this.options2 = []
      // this.options3 = []
    },
    updateTwo(val) {
      if (val) {
        console.log(`val -------22222222 --222--222222222- --------- `, val)
        // this.$emit('update:value', record.id)
        this.$emit('update:show_value', this.$emit('update:show_value', `${this.firstWork}${val.areaName}`))
        this.$emit('update:postcode', '')
        // this.$emit('update:jobType', '')
        this.$emit('update:hasShowError', true)
        // this.$emit('select', record)
        this.$emit('update:value', '')
        this.$emit('update:secondWord', val.areaName)
        this.$emit('update:lastWord', undefined)
        this.$emit('updateErrorAddress', true)
      } else {
        // this.$emit('update:lastWord', undefined)
        // this.$emit('update:postcode', '')
      }
      // this.$emit('update:errorMsg', '請選擇職業性質')
      // this.options3 = []
    },
    updateThree(val) {
      console.log(`val -------3333 --333--3333333333- --------- `, val)
      // this.thrSelect = record.proName
      // this.$emit('update:value', record.id)
      this.$emit('update:lastWord', val.city)
      // this.$emit('update:jobType', record[this.levelType])
      this.$emit('update:show_value', `${val.code}${this.firstWord}${this.secondWord}${val.city}`)
      // this.$emit('update:errorMsg', '請選擇職業')
      // this.$emit('update:hasShowError', false)
      // this.$emit('select', record)
      console.log(`this.show_value`, this.show_value)
    },
    // onChange(value, selectedOptions) {
    // 	console.log(`selectedOptions`, selectedOptions)
    // 	this.$emit('update:value', value.join(","))
    // 	this.$emit('update:selectedoption', value)
    // 	console.log(value)
    // 	if (selectedOptions && selectedOptions.length > 1) {
    // 		this.$emit('update:postcode', selectedOptions[selectedOptions.length - 1].postalCodePrefix)
    // 		if (selectedOptions.length == 3) {
    // 			let firstOption = selectedOptions[0];
    // 			let secondOption = selectedOptions[1];
    // 			let lastOption = selectedOptions[2];
    // 			this.$emit('update:show_value', firstOption.areaName + '/' + secondOption.areaName + '/' + lastOption.areaName)
    // 			this.$emit('update:hasShowError', false)
    // 		}
    // 	} else {
    // 		this.$emit('update:postcode', '')
    // 		this.$emit('update:show_value', '')
    // 		this.$emit('update:hasShowError', true)
    // 	}
    // },
    loadData(selectedOptions) {
      if (selectedOptions.length < 3) {
        let isLeaf = false
        if (selectedOptions.length > 1) {
          isLeaf = true
        }
        const targetOption = selectedOptions[selectedOptions.length - 1];
        let tep = {
          parentAreaCode: targetOption.areaCode
        }
        let options = [...this.options]
        let self = this
        this.Axios('getArea', tep)
          .then(res => {
            targetOption.children = res.data.data
            for (let option of targetOption.children) {
              self.$set(option, 'isLeaf', isLeaf)
            }
            this.$emit('update:options', options)
            console.log('options', options)
          })
          .catch(err => {
            // console.log(err)
          })
      }
    },
    getCity() {
      let tep = {
        parentAreaCode: 0
      }
      let self = this
      this.Axios('getArea', tep)
        .then(res => {
          let options = res.data.data
          for (let option of options) {
            self.$set(option, 'isLeaf', false)
          }
          this.$emit('update:options', options)
          // console.log(options)
        })
        .catch(err => {
        })
    },
    popupVisibleChange(val) {
      if (this.options == null && val) {
        this.getCity()
      }
    }
  },
  created() { },
};
</script>

<style lang="scss" scoped>
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  /* style */
  .ant-input {
    font-size: 1.25rem !important;
  }
}

.cascaderBox {
  .address {
    padding-bottom: 10px;
    .input {
      height: 39px;
      margin-top: 20px;
      border: none;
      outline: none;
      padding: 0 10px;
      cursor: not-allowed;
    }
  }
}
.title {
  margin: 0 0 10px 0;
}

.ant-input,
.ant-input:focus {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  box-shadow: none;
  -webkit-box-shadow: none;
  background: none;
  color: #3a3a3a;
}

.ant-input:focus {
  border-bottom: 1px solid $primary-color;
}

.inputBox {
  position: relative;
}

.afterunit {
  position: absolute;
  right: 0;
  top: 0;
}

.tip {
  font-size: 12px;
}
</style>
<style lang="scss">
.cascaderBox .ant-cascader-input.ant-input {
  height: 40px;
  border-radius: 0;
}
</style>
