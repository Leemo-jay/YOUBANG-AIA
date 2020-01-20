<template>
	<div class='product-content'>
		<div class='product-detail-content'>
			<!-- 头部图片 -->
			<div class="product-detail-banner" v-for="(item, index) in arr0" :key="index">
				<img class="banner bannerPC" id="bannerPCID" :src="'data:image/png;base64,' + `${item.tagUrlPC}`" alt="" ref="banner">
				<img class="banner bannerMB" id="bannerMBID" :src="'data:image/png;base64,' + `${item.tagUrlH5}`" alt="" ref="banner">
			</div>
			<!-- 头部選择菜单 -->
			<div class="searchBar" id="searchBar" @click="test">
				<div :class="searchBarFixed == true ? 'isFixed' :''" style='background:#fff;'>
					<div class="menuBox">
						<a-menu v-model="current" mode="horizontal" @select="handleSelect">
							<a-menu-item v-for='(item,index) in productData.tabs' :key="index">
								{{item.name}}
							</a-menu-item>
						</a-menu>
					</div>
				</div>
			</div>
			<!-- 左侧 產品詳情 -->
			<div class='product-detail-left'>
				<div class="detailBox">
					<div id="content0" class="detailBoxDiv T1" :style="goodsId == 3 ? 'padding-bottom:60px;' : ''"><!-- style="padding-top: 30px;"-->
						<div class="contentItem noP" :key="index" v-for='(item,index) in arr1'>
							<div v-if="index %2 == 0">
								<div class="odd">
									<div class="pro_img"><!-- style="width:11rem" -->
										<img :src="'data:image/png;base64,' +`${item.tagUrlPC}`" alt="">
									</div>
									<span class="ml10" v-html="item.tagCase" :class="goodsId==1?'type1':''"></span><!-- style="minWidth:20.625rem"-->
								</div>
							</div>
							<div v-else>
								<div class="even">
									<span class="ml10" v-html="item.tagCase" :class="goodsId==1?'type1':''"></span><!-- style="minWidth:20.625rem"-->
									<div class="pro_img"><!-- style="width:11rem" -->
										<img :src="'data:image/png;base64,' +`${item.tagUrlPC}`" alt="">
									</div>
								</div>
							</div>
						</div>
						<!-- <div class="tip1"></div> -->
					</div>
					<div id="content0" class="font_tips" v-if="goodsId!=3">
						註1：請參閱「備註及注意事項」
					</div>
					<div id="content1" class="detailBoxDiv T2">
						<div class="" :key="index" v-for='(item,index) in arr2'>
							<img class="bannerPC" style="width: 100%;" :src="'data:image/png;base64,' + `${item.tagUrlPC}`" alt="" />
							<img class="bannerMB" style="width: 100%;" :src="'data:image/png;base64,' + `${item.tagUrlH5}`" alt="" />
						</div>
					</div>
					<div id="content2" class="detailBoxDiv T3">
						<div class="" :key="index" v-for='(item,index) in arr3'>
							<img class="bannerPC" style="width: 100%;" :src="'data:image/png;base64,' + `${item.tagUrlPC}`" alt="" />
							<img class="bannerMB" style="width: 100%;" :src="'data:image/png;base64,' + `${item.tagUrlH5}`" alt="" />
						</div>
					</div>
					<div id="content3" class="detailBoxDiv">
						<div class="tipDiv special">
							<span>常見問題</span>
						</div>
						<div :key="index" v-for='(item,index) in arr4'>
							<div v-for='(list,i) in arr4List' :key="i" class="list">
								<div class="listquestion">
									<span>Q{{i+1}}.</span>{{list.question}}</div>
								<div class="listanswer" v-html="list.answer"></div>
							</div>
						</div>
						<div @click="isToggle = !isToggle" class="comBtn thisBtn">
							<span>{{!isToggle ? '看更多' : '收合'}}</span>
							<img :class="{rotate: isToggle}" src="@/assets/youbang/toggle.png" alt="">
						</div>
					</div>

					<div id="content4" class="comDiv comDiv4">
						<div class="header">
							<span>保單條款</span>
						</div>
						<div class="ulbox" v-for="(item,index) in arr5" :key="index">
							<div class="test">
								<ul style="margin: 0;">
									<li class="disc">
										<span @click="go2Jumb(item.url)">{{item.name}}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div id="content5" class="comDiv comDiv4">
						<p class="header">
							<span>備註及注意事項</span>
						</p>
						<div class="ulbox" v-for="(item,index) in arr6" :key="index">
							<div class="test">
								<ul style="margin: 0;">
									<li class="disc">
										<span @click="go2Jumb(item.url)">{{item.name}}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- 右侧保费试算 -->
				<!-- <div class='insureformwrap' :class="searchBarFixed == true ? 'isFixed' :''"> -->
				<div class="premium_trial">
					<div class="footLeft">
						<span class="footLeftTitle">保費：</span><span class="moneyFontTB">{{format(premium) || minPremium || '--' }}</span><span>元</span>
					</div>
					<div class="footRight">
						<div class="leftBtn footerBtn" @click="premiumTrial" v-if="!show_h5_insure">保費試算</div>
						<div class="rightBtn footerBtn" @click="go2Router(1)">立即投保</div>
					</div>
				</div>
				<div class="h5_insurance_clac" @click.self="show_h5_insure=false" v-if="show_h5_insure && clientWidth < 1024">
					<div class="calc_box" id="h5_insurance">
						<div class="calc_inner">
							<antform :premData="premData" @change="change" :vocationInfo="vocationInfo"></antform>
							<div class="bily">
								<div class="font4">
									<span>保障内容</span>
									<div class="moneytype">幣別：新台幣</div>
								</div>
								<div class="itemBox">
									<div :key='index' v-for="(item,index) in liabilityList" class="bilyItem">
										<span class="left">{{item.liabilityName}}</span>
										<span class="right">{{Obj[item.liabilityCode] || 0}}元</span>
									</div>
									<div class="moneytips" v-if="goodsId==1 || goodsId == 3">
										<span>註：已包含意外身故保險金</span>
									</div>
								</div>
								<div class="marBtm" :style="uaIndexOfIphone != -1 && uaIndexOfMicroMessenger == -1 ? 'height: 4.3125rem;' : ''"></div>
							</div>
						</div>
					</div>
				</div>
				<div class='insureformwrap' style="border: 1px solid #737373;" id="insureformwrap" :style="insureFormStyle == true ? 'bottom: 8.375rem;height:auto;' : 'height:auto;'" :class="searchBarFixed == true ? 'isPosition' :''">
					<div class='insureformBox'>
						<div class='insureform'>
							<p class="premtitle">保費試算</p>
							<antform :premData="premData" @change="change" @select="select" line='1' :vocationInfo="vocationInfo" :testFree="true"></antform>
							<p class="itemTitle tl">保障内容</p>
							<p class="moneytype">幣別：新台幣</p>
							<div class="itemBox">
								<div :key='index' v-for="(item,index) in liabilityList" class="bilyItem">
									<span class="left">{{item.liabilityName}}</span>
									<span class="right">{{Obj[item.liabilityCode] || 0}}元</span>
								</div>
								<div class="moneytips" v-if="goodsId==1">
									<span>註：已包含意外身故保險金</span>
								</div>
								<div class="moneytips" v-else-if="goodsId==2">
									<span>註：已包含假日意外身故保險金</span>
								</div>
							</div>
							<div class="price">
								<span>
									<span class="pricetitle">保費：</span>
									<span class="moneyFont">
										<span class="money">{{format(premium) || minPremium || '--' }}</span> 元</span>
								</span>
							</div>
							<div class="btnBox">
								<a-button class="sumbitbtn" type="primary" @click="go2Router(2)">立即投保</a-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import regObj from '@/commonJs/regRule.js'
