<template>
	<div class="contentBox">
		<div class="insurecontentBox">
			<div class="insurecontent">
				<p class="coin">幣別：新台幣</p>

				<p class="contitle">保單詳情</p>

				<ul class="policyBox">
					<li class="policycontent" v-for="(item,index) in insurance" :key="index" :class="{policy_content:index%2!==0}">
						<span class="labeltit">{{item.label}}</span>
						<span>{{formatDate(item)}}</span>
					</li>
				</ul>
			</div>
			<div class="insurecontent">
				<p class="contitle">被保險人資訊</p>
				<ul class="policyBox policyBox1">
					<li class="policycontent noline" v-for="(item,index) in insured" :key="index" :class="{policy_content:index%2!==0}">
						<span class="labeltit">{{item.label}}</span>
						<span>{{formatDate(item)}}</span>
					</li>
				</ul>
			</div>
			<div class="insurecontent">
				<p class="contitle">要保人資訊</p>
				<ul class="policyBox">
					<li class="policycontent" v-for="(item,index) in applicant" :key="index" :class="{policy_content:index%2!==0,w100:item.name=='fullAddress'}">
						<span class="labeltit">{{item.label}}</span>
						<span>{{formatDate(item)}}</span>
					</li>
				</ul>
			</div>
			<div class="insurecontent">
				<p class="contitle contitle4">受益人資訊</p>
				<div v-if="!islegal" class="benefitconBox">
					<ul class="benefitype">
						<li class="benefitypecontent" v-for="(item,index) in benefitType" :key="index">
							<span class="labeltit">{{item.label}}</span>
							<span>{{item.value}}</span>
						</li>
					</ul>
					<ul v-for="(item,index) in benefiList" :key="index" class="benefitBox">
						<li class="benefit" v-if="israte">
							<span class="labeltit">比例</span>
							<span>{{item.benefits_rate}}</span>
						</li>
						<li class="benefit" v-else>
							<span class="labeltit">順位</span>
							<span>{{item.benefits_sort}}</span>
						</li>
						<li class="benefit">
							<span class="labeltit">姓名</span>
							<span v-if="item.relation_to_insured!= '04'">{{codeHidden('name',item.name)}}</span>
							<span v-else>法定繼承人</span>
						</li>
					</ul>
				</div>
				<div v-else>
					<p class="legaltip">身故保險金受益人：法定繼承人</p>
				</div>
			</div>
			<p class="footertip">查詢最新保單資訊及108/11/30前投保紀錄，請至本公司
				<a @click="jump" class="jump">保戶會員專區</a>
			</p>
			<span @click="goback">
				<!-- <span class="arrow"></span> -->
				<span class="left">
					<</span>
						<span class="backtip">返回投保紀錄查詢</span>
				</span>
		</div>
		<!-- H5 -->
		<div class="h5detail">
			<div class="billDiv">
				<span @click="goback" class="right" style="display: flex;font-size: 14px;;justify-content: space-between;margin-bottom: 10px;">
					<span></span>
					<img id="lvqq-back" src="@/assets/youbang/X.png" alt="">
				</span>
				<div id="lvqq-taibi" style="">幣別：新台幣</div>
				<div class="thisTitle pxborder">保單詳情</div>
				<div class="billItem">
					<div class="littleFont" v-for="(item,index) in insurance" :key="index">{{item.label}}：{{formatDate(item)}}</div>
				</div>
				<div class="thisTitle pxborder">被保險人資訊</div>
				<div class="billItem">
					<div class="littleFont" v-for="(item,index) in insured" :key="index">{{item.label}}：{{formatDate(item)}}</div>
				</div>
				<div class="thisTitle pxborder">要保人資訊</div>
				<div class="billItem">
					<div class="littleFont" v-for="(item,index) in applicant" :key="index">{{item.label}}：{{formatDate(item)}}</div>
				</div>
				<div class="thisTitle pxborder">受益人資訊</div>
				<div class="billItem">
					<div class="littleFont">受益人類型：身故保險金受益人</div>
					<div v-if="!islegal">
						<div class="littleFont">{{benefitType[1].label}}：{{benefitType[1].value}}</div>
					</div>
					<div v-if="!islegal">
						<div v-for="(item,index) in benefiList" :key="index">
							<div v-if='item.name' class="littleFont">姓名：{{codeHidden('name',item.name)}}</div>
							<div v-if='item.relation_to_insured == "04"' class="littleFont">姓名：法定繼承人</div>
							<div v-if='item.benefits_sort' class="littleFont">順位：{{item.benefits_sort}}</div>
							<div v-if='item.benefits_rate' class="littleFont">比例：{{item.benefits_rate}}</div>
						</div>
					</div>
				</div>
				<div class="otherTip">查詢最新保單資訊或108年11月(含)以前投保資料，請至本公司</div>
				<div @click="jump()" class="thisFont" >保戶會員專區</div>
			</div>
		</div>
	</div>
</template>


<script>
import { codeHidden } from '@/commonJs/common.js'
export default {
	name: "policyDetails",
	components: {

	},
	watch: {},
	data() {
		return {
			policyNo: "",
			insurance: [
				{
					name: 'goodsName',
					label: '商品名稱',
					value: ""
				},
				{
					name: 'policyNo',
					label: '保單號碼',
					value: ""
				},
				{
					name: 'applyDate',
					label: '申請時間',
					value: ""
				},
				{
					name: 'effectiveDate',
					label: '保單生效日',
					value: ""
				},
				{
					name: 'amount',
					label: '保險金額',
					value: ""
        },
        {
					name: 'premium',
					label: '保費',
					value: ""
				},
				{
					name: 'payYear',
					label: '繳費年期',
					value: ""
				},
				{
					name: 'payWay',
					label: '繳別',
					value: ""
				},
				{
					name: 'payMethod',
					label: '繳費管道',
					value: ""
				},
				{
					name: 'bankNo',
					label: '扣款卡號',
					value: ""
				},
				{
					name: 'renewalWay',
					label: '續期保費繳費方式',
					value: ""
				},
			],
			insured: [{
				name: 'aName',
				label: '被保險人',
				value: ""
			},
			{
				name: 'aBirthday',
				label: '被保險人生日',
				value: ""
			},
			],
			applicant: [{
				name: 'iName',
				label: '要保人',
				value: ""
			},
			{
				name: 'iBirthday',
				label: '要保人生日',
				value: ""
			}, {
				name: 'fullAddress',
				label: '聯絡（住所）地址',
				value: ""
			},
			],
			benefitType: [{
				name: 'beneficiaryType',
				label: '受益人類型',
				value: ""
			},
			{
				name: 'allocation',
				label: '分配方式',
				value: ""
			}],
			benefiList: [],
			beneficiaryType: '',
			islegal: true,
			israte: false,
		}
	},
	watch: {

	},
	methods: {
		codeHidden(name, val) {
			return codeHidden(name, val)
		},
		formatDate(item) {
			console.log(`item`, item)
			if (item.name == 'effectiveDate') {
				return `${item.value} 零時起生效`
			} else if (item.name == 'bankNo') {
				return codeHidden('bankCard', item.value)
			} else if (item.name == 'aBirthday' || item.name == 'iBirthday') {
				return codeHidden('birthday', item.value)
			} else if (item.name == 'iName' || item.name == 'aName' || item.name == 'name') {
				return codeHidden('name', item.value)
			} else if (item.name == 'fullAddress') {
				return codeHidden('address', item.value)
			} else if (item.name == 'idno') {
				return codeHidden('idCard', item.value)
			} else {
				return item.value
			}
		},
		jump() {
      let query=JSON.parse(localStorage.getItem('query'))
			window.open(query.url)
		},
		goback() {
			this.$router.go(-1)
      localStorage.removeItem('query')
		},
		getPolicyDetail() {
			let tepData = {
				policyNo: this.policyNo,
			};
			let self = this
			this.Axios('getPolicyDetail', tepData)
				.then(res => {
					let data = res.data.data
					for (let item of self.insurance) {
						item.value = data[item.name]
					}
					for (let item of self.insured) {
						item.value = data[item.name]
					}
					for (let item of self.applicant) {
						item.value = data[item.name]
					}
					for (let item of self.benefitType) {
						item.value = data[item.name]
					}
					self.benefiList = data.benefiList
					if (data.beneficiaryType == "指定受益人") {
						self.islegal = false
					}
					if (data.allocation == "比例") {
						self.israte = true
					}
				})
				.catch(err => {
					// alert(err)
				})
		},
		getQuery() {
		  let query=JSON.parse(localStorage.getItem('query'))
			this.policyNo = query.policyNo
		},
	},
	mounted() {

	},
	created() {
		this.getQuery()
		this.getPolicyDetail()
	},
};
</script>
<style lang="scss" scoped>
@import './index.scss';
@import './indexh5.scss';
@import './lv-1-7.scss';
// @media only screen and (min-device-width: 320px) and (max-device-width: 1024px) {
//   .contentBox {
//     padding-top: 80px !important;
//   }
//   .insurecontentBox {
//     display: none !important;
//   }
//   .h5detail {
//     display: block !important;
//     .billDiv {
//       max-width: 590px;
//       margin: auto;
//     }
//   }
// }
// @media only screen and (min-device-width:1025px) and (max-device-width: 1140px) {
// .policy_content {
// 	padding-left: 6.8rem!important;
// }
// }

</style>
