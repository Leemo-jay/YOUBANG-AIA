<template>
  <div class="billList">
    <slot></slot>
    <a-table :columns="columns" :dataSource="billList" class="table" :pagination="false" :customRow="click" rowKey='policy_no' :locale="locale">
      <!-- <a slot="action" slot-scope="text" href="javascript:;">Delete</a>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.goods_name}}</p> -->
      <span slot="dateBR" slot-scope="text">
        <p v-html="text.replace(' ','<br/>')"></p>
      </span>
      <span slot="operation" slot-scope="text">
        <p>{{text}}<br/>零時起生效</p>
      </span>
      <span slot="action" slot-scope="text">
        <a @click="ifshowMore = true" class="ant-dropdown-link" v-if="!ifshowMore">
          <a-icon type="right-circle" />
        </a>
        <a @click="ifshowMore = false" class="ant-dropdown-link" v-else>
          <a-icon type="down-circle" />
        </a>
      </span>
      <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0" >{{record.goods_name}}</p> -->
    </a-table>
    <div class="MBTable">
      <ul>
        <li id="lv-noInfo" v-if="!billList.length">無符合資訊</li>
        <li v-if="billList.length" v-for="(item, index) in billList" :key="index">
          <div class="ad">
            <div class="billItem">
              <div class="bigFont">{{item.goods_name}}</div>
              <div class="littleFont">保單號碼：{{item.policy_no}}</div>
              <div class="littleFont">申請時間：{{item.apply_date}}</div>
              <div class="littleFont">保單生效日：{{item.effective_date}}零時起生效</div>
              <div class="littleFont">
                <span class="inner">繳別：{{item.pay_way}}</span>
                <span class="inner">保額：{{item.amount}}</span>
              </div>
              <div class="littleFont">
                <span class="inner">保費：{{item.premium}}</span>
                <span class="inner">狀態：{{item.accept_insurance_result}}</span>
              </div>
            </div>
            <div class="pxborder thisBorder"></div>
            <div class="btnDiv" @click="lvClick(item.policy_no,index)">投保内容<img src="@/assets/youbang/enter.png" alt="" /></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <p class="footertip">查詢最新保單資訊及108/11/30前投保紀錄，請至本公司 -->
    <!-- <p class="footertip">查詢最新保單資訊，請至本公司 -->
    <p class="footertip">查詢最新保單資訊或108年11月(含)以前投保資料，請至本公司
      <a @click="jump" class="jump">保戶會員專區</a>
    </p>
  </div>
</template>
<script>
import { codeHidden } from '@/commonJs/common.js'
export default {
  name: 'billList',
  components: {
    comForm: () => import('@/components/comForm/index'),
    codeVerify: () => import('@/views/loginIn/child/codeVerify.vue')
  },
  data() {
    return {
      aaa:"hello<br/>world",
      columns: [
        {
          title: '商品名稱',
          dataIndex: 'goods_name',
          // width: '180px'
        },
        {
          title: '保單號碼',
          dataIndex: 'policy_no',
        },
        {
          title: '申請時間',
          // dataIndex: 'create_time',
          dataIndex: 'apply_date',
          // width: '150px'
          scopedSlots: { customRender: 'dateBR' }

        },
        {
          title: '保單生效日',
          dataIndex: 'effective_date',
          // width: '5.625rem',

          scopedSlots: { customRender: 'operation' }
        },
        {
          title: '保額',
          dataIndex: 'amount',

        },
        {
          title: '繳別',
          dataIndex: 'pay_way',
          // width: '3.75rem'
        },
        {
          title: '保費',
          dataIndex: 'premium',
        },
        {
          title: '狀態',
          dataIndex: 'accept_insurance_result',
        },
        {
          title: '投保内容',
          dataIndex: '',
          align: 'center',

          scopedSlots: {
            customRender: 'action'
          }
        },
      ],
      billList: [],
      ifshowMore: false,
      locale: { emptyText: '目前尚無資訊' },
      url: '',
    }

  },

  computed: {
    // 可以查看投保記錄賬號
    // 身分證號：A193782409
    // 生日：79-01-01
  },
  methods: {
    back() {
      this.$router.push({
        name: 'infoChange'
      })
    },
    jump() {
      window.open(this.url)
    },
    async getData() {
      try {
        let tep = { "current": 1, "pageSize": 10 }
        let res = await this.Axios('listPolicyByToken', tep)
        this.url = res.data.data.redUrl
        this.billList = res.data.data.policyInfo.list
      } catch (error) {
        console.log(`err`, error)
      }
      console.log(this.billList)
    },
    click(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name: 'policyDetails'
            });
            let query= { policyNo: record.policy_no, url: this.url }
             window.localStorage.setItem("query", JSON.stringify(query));
          }
        }
      }
    },
    lvClick(policy_no,index) {
      // console.log("这是编号和index",policy_no,index)
      this.$router.push({
              name: 'policyDetails'
            });
      let query= { policyNo: policy_no, url: this.url }
      localStorage.setItem("query", JSON.stringify(query));
    }
  },
  activated() { },
  deactivated() { },
  created() {
    this.getData()
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '../index.scss';
@import '../lv-billList.scss';
</style>