import { lock, unlock } from 'tua-body-scroll-lock'
import {
	getTwAge,
	timeOperation
} from '@/commonJs/common.js'
export default {
	name: "productDetail",
	components: {
		antform: () => import("../../components/antform.vue")
	},
	data() {
		return {
			clientWidth: '',
			clientHeight: '',
			insureFormStyle: false,
			isToggle: false,
			show_h5_insure: false, //显示h5保费试算
			uaIndexOfIphone: '',
			uaIndexOfMicroMessenger: '',
			goodsId: 1,
			Obj: {},
			bannerData: {},
			rootFontSize: '',
			current: [0],
			searchBarFixed: false,
			prem: '',
			minPremium: '',
			borderWidth: 0,
			borderLeft: 20,
			trailType: 2,
			isLeave: false,
			currentIndex: 0,
			thisData: {},
			orderId: '',
			debonceScrollL: '',
			tabIndex: 0,
			premium: '',
			goodsDetail: {}, // goodsType: 1 伤害险 2 寿险
			premData: {},
			showModel: false,
			productData: {
				banner: 'static/img/Product_Banner03-PC.jpg',
				img_urls: [],
				signs: [],
				tds: [],
				product_abbr: '',
				title: '',
				min_prem: '',
				content1: {
					detailArr: [{
						src: 'static/img/6.jpg',
						content: '一天不到四塊錢(註1) 通勤出遊意外全都保 '
					},
					{
						src: 'static/img/7.jpg',
						content: '四處趴趴走更安心 大眾運輸意外身故保障1.5倍   '
					},
					{
						src: 'static/img/8.jpg',
						content: '符合國人交通保障需求 騎乘機車或自行車意外身故保障1.5倍 '
					},
					{
						src: 'static/img/9.jpg',
						content: '用小錢買高保障 保障自己與心愛的家人 '
					}
					]
				},
				content3: {
					src: 'static/img/3.jpg',
					content: 'YONii(註1)是一位上班族，平常騎機車上班，休假會安排外出活動，不管是短程的登山健行或是長程出國旅遊，這些都是他紓解壓力的方法',
				},
				content2: {
					name0: '1年',
					name1: '1年',
					name2: '20歲~60歲，最高續保年齡為65歲',
					name3: '最低100萬，最高300萬(新保戶最高150萬元)',
					name4: '1~2级',
					detailArr: [{
						src: '意外身故/失能',
						content: '100萬元'
					},
					{
						src: '大眾運輸工具意外身故(註2)',
						content: ' 150萬元'
					},
					{
						src: '騎乘機車或自行車意外身故(註2)',
						content: ' 150萬元 '
					},
					]
				},
				tabs: [{
					name: '商品特色'
				},
				{
					name: '保障內容'
				},
				{
					name: '案例說明'
				},
				{
					name: '常見問題'
				}
				]
			},
			isShow: false,
			imgList: [],
			scrollTopArr: [],
			borderPosition: 0,
			// 试算结果
			Prem_Data: {},
			descArr: [],
			liabilityList: [],
			vocationInfo: {
				levelType: '',
				jobLevel: ''
			},
			arr0: [],
			arr1: [],
			arr2: [],
			arr3: [],
			arr4: [],
			arr5: [],
			arr6: [],
			iffetch: false,
			// maxheight: '700px',
			errmsg: '',
			ifhasScroll: false
		}
	},
	computed: {
		arr4List() {
			if (!this.isToggle) {
				let arr = []
				this.arr4[0].goodsFaqDTOS.forEach((el, index) => {
					if (index < 3) return arr.push(el)
				});
				return arr
			} else {
				return this.arr4[0].goodsFaqDTOS
			}
		},
	},
	watch: {
		$route(n, o) {
			// if (n.name === 'productDetail' && n.query != o.query) {
				// this.goodsId = this.$route.query.id
				this.getData()
			// }
			return
		},
		show_h5_insure (type) {
			if(type == true) {
				document.body.style.overflow = 'hidden'
	            document.addEventListener('touchmove', this.preventDefault(event), {passive: false}) // 禁止页面滑动
			}else{
				document.body.style.overflow = '' // 出现滚动条
            	document.removeEventListener('touchmove', this.preventDefault(event), {passive: false})
			}
		}
	},
	methods: {
		preventDefault (event) {
			if (event) {
				event.stopPropagation()
			}
		},
		getScrollWidth() {
			var noScroll, scroll, oDiv = document.createElement("DIV");
			oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
			noScroll = document.body.appendChild(oDiv).clientWidth;
			oDiv.style.overflowY = "scroll";
			scroll = oDiv.clientWidth;
			document.body.removeChild(oDiv);
			return noScroll-scroll;
		},
		calc_imgUrl(val) {
			let ind = val.lastIndexOf('/') + 1
			let arr_l = val.substring(0, ind)
			let arr_r = val.substring(ind)
			let str = `${arr_l}PC${arr_r}`
			return str
		},

		test() {
			console.log(`im test`)
		},
		towan(value) {
			return `value % 10000`
		},
		format(value) {
			value = value + '';
			return value.length > 3 ? value.substring(0, value.length - 3) + ',' + value.substring(value.length - 3) : value
		},
		// 图片轉PC
		formatImg(url) {
			let arr = url.split('/')
			arr.splice(arr.length - 1, 1, `PC${arr[arr.length - 1]}`)
			return arr.join('/')
		},
		go2Jumb(item) {
			window.open(item)
		},
		change() {
			let traildata = {
				productId: "1",
				goodsId: this.goodsId
			}
			let obj = this.premData
			Object.keys(obj).forEach(function (key) {
				if (key == 'birthday') {
					traildata[key] = obj[key].value
				}else {
					traildata[key] = obj[key].value
				}
			})
			let arr = Object.keys(traildata).filter(v => !traildata[v])
			if (arr.length <= 0) {
				if (this.goodsId == 3) {
					if (this.premData.birthday) {
						let year, month, day, age
						if(String(this.premData.birthday.value).length == 7){
							year = parseInt(String(this.premData.birthday.value).substr(0, 3)) + 1911
							month = parseInt(String(this.premData.birthday.value).substr(3, 2))
							day = parseInt(String(this.premData.birthday.value).substr(5, 2))
						}else if(String(this.premData.birthday.value).length == 10) {
							year = parseInt(String(this.premData.birthday.value).substr(0, 4))
							month = parseInt(String(this.premData.birthday.value).substr(5, 2))
							day = parseInt(String(this.premData.birthday.value).substr(8, 2))
						} else {
							this.errmsg = ''
						}
						age = getTwAge(new Date(year, month, day), new Date())
						if (age < 20 || age > 55) {
							this.errmsg = '很抱歉,您填寫的生日已超過商品投保年齡的限制。'
							return this.$message.error('很抱歉,您填寫的生日已超過商品投保年齡的限制。')
						} else {
							this.errormsg = ''
							this.getprice(traildata)
						}
					} else {
						this.errmsg = ''
						this.getprice(traildata)
					}
				} else {
					this.errmsg = ''
					this.getprice(traildata)
				}
			} else {
				this.premium = ''
			}
		},
		select(val) {
			console.log(`select--------------------`, val)
		},
		// 獲取保费试算结果
		getprice(traildata) {
			if (this.iffetch) return
			this.iffetch = true
			let self = this
			Object.assign(traildata, {
				type: 1
			})
			this.Axios('premiumCalc', traildata)
				.then(res => {
					this.iffetch = false
					if (res.data.data.amount <= 0) {
						this.premium = ''
						if (this.goodsId != 3) {
							this.premData.occupationLevel.hasShowError = true
							this.errmsg = '很抱歉，您所提供的資料不適合投保本商品！'
							return this.$message.error('很抱歉，您所提供的資料不適合投保本商品！')
						} else {
							if (this.premData.birthday && this.premData.birthday.hasShowError) {
								this.premData.birthday.hasShowError = true
								this.errmsg = '很抱歉,您填寫的生日已超過商品投保年齡的限制!'
								return this.$message.error('很抱歉,您填寫的生日已超過商品投保年齡的限制!')
							} else {
								this.errmsg = '請填寫正確的試算條件!'
								return this.$message.error('請填寫正確的試算條件!')
							}
						}
					}
					this.$parent.prem = res.data.data.premium;
					let arr = res.data.data.liabilityAmount;
					res.data.data.liabilityAmount.forEach(item => {
						self.Obj[item.liabilityCode] = `${parseInt(item.amount) / 10000}萬`
					});
					this.premium = res.data.data.premium
					// this.$longData(0, 'price', res.data.data)
				}).catch(err => {
					this.errmsg = err
					this.premium = ''
					this.iffetch = false
				})
		},
		handleSelect(value) {
			let _this = this
			let anchor = document.getElementById(`content${value.key}`)
			if (anchor) {
				if(_this.clientWidth + this.getScrollWidth() > 1023){
					Number(document.getElementById('bannerPCID').height)
					let num = 20
					if (value.key == 0) {
						num = 0
					}
					$(window).scrollTop(anchor.offsetTop + Number(document.getElementById('bannerPCID').height) + num)
				}else{
					let rootSize = Number(document.getElementsByTagName('html')[0].style.fontSize.split('px')[0])
					Number(document.getElementById('bannerMBID').height)
					$(window).scrollTop(anchor.offsetTop + Number(document.getElementById('bannerMBID').height) + rootSize*1.625)
				}
					
			}
		},
		handleScroll() {
			if(this.clientWidth + this.getScrollWidth() > 1023){
				try {
					// if (!this.ifhasScroll) return
					let docPC = document.querySelector('#bannerPCID')
					if (docPC) {
						let _this = this
						let scrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
						let doc = document.querySelector('.insureformwrap')
						if (document.getElementById('searchBar')) {
							let offsetTop = document.getElementById('bannerPCID').height
							if (scrollTop >= offsetTop) {
								_this.searchBarFixed = true
								let height = $(window).height() - $('#searchBar').height() - $('.fixed-header').height() - $('.footer_box').height() - 40
								doc.style.height = `${height}px`
							} else {
								doc.style.height = 'auto'
								_this.searchBarFixed = false
								doc.scrollTop = 0
							}
						}
						let doc2 = document.querySelector('#bannerPCID')
						for (let key = 0; key < 4; key++) {
							let skey = key.toString()
							let anchor = document.getElementById('content' + skey)
							if (anchor && doc2) {
								let anchoroffsetTop = anchor.offsetTop + doc2.height - 50
								if (scrollTop >= anchoroffsetTop) {
									this.current = [key]
								}
							}
						}
					}
					return
				} catch (error) {
					console.log(`err_____________________________`, error)
				}
			}else{
				try {
					let docMB = document.querySelector('#bannerMBID')
					if (docMB) {
						let _this = this
						let rootFont = this.getRootFontSize() * 3
						let scrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
						let doc = document.querySelector('.insureformwrap')
						if (document.getElementById('searchBar')) {
							let offsetTop = document.getElementById('searchBar').offsetTop
							if ((scrollTop + rootFont) > offsetTop) {
								_this.searchBarFixed = true
								let height = $(window).height() - $('#searchBar').height() - $('.fixed-header').height() - $('.footer_box').height() - 40
								doc.style.height = `${height}px`
							} else {
								doc.style.height = 'auto'
								_this.searchBarFixed = false
								doc.scrollTop = 0
							}
						}
						let doc2 = document.querySelector('#bannerMBID')
						for (let key = 0; key < 4; key++) {
							let skey = key.toString()
							let anchor = document.getElementById('content' + skey)
							if (anchor && doc2) {
								let anchoroffsetTop = anchor.offsetTop + doc2.height + 20
								// let anchoroffsetTop = anchor.offsetTop
								if (scrollTop >= anchoroffsetTop) {
									this.current = [key]
								}
							}
						}
					}
					return
				} catch (error) {
					console.log(`err_____________________________`, error)
				}
			}
		},
		getData: function () {
			let that = this
			let product = that.$route.path.slice(10)
			let tepData = {
				goodsCode:product
			};
			that.Axios('getTrialInit', tepData)
				.then(res => {
					that.goodsId = res.data.data.goodsDetail.goodsId
					that.minPremium = res.data.data.minPremium
					let premData = {};
					res.data.data.trial.forEach(item => {
						// premData = Object.assign(premData,{[item.param_en_name]: item})
						premData[item.name] = item
						if (item.levelType != undefined && item.jobLevel != undefined) {
							that.vocationInfo.levelType = item.levelType
							that.vocationInfo.jobLevel = item.jobLevel
							premData[item.name].jobLevel = item.jobLevel
							premData[item.name].levelType = item.levelType
							premData[item.name].width = '100%'
							premData[item.name].pb = true
							premData[item.name].placeholder = '我的行業別'
							premData[item.name].placeholdertwo = '我的職業別'
							premData[item.name].placeholderthr = '工作性質'
							premData[item.name].firstWord = undefined
							premData[item.name].secondWord = undefined
							premData[item.name].lastWord = undefined
						}
					})
					that.premData = premData;
					that.liabilityList = res.data.data.liabilityList;
					let obj = {}
					that.liabilityList.forEach(item => {
						obj[item.liabilityCode] = 0
					})
					that.Obj = obj
					that.goodsDetail = res.data.data.goodsDetail
					that.arr0 = that.goodsDetail.goodsDetailInfoDTOS.filter(el => el.tagType == 0)
					that.arr1 = that.goodsDetail.goodsDetailInfoDTOS.filter(el => el.tagType == 1)
					that.arr2 = that.goodsDetail.goodsDetailInfoDTOS.filter(el => el.tagType == 2)
					that.arr3 = that.goodsDetail.goodsDetailInfoDTOS.filter(el => el.tagType == 3)
					that.arr4 = that.goodsDetail.goodsDetailInfoDTOS.filter(el => el.tagType == 4)
					that.arr5 = res.data.data.insuranceClause // 保單条款
					that.arr6 = res.data.data.announcements  // 注意事项
				})
				.catch(err => {
					console.log(err)
				})
		},
		verifyInput () {
			if (this.goodsId != 3) {
				if (!this.premData.occupationLevel.value) {
					this.errmsg = '請選擇職業！'
					this.premData.occupationLevel.hasShowError = true
					return this.$message.error('請選擇職業')
				} else if (!this.premData.amount.value) {
					this.errmsg = '請填寫正確的試算條件!'
					return this.$message.error('請填寫正確的試算條件！')
				} else {
					// let userBirthday = this.$store.getters.userBirthday
					// let age = getTwAge(new Date(userBirthday), new Date())
					// if (age < 20 || age > 60) {
					// 	return this.$message.error('很抱歉，您所提供的資料不適合投保本商品！')
					// }
				}
			} else {
				if (!this.premData.birthday.value) {
					this.errormsg = '請填寫生日'
					this.premData.birthday.hasShowError = true
					return this.$message.error('請填寫生日')
				} else if (this.premData.birthday.hasShowError) {
					let reg = /\d{7}/;
					if (!reg.test(this.premData.birthday.value)) {
						this.errormsg = '日期格式不正確'
						this.premData.birthday.hasShowError = true
						return this.$message.error('日期格式不正確')
					} else {
						this.premData.birthday.hasShowError = true
						this.errmsg = '很抱歉,您填寫的生日已超過商品投保年齡的限制!'
						return this.$message.error('很抱歉,您填寫的生日已超過商品投保年齡的限制!')
					}
				}
				if (!this.premData.genderCode.value || !this.premData.amount.value) {
					this.errmsg = '請填寫正確的試算條件!'
					return this.$message.error('請填寫正確的試算條件!')
				}
			}
		},
		go2Router(type) {
			if(type == 1){
				if(this.show_h5_insure){
					this.verifyInput()
					if (!this.premium) return
				}
			}else if(type == 2){
				if(this.$route.name == 'productYO'){
					if(this.premData.birthday.show_value || this.premData.genderCode.show_value){
						this.verifyInput()
						if (!this.premium) return
					}
				}else{
					if(this.premData.occupationLevel.show_value){
						this.verifyInput()
						if (!this.premium) return
					}
				}
			}
			this.$store.commit('setTrial', this.premData)
			this.$store.commit('setVocationInfo', this.vocationInfo)
			this.$router.push({
				name: 'insure',
				query: {
					id: this.goodsId,
					premium: this.premium,
					goodsType: this.goodsDetail.goodsType,
					firstWord: this.premData.occupationLevel != undefined ? this.premData.occupationLevel.firstWord : '',
					secondWord: this.premData.occupationLevel != undefined ? this.premData.occupationLevel.secondWord : '',
					lastWord: this.premData.occupationLevel != undefined ? this.premData.occupationLevel.lastWord : ''
					// trail: JSON.stringify(this.premData),
					// vocationInfo: JSON.stringify(this.vocationInfo),
				}
			});
		},
		getQuery() {
			this.goodsId = this.$route.query.id
		},
		setMaxHeight() {
			let doc = document.documentElement.clientHeight - 50
			// this.maxheight = `${doc}px`
		},
		initInsureFormWrap () {
			let that = this
			that.clientHeight = document.body.clientHeight
			if(that.clientHeight < 64.875 * that.getRootFontSize()){
				this.insureFormStyle = true
			} else{
				this.insureFormStyle = false
			}
		},
		initClientWidth () {
			let that = this
			window.addEventListener('resize', function () {
				that.clientWidth = document.body.clientWidth
				that.initInsureFormWrap()
			})
			setTimeout(function(){
				if(sessionStorage.getItem('setItem') == 'true' && (that.clientWidth + that.getScrollWidth()) < 1024){
					that.show_h5_insure = true
					sessionStorage.removeItem('setItem')
				}
			},0)
		},
		getRootFontSize (){
			let that = this
			that.rootFontSize = Number(document.getElementsByTagName('html')[0].style.fontSize.split('px')[0])
			return that.rootFontSize
		},
		premiumTrial () {
			this.show_h5_insure = true
		},
	},
	updated() {
		let doc = this.$refs.banner
		if (doc && doc.height && !this.ifhasScroll) {
			if (this.$route.query.from == 'trial') {
				$(window).scrollTop(doc.height + 60)
				this.ifhasScroll = true
			} else {
				this.ifhasScroll = true
			}
		}
	},
	mounted() {
		let that = this
		let ua = navigator.userAgent
		that.uaIndexOfIphone = ua.indexOf('iPhone')
		that.uaIndexOfMicroMessenger = ua.indexOf('MicroMessenger')
		window.addEventListener('scroll', function() {
			that.handleScroll()
		})
		that.initClientWidth()
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll, false)
	},
	created() {
		// const targetElement = document.querySelector("#h5_insurance");
		// lock(targetElement)
		// unlock(targetElement)
		this.clientWidth = document.body.clientWidth
		this.initInsureFormWrap()
		this.getQuery() // 獲取路由传参--產品id
		this.getData() // 獲取產品詳情
		this.$nextTick(() => {
			this.setMaxHeight()
			window.onresize = () => this.setMaxHeight()
		})
	},
};
</script>
<style lang="scss" scoped>
@import './index.scss';
@import './h5_product.scss';
@media screen and (max-width: 1023px) {
	.formDiv {
    	padding: 0;
  	}
}
.comDiv4 {
  background: #f2f2f2;
  .header {
	width: 100%;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 2.125rem;
    text-align: center;
  }
  .ulbox {
    margin-top: 1.5625rem;
    padding-left: 1rem;
    font-size: 1.25rem;
    color: #399ce2;
    text-align: left;
    background: #fff;
    .test {
      width: 90%;
      margin: auto;
    }
    .disc {
      list-style: disc;
    }
    li {
		span {
			text-decoration: underline;
			cursor: pointer;
      	}
    }
  }
}
</style>
