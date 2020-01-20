<template>
  <div class="commentBox commselectBox">
    <!-- <div :style="{'width': width,'float':'left'}">
			<a-select style="width:100%" @dropdownVisibleChange="visible=true" :placeholder="show_value || placeholder" :class="show_value?'occupationChecked':''">
				<div slot="dropdownRender" slot-scope="menu">
				</div>
			</a-select>
		</div>
		<div style="float:right" v-if="width == '86%'" @click="test">
			<a-icon type="search" class="searchBtn" />
    </div>-->
    <!-- <a-icon type="search" class="searchBtn" v-if="width == '86%'" /> -->
    <a-modal
      :visible="visible"
      :closable="closable"
      id="modal"
      style="text-align: center;"
      class="modal"
      ref="node"
    >
      <img
        src="@/assets/youbang/X.png"
        @click="handleCancel"
        class="close_img"
        style="display:none"
      />
      <p class="mtitle">選擇職業</p>
      <a-input
        class="components-input"
        :placeholder="grey"
        v-model="occupationName"
        ref="occupationNameInput"
      >
        <a-icon slot="prefix" type="search" @click="getData" />
        <!-- <img src="@/assets/youbang/search.png" alt=""> -->
        <a-icon v-if="occupationName" slot="suffix" type="close-circle" @click="emitEmpty" />
      </a-input>
      <div v-if="!occupationName&&(clientWidthZY+getScrollWidth())" style="height: 2rem"></div>

      <a-table
        :columns="columns"
        v-if="occupationName"
        :dataSource="data"
        :customRow="click"
        :pagination="pagination"
        :loading="loading"
        size="small"
        rowKey="id"
        @change="handlehange"
      />

      <div
        @click="h5_handlehange(item)"
        :key="index"
        v-for="(item,index) in data"
        class="listItem"
        style="display:none"
      >
        <!-- <div :key='index' v-for="(item,index) in data" class="listItem"  style="display:none"> -->
        <div class="bor">
          <div class="title1">{{item.proName}}</div>
          <div class="detail1">
            <span class="thisItemT">{{item.firstName}}</span>
            <span class="fonth">></span>
            <span class="thisItemT">{{item.secondName}}</span>
            <span class="fonth">></span>
            <span class="thisItemT">{{item.proName}}</span>
          </div>
        </div>
      </div>

      <template slot="footer" class="cancel">
        <a-button class="canclemodalbtn" @click="handleCancel">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "antoccupation",
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
    width: {
      type: String,
      required: false,
      default: "100%"
    },
    id: {
      type: Number,
      required: false
    }
  },
  components: {},
  data() {
    return {
      clientWidthZY:document.body.clientWidth,
      closable: false,
      grey: "請填寫職業名稱",
      data: [],
      visible: true,
      occupationName: "",
      loading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 20
      },
      block: false,
      arr: [
        "/products/yo-term-life-insurance",
        "/products/fun-injury-insurance",
        "/products/elu-injury-insurance"
      ],
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
      ]
    };
  },
  watch: {
    occupationName: {
      handler: function(value) {
        if (value) {
          let obj = {
            current: 1,
            pageSize: 20
          };
          this.getData(obj);
        }
      },
      immediate: true
    }
  },
  methods: {
    emitEmpty() {
      // this.$refs.occupationNameInput.focus()
      this.occupationName = "";
      //this.getData()
    },
    handleCancel(e) {
      // this.visible = false
      this.$emit("hide");
    },
    handlehange(page) {
      this.pagination.current = page.current;
      this.getData(page);
    },
    h5_handlehange(page, index) {
      this.$emit("select", page);
      this.$emit("hide");
    },
    h5_close() {
      this.$emit("hide");
    },
    getScrollWidth() {
      var noScroll, scroll, oDiv = document.createElement("DIV");
      oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
      noScroll = document.body.appendChild(oDiv).clientWidth;
      oDiv.style.overflowY = "scroll";
      scroll = oDiv.clientWidth;
      document.body.removeChild(oDiv);
      //console.log(noScroll-scroll)
      return noScroll-scroll;
    },
    getData(page) {
      let tepData = {
        current: page ? page.current : 1,
        pageSize: page ? page.pageSize : 20,
        proName: this.occupationName,
        ...this.vocationInfo
      };
      this.loading = true;
      this.Axios("listProfessional", tepData)
        .then(res => {
          this.loading = false;
          this.pagination.total = res.data.data.total;
          this.pagination.current = res.data.data.pageNum;
          this.data = res.data.data.list;
        })
        .catch(err => (this.loading = false));
    },
    click(record, index) {
      return {
        on: {
          click: () => {
            // this.$emit('update:value', record.id)
            // this.$emit('update:show_value', record.proName)
            // this.$emit('update:jobType', record[this.levelType])
            // this.$emit('update:hasShowError', false)
            this.$emit("select", record);
            // this.visible = false
            this.$emit("hide");
          }
        }
      };
    },
    test() {
      console.log(`test`);
    }
  },
  mounted() {
    let el = document.getElementsByClassName("ant-modal-root")[0].children;
    this.arr.some(item => {
      if (this.$route.path == item) {
        // el[0].style.height="100%!important"
        // el[0].style.bottom="0 !important"
        // el[1].style.height="100%!important"
        // el[1].style.bottom="0 !important"
        el[0].classList.add("pro");
        el[1].classList.add("pro");
      }
    });
  },
  updated() {
    document.getElementsByClassName("ant-table-placeholder")[0].innerHTML =
      "暫無資訊";
  },
  created() {
    // document.getElementsByClassName('ant-table-placeholder')[0].innerHTML = '暫無資訊'
    // this.emitEmpty()
    // if (this.occupationName !== '') {
    // this.getData()
    // }
  }
};
</script>

