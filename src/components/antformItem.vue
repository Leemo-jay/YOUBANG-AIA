<template>
  <div class="lis">
    <div v-if="item.type=='tip'">
      <p class="itemtip" :class="item.name=='jobTip'?'mt10':''">{{item.label}}</p>
    </div>
    <div v-else-if="item.type=='label'">
      <a-form-item :label="item.label" class='linelabelitem' v-if="item.show == false">
        <span>{{formatData(item)}}</span>
      </a-form-item>
    </div>
    <!-- 	<div v-else-if="item.type=='birthday'">
		<comTime :value.sync='item.value' :minYear="item.minYear" :maxYear="item.maxYear" :showError.sync='item.hasShowError'
		 :errorDesc="item.errorMsg" :ageT="item.ageT" :title="item.label" :id="item.id" :tip="item.tip" :grey="item.placeholder"
		 :otherSome="item.id == 'effectDate' ? true : false " :isSome="item.param_type == 'dateever' ? true : false "
		 :modefine="item.modefine" @update="update" :required='item.required?item.required:false'></comTime>
	</div> -->
    <div v-else-if="item.type== 'birthday'">
      <selectTime class="timeH5" :modefine="item.modefine" :reg='item.bds?item.bds:item.rules' :value.sync='item.value' :id="item.id" :showError.sync='item.hasShowError' :errorDesc="item.errorMsg" :title="item.label" :grey="item.placeholder" :maxYear="item.maxYear" :minYear="item.minYear" :name="item.name" :testFree="testFree" :widget.sync="item.widget"></selectTime>
      <comNewTime class="timePC" :reg='item.bds?item.bds:item.rules' :value.sync='item.value' :id='item.id' :showError.sync='item.hasShowError' :errorDesc="item.errorMsg" :title="item.label" :tip="item.tip" :required="item.required?item.required:false" :grey="item.placeholder" :minAge="item.maxYear" :maxAge="item.minYear" :name="item.name" :testFree="testFree"></comNewTime>
    </div>
    <div v-else :class="item.width && item.pb == true?'pb':''">
      <a-form-item :class="[{'lineitem':line==1},{'linefeeditem':line!=1},{'addressSelect':item.type=='address'}]" :validate-status="item.hasShowError&&item.type!='address'?'error':''" :help="item.hasShowError&&item.type!='address'?item.errorMsg:''" :label="item.name!='sidelineJobId'&& item.name!='sameAsCustomer'&&item.name!='beneficiaryType'?item.label:''" :required='item.required' :label-col="{ span: labelcol }" :wrapper-col="{ span: wrappercol }">
        <antinput v-if="item.type == 'text'" @validate="validate" @checkSum="checkSum" @checkIdcard="checkIdcard" @checkAddress="checkAddress" :placeholder="item.placeholder" :unit="item.unit" :tip="item.tip" :rules="item.rules" :value.sync="item.value" :hasShowError.sync="item.hasShowError" :errorMsg.sync="item.errorMsg" :readonly="item.readonly" :name="item.name" :ruleArr="item.ruleArr"></antinput>

        <antradio v-else-if="item.type == 'radio'" :options="item.options" :list="item.list" :value.sync="item.value" :show_value.sync="item.show_value" :hasShowError.sync="item.hasShowError" :name="item.name"></antradio>

        <antselect v-else-if="item.type == 'select'" :placeholder="item.placeholder" :options.sync="item.options" :value.sync="item.value" :show_value.sync="item.show_value" :hasShowError.sync="item.hasShowError" :cantIndex="index" :show="item.show" :errorMsg="item.errorMsg"></antselect>

        <antcascader v-else-if="item.type == 'address'" :placeholder="item.placeholder" :options.sync="item.options" :options1.sync="item.options1" :options2.sync="item.options2" :options3.sync="item.options3" :value.sync="item.value" :show_value.sync="item.show_value" :selectedoption.sync="item.selectedoption" :hasShowError.sync="item.hasShowError" :postcode.sync="item.postcode" :first-word.sync="item.firstWord" :second-word.sync="item.secondWord" :last-word.sync="item.lastWord" @updateErrorAddress='updateErrorAddress'></antcascader>

        <!-- <antoccupation v-else-if="item.type == 'zy'" :placeholder="item.placeholder" :tip="item.tip" :value.sync="item.value" :show_value.sync="item.show_value" :hasShowError.sync="item.hasShowError" :vocationInfo="vocationInfo" :jobType.sync="item.jobType" :levelType="item.levelType" :width="item.width" @select="updateSelect">
			</antoccupation> -->
        <!-- 三级职业 -->
        <antvocation v-else-if="item.type == 'zy'" :options1.sync="item.options1" :options2.sync="item.options2" :options3.sync="item.options3" :placeholder="item.placeholder" :placeholdertwo="item.placeholdertwo" :placeholderthr="item.placeholderthr" :tip="item.tip" :value.sync="item.value" :show_value.sync="item.show_value" :show_valuetwo.sync="item.show_valuetwo" :show_valuethr.sync="item.show_valuethr" :hasShowError.sync="item.hasShowError" :vocationInfo="vocationInfo" :jobType.sync="item.jobType" :errorMsg.sync="item.errorMsg" :levelType="item.levelType" :width="item.width" @select="updateSelect" :first-word.sync="item.firstWord" :second-word.sync="item.secondWord" :last-word.sync="item.lastWord" :name="item.name">
        </antvocation>

        <antphone v-else-if="item.type == 'phone'" :tip="item.tip" :value.sync="item.value" :first.sync="item.first" :second.sync="item.second" :last.sync="item.last" :name="item.name" :hasShowError.sync="item.hasShowError" :errorMsg.sync="item.errorMsg"></antphone>

        <antcountry v-else-if="item.type == 'country'" :placeholder="item.placeholder" :tip="item.tip" :value.sync="item.value" :show_value.sync="item.show_value" :hasShowError.sync="item.hasShowError" @checkIdcard="checkIdcard"></antcountry>

        <span v-else>{{item.value}}</span>
      </a-form-item>

    </div>
  </div>
</template>

<script>
import antoccupation from './antoccupation.vue'
import antvocation from './antvocation.vue'
import antcascader from './antcascader.vue'
import antradio from './antradio.vue'
import antselect from './antselect.vue'
import antinput from './antinput.vue'
import antphone from './antphone.vue'
import antcountry from './antcountry.vue'
import selectTime from '@/components/comFormH5/form/selectTime'
import comNewTime from '@/components/comForm/form/comNewTime'
import {
  formatmyyear
} from '@/commonJs/common.js'
import ComTime from "./comFormH5/form/comTime";
export default {
  name: 'antformItem',
  components: {
    ComTime,
    antoccupation,
    antvocation,
    antcascader,
    antradio,
    antselect,
    antinput,
    antphone,
    antcountry,
    selectTime,
    comNewTime
  },
  props: {
    item: {
      type: Object,
      required: false
    },
    line: {
      type: String,
      default: '1'
    },
    vocationInfo: {
      type: [Object, String],
      required: false
    },
    index: {
      type: Number,
      required: false
    },
    testFree: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      help: '',
      status: '',
      labelcol: 24,
      wrappercol: 24,
      clientWidth: ''
    }
  },
  computed: {},
  watch: {
    "item.value": {
      handler: function (val) {
          console.log('changeItemValue=========',val)

        var formatDate = function () {
          let formatDateData
          if((parseInt(val.substr(0, 4)) - 1911) < 100){
            formatDateData = '0' + (parseInt(val.substr(0, 4)) - 1911).toString()
            return formatDateData
          }else{
            formatDateData = (parseInt(val.substr(0, 4)) - 1911).toString()
            return formatDateData
          }
        }
        if (this.item.type == "birthday") {
          console.log('birthdagy',this.item,val)
          if (val && val.length == 10) {
            this.$set(this.item, "transformvalue", `${formatDate()}${val.substr(4)}`)
            this.$set(this.item, "show_value", `${parseInt(val.substr(0, 4)) - 1911}/${val.substr(5, 7)}/${val.substr(8)}`)
          } else {
            // this.$set(this.item, "transformvalue", '')
            // this.$set(this.item, "show_value", '')
          }
        }
        if (this.item.rules == 'areaDetail') {
          return this.$emit('checkAddress')
        }
        if (this.item.name == 'sameAsCustomer') {
          this.$emit('changeSame', val)
        }
        this.$emit('change', this.item)
      },
      deep: true,
      //				immediate: true
    }
  },
  methods: {
    formatData(item) {
      if (item.name == 'birthday') {
        let arr = item.value.split('-')
        return `${this.lt100(parseInt(arr[0]) - 1911)}/${arr[1]}/${arr[2]}`
      }
      return item.value
    },
    lt100(val) {
      if (val < 100) return `0${val}`
      return val
    },
    validate() {
    },
    checkSum() {
      this.$emit('checkSum')
    },
    checkIdcard() {
      this.$emit('checkIdcard')
    },
    checkAddress() {
      this.$emit('checkAddress')
    },
    reset() {
      if (this.line == 1) {
        this.labelcol = 5
        this.wrappercol = 19
      } else {
        this.labelcol = 24
        this.wrappercol = 24
      }
    },
    update(value) {
      this.item.value = formatmyyear(value)
    },
    updateSelect(val) {
      this.$emit('select', val)
    },
    updateErrorAddress(val) {
      this.$emit('updateErrorAddress', val)
    }
  },
  mounted() {
    let that = this
    window.addEventListener('resize', function () {
        that.clientWidth = document.body.clientWidth
    })

  },
  created() {
    this.clientWidth = document.body.clientWidth
    this.reset()
  }
}
</script>

