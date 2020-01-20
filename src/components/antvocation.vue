<template>
  <div>
    <div class="main" v-if="name != 'sidelineJobId'">
      <div class="commentBox commselectBox">
        <!-- <div :style="{'width': width,'margin-top':width=='100%'?'0':'0.9375rem','margin-right':width=='100%'?'0':'5%'}" class="fl item"> -->
        <div :style="{'width': width,'margin-right':width=='100%'?'0':'5%'}" class="fl item" id="select_vocation">
          <a-select
            style="width:100%"
            :placeholder="placeholder"
            :class="show_value?'occupationChecked':''"
            :value="firstWord"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            @dropdownVisibleChange=" chose_h5(options1,1)"
          >
            <!-- <a-icon slot="suffixIcon" type="smile" /> -->
            <select-icon slot="suffixIcon" style="{color:red}" />

            <a-select-option
              v-for="(item,ind) in options1"
              :title="item.proName"
              :key="ind"
              :value="item.id"
              @click="clickOne(item.id,item.proName)"
              v-show="is_H5"
            >{{item.proName}}</a-select-option>
            <a-select-option value="jack" disabled v-show="(options1==false)&&is_H5">無匹配結果</a-select-option>
          </a-select>
          <PopupPicker
            class="thisThis"
            title="demo"
            :data="poupValue"
            v-model="poupValue1"
            :vocationInfo= "vocationInfo"
            :columns="1"
            :show.sync="show_picker"
            show-name
            @on-change="h5_get_select_value"
          ></PopupPicker>
        </div>

        <div :style="{'width': width,'margin-left':width=='100%'?'0':'5%'}" class="fl item"  id="select_vocation">
          <a-select
            style="width:100%"
            :placeholder="placeholdertwo"
            :class="show_valuetwo?'occupationChecked':''"
            :value="secondWord"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            @dropdownVisibleChange=" chose_h5(options2,2)"
          >
            <select-icon slot="suffixIcon" />

            <a-select-option
              v-for="(item,ind) in options2"
              :title="item.proName"
              :key="ind"
              :value="item.id"
              @click="clickTow(item.id,item.proName)"
            >{{item.proName}}</a-select-option>
            <a-select-option value="jack" disabled v-if="options2==false">請先選擇行業別</a-select-option>
          </a-select>
        </div>
        <div :style="{'width': width}" class="fl item search" v-if="width=='100%'"  id="select_vocation">
          <div class="fl width169">
            <a-select
              style="width:100%"
              :placeholder="placeholderthr"
              :class="show_valuethr?'occupationChecked':''"
              :value="lastWord"
              @dropdownVisibleChange=" chose_h5(options3,3)"
            >
              <select-icon
                slot="suffixIcon"
                :getPopupContainer="triggerNode => triggerNode.parentNode"
              />

              <a-select-option
                v-for="(item,ind) in options3"
                :title="item.proName"
                :key="ind"
                :value="item.id"
                @click="clickThree(item)"
              >{{item.proName}}</a-select-option>
              <a-select-option value="jack" disabled v-if="options3==false">
                <!-- 無匹配結果1111 -->
                請先選擇職業別
              </a-select-option>
            </a-select>
          </div>
          <div style="float:right" @click="test">
            <a-icon type="search" class="searchBtn" />
          </div>
        </div>
        <div :style="{'width': '100%'}" class="fl item" v-else  id="select_vocation">
          <div :style="{'width': width}" class="fl">
            <a-select
              style="width:100%"
              :placeholder="placeholderthr"
              :class="show_valuethr?'occupationChecked':''"
              :value="lastWord"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              @dropdownVisibleChange=" chose_h5(options3,3)"
            >
              <select-icon slot="suffixIcon" />
              <a-select-option
                v-for="(item,ind) in options3"
                :title="item.proName"
                :key="ind"
                :value="item.id"
                @click="clickThree(item)"
              >{{item.proName}}</a-select-option>
              <!-- <a-select-option value="jack"  disabled v-if="options3==false">
								請先選擇職業別
              </a-select-option>-->
              <a-select-option value="jack" disabled v-if="options3==false">
                請先選擇職業別
                <!-- 無匹配結果11 -->
              </a-select-option>
            </a-select>
          </div>
        </div>
        <!-- <a-button class="addbtn" @click="addVocation">+添加职业</a-button> -->
        <antoccupation
          v-if="ifshowSearch"
          :vocationInfo="vocationInfo"
          ref="vocation"
          @hide="hide"
          @select="select"
        />
      </div>
    </div>
    <div class="other" v-else>
      <!-- <p class="itemtip1" v-if="!show&&!this.show_value">*如有兼業，請選擇「+增加職業」</p> -->

      <a-button class="addbtn" @click="addJob" v-if="!show&&!this.show_value">
        <!-- <a-icon type="plus" /> -->
        <!-- <span style="fontSize:1.5rem" class="o_btn">+</span> -->
        <img src="@/assets/youbang/add.png" alt style="width:1rem;margin-top: -0.3rem;height:auto;" />
        <!-- img -->
        <span class="o_btn">增加職業</span>
      </a-button>
      <div class="commentBox commselectBox" v-else>
        <p class="fl box">
          <span class="deleteIcon" @click="deleteJob">
            <!-- <a-icon type="delete" /> -->
            <!-- <a-icon type="close-circle" /> -->
            <a-icon type="close" />
          </span>
          <span class="label">兼職</span>
        </p>
        <!-- <div :style="{'width': width,'margin-top':width=='100%'?'0':'0.9375rem','margin-right':width=='100%'?'0':'5%'}" class="fl item"> -->

        <div
          :style="{'width': width,'margin-top':width=='100%'?'0':'0.9375rem','margin-right':width=='100%'?'0':'5%'}"
          class="fl item"
        >
          <a-select
            style="width:100%"
            :placeholder="placeholder"
            :class="show_value?'occupationChecked':''"
            :value="firstWord"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            @dropdownVisibleChange=" chose_h5(options1,1)"
          >
            <select-icon slot="suffixIcon" />

            <a-select-option
              v-for="(item,ind) in options1"
              :title="item.proName"
              :key="ind"
              :value="item.id"
              @click="clickOne(item.id,item.proName)"
            >{{item.proName}}</a-select-option>
            <a-select-option value="jack" disabled v-if="options1==false">無匹配結果</a-select-option>
          </a-select>
          <PopupPicker
            class="thisThis"
            title="demo"
            :data="poupValue"
            v-model="poupValue1"
            :columns="1"
            :show.sync="show_picker"
            :vocationInfo="vocationInfo"
            show-name
            @on-change="h5_get_select_value"
          ></PopupPicker>
        </div>

        <div :style="{'width': width,'margin-left':width=='100%'?'0':'5%'}" class="fl item">
          <a-select
            style="width:100%"
            :placeholder="placeholdertwo"
            :class="show_valuetwo?'occupationChecked':''"
            :value="secondWord"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            @dropdownVisibleChange=" chose_h5(options2,2)"
          >
            <select-icon slot="suffixIcon" />

            <a-select-option
              v-for="(item,ind) in options2"
              :title="item.proName"
              :key="ind"
              :value="item.id"
              @click="clickTow(item.id,item.proName)"
            >{{item.proName}}</a-select-option>
            <a-select-option value="jack" disabled v-if="options2==false">請先選擇行業別</a-select-option>
          </a-select>
        </div>
        <div style="width:100%;float: left;" class="fl item search">
          <div :style="{'width': width,'margin-top':width=='100%'?'0':'0.9375rem'}">
            <div :style="{'width': '85%'}" class="fl">
              <a-select
                style="width:100%"
                :placeholder="placeholderthr"
                :class="show_valuethr?'occupationChecked':''"
                :value="lastWord"
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                @dropdownVisibleChange=" chose_h5(options3,3)"
              >
                <select-icon slot="suffixIcon" />
                <a-select-option
                  v-for="(item,ind) in options3"
                  :title="item.proName"
                  :key="ind"
                  :value="item.id"
                  @click="clickThree(item)"
                >{{item.proName}}</a-select-option>
                <a-select-option value="jack" disabled v-if="options3==false">請先選擇職業別</a-select-option>
              </a-select>
            </div>
            <div style="float:right" @click="test">
              <a-icon type="search" class="searchBtn one_search" />
            </div>
          </div>
        </div>
        <antoccupation
          v-if="ifshowSearch"
          :vocationInfo="vocationInfo"
          ref="vocation"
          @hide="hide"
          @select="select"
        />
        <!-- <div :style="{'width': '100%'}" class="fl item" v-else>
					<div :style="{'width': width}" class="fl">
						<a-select style="width:100%" :placeholder="placeholderthr" :class="show_valuethr?'occupationChecked':''" :value="lastWord">
							<a-select-option v-for="(item,ind) in options3" :key="ind" :value="item.id" @click="clickThree(item)">
								{{item.proName}}
							</a-select-option>
						</a-select>
					</div>
        </div>-->
        <!-- <a-button class="addbtn" @click="addVocation">+添加职业</a-button> -->
        <!-- <antoccupation :vocationInfo="vocationInfo" ref="vocation" @hide="hide" @select="select" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import antoccupation from "./antoccupation.vue";
import { PopupPicker } from "vux";
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
  name: "antvocation",
  props: {
    options1: {
      type: Array,
      required: false,
      default: () => []
    },
    options2: {
      type: Array,
      required: false,
      default: () => []
    },
    options3: {
      type: Array,
      required: false,
      default: () => []
    },
    tip: {
      type: String
    },
    placeholder: {
      type: String
    },
    placeholdertwo: {
      type: String
    },
    placeholderthr: {
      type: String
    },
    value: {
      required: false
    },
    show_value: {
      required: false
    },
    show_valuetwo: {
      required: false
    },
    show_valuethr: {
      required: false
    },
    hasShowError: {
      required: false
    },
    vocationInfo: {
      type: [Object, String],
      required: false
    },
    jobType: {
      required: false
    },
    levelType: {
      type: String,
      required: false
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
    width: {
      type: String,
      required: false,
      default: "100%"
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    id: {
      type: Number,
      required: false
    }
  },
  components: {
    antoccupation,
    selectIcon,
    PopupPicker
  },
  data() {
    return {
      closable: false,
      poupValue1: [],
      poupValue: [
        {
          name: "中国",
          value: "china"
        },
        {
          name: "美国",
          value: "USA"
        }
      ],
      grey: "請填寫職業",
      data: [],
      occupationName: "",
      ifshowSearch: false,
      loading: false,
      is_H5: false,
      show_picker: false,
      h5_idx: 0, //当H5时选择框下标
      pagination: {
        current: 1,
        pageSize: 20,
        total: 20
      },
      // options1: [],
      // options2: [],
      // options3: [],
      block: false,
      columns: [
        {
          title: "行業別",
          dataIndex: "firstName"
        },
        {
          title: "職業類別",
          dataIndex: "secondName"
        },
        {
          title: "工作性質",
          dataIndex: "proName"
        }
      ],
      show: false
    };
  },
  methods: {
    chose_h5(value, index) {
      //唤起H5picker
      value.map(item => {
        item.name = item.proName;
        item.value = item.id;
      });
      this.h5_idx = index;
      this.poupValue = value;
      this.show_picker = true;
    },
    h5_get_select_value(value, index) {
      let _this = this
      this.poupValue.map(item => {
        if (item.id == value[0]) {
          if (_this.h5_idx == 1) {
            this.clickOne(value[0], item.name);
          } else if (_this.h5_idx == 2) {
            this.clickTow(value[0], item.name);
          } else if (_this.h5_idx == 3) {
            this.h5_clickThree(item, item.name);
          }
        }
      });
    },
    addJob() {
      this.show = true;
      this.$emit("");
    },
    deleteJob() {
      this.$emit("update:value", "");
      this.$emit("update:firstWord", undefined);
      this.$emit("update:secondWord", undefined);
      this.$emit("update:lastWord", undefined);
      this.$emit("update:jobType", "");
      this.$emit("update:show_value", "");
      this.$emit("update:errorMsg", "請選擇職業");
      this.$emit("update:hasShowError", false);
      this.show = false;
    },
    emitEmpty() {
      this.occupationName = "";
    },
    getData(index, id) {
      let that = this
      let tepData = {
        levelType: this.vocationInfo.levelTypee,
        jobLevel: this.vocationInfo.jobLevel,
        parentId: id ? id : ""
      }
      this.loading = true;
      this.Axios("listProfessionalLevel", tepData)
        .then(res => {
          this.loading = false;
          this.$emit(`update:options${index}`, res.data.data);
        })
        .catch(err => (this.loading = false));
    },
    clickOne(record, name) {
      // this.$emit('update:value', record.id)
      this.$emit("update:show_value", name);
      this.$emit("update:jobType", "");
      this.$emit("update:firstWord", name);
      this.$emit("update:secondWord", undefined);
      this.$emit("update:lastWord", undefined);
      this.$emit("update:value", "");
      this.$emit("select", record);
      this.$emit("update:hasShowError", true);
      this.$emit("update:errorMsg", "請選擇職業別");
      this.$emit("update:options2", []);
      this.$emit("update:options3", []);
      this.getData(2, record);
    },
    clickTow(record, name) {
      // this.$emit('update:value', record.id)
      this.$emit(
        "update:show_value",
        this.$emit("update:show_value", `${this.firstWork}-${name}`)
      );
      this.$emit("update:jobType", "");
      this.$emit("update:hasShowError", true);
      this.$emit("select", record);
      this.$emit("update:value", "");
      this.$emit("update:secondWord", name);
      this.$emit("update:lastWord", undefined);
      this.$emit("update:errorMsg", "請選擇工作性質");
      // this.$emit('update:option3',[])
      this.$emit("update:options3", []);
      this.getData(3, record);
    },
    h5_clickThree(record, name) {
      // this.thrSelect = record.proName
      this.$emit("update:value", record.value);
      this.$emit("update:lastWord", record.name);
      this.$emit("update:jobType", record[this.levelType]);
      this.$emit(
        "update:show_value",
        `${this.firstWord}-${this.secondWord}-${record.name}`
      );
      // this.$emit('update:errorMsg', '請選擇職業')
      this.$emit("update:errorMsg", "很抱歉，您所提供的資料不適合投保本商品");
      this.$emit("update:hasShowError", false);
      this.$emit("select", record.value);
    },
    clickThree(record) {
      // this.thrSelect = record.proName
      this.$emit("update:value", record.id);
      this.$emit("update:lastWord", record.proName);
      this.$emit("update:jobType", record[this.levelType]);
      this.$emit(
        "update:show_value",
        `${this.firstWord}-${this.secondWord}-${record.proName}`
      );
      // this.$emit('update:errorMsg', '請選擇職業')
      this.$emit("update:errorMsg", "很抱歉，您所提供的資料不適合投保本商品");
      this.$emit("update:hasShowError", false);
      this.$emit("select", record);
    },
    select(record) {
      this.$emit("update:value", record.id);
      this.$emit("update:firstWord", record.firstName);
      this.$emit("update:secondWord", record.secondName);
      this.$emit("update:lastWord", record.proName);
      this.$emit("update:jobType", record[this.levelType]);
      this.$emit(
        "update:show_value",
        `${record.firstName}-${record.secondName}-${record.proName}`
      );
      this.$emit("update:errorMsg", "請選擇職業");
      this.$emit("update:hasShowError", false);
    },
    test() {
      this.ifshowSearch = true;
      // this.$refs.vocation.visibled = true
    },
    hide() {
      this.ifshowSearch = false;
    }
  },
  mounted() {
    // 监听窗口大小变化
    let mWidth = document.body.clientWidth;
    window.onresize = () => {
			this.show_picker = false
      return (() => {
        if (mWidth < 1024) {
			this.show_picker = false
          this.is_H5 = true;
        } else {
			this.show_picker = false
          this.is_H5 = false;
        }
      })();
    };
  },
  created() {
    this.getData(1);
  }
};
</script>

<style lang="scss" scoped>
.fl {
  float: left;
  // width:auto !important
}
.label {
  font-size: 1.125rem;
}
.fr {
  float: right;
}
.content {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.width169{
  width: 10.5625rem;
}
.title {
  margin: 0.625rem 0.625rem 0.625rem 0;
}

.mtitle {
  margin: 0 0 1.25rem 0;
  color: $primary-color;
}

.item {
  &:first-child {
    margin-top: 0;
  }
}
.item:nth-child(1) {
  margin-top: 0;
}
.item:nth-child(3) {
  margin-top: 0.75rem;
}
.search {
  // width: 54%;
  position: relative;
  display: inline-flex;
  // &>div {
  //   margin-top: 1.65rem!important
  // }
}
.other {
  .commentBox {
    .item::nth-child(1) {
      margin-top: 0.9375rem;
    }
  }

  /deep/.ant-select-selection__rendered {
    color: #606060 !important;
  }
}
.addbtn {
  width: 11.625rem;
  height: 2.9375rem;
  border-radius: 1.25rem;
  line-height: 2.6rem;
  font-size: 1.125rem;
  font-family: "Microsoft JhengHei" !important;
  font-weight: 500;
  margin: 1.25rem 0;

  border: 0.125rem solid rgba(216, 31, 73, 1);
  border-color: $primary-color;
  color: $primary-color;
  .o_btn {
    display: inline-block;
    height: 2.5rem;
    padding-left: 1rem;
    line-height: 2.2rem;
    vertical-align: middle;
    color: #d81f49;
  }
}
.box {
  width: 100%;
}
.deleteIcon {
  float: left;
  text-align: center;
  font-size: 1rem;
  width: 2rem;
  height: 2rem;
  margin-right: 0.625rem;
  line-height: 2rem;
  background: rgba(230, 230, 230, 1);
  border-radius: 50%;
  cursor: pointer;
}
.ant-btn > .anticon + span,
.ant-btn > span + .anticon {
  float: right;
  margin: 0.25rem 0 0 0;
}

.ant-modal-body {
  text-align: center;
}

.tip {
  font-size: 0.75rem;
  color: $primary-color;
  margin: 0.625rem 0 0.625rem 0;
  line-height: 1rem;
}
.searchBtn {
  float: right;
  font-size: 1.6875rem;
  // line-height: 3.125rem;
  padding-top: 0.625rem;
  padding-left: 0.8125rem;
  color: #b6b6b6;
  cursor: pointer;
}
.commentBox {
  width: 100%;
  // display: inline-flex;
}
</style>
<style lang="scss">
.commentBox .ant-select.occupationChecked .ant-select-selection__placeholder {
  color: rgba(0, 0, 0, 0.65);
}
span.components-input {
  width: 80%;
  margin: 0.625rem 0 2.5rem 0;
}
.commentBox .components-input .ant-input,
.ant-modal-content,
.ant-table {
  border-radius: 0;
}
.commentBox .ant-modal-footer {
  text-align: center;
}
.commentBox .canclemodalbtn {
  width: 7.5rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  margin: 1.25rem 0;
}
</style>