<style lang="scss" scoped>
.pro {
  height: 100% !important;
  bottom: 0 !important;
}

// @media only screen
// and (min-device-width : 768px)
// and (max-device-width : 1024px)
// and (orientation : landscape){
// /* style */
// .mtitle {
// // 	letter-spacing: 3.3125rem!important
// // }

// }

.content {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.title {
  margin: 0.625rem 0.625rem 0.625rem 0;
}

.mtitle {
  // margin: 0 0 1.25rem 0;
  letter-spacing: 0.1875rem;
  margin: 2.5rem;
  font-size: 1.625rem;
  color: #3a3a3a;
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
.searchBtn {
  float: right;
  font-size: 1.6875rem;
  line-height: 2.5rem;
  padding-left: 0.8125rem;
}
.commentBox {
  width: 100%;
  display: inline-flex;
}
//
</style>
// <style lang="scss">
@media screen and (min-width: 1024px) {
  .ant-modal-mask,
  .ant-modal-wrap {
    height: calc(100% - 11rem) !important;
    top: 5rem !important;
    bottom: 6.25rem;
  }
  .ant-modal-root {
    .pro {
      height: 100% !important;
      bottom: 0 !important;
    }
  }
}
@media screen and (max-width: 1023px) {
  .ant-modal-root {
    .modal {
      .close_img {
        display: block !important;
        float: right;
        width: 1rem;
        height: 1rem;
      }
    }
    .ant-modal-mask {
      background: red;
      top: 3rem !important;
      bottom: 3.125rem !important;
      background: rgba(0, 0, 0, 0) !important;
      z-index: 998;
    }
    .ant-modal-wrap {
      background: #fff !important;
      top: 3rem !important;
      bottom: 3.3rem !important;
      box-shadow: 0 0 7px #dadada;
      z-index: 999 !important;
      .modal {
        margin-bottom: 0!important;
        width: 100% !important;
        max-width: calc(100vw - 2.75rem)!important;
        top: 1.375rem !important;

        .h5_close {
          display: block !important;
          float: right;
          width: 1.125rem;
        }
        .ant-modal-footer {
          display: none;
        }
        .ant-modal-content {
          padding: 0 !important;
          margin: 0 auto;
          min-height: 72vh !important;
          max-width: 34.875rem;
          .ant-modal-body {
            padding-top: 1.75rem !important;
            .mtitle {
              font-size: 1rem;
              font-weight: 400;
              margin: 0;
              margin-left: 1rem;
            }
            .components-input {
              // background: red;
              height: 1.875rem !important;
              width: 100% !important;
              margin-bottom: 0 !important;
              .ant-input {
                font-size: 0.875rem !important;
              }
            }
            .listItem {
              display: block !important;
              .bor {
                border: 0.0625rem solid #e8e8e8;
                margin-bottom: 0.875rem;
              }
              .title1 {
                padding: 0.25rem 0.875rem;
                background: #e7e7e7;
                color: #1c1c1c;
                font-size: 0.9375rem;
              }
              .detail1 {
                padding: 0.25rem 0.875rem;
                color: #3a3a3a;
                display: flex;
                justify-content: space-between;
                font-size: 0.875rem;
              }
              .thisItemT {
                max-width: 5.25rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
              }
            }
            .ant-table-wrapper {
              //display: none;
              .ant-spin-container {
                width: 100%;
                display: none;
              }
            }
          }
        }
      }
    }
  }

  // 	.ant-modal-content {
  // 	background: red
  // }
}
@media screen and (max-width: 1023px) {
  .ant-modal-root {
    .modal {
      // background: red;
      .close_img {
        float: right;
        width: 1rem;
        margin-top: 0.25rem;
        height: 1rem;
      }
    }
  }
}
.ant-modal-mask {
  background: #fff !important;
}
.ant-modal-content {
  border: 0.0625rem solid #dadada !important ;
  min-height: 28.5875rem;
  box-shadow: none !important;
  position: relative;
}
// .ant-input-affix-wrapper .ant-input:not(:first-child) {
// 	padding-left: 2rem!important
// }
.ant-modal {
  width: 63.875rem !important;
  top: 8.125rem !important;
  margin-bottom: 16.875rem;
  .mtitle {
    margin: 2.5rem;
    margin-top: 4.875rem;
    margin-bottom: 2.1875rem;
    font-size: 1.875rem;
    font-weight: 600;
    color: #3a3a3a;
  }
}
.commentBox .ant-select.occupationChecked .ant-select-selection__placeholder {
  color: rgba(0, 0, 0, 0.65);
}
span.components-input {
  width: 29.8125rem !important;
  height: 3rem !important;
  margin: 0.625rem 0 2.5rem 0 !important;
  font-size: 0.875rem !important;
  .components-input:hover {
    left: 0;
    margin-left: 0;
  }
  .ant-input-suffix {
    //  background: red;
    .anticon {
      color: #ccc;
      width: 0.9375rem;
      font-size: 1rem;
      height: 0.9375rem;
    }
  }
  .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
    margin-left: 0;
  }
  .ant-input {
    font-size: 1.25rem !important;
    padding-left: 2.4rem !important;
  }
  .ant-input::placeholder {
    // padding-left: 1.25rem;
    font-size: 1.25rem;
  }
  .anticon {
    font-size: 1.25rem;
  }
}
.ant-spin-container {
  width: 46.1875rem;
  margin: 0 auto;
  .ant-table-body {
    margin: 0 !important;
    tr td,
    th {
      text-align: center;
      font-size: 1.125rem;
    }
    tr th {
      padding: 1rem;
      text-align: left;
    }
    tr {
      td {
        padding: 1.25rem;
        padding-left: 2.0625rem !important;
        text-align: left;
        height: 3.3125rem !important;
        &:nth-child(1) {
          width: 12.5rem !important;
        }
        &:nth-child(2) {
          padding-left: 1.125rem !important;
          width: 11.25rem !important;
        }
        &:nth-child(3) {
          padding-left: 0 !important;
        }
      }
    }
  }
  .ant-table-thead {
    tr {
      th {
        background: #e6e6e6 !important;
        border-radius: 0;
        font-weight: 400;
        height: 3rem !important;
        color: #272727 !important;
        padding-left: 2.0625rem !important;
        text-align: left;
        &:nth-child(1) {
          width: 12.5rem !important;
        }
        &:nth-child(2) {
          padding-left: 1.125rem !important;
          width: 11.25rem !important;
        }
        &:nth-child(3) {
          padding-left: 0 !important;
        }
      }
    }
  }
}
.ant-modal-footer {
  position: absolute !important;
  left: 50%;
  top: 100%;
  padding-top: 1.875rem;
  transform: translateX(-50%);
  border-top: none !important;
  .canclemodalbtn {
    width: 14.5625rem;
    color: #808080;
    height: 3.6875rem;
    margin-top: 2.1875rem;
    font-size: 1.25rem;
    // line-height: 3.4875rem;
    border: 0.125rem solid rgba(151, 151, 151, 1);
    border-radius: 1.875rem;
  }
}
.commentBox .components-input .ant-input,
.ant-modal-content,
.ant-table {
  border-radius: 0;
}
.ant-modal-content {
  padding-top: 0 !important;
  .ant-modal-body {
    padding-top: 0 !important;
    margin-top: 0 !important;
    .ant-table-wrapper {
      margin-top: 2rem !important;
    }
  }
}
.commentBox .ant-modal-footer {
  text-align: center;
}
</style>