<style lang="scss" scoped>

@media screen and (max-width:1023px){
 .lis{
   .linefeeditem {
     margin-top: 1.6rem!important;
     margin-bottom: 0!important;
     /deep/ .ant-form-item-label{
       margin-bottom: 0!important;
       padding-bottom: 0.2rem!important;
       label {
         font-size: 15px!important
       }
      }
   }
 }
  .timeH5{
    display: block;
  }
  .timePC{
    display: none;
  }
}
@media screen and (min-width: 1024px){
  .timeH5{
    display: none;
  }
  .timePC{
    display: block;
  }
}
/deep/.linefeeditem {
  margin-top: 1.25rem;
  .ant-form-item-label {
    label {
      &::before {
        margin-top: 0.5rem;
        margin-right: .125rem
      }
    }

  }
}
.labeltext {
  margin: 0 0 0.625rem 0;
}

.labelbefore {
  text-align: left;
  width: max-content;
  float: left;
}

.linefeeditem /deep/ .labelbefore:after {
  content: ':';
  font-family: 'Microsoft JhengHei' !important;
  margin: 0 0.5rem;
  position: relative;
  top: -0.0313rem;
}

.linefeeditem.ant-form-item {
  margin: 2rem 0 2.5rem 0;
}
.lineitem.ant-form-item {
  margin: 0;
}
.itemtip {
  color: $primary-color;
  margin: 0.625rem 0 0.625rem 0;
  font-size: 1rem;
  font-family: 'Microsoft JhengHei' !important;
  font-weight: 400;
  color: rgba(211, 17, 69, 1);
  // line-height:1.875rem;
}
.pb {
  padding-bottom: 1.4375rem;
  border-bottom: 0.125rem solid rgba(84, 84, 84, 0.49);
  margin-bottom: 1.4375rem;
}
</style>
<style lang="scss">


.lis /deep/ .addressSelect {
  margin-bottom: 1.25rem !important;
}
.lis /deep/ .mt10 {
  padding-top: 20px !important;
}
.lineitem .ant-form-item-label {
  text-align: left;
  display: inline-block;
}

.ant-form-item-control-wrapper .ant-form-item-control {
  // height:1.1875rem;
  vertical-align: middle;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
  line-height: 2.1875rem;
  text-align: left;
  width: 100%;
  display: inline-block;
}
.linelabelitem .ant-form-item-label {
  vertical-align: middle;
  font-size: 1.1875rem;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
  line-height: 2.1875rem;
}
.ant-form-item-label .ant-form-item-required {
  padding-top: 3.0625rem !important;
  font-size: 1.25rem !important;
  font-weight: 400;
  color: rgba(211, 17, 69, 1);
  line-height: 2.1875rem;
}
.ant-form-item-required:before {
  margin-right: 0rem;
  vertical-align: top !important;
}

.linelabelitem {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.25rem !important;
}
.linelabelitem .ant-form-item-label label {
  font-size: 1.25rem;
  color: #3a3a3a;
}

.lineitem .ant-form-item-control-wrapper,
.linelabelitem .ant-form-item-control-wrapper {
  display: inline-block;
  float: none;
}
</style>
