<template>
  <div class="addr_select" id="chose_address">
    <input :value="postcode" type="text" class="add_input" disabled placeholder="郵遞區號" />
  
    <a-select
      :size="size"
      :value="firstWord"
      style="width: 15rem;borderColor:#ccc"
      @click.native="getCity(1)"
      @select="select"
      class="select_opt"
      placeholder="請選擇縣市"
      :getPopupContainer="triggerNode => triggerNode.parentNode"
       @dropdownVisibleChange=" chose_h5(options1,1)"
    >
      <select-icon slot="suffixIcon" />

      <!-- <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option> -->
      <a-select-option
        v-for="province in options1"
        :key="province.areaCode"
        :code="province.postalCodePrefix"
        :city="province.areaName"
        @click="clickOne(province)"
      >{{province.areaName}}</a-select-option>

      <!-- <a-select-option value="jack" disabled v-if="options1==false">
								暫無匹配數據
      </a-select-option>-->
    </a-select>
     
    <!-- 第二个 -->
    <a-select
      :size="size"
      :value="secondWord"
      @select="select"
      style="width: 15rem"
      @click.native="getCity(2)"
      class="select_opt ls"
      placeholder="請選擇行政區"
      :getPopupContainer="triggerNode => triggerNode.parentNode"
       @dropdownVisibleChange=" chose_h5(options2,2)"
    >
      <select-icon slot="suffixIcon" />

      <a-select-option
        v-for="city in options2"
        :key="city.areaCode"
        :code="city.postalCodePrefix"
        :city="city.areaName"
        @click="clickTwo(city)"
      >{{city.areaName}}</a-select-option>

      <a-select-option value="jack" disabled v-if="options2==false">請先選擇縣市</a-select-option>
    </a-select>
    <!-- 第三个 -->
    <a-select
      :size="size"
      :value="lastWord"
      style="width: 15rem"
      @select="select"
      @click.native="getCity(3)"
      class="select_opt"
      placeholder="請選擇街道"
      :allowClear="false"
      :getPopupContainer="triggerNode => triggerNode.parentNode"
       @dropdownVisibleChange=" chose_h5(options3,3)"
    >
      <select-icon slot="suffixIcon" />

      <a-select-option
        v-for="city in options3"
        :key="city.areaCode"
        :code="city.postalCodePrefix"
        :city="city.areaName"
      >{{city.areaName}}</a-select-option>
      <a-select-option value="jack" disabled v-if="options3==false">請先選擇行政區</a-select-option>
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
};
const selectIcon = {
  template: `
		 <a-icon :component="flag" />
	`,
  data() {
    return {
      flag
    };
  }
};
export default {
  name: "antselectaddress",
  components: {
    selectIcon,
    PopupPicker
  },
  props: {
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
    show_value: {
      required: false
    }
    // options1: {
    //   required: false,
    //   default: () => []
    // },
    // options2: {
    //   required: false,
    //   default: () => []
    // },
    // options3: {
    //   required: false,
    //   default: () => []
    // },
  },
  data() {
    return {
      // postcode: undefined,
      // firstWord1: this.firstWord,
      // secondWord1: this.secondWord,
      // lastWord1: this.lastWord,
      size: "large",
      cities: undefined,
      secondCity: undefined,
      threeCity: undefined,
      show_picker:false,
      h5_idx:0,
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

      city: {
        c1: undefined,
        c2: undefined,
        c3: undefined
      },
      options1: [],
      options2: [],
      options3: [],
      keys: 0,
      inp_index: 0,
      type: {
        two: false,
        three: false
      },
      info: {
        code: "",
        address: "",
        values: []
      },
      code: {
        //value值
        v1: 0,
        v2: 0,
        v3: 0
      },
      select_code: {
        //選中的caode值
        v1: 0,
        v2: 0,
        v3: 0
      }
    };
  },

  methods: {
    chose_h5(value,index) {
      value.map(item => {
        item.name = item.areaName
        item.value =  item.areaCode
        item.city = item.areaName
      })
      this.h5_idx = index
			this.show_picker = true
      this.poupValue = value
    },
    	h5_get_select_value(value) {
        console.log(value,this.poupValue)
        
					this.poupValue.map(item => {
					if (item.areaCode == value[0]) {
            console.log(item,'jsjsj')
            if (this.h5_idx == 1) {
              this.code.c1 = value[0]
              this.clickOne(item)
            } else if (this.h5_idx == 2) {
              this.code.c2 = value[0]

              this.clickTwo(item);
            } else if (this.h5_idx == 3) {
              let clon = JSON.stringify(JSON.parse(value))
              console.log(value[0],'item3')
              this.code.c3 = value[0]


              this.select(item.value,item,'h5')
            this.$emit("update:postcode", item.postalCodePrefix);
            this.info.code = item.postalCodePrefix
            this.info.address = `${this.city.c1}/${this.city.c2}/${this.city.c3}`;
          
            this.info.values = [];
             for (var i = 0; i < 3; i++) {
              //  console.log(i)
          this.info.values.push(this.code[`c${i+1}`]);


             }
            this.info.values.join(",");

             console.log('info-addr',this.info)
            this.$emit("get_info", this.info);
            }
        }
					})


		},
    getCity(datas) {
      // this.option1 = this.option2 = this.option3 = [];
      this.inp_index = datas;
      let tep = {
        parentAreaCode: 0
      };
      if (datas == 1) {
        console.log(datas);
        this.$emit("updateOne", false);
        this.threeCity = undefined;
        tep.parentAreaCode = 0;
        this.get_city(datas, tep);
        this.option1 = this.option2 = this.option3 = [];
      }
      if (datas == 2 && this.firstWord != undefined) {
        if (this.select_code[`v${this.inp_index}`] == 0) {
          tep.parentAreaCode = this.$store.state.customer.step_1;
          this.get_city(datas, tep);
          return;
        } else {
          this.$store.commit(
            "set_address1",
            this.select_code[`v${this.inp_index}`]
          );
          tep.parentAreaCode = this.select_code[`v${this.inp_index}`];
          this.$emit("updateTwo", false);
          this.get_city(datas, tep);
        }
      }
      if (datas === 3 && this.secondWord != undefined) {
        console.log(
          datas,
          this.select_code[`v${this.inp_index}`],
          this.$store.state.customer.step_2
        );
        if (this.select_code[`v${this.inp_index}`] == 0) {
          tep.parentAreaCode = this.$store.state.customer.step_2;
          this.get_city(datas, tep);
          return;
        } else {
          this.$store.commit(
            "set_address2",
            this.select_code[`v${this.inp_index}`]
          );
          tep.parentAreaCode = this.select_code[`v${this.inp_index}`];
          this.get_city(datas, tep);
        }
      }
    },
    get_city(datas, tep) {
      let self = this;
      this.Axios("getArea", tep)
        .then(res => {
          let options = res.data.data;
          this[`options${datas}`] = options;
          this.option1 = this.option2 = this.option3 = [];
          // this.$emit(`options${datas}`, options);
          // this.option1 = this.option2 = this.option3 = [];
        })
        .catch(err => {});
    },
    select(val, opt,is_h5) {
      console.log(`val-------000------33333`, val);
      console.log(`opt-------------33333`, opt);
      let option_city
      if(is_h5 == 'h5')  {
         option_city = opt
      }else {
        option_city = opt.data.attrs
      }
      //     firstWord: {
      //   type: String,
      //   required: false
      // },
      // secondWord: {
      //   type: String,
      //   required: false
      // },
      // lastWord: {
      this.code[`v${this.inp_index}`] = val;
      this.city[`c${this.inp_index}`] = option_city.city;
      console.log("logg_____", this.inp_index);
      console.log("logg_____", this.inp_index);
      if (this.inp_index == 1) {
        // this.firstWord1 = option_city.city
        // this.secondWord1 = undefined
        // this.lastWord1 = undefined
        // this.$emit(`update:firstWord`, option_city.city)
        // this.$emit(`update:secondWord`, undefined)
        // this.$emit(`update:lastWord`, undefined)
        this.$emit("updateCity", { ste: 1, city: option_city.city });
      } else if (this.inp_index == 2) {
        // this.secondWord1 = option_city.city
        // this.lastWord1 = undefined
        // this.$emit(`update:secondWord`, option_city.city)
        // this.$emit(`update:lastWord`, undefined)
        this.$emit("updateCity", { ste: 2, city: option_city.city });
      } else if (this.inp_index == 3) {
        // this.lastWord1 = option_city.city
        // this.$emit(`update:lastWord`, option_city.city)
        this.$emit("updateCity", { ste: 3, city: option_city.city });
      }

      // console.log(this.code)
      if (this.inp_index == 3) {
        // this.postcode = option_city.code;
        this.$emit("update:postcode", option_city.code);
        this.info.code = option_city.code;
        this.info.address = `${this.city.c1}/${this.city.c2}/${this.city.c3}`;
        console.log(this.info.address);
        this.info.values = [];
        for (var pro in this.code) {
          this.info.values.push(this.code[pro]);
        }
        this.info.values.join(",");
        this.$emit("get_info", this.info);
        this.$emit("updateThree", option_city);
        //  this.info.values=[]
      } else {
        // this.postcode = undefined;
        this.$emit("update:postcode", "");
      }
    },
    handleProvinceChange(value) {
      console.log(`value-------address`, value, this.info.address);
      this.select_code[`v${this.inp_index + 1}`] = value;
      this.option1 = this.option2 = this.option3 = [];
    },
    clickOne(record) {
      console.log(`record-----111111111`, record);
      this.handleProvinceChange(record.areaCode);
      this.city.c1 = record.name
      this.$emit("updateOne", record);
    },
    clickTwo(record) {
      console.log(`record---------22222222`, record);
      this.handleProvinceChange(record.areaCode);
      this.city.c2 = record.name

      this.$emit("updateTwo", record);
    }
    // clickThree(record) {
    //   console.log(`record----------33333333`, record)
    //   this.$emit('updateThree', record)
    // },
  },
  mounted() {
    // this.firstWord ? this.cities = this.firstWord : ''
    // this.secondWord ? this.secondCity = this.secondWord : ''
    // this.threeCity ? this.threeCity = this.threeCity : ''
  }
};
// };
</script>
<style scoped  lang="scss" >
@media screen and (max-width: 1023px) {
  #chose_address {
    .bgTest {
      margin-top: .25rem!important
    }
    .add_input {
      height: 2.25rem !important;
      width: 4.75rem !important;
      padding: 0 !important;
      &::placeholder {
        font-size: 0.875rem !important;
        padding-left: 0.5rem !important;
      }
    }
    .select_opt {
     &:nth-child(2) {
       width: 11.5625rem!important
        }
      /deep/ .ant-select-selection {
        padding-left: 0;
        height: 2.25rem;
        line-height: 2.25rem !important;
        .ant-select-arrow {
          font-size: 1.0625rem!important
        }
        .ant-select-selection__rendered {
          line-height: 2.25rem !important;
          .ant-select-selection__placeholder {
            font-size: 0.875rem !important;
          }
          .ant-select-selection-selected-value {
            font-size: 0.875rem !important;
          }
        }
      }

    }
    .ls {
      margin-right: .5rem;
      margin-top:.35rem
    }
  }
}

.add_input {
  width: 40%;
  height: 2.5rem;
  text-align: center;
}
.select_opt {
  width: 14.875rem;
  border-color: #727272;
}
.select_opt:nth-child(3) {
  margin-right: 2.5rem;
  margin-bottom: 0 !important;
}
.select_opt:nth-child(4) {
  margin-bottom: 0 !important;
}
.select_opt:nth-child(2),
.select_opt:nth-child(3) {
  margin-top: 1.25rem;
}
.has-error .ant-select-selection {
  border-color: #727272 !important;
}
.add_input {
  margin-right: 2.5rem;
  font-size: 0.875rem;

  border: none;
  border: 0.0625rem solid #ccc;
}
.add_input::placeholder {
  font-size: 0.875rem;
  text-align: center !important;
}
.addr_select .ant-select-selection__rendered {
  line-height: 3rem;
}
.ant-select-selection,
.ant-select-selection--single {
  border-color: #727272;
}
.ant-select-selection-selected-value {
  font-size: 1.125rem !important;
}
.ant-select-lg {
  font-size: 0.875rem !important;
}
</style>