<template>
  <div class="content" ref="insure">
    <div class="fixed-side">
      <antstep :current.sync='current'></antstep>
    </div>
    <div class="h5_step" style="display:none">
      <h5step :tabIndex.sync="current" :tabArr='tabArr' ></h5step>
    </div>
    <div class="rightDiv" ref="rightDiv">
      <div class="insure" ref="rightInsure">
        <div v-if="current==0" id="insuretab1" class="step_one">
          <div class="insureitem" id="applicatFactors">
            <p class="coin">本網頁金額皆以新台幣計</p>
            <p class="header">
              <span>要被保險人資訊</span>
            </p>
            <antform :premData="premDataTab1.applicatFactors" line="2"></antform>
            <!-- <div class="addVocationbtn" @click="addVocation"></div> -->
          </div>
          <div class="insureitem" id="infromFactors">
            <p class="header">
              <span>告知事項</span>
            </p>
            <div class="infromFactors">
              <span @click="showSearch" class="searchBntbox">
                <a-icon type="search" class="searchBtn"/>
                <!-- <img src="@/assets/youbang/biger.png" calss="searchBntbox" alt="" style="width:1.5rem"> -->
                <span>搜尋職業</span>
              </span>
              <antform :premData="premDataTab1.infromFactors" line="2" :vocationInfo="vocationInfo" class="tell 999" style="{margin-top:-0.625rem}"></antform>
            </div>
            <antquestion :questionList="questionList.infroms"></antquestion>
          </div>
          <div class="insureitem" id="otherInfroms">
            <p class="header">
              <span>其他問項</span>
            </p>
            <antquestion :questionList="questionList.otherInfroms"></antquestion>
          </div>
          <div class="insureitem">
            <p class="header">
              <span>投保内容</span>
            </p>
            <antform :premData="premDataTab1.policyContent" line="1" class="info" id="stepOne-select"></antform>
            <!-- <p class="little">*金額皆以新臺幣計</p> -->
          </div>
        </div>
        <div v-if="current==1" id="insuretab2" class="step_two">
          <div class="insureitem ">
            <p class="header">
              <span>投保内容</span>
            </p>
            <div v-if="premDataTab1.policyContent !== undefined" class="two_info">
              <!-- <p v-for="(item, index) in premDataTab1.policyContent" :key="index" class="insurelable">
                <span class="insurelabletitle" v-if="item.label!='繳別'">{{item.label}}</span>
                <span class="insurelablecon" v-if="item.label!='繳別'">{{item.show_value?item.show_value:item.value}}</span>
              </p> -->
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.goodsName.label}}</span>
                <span class="insurelablecon" v-if="true">{{premDataTab1.policyContent.goodsName.value}}</span>
              </p>
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.amount.label}}</span>
                <span class="insurelablecon" v-if="true">{{incluesY(premDataTab1.policyContent.amount.show_value)}}</span>
              </p>
            </div>
          </div>
          <div class="insureitem">
            <p class="header">
              <span>要被保險人資訊</span>
            </p>
            <antform :premData="premDataTab2.recognizeeFactorList" line="2" @checkAddress="checkAddress(1)" id="two-one"></antform>
          </div>
          <div class="insureitem">
            <p class="header">
              <span>身故受益人</span>
            </p>
            <antform :premData="beneficiaryType" @change="benefichange" line="2" id="two-two"></antform>
            <!-- 指定受益人 -->
            <div v-if="beneficiaryType.beneficiaryType != undefined &&beneficiaryType.beneficiaryType.value!='01'">
              <antform :premData="allocation" @change="allocachange" line="2" id="two-three"></antform>
              <div class="benefiBox" v-for='(arr,index) in beneficiary' :key="index" :id="setIDtwo(index)">
                <!-- 删除按钮 -->
                <div class="deletebtn" v-if="index !== 0" @click="deleteObj(index)">
                  <a-icon type="delete" />
                </div>
                <div class="benefiCon">
                  <p class="header">
                    <span>受益人({{num2Text(index+1)}})</span>
                  </p>
                  <!-- 選擇受益人下拉 -->
                  <antform :premData="arr.beneficiaryFactorList" line="2" :index="index" @checkIdcard="checkIdcard(0)" :benefi="arr.beneficiaryFactorList.relationToInsured.value == '04'?true:false"></antform>
                  <!-- 填寫顺位 -->
                  <antform v-if="allocation.allocation.value!=2" :premData="arr.benefitsSort" line="2"></antform>
                  <!-- 填寫比例 -->
                  <antform v-else :premData="arr.benefitsRate" line="2" @checkSum="checkSum"></antform>
                  <antform :premData="arr.sameAsCustomer" @change="samechange(arr.sameAsCustomer,arr.factorList)" @checkAddress="checkAddress(2)" line="2" v-if="arr.beneficiaryFactorList.relationToInsured.value != '04'"></antform>
                  <antform v-if="arr.beneficiaryFactorList.relationToInsured.value!='04'" :premData="arr.factorList" line="2"></antform>
                </div>
              </div>
              <a-button class="addbtn" @click="add" v-if="beneficiary.length < 3">
                <!-- <span class="add">+</span>  -->
                <img src="@/assets/youbang/add.png" alt="" style="width:1rem">
                <span class="o_btn">增加一位受益人</span>

              </a-button>
              <p class="footertip">*如要保人不同意填寫受益人之聯絡地址及電話，則以要保人最後所留之聯絡方式，作為日後身故保險金受益人之通知依據。</p>
              <p class="footertip">*倘身故受益人指定為法定繼承人者，該項保險金之順位及應得比例適用民法繼承編相關規定。</p>
            </div>
          </div>
          <p class="footerphone">電話訪問時間：上午9:00~下午5:30</p>
          <p class="footerlasttip">配合法令規範，本公司將進行隨機抽樣電話訪問，確保您了解商品內容及投保意願。</p>
        </div>
        <div v-if="current==2" id="insuretab3" class="step_three">
          <div class="insureitem">
            <p class="header">
              <span>投保内容</span>
            </p>
            <div class="tws">
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.goodsName.label}}</span>
                <span class="insurelablecon" v-if="true">{{premDataTab1.policyContent.goodsName.value}}</span>
              </p>
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.amount.label}}</span>
                <span class="insurelablecon" v-if="true">{{ incluesY(premDataTab1.policyContent.amount.show_value)}}
                </span>
              </p>
              <p class="insurelable">
                <span class="insurelabletitle">保單生效日</span>
                <span class="insurelablecon">{{effectDay}}</span>  
                <!-- 更新保单生效日 -->
              </p>
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.payFlag.label}}</span>
                <span class="insurelablecon" v-if="true">{{premDataTab1.policyContent.payFlag.value}}</span>
              </p>
            </div>
          </div>
          <div class="insureitem">
            <p class="header">
              <span>要被保險人資訊</span>
            </p>
            <div>
              <div v-for="(item,index) in premDataTab1.applicatFactors" :key="index" class="insurelable">
                <p v-if="item.name!='personalIncome'&&item.name!='familyIncome'&&item.name!='personalAsset'">
                  <span class="insurelabletitle">{{item.label}}</span>
                  <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}{{item.unit}}</span>
                </p>
              </div>
              <div v-for="(item,index) in premDataTab1.infromFactors" :key="index" class="insurelable">
                <p v-if="item.type!='tip' && item.type != 'zy'">
                  <span class="insurelabletitle">{{item.label}}</span>
                  <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}{{item.unit}}</span>
                </p>
                <div v-else-if="item.type == 'zy'&&item.value!=''">
                  <p class="item">
                    <span class="insurelabletitle">{{item.label}}</span>
                    <span class="insurelablecon">{{item.show_value}}</span>
                    <!-- <span class="insurelablecon">{{item.lastWord}}</span> -->
                  </p>
                  <div class="insurelable">
                    <p class="item" v-if="(item.name=='jobId'&&maxjobType.length==1)||(item.name=='sidelineJobId'&&maxjobType.length==2)">
                      <span class="insurelabletitle">職業類別</span>
                      <span class="insurelablecon">{{getMax(maxjobType)}}</span>
                      <!-- <span class="insurelablecon">{{item.lastWord}}</span> -->
                    </p>
                  </div>
                  <!-- <p class="item">
                    <span class="insurelabletitle">職業類別</span>
                    <span class="insurelablecon">{{item.jobType}}</span>
                  </p> -->
                  <!-- <p class="item">
										<span class="insurelabletitle">職業等級</span>
										<span class="insurelablecon">{{item.value}}</span>
									</p> -->
                </div>
              </div>
              <div v-for="(el,ind) in incomList" :key="ind" class="insurelable">
                <p>
                  <span class="insurelabletitle">{{el.label}}</span>
                  <span class="insurelablecon">{{el.show_value?el.show_value:el.value}}{{el.unit}}</span>
                </p>
              </div>
              <div v-for="(item,index) in premDataTab2.recognizeeFactorList" :key="index" class="insurelable">
                <p v-if="item.type == 'phone'">
                  <span class="insurelabletitle">{{item.label}}</span>
                  <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
                </p>
                <p v-else-if="item.type == 'address'">
                  <span class="insurelabletitle">{{item.label}}</span>
                  <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}{{premDataTab2.recognizeeFactorList.addressText.value}}</span>
                </p>
              </div>
              <p class="insurelable">
                <span class="insurelabletitle insurelabletitle1">告知問項及其它問項是否有勾選</span>
                <span class="insurelablecon">[是]：否</span>
              </p>
            </div>
          </div>
          <div class="insureitem">
            <p class="header">
              <span>身故受益人</span>
            </p>
            <div>
              <p v-for="(item,key) in beneficiaryType" :key="key" class="insurelable">
                <span class="insurelabletitle">{{item.label}}</span>
                <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
              </p>
              <div v-if="beneficiaryType.beneficiaryType.value!='01'">
                <p v-for="(item,key) in allocation" :key="key" class="insurelable">
                  <span class="insurelabletitle">{{item.label}}</span>
                  <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
                </p>
                <div class="benefiBox" v-for='(arr,index) in beneficiary' :key="index">
                  <div class="benefiCon">
                    <p class="header">
                      <span>受益人({{num2Text(index+1)}})</span>
                    </p>
                    <div v-if="arr.beneficiaryFactorList.relationToInsured.value != '04'">
                      <p v-for="(item,key) in arr.beneficiaryFactorList" :key="key" class="insurelable">
                        <span class="insurelabletitle">{{item.label}}</span>
                        <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
                      </p>
                    </div>
                    <div v-else>
                      <p class="insurelable">
                        <span class="insurelabletitle">{{arr.beneficiaryFactorList.relationToInsured.label}}</span>
                        <span class="insurelablecon">{{arr.beneficiaryFactorList.relationToInsured.show_value}}</span>
                      </p>
                    </div>
                    <p v-for="(item,key) in arr.benefitsSort" v-if="allocation.allocation.value!=2" :key="key" class="insurelable">
                      <span class="insurelabletitle">{{item.label}}</span>
                      <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
                    </p>
                    <p v-for="(item,key) in arr.benefitsRate" v-else :key="key" class="insurelable">
                      <span class="insurelabletitle">{{item.label}}</span>
                      <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}{{item.unit}}</span>
                    </p>
                    <!-- <p v-for="(item,key) in arr.sameAsCustomer" :key="key" class="insurelable">
											<span class="insurelabletitle">{{item.label}}</span>
											<span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
										</p> -->
                    <div v-for="(item,key) in arr.factorList" :key="key" class="insurelable" v-if="arr.beneficiaryFactorList.relationToInsured.value != '04'">
                      <p v-if="item.type == 'phone'">
                        <span class="insurelabletitle">{{item.label}}</span>
                        <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}</span>
                      </p>
                      <p v-else-if="item.type == 'address'">
                        <span class="insurelabletitle">{{item.label}}</span>
                        <span class="insurelablecon">{{item.show_value?item.show_value:item.value}}{{arr.factorList.beneficiaryAddressText.value}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="insureitem">
						<p class="header">
							<span>告知事項</span>
						</p>
						<antquestion :questionList="questionList.infroms" :allfalse="true"></antquestion>
					</div> -->
          <!-- <div class="insureitem">
						<p class="header">
							<span>其他問項</span>
						</p>
						<antquestion :questionList="questionList.otherInfroms" :allfalse="true"></antquestion>
					</div> -->
          <div class="insureitem">
            <p class="header">
              <span>閲讀並簽署相關文件</span>
            </p>
            <!-- <div class="collapseBox" v-for="(item,index) in riskAgreementDTOList" :key="index"> -->
            <div class="collapseBox">
              <!-- <antcheck class="antcheck" :num.sync="num" :checked.sync="checked[index]"></antcheck>
							<a-collapse v-model="activeKey">
								<a-collapse-panel :key="index" :showArrow="false">
									<template slot="header">
										<span class="statementtitle">{{item.name}}</span>
										<a-icon type="minus" v-if="activeKey.includes(index)" class="collapseicon" />
										<a-icon type="plus" v-else class="collapseicon" />
									</template>
									<div v-html="item.content"></div>
								</a-collapse-panel>
							</a-collapse> -->
              <div v-if="infoList.length > 0">
                <div v-for="(item,index) in riskAgreementDTOList" :key="index">
                  <toggle :isAgree.sync="checked[index]" :title="item.name" :index="index" :ifCant="Modeify" :initial="!checked[index]" @updateIsAgree="updateIsAgree" :openIndex="openIndex">
                    <div v-html="item.content">
                    </div>
                  </toggle>
                </div>
              </div>
            </div>
          </div>
          <div class="serialNumber">
            <!-- <p class="item_tips">保險契約審閱期聲明</p> -->
            <a-button class="submitbtn" type="primary" @click="submit" :disabled="Modeify">確認投保，請發送動態密碼</a-button>
            <code-verify v-if="Modeify" :phoneP="userInfo.phone" :emailP="userInfo.email" :serialNumber="serialNumber" ref="paycodeverify">
            </code-verify>
          </div>
        </div>
        <div v-if="current==3" class="stepFour" ref="stepFour">
          <div class="insureitem">
            <p class="header">
              <span>投保内容</span>
            </p>
            <div>
              <!-- <p v-for="(item, index) in premDataTab1.policyContent" :key="index" class="insurelable">
                <span class="insurelabletitle" v-if="item.label!='繳別'">{{item.label}}</span>
                <span class="insurelablecon" v-if="item.label!='繳別'">{{item.show_value?item.show_value:item.value}}</span>
              </p> -->
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.goodsName.label}}</span>
                <span class="insurelablecon" v-if="true">{{premDataTab1.policyContent.goodsName.value}}</span>
              </p>
              <p class="insurelable">
                <span class="insurelabletitle" v-if="true">{{premDataTab1.policyContent.amount.label}}</span>
                <span class="insurelablecon" v-if="true">{{incluesY(premDataTab1.policyContent.amount.show_value)}}</span>
              </p>
            </div>
          </div>
          <div class="insureitem">
            <p class="header ">
              <span>選擇繳費方式</span>
            </p>
            <div class="way">
              <div class="way-item" :class="payWay===1?'red':''" @click="changeWay(1)">信用卡付款</div>
              <!-- <div class="way-item" :class="payWay===2?'red':''" @click="changeWay(1)"></div> -->
              <p class="tips fl">*網路投保僅能使用要保人本人信用卡繳費，且線上立即扣款，無法取消。</p>
              <div class="bankbox">
                <div class="left fl">
                  <p class="state">卡別說明：</p>
                </div>
                <div class="right fr">
                  <p class="state">限使用合作發卡銀行VISA、MASTERCARD、JCB卡</p>
                  <div class="searchBank">
                    <span @click="showbank">查詢合作發卡銀行</span>
                    <a-icon type="right-circle" />
                  </div>
                </div>
              </div>
              <p class="bankName state fl">持卡人姓名 ： {{premDataTab1.applicatFactors.name.value}}</p>
              <p class="state fl">信用卡卡號</p>
              <input class="bank-input bank" :class="{redbtbd:ifBankError}" v-model="item.value" :placeholder="index==0?'請填寫卡號':''" v-for="(item,index) in bankNumList" :key="index" maxlength="4" @blur="checkBankLength(index)" :id="setID(index)" @input="chekcIF4($event.target.value,index)">
              <p class="errorTip fl" v-if="ifBankError">請填寫正確信用卡卡號</p>
              <p class="state fl">有效期</p>
              <div class="selectbox" id="four-date-select">
                <div class="select">
                  <a-select style="border: 80%;" @change="handleMonthChange" placeholder="請選擇" v-model="month" :getPopupContainer="triggerNode => triggerNode.parentNode">
                    <select-icon slot="suffixIcon" />

                    <a-select-option :value="item" v-for="(item,index) in monthList" :key="index">{{item}}</a-select-option>
                  </a-select>
                  <span>月</span>
                </div>
                <div class="select">
                  <a-select style="width: 80%;" @change="handleYearChange" placeholder="請選擇" v-model="year" :getPopupContainer="triggerNode => triggerNode.parentNode">
                    <select-icon slot="suffixIcon" />

                    <a-select-option :value="item" v-for="(item,index) in yearList" :key="index">{{item}}</a-select-option>
                  </a-select>
                  <span>年</span>
                </div>
              </div>
              <p class="errorTip fl" v-if="ifdateErr">請選擇正確信用卡有效月年</p>
              <p class="state fl">信用卡背面末三碼</p>
              <input class="bank-input" :class="{redbtbd:ifLast3Error}" id="four-last-num" v-model="bankLast3Number" placeholder="請填寫" maxlength="3" @blur="checkLast3Num">
              <p class="errorTip fl" v-if="ifLast3Error">請填寫正確信用卡背面末三碼數字</p>
            </div>
          </div>
          <div class="insureitem thirdbox">
            <p class="header fl">
              <span>續期保費繳費方式約定</span>
            </p>
            <div class="way">
              <div class="way-item" :class="renewalWay===1?'red':'bold'" @click="changeRenewWay(1)">授權此卡號繳交續期保費</div>
              <div class="way-item" :class="renewalWay===2?'red':'bold'" @click="changeRenewWay(2)">自行繳費</div>
            </div>
          </div>
          <div class="insureitem thirdbox">
            <p class="header fl">
              <span>推薦人</span>
            </p>
            <p class="state referrer">推薦人序號</p>
            <input class="bank-input" :class="{redbtbd:ifreCodeError}" id="four-menber" v-model="referenceCode" placeholder="請填寫非本人的推薦序號" @blur="checkreferenceCode">
            <p class="errorTip fl" v-if="ifreCodeError">請填寫正確的推薦人序號</p>
          </div>
          <div class="insureitem thirdbox infoList" id="four-isAgree">
            <toggle :isAgree.sync="isAgree[index]" v-for="(item,index) in infoList" :key="index" :title="item.name" :index="index" @updateIsAgree="updateIsAgree">
              <div v-html="item.content">
              </div>
            </toggle>
          </div>
        </div>
        <div v-if="current==4" class="step_five">
          <p class="insuresuccess success1">恭喜您完成投保</p>
          <p class="insurelable">您的保單資訊如下：</p>
          <div>
            <p v-for="(item,key) in informtionList" :key="key" class="insurelable">
              <span class="insurelabletitle">{{item.label}}</span>
              <span class="insurelablecon">{{item.value}}</span>
            </p>
          </div>

          <a-button class="jumpbtn" type="primary" @click="jump">加入/登入保戶專區</a-button>
          <div class="imgcarousel">
            <a-carousel autoplay>
              <div class="carouselimgBox" v-for="(item,index) in imgList" :key="index">
                <img style="height: 100%;" :src="item.src" alt="" @click="go2Detial" v-if="item.src" />
              </div>
            </a-carousel>
          </div>
        </div>
      </div>
    </div>
    <div class="insurefooter" v-if="current!=4">
      <div>
      <span class="price">保費：
        <span class="pricemount">{{premium|| '--'}}</span>元</span>
      <a-button class="prebtn" @click="pre" v-if="current!=0">上一步</a-button>
      <a-button class="nextbtn" v-if="current==3" type="primary" @click="sure" :disabled="!Modeify || ifloading">線上繳費</a-button>
      <a-button class="nextbtn" style="border: 1px solid #d81f49;" :class="errNum==5?'isGrey':''" v-else type="primary" @click="sure" :disabled="current==4||ifloading">下一步</a-button>
      </div>
    </div>
    <!-- 银行列表 -->
    <div class="bankList" v-if="showbankList">
      <div class="contentbox">
        <p class="title">合作發卡銀行</p>
        <div class="box">
          <div class="name" v-for="(item,index) in bankList" :key="index">{{item.bankName}}</div>
          <div class="name"></div>
          <div class="name"></div>
          <div class="name"></div>
        </div>
        <div class="close" @click="hideBank">
          <a-icon type="close" />
        </div>
      </div>
    </div>
    <!-- 搜尋职业 -->
    <antoccupation v-if="ifshowSearch" :vocationInfo="vocationInfo" ref="vocation" @hide="hide" @select="select" />
    <div class="loadingbox">
      <loading v-if="ifloading" />
    </div>
  </div>

</template>

<script>
import moment from 'moment'
import loading from '../../components/loading.vue'
import antstep from '../../components/antstep.vue'
import antform from '../../components/antform.vue'
import antcheck from '../../components/antcheck.vue'
import h5step from '../../components/h5_step'
import antquestion from '../../components/antquestion.vue'
import codeVerify from '@/views/loginIn/child/codeVerify.vue'
import toggle from "@/components/toggle.vue";
import regObj from '@/commonJs/regRule.js'
import antoccupation from '@/components/antoccupation.vue'
import {
  longData,
  codeHidden
} from '@/commonJs/common.js'
import {
  formatmyyear
} from '@/commonJs/common.js'

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
  name: "insure",
  components: {
    loading,
    antstep,
    h5step,
    antform,
    antcheck,
    antquestion,
    codeVerify,
    selectIcon,
    toggle,
    antoccupation,
  },
  data() {
    return {
      tabArr: [{
            tab_name: '投保資格確認'
          },
          {
            tab_name: '資料填寫'
          },
          {
            tab_name: '資料確認'
          },
          {
            tab_name: '線上繳費'
          },
          {
            tab_name: '完成投保'
          }
        ],
      iftest: true,
      ifshowSearch: false,
      bankList: [],
      showbankList: false,
      infoList: [],
      isAgree: [],
      year: undefined,
      month: undefined,
      openIndex: 0,
      referenceCode: '', //推荐人序号
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yearList: [], // 到期年份列表
      // bankNumber: '', //银行卡号
      bankLast3Number: '', //卡号末三位
      payWay: 1, //支付方式
      renewalWay: 1, //续费方式 
      payName: '', // 持卡人姓名
      Modeify: false,
      serialNumber: "",
      userInfo: {
        phone: '',
        email: '',
      },
      informationConfirmSendOtp: true,
      goodsId: 1,
      goodsType: '',
      premium: '--',
      beneficiaryobj: {},
      goodsName: '',
      amount: '',
      premDataTab1: {
        applicatFactors: {},
        infromFactors: {},
        policyContent: {},
      },
      questionList: {
        infroms: [],
        otherInfroms: [],
      },
      premDataTab2: {
        recognizeeFactorList: {},
      },
      beneficiaryType: {},
      allocation: {},
      beneficiary: [],
      riskAgreementDTOList: [],
      current: 0,
      data: [],
      visible: false,
      block: true,
      count: 1,
      checked: [],
      benefitype: '法定受益人',
      activeKey: [],
      orderNum: '',
      tab1insureData: {},
      tab2insureData: {},
      num: 0,
      tab1: false,
      tab2: false,
      tab3: false,
      informtionList: [
        {
          name: 'iName',
          label: '要保人',
          value: ""
        },
        {
          name: 'aName',
          label: '被保險人',
          value: ""
        },
        {
          name: 'policyNo',
          label: '保單號碼',
          value: ""
        },
        {
          name: 'goodsName',
          label: '商品名稱',
          value: ""
        },
        {
          name: 'amount',
          label: '保險金額',
          value: ""
        },
        {
          name: 'payTime',
          label: '繳費日期',
          value: ""
        },
        {
          name: 'premium',
          label: '保費',
          value: ""
        },
        {
          name: 'effectiveDate',
          label: '保單生效日',
          value: ""
        },
        {
          name: 'payYear',
          label: '保障年期',
          value: ""
        },
        {
          name: 'task',
          label: '電子保單',
          value: '以本人留存於貴公司最新手機號碼，簡訊通知下載。'
        },
      ],
      imgList: [
        {
          id: 3,
          src: "static/img/Product_Banner03-PC.jpg",
          url: ''
        },
      ],
      redUrl: '',
      policyNo: "",
      allSelect: false,
      postcode: '', // 邮区编号
      cacheObj: null,
      bankNumList: [
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        }
      ],
      ifBankError: false,
      ifLast3Error: false,
      ifloading: false,
      errorMsg: '',
      errNum: 0,
      errTime: 0,
      ifdateErr: false,
      ifreCodeError: false,
      ifneedCach: false,
      effectDay: '',
      incomList: [], //个人收入，家庭收入
      maxjobType: [], //职业类别
      ifPrefrom4: false, // 是否从第四步返回来
    }
  },
  // addCheckRecord
  computed: {
    trail() {
      // if (this.$route.query.trail) return JSON.parse(this.$route.query.trail)
      if (this.$store.getters.getTrial) return this.$store.getters.getTrial
      return {}
    },
    vocationInfo() {
      // if (this.$route.query.vocationInfo) return JSON.parse(this.$route.query.vocationInfo)
      if (this.$store.getters.getVocationInfo) return this.$store.getters.getVocationInfo
      return {}
    },
    // 试算因子
    priceItem() {
      if (this.premDataTab1.infromFactors.jobId && this.premDataTab1.policyContent.amount) {
        let value = this.premDataTab1.infromFactors.jobId.value
        if (this.premDataTab1.infromFactors.sidelineJobId.value) {
          if (!isNaN(this.premDataTab1.infromFactors.sidelineJobId.jobType)) { // 数字
            if (this.premDataTab1.infromFactors.sidelineJobId.jobType > this.premDataTab1.infromFactors.jobId.jobType) {
              value = this.premDataTab1.infromFactors.sidelineJobId.value
            } else {
              value = this.premDataTab1.infromFactors.jobId.value
            }
            // value = Math.max(this.premDataTab1.infromFactors.jobId.jobType, this.premDataTab1.infromFactors.sidelineJobId.jobType)
          } else {
            value = this.premDataTab1.infromFactors.sidelineJobId.value
          }
        }
        return {
          occupationLevel: value,
          amount: this.premDataTab1.policyContent.amount.value
        }
      }
    },
    // 受益人为法定继承人人数
    beneficiaryLength() {
      let arr = this.beneficiary.filter(el => {
        return el.beneficiaryFactorList.relationToInsured.value != null && el.beneficiaryFactorList.relationToInsured.value == '04'
      })
      return arr.length
    },
    bankNumber() {
      let str = ''
      this.bankNumList.forEach(el => str += String(el.value))
      return str
    },

  },
  watch: {
    "current": {
      handler: function (nval, oval) {
        $(window).scrollTop(0)
        this.getData()
      },
      deep: true,
      immediate: false
    },
    "priceItem": {
      handler: function (nv, ov) {
        if (nv.amount && nv.occupationLevel) {
          let traildata = {
            productId: "1",
            goodsId: this.goodsId,
          }
          let obj = this.trail
          Object.keys(obj).forEach(function (key) {
            if (key == 'birthday') {
              traildata[key] = obj[key].transformvalue
            } else {
              traildata[key] = obj[key].value
            }
          });

          // 职业修改
          traildata.occupationLevel = nv.occupationLevel
          // 投保金额修改
          traildata.amount = nv.amount
          // this.traildata = traildata
          this.getprice(traildata, false)
        }
      },
      deep: true,
    },
    "beneficiaryLength": {
      handler: function (nv, ov) {
        if (nv > 1) {
          let arr = []
          let obj = {
            "functionCode": '',
            "functionName": '受益人有指定多個，與被保險人關係為法定繼承人，重覆填寫',
            "checkFaceMsg": '法定繼承人只能有一位，請重新填寫',
            "checkMsg": '受益人有指定多個，與被保險人關係為法定繼承人，重覆填寫',
          }
          arr.push(obj)
          this.postErr(arr)
          // this.$myToast.success('法定繼承人只能有一位，請重新填寫');
          this.$message.error('法定繼承人只能有一位，請重新填寫');
        }
      },
      deep: true,
      immediate: false
    },
    // $route(n, o) {
    //   console.log(`n-------------`, n)
    //   console.log(`o-------------`, o)
    //   if (n.name === 'insure') {
    //     console.log(`bol`, this.$route.query.id, this.goodsId)
    //     console.log(`bol`, this.$route.query.premium, this.premium)
    //     console.log(`bol`, this.$route.query.goodsType, this.goodsType)
    //     if (this.$route.query.id != this.goodsId || parseInt(this.$route.query.premium) != parseInt(this.premium) || this.$route.query.goodsType != this.goodsType) {
    //       this.goodsId = this.$route.query.id
    //       this.premium = this.$route.query.premium
    //       this.goodsType = this.$route.query.goodsType
    //       this.set2One()
    //       this.getTab1Data()
    //       this.setYearList()
    //       this.getInfoList()
    //     } else {
    //       console.log(`same----------------------------------`)
    //       this.ifneedCach = true
    //       this.set2One()
    //       console.log(`this.current`, this.current)
    //     }
    //   }
    //   return
    // }
  },
  methods: {
    formatBirthday(val) {
      return val
    },
    test() {
    },
    getMax(arr) {
      return Math.max(...arr)
    },
    setID(index) {
      return `bank${index}`
    },
    setIDtwo(index) {
      return `two-four-${index}`
    },
    incluesY(val) {
      if (val.includes('元')) {
        return val
      } else {
        return `${val}元`
      }
    },
    chekcIF4(e, index) {
      if (index != 3) {
        if (String(e).length == 4) {
          let doc = document.querySelector(`#bank${index + 1}`)
          doc.focus()
        }
      } else { }
    },

    go2Detial() {
      this.$router.push({
        name: `productDetail`,
        query: {
          id: this.imgList[0].id
        }
      })
    },
    showSearch() {
      this.ifshowSearch = true
    },
    // 選擇职业
    select(record) {
      this.premDataTab1.infromFactors.jobId.value = record.id
      this.premDataTab1.infromFactors.jobId.firstWord = record.firstName
      this.premDataTab1.infromFactors.jobId.secondWord = record.secondName
      this.premDataTab1.infromFactors.jobId.lastWord = record.proName
      this.premDataTab1.infromFactors.jobId.jobType = record[this.premDataTab1.infromFactors.jobId.levelType]
      this.premDataTab1.infromFactors.jobId.errorMsg = '請選擇職業'
      this.premDataTab1.infromFactors.jobId.hasShowError = false
      this.premDataTab1.infromFactors.jobId.show_value = `${record.firstName}-${record.secondName}-${record.proName}`
    },
    hide() {
      this.ifshowSearch = false
    },
    num2Text(val) {
      let arr = new Map([
        [1, '一'],
        [2, '二'],
        [3, '三'],
      ])
      return arr.get(val)
    },
    set2One() {
      this.current = 0
      this.tab1 = false
      this.tab2 = false
      this.tab3 = false
      this.Modeify = false
      this.ifneedCach = false
    },
    checkBankLength(index) {
      this.bankNumList[index].value = this.bankNumList[index].value.replace(/[^\x00-\xff]/g, "")
      for (let i = 0; i < 4; i++) {
        if (i !== 3) {
          if (String(this.bankNumList[i].value).length < 4) {
            this.ifBankError = true
          } else {
            this.ifBankError = false
          }
        } else {
          if (String(this.bankNumList[i].value).length < 3) {
            this.ifBankError = true
          } else {
            this.ifBankError = false
          }
        }
      }
      let rul = regObj.bank
      if (!rul.test(this.bankNumber)) {
        this.ifBankError = true
      } else {
        this.ifBankError = false
      }

    },
    checkLast3Num() {
      this.bankLast3Number = this.bankLast3Number.replace(/[^\x00-\xff]/g, "")
      let reg = /^\d{3}$/
      if (!reg.test(this.bankLast3Number)) {
        this.ifLast3Error = true
      } else {
        this.ifLast3Error = false
      }
    },
    async	checkreferenceCode() {
      try {
        let tep = {
          referrerCode: this.referenceCode
        }
        let res = await this.Axios('checkReferrerCode', tep)
        this.ifreCodeError = false
        return
        // let rule = regObj.member
        // if (!this.referenceCode) {
        // 	return
        // } else {
        // 	if (!rule.test(this.referenceCode)) {
        // 		console.log(`errorrororo`)
        // 		this.ifreCodeError = true
        // 	} else {
        // 		this.ifreCodeError = false
        // 	}
        // }
      } catch (error) {
        let arr1 = []
        let obj = {
          "functionCode": '',
          "functionName": '推薦人序號',
          "checkFaceMsg": '請填寫正確的推薦人序號',
          "checkMsg": '推薦人序號填寫錯誤'
        }
        arr1.push(obj)
        // let jsonStr = JSON.stringify(this.stepFourCanData())
        this.postErr(arr1)
        this.ifreCodeError = true

      }

    },
    // 计算受益人比例之和
    checkSum() {
      return
      // if (this.allocation.allocation.value == 2 && this.beneficiaryType.beneficiaryType.value == '02') {
      let sum = 0
      this.beneficiary.forEach(el => {
        if (el.benefitsRate.benefitsRate.value !== null) {
          sum += parseFloat(el.benefitsRate.benefitsRate.value)
        }
      })
      let bol = this.beneficiary.every(el => {
        return el.benefitsRate.benefitsRate.value !== null
      })
      if (sum != 100 && bol) {
        this.beneficiary.forEach((el, index) => {
          el.benefitsRate.benefitsRate.hasShowError = true
          // return this.$myToast.success('多位受益人比例之和應為100%！')
        })
      } else {
        this.beneficiary.forEach((el, index) => {
          el.benefitsRate.benefitsRate.hasShowError = false
        })
      }
    },
    // 校验身分证
    checkIdcard(type) {
      let ownIdcard = this.$store.getters.userIdcard
      let bol = this.beneficiary.some(el => {
        if (el.beneficiaryFactorList.relationToInsured.value !== '04') {
          return el.beneficiaryFactorList.beneficiaryIdNo.value == ownIdcard
        }
      })
      if (bol) {
        // if (type) {//点下一步的时候
        let arr = []
        let obj = {
          "functionCode": '',
          "functionName": '受益人身分證號碼',
          "checkFaceMsg": '受益人身分證號碼(護照號碼)不可重覆',
          "checkMsg": '身故保險金受益人之身分證號碼不可與要保人相同'
        }
        arr.push(obj)
        let jsonStr = JSON.stringify(this.stepTow2CanData())
        this.postErr(arr, jsonStr)
        if (type) {
          return this.$myToast.success('身故保險金受益人之身分證號碼不可與要保人相同，請重新填寫。')
        } else {
          return this.$message.error('身故保險金受益人之身分證號碼不可與要保人相同，請重新填寫。')
        }
        // } else {
        //   return this.$myToast.success('身故保險金受益人之身分證號碼不可與要保人相同，請重新填寫。')
        // }
      }
      let arr = []
      let set1 = new Set()
      this.beneficiary.forEach((el, index) => {
        if (el.beneficiaryFactorList.beneficiaryIdNo.value !== null && el.beneficiaryFactorList.beneficiaryIdNo.value !== '') {
          if (el.beneficiaryFactorList.relationToInsured.value !== '04') {
            this.beneficiary[index].beneficiaryFactorList.beneficiaryIdNo.hasShowError = false
            arr.push(el.beneficiaryFactorList.beneficiaryIdNo.value)
            set1.add(el.beneficiaryFactorList.beneficiaryIdNo.value)
          }
        } else {
          this.beneficiary[index].beneficiaryFactorList.beneficiaryIdNo.hasShowError = true
        }
        // 国籍身分证校验
        if (el.beneficiaryFactorList.beneficiaryNationalityCode.value == '001') {
          let reg = regObj['idCard'];
          if (!reg.test(el.beneficiaryFactorList.beneficiaryIdNo.value)) {
            this.beneficiary[index].beneficiaryFactorList.beneficiaryIdNo.hasShowError = true
          } else {
            this.beneficiary[index].beneficiaryFactorList.beneficiaryIdNo.hasShowError = false
          }
        }
      })
      if (arr.length !== set1.size) {
        if (type) {
          let arr = []
          let obj = {
            "functionCode": '',
            "functionName": '受益人身分證號碼',
            "checkFaceMsg": '有多位受益人，身分證號碼(護照號碼)重覆',
            "checkMsg": '有多位受益人，身分證號碼(護照號碼)重覆'
          }
          arr.push(obj)
          let jsonStr = JSON.stringify(this.stepTow2CanData())
          this.postErr(arr, jsonStr)
          return this.$myToast.success('有多位受益人，身分證號碼(護照號碼)重覆。')
        } else {
          let arr = []
          let obj = {
            "functionCode": '',
            "functionName": '受益人身分證號碼',
            "checkFaceMsg": '受益人身分證號碼(護照號碼)不可重覆',
            "checkMsg": '有多位受益人，身分證號碼(護照號碼)重覆'
          }
          arr.push(obj)
          let jsonStr = JSON.stringify(this.stepTow2CanData())
          this.postErr(arr, jsonStr)
          return this.$message.error('受益人身分證號碼(護照號碼)不可重覆。')
        }
      }
    },
    // 校验详细地址
    checkAddress(type) {
      if (type == 1) {
        // this.premDataTab2.recognizeeFactorList
      } else {

      }
    },
    // 獲取保费试算结果
    getprice(traildata, bol) {
      if (this.ifneedCach) return
      let self = this
      Object.assign(traildata, {
        type: 2
      })
      this.Axios('premiumCalc', traildata, bol)
        .then(res => {
          if (res.data.data.amount <= 0) {
            this.premium = ''
            if (this.goodsId != 3) {
              // return this.$message.error('職業選擇有誤，請選擇其他職業！')
              let arr = []
              let obj = {
                "functionCode": 'jobId',
                "functionName": '職業',
                "checkFaceMsg": '職業等級超過該商品設定投保範圍'
              }
              arr.push(obj)
              this.postErr(arr)
              return this.$message.error('很抱歉，您所提供的資料不適合投保本商品!')
            } else {
              let arr = []
              let obj = {
                "functionCode": 'jobId',
                "functionName": '職業',
                "checkFaceMsg": '職業等級超過該商品設定投保範圍'
              }
              arr.push(obj)
              this.postErr(arr)
              // return this.$message.error('請填寫正確的試算條件!')
              return this.$message.error('很抱歉，您所提供的資料不適合投保本商品!')
            }
          }
          this.premium = res.data.data.premium
        }).catch(err => {
          let arr = []
          let obj = {
            "functionCode": 'jobId',
            "functionName": '職業',
            "checkFaceMsg": '職業等級超過該商品設定投保範圍'
          }
          arr.push(obj)
          this.postErr(arr)
          this.premium = ''
        })
    },
    showbank() {
      let doc = document.querySelector('#app')
      doc.style.overflow = 'hidden'
      this.getcoOperativeBankList()
      this.showbankList = true
    },
    hideBank() {
      let doc = document.querySelector('#app')
      doc.style.overflow = 'auto'
      this.showbankList = false
    },
    updateIsAgree(value) {
      if (this.current == 2) {
        this.checked[value[1]] = value[0]
        if (value[0]) {
          let arr = []
          this.checked.forEach((el, index) => el == false ? arr.push(index) : '')
          arr.length >= 1 ? this.openIndex = arr[0] : this.openIndex = null
        } else {
          this.openIndex = value[1]
        }
        if (this.checked.every(el => el == true)) {
          this.allSelect = true
        } else {
          this.allSelect = false
        }
        return
      } else {
        this.isAgree[value[1]] = value[0]
      }

    },
    checkIfBefore() {
      if (this.month != undefined && this.year != undefined) {
        let bol = moment(`${this.year}-${this.month}`).isBefore(new Date());
        this.ifdateErr = bol
        if (bol) return this.$message.error('請選擇正確信用卡有效月年!')
      }
    },
    handleMonthChange(item) {
      this.month = item
      this.checkIfBefore()
    },
    handleYearChange(item) {
      this.year = item
      this.checkIfBefore()
    },
    lt10(num) {
      if (num < 10) return `0${num}`
      return num
    },
    lt100(num) {
      if (num < 100) return `0${num}`
      return num
    },
    // 第四步獲取信用卡声明列表
    async getInfoList() {
      try {
        let tepData = {
          functionType: 'payment'
        }
        let {
          data: {
            data
          }
        } = await this.Axios('findByFunctionType', tepData, true)
        this.infoList = data
        this.isAgree = data.map(() => false)
      } catch (error) {
        console.log(error)
      }
    },
    // 第四步獲取信用卡列表
    async getcoOperativeBankList() {
      if (this.errorMsg !== '') return this.$myToast.success(this.errorMsg)
      try {
        let tepData = {
          functionType: 'payment'
        }
        let {
          data: {
            data
          }
        } = await this.Axios('getcoOperativeBankList', tepData)
        this.errorMsg = ''
        this.bankList = data
      } catch (error) {
        this.errorMsg = error
      }
    },
    // 第四部发起投保请求，缴费
    async stepFour2Serve() {
      try {
        if (this.ifBankError) {
          this.go2Scroll('#bank0', '請填寫正確信用卡卡號!')
          return this.$myToast.success('請輸填寫正確信用卡卡號!')
        }
        if (this.ifdateErr) {
          this.go2Scroll('#four-date-select', '請選擇正確信用卡有效月年!')
          return this.$myToast.success('請選擇正確信用卡有效月年!')
        }
        if (this.ifLast3Error) {
          this.go2Scroll('#four-last-num', '請填寫正確信用卡背面末三碼數字!')
          return this.$myToast.success('請填寫正確信用卡背面末三碼數字!')
        }
        if (this.ifreCodeError) {
          this.go2Scroll('#four-menber', '請填寫正確的推薦人序號!')
          return this.$myToast.success('請填寫正確的推薦人序號!')
        }
        // let year = (parseInt(this.year) + 1911)
        this.ifloading = true
        let arr = []
        this.infoList.forEach(item => {
          arr.push({
            subType: item.subType,
            version: item.version,
            name: item.name,
          })
        })
        let year = this.year
        let tepData = {
          "accountName": this.premDataTab1.applicatFactors.name.value, // 持卡人姓名
          "goodsId": this.goodsId,
          "bankNo": this.bankNumber,
          "cellPhone": this.premDataTab2.recognizeeFactorList.phone.value,
          "cvv2": this.bankLast3Number, // 背面三码
          "orderNo": this.orderNum,
          "payMethod": "1", // 支付方式
          "policyNo": this.policyNo, // 保单号
          "premium": this.premium,
          "validityPeriod": `${String(year).substr(2, 2)}${this.lt10(this.month)}`,
          "renewalWay": this.renewalWay,
          "referrerCode": this.referenceCode, //推荐人编号
          riskAgreementDTOList: arr, //新参数
        }
        let {
          data
        } = await this.Axios('pay', tepData)
        this.ifloading = false
        if (data.success) {
          this.next()
        }
      } catch (error) {
        this.ifloading = false
      }
    },
    // 第四步组装数据
    stepFourCanData() {
      let arr = []
      if (this.isAgree.every(el => el === true)) {
        this.infoList.forEach(item => {
          arr.push({
            subType: item.subType,
            version: item.version,
            name: item.name,
          })
        })
      }
      let year = this.year
      let tepData = {
        "accountName": this.premDataTab1.applicatFactors.name.value, // 持卡人姓名
        "goodsId": this.goodsId,
        "bankNo": this.bankNumber,
        "cellPhone": this.premDataTab2.recognizeeFactorList.phone.value,
        "cvv2": this.bankLast3Number, // 背面三码
        "orderNo": this.orderNum,
        "payMethod": "1", // 支付方式
        "policyNo": this.policyNo, // 保单号
        "premium": this.premium,
        "validityPeriod": `${String(year).substr(2, 2)}${this.lt10(this.month)}`,
        "renewalWay": this.renewalWay,
        "referrerCode": this.referenceCode, //推荐人编号
        riskAgreementDTOList: arr, //新参数
      }
      return tepData
    },
    // 第五步查保單詳情
    async getPolicyDetail() {
      try {
        let tepData = {
          policyNo: this.policyNo,
          channel: 'PC'
        }
        let { data: { data } } = await this.Axios('getPolicyDetail', tepData)
        for (let info of this.informtionList) {
          if (info.name != 'task') {
            if (info.name == 'iName' || info.name == 'aName') {
              info.value = this.codeHidden('name', data[info.name])
            } else {
              info.value = data[info.name]
            }
          }
          if (info.name == 'effectiveDate') {
            // info.value = this.effectDay
            info.value = `${data[info.name]}零時起生效`
          }
        }
        this.redUrl = data.redUrl
        this.imgList[0].id = data.images[1].id
        this.imgList[0].src = data.images[0].src
        this.imgList[0].url = data.images[0].url
        // this.$longData(0, 'accountCode', data.accountCode)
        // this.$longData(0, 'goodsId', this.goodsId)
        // this.$longData(0, 'sumPremium', data.premium)
        // this.$longData(0, 'policyNo', data.policyNo)
        sessionStorage.setItem('accountCode', data.accountCode)
        sessionStorage.setItem('goodsId', this.goodsId)
        sessionStorage.setItem('sumPremium', data.premium)
        sessionStorage.setItem('policyNo', data.policyNo)
      } catch (error) {

      }
    },
    async postErr(arr, jsonStr) {
      try {
        let obj = {
          0: 'proFirTab',
          1: 'proSecTab',
          2: 'proThrTab',
          3: 'proPayTab',
        }
        let tep = {
          "orderNo": this.orderNum,
          "tabNo": obj[this.current],
          "checkList": arr,
          "jsonStr": jsonStr || ''

        }
        let res = await this.Axios('addCheckRecord', tep)
      } catch (error) {
      }
    },
    setYearList() {
      let day = new Date()
      // let y = day.getFullYear() - 1911
      let y = day.getFullYear()
      for (let i = 0; i < 17; i++) {
        this.yearList.push(y + i)
      }
    },
    codeHidden(type, name) {
      return codeHidden(type, name)
    },
    changeWay(val) {
      this.payWay = val
    },
    changeRenewWay(val) {
      this.renewalWay = val
    },
    // 投保第一步向后台發送数据
    insureTab1() {
      if (this.errorMsg !== '') return this.$myToast.success(this.errorMsg)
      let succss = true
      let insureData = {}
      let premDataTab1 = this.premDataTab1
      let infoErr = []
      let objErr = []
      let incomList = []
      let maxjobType = []
      for (let prop in premDataTab1) {
        Object.keys(premDataTab1[prop]).forEach(function (key) {
          if (premDataTab1[prop][key].required && (!premDataTab1[prop][key].value || premDataTab1[prop][key].hasShowError)) {
            premDataTab1[prop][key].hasShowError = true
            // if ((key == 'height' || key == 'weight') && !premDataTab1[prop][key].value) {
            // 	premDataTab1[prop][key].notNull = '不可為空'
            // } else {
            // 	premDataTab1[prop][key].notNull = ''
            // }
            infoErr.push(key)
            objErr.push(premDataTab1[prop][key])
            succss = false
          }
          insureData[key] = premDataTab1[prop][key].type == 'birthday' ? premDataTab1[prop][key].transformvalue : premDataTab1[prop][key].value
          if (premDataTab1[prop][key].value != '' && (premDataTab1[prop][key].name == 'personalIncome' || premDataTab1[prop][key].name == 'familyIncome' || premDataTab1[prop][key].name == 'personalAsset')) {
            incomList.push(premDataTab1[prop][key])
          }
          if (premDataTab1[prop][key].value != '' && premDataTab1[prop][key].type == 'zy') {
            maxjobType.push(parseInt(premDataTab1[prop][key].jobType))
          }
        });
      }
      this.incomList = incomList
      // this.maxjobType = Math.max(...maxjobType)
      this.maxjobType = maxjobType
      let informAnswers = []
      let infoAnswersErr = []
      for (let inform of this.questionList.infroms) {
        if (!inform.value && inform.required) {
          this.$set(inform, "hasShowError", true)
          infoAnswersErr.push(inform)
          succss = false
        }
        informAnswers.push({
          question: inform.question,
          questionCode: inform.questionCode,
          value: inform.value,
        })
      }
      insureData.informAnswers = informAnswers
      let otherAnswers = []
      let otherAnswersErr = []
      for (let inform of this.questionList.otherInfroms) {
        if (!inform.value) {
          this.$set(inform, "hasShowError", true)
          otherAnswersErr.push(inform)
          succss = false
        }
        otherAnswers.push({
          question: inform.question,
          questionCode: inform.questionCode,
          value: inform.value
        })
      }
      insureData.otherAnswers = otherAnswers
      if (succss) {
        let tep = {
          addFirstTab: 1,
          goodsId: this.goodsId,
          orderNum: this.orderNum,
          preminum: this.premium,
        }
        Object.assign(tep, insureData)
        let obj = {}
        if (this.premDataTab1.infromFactors.sidelineJobId.hasShowError) {
          // return this.$myToast.success('很抱歉，您所提供的資料不適合投保本商品')
          let height = document.getElementById('infromFactors').offsetTop
          document.documentElement.scrollTop = height + 150
          return this.$myToast.success(this.premDataTab1.infromFactors.sidelineJobId.errorMsg)
          let arr = []
          let obj = {
            "functionCode": 'sidelineJobId',
            "functionName": '兼職',
            "checkFaceMsg": '請勾選其他問項'
          }
          arr.push(obj)
          let jsonStr = JSON.stringify(tep)
          this.postErr(arr)
          // return this.$myToast.success('很抱歉，您所提供的資料不適合投保本商品')
          return this.$myToast.success(this.premDataTab1.infromFactors.sidelineJobId.errorMsg)
        }
        // 原数据组装处
        let self = this
        this.ifloading = true
        this.Axios('addFirstTab', tep)
          .then(res => {
            this.ifloading = false
              // console.log(res.data)
            this.premium = `${parseInt(res.data.data)}`
            if (res.data.success) {
              self.next()
            }
          })
          .catch(err => {
            this.ifloading = false
            // console.log(err)
          })
      } else {
        let arr = []
        if (infoErr.length > 0) {
          // let arr = []
          objErr.forEach(el => {
            let obj = {
              "functionCode": el.name,
              "functionName": el.label,
              "checkFaceMsg": el.errorMsg
            }
            if (el.name == 'personalAsset') {
              obj.checkMsg = '資產總額未填寫或填寫非數字'
            }
            arr.push(obj)
          })
          // this.postErr(arr)
          infoErr.forEach(el => console.log(`err------`, this.premDataTab1[el]))
        }
        if (infoAnswersErr.length > 0) {
          // let arr = []
          let obj = {
            "functionCode": '',
            "functionName": '告知事項',
            "checkFaceMsg": '請勾選告知事項',
            "checkMsg": '告知事項未完整勾選'
          }
          arr.push(obj)
          // this.postErr(arr)
        }
        if (otherAnswersErr.length > 0) {
          // let arr = []
          let obj = {
            "functionCode": '',
            "functionName": '其他事項',
            "checkFaceMsg": '請勾選其他問項',
            "checkMsg": '其他事項未完整勾選'
          }
          arr.push(obj)
          // this.postErr(arr)
        }
        let tep = {
          addFirstTab: 1,
          goodsId: this.goodsId,
          orderNum: this.orderNum,
          preminum: this.premium,
        }
        Object.assign(tep, insureData)
        let jsonStr = JSON.stringify(tep)
        // 分割线
        this.postErr(arr, jsonStr)
        if (infoErr.length > 0) {
          if (infoErr.includes('personalIncome') || infoErr.includes('familyIncome') || infoErr.includes('personalAsset')) {
            let height = document.getElementById('applicatFactors').offsetTop
            document.documentElement.scrollTop = height.offsetTop
          } else {
            let height = document.getElementById('infromFactors').offsetTop
            document.documentElement.scrollTop = height + 150
          }
          return this.$myToast.success(arr[0].checkFaceMsg);
        } else if (infoAnswersErr.length > 0) {
          let height = document.getElementById('infromFactors').offsetTop
          document.documentElement.scrollTop = height + 300
          return this.$myToast.success('請勾選告知事項');
        } else if (otherAnswersErr.length > 0) {
          let height = document.getElementById('otherInfroms').offsetTop
          document.documentElement.scrollTop = height
          return this.$myToast.success('請勾選其他問項');
        } else {
          this.$myToast.success('很抱歉，您所提供的資料不適合投保本商品');
        }
      }
    },
    // 投保第二步向后台發送数据
    insureTab2() {
      if (this.errorMsg !== '') return this.$myToast.success(this.errorMsg)
      this.checkIdcard(1)
      let succss = true
      let objErr = []
      let oneErr = []
      let twoErr = []
      let threeErr = []
      let fourErr = []
      let insureData = {}
      let premDataTab2 = this.premDataTab2
      for (let prop in premDataTab2) {
        Object.keys(premDataTab2[prop]).forEach(function (key) {
          if ((premDataTab2[prop][key].required && !premDataTab2[prop][key].value) || (premDataTab2[prop][key].required && premDataTab2[prop][key].hasShowError)) {
            premDataTab2[prop][key].hasShowError = true
            succss = false
            objErr.push(premDataTab2[prop][key])
            oneErr.push(premDataTab2[prop][key])
          }
          insureData[key] = premDataTab2[prop][key].type == 'birthday' ? premDataTab2[prop][key].transformvalue : premDataTab2[prop][key].value
        });
      }
      // 检验对位受益人
      insureData.proposalBeneficiaryDTOList = []
      // if (this.beneficiaryType.beneficiaryType.value == '02') {
      let beneficiaryType = this.beneficiaryType
      
      Object.keys(beneficiaryType).forEach(function (key) {
        if (beneficiaryType[key].required && !beneficiaryType[key].value) {
          beneficiaryType[key].hasShowError = true
          succss = false
          twoErr.push(allocation[key])
        }
        insureData[key] = beneficiaryType[key].value
      });
      console.log(beneficiaryType)
      let allocation = this.allocation
      Object.keys(allocation).forEach(function (key) {
        if (allocation[key].required && !allocation[key].noentryrequired && !allocation[key].value) {
          allocation[key].hasShowError = true
          succss = false
          objErr.push(allocation[key])
          threeErr.push(allocation[key])
        }
        insureData[key] = allocation[key].value
      });
      // 校验受益人
      let beneficiaryList = [...this.beneficiary]
      if (this.beneficiaryType.beneficiaryType.value == '02') {
        beneficiaryList.forEach((el, index) => {
          // if (el.sameAsCustomer.sameAsCustomer.value == 1) {
          //   this.beneficiary[index].factorList.beneficiaryPhone.value = this.premDataTab2.recognizeeFactorList.phone.value
          //   this.beneficiary[index].factorList.beneficiaryAddress.value = this.premDataTab2.recognizeeFactorList.address.value
          //   this.beneficiary[index].factorList.beneficiaryAddressText.value = this.premDataTab2.recognizeeFactorList.addressText.value
          // }
          let obj = {}
          for (let prop in el) {
            Object.keys(el[prop]).forEach(key => {
              if (((el[prop][key].required && !el[prop][key].value && !el[prop][key].noentryrequired)) || (el[prop][key].required && el[prop][key].hasShowError && !el[prop][key].noentryrequired)) {
                if (el.beneficiaryFactorList.relationToInsured.value == '04') return
                if (this.allocation.allocation.value != 2) {
                  if (key !== 'benefitsRate') {
                    el[prop][key].hasShowError = true
                    succss = false
                    objErr.push(el[prop][key])
                    fourErr.push({
                      index,
                      obj: el[prop][key]
                    })
                  }
                } else {
                  el[prop][key].hasShowError = true
                  succss = false
                  objErr.push(el[prop][key])
                  fourErr.push({
                    index,
                    obj: el[prop][key]
                  })
                }
                // console.log(`index---------`, index)
                // console.log(`key---------`, key)
                console.log(`key---==------value`, el)
                console.log(`key---------value`, el[prop])
                // console.log(`key---------value`, el[prop][key])
                // console.log(`4 循环`)
                // console.log(`4 el[prop][key].required`, el[prop][key].required)
                // console.log(`4 !el[prop][key].value`, !el[prop][key].value)
                // console.log(`4 循环`)
              }
              if (el[prop][key].type == 'birthday') {
              } else { }
              obj[key] = el[prop][key].type == 'birthday' ? el[prop][key].transformvalue : el[prop][key].value
            });
          }
          insureData.proposalBeneficiaryDTOList.push(obj)
        })
      }
      // }
      if (succss) {
        // if (this.allocation.allocation.value == 2 && this.beneficiaryType.beneficiaryType.value == '02') {
        // 	let sum = 0
        // 	this.beneficiary.forEach(el => {
        // 		if (el.benefitsRate.benefitsRate.value !== null) {
        // 			sum += parseFloat(el.benefitsRate.benefitsRate.value)
        // 		}
        // 	})
        // 	if (sum != 100) {
        // 		// this.beneficiary.forEach(el => {
        // 		// 	if (el.benefitsRate.benefitsRate.value !== null) {
        // 		// 		el.benefitsRate.benefitsRate.hasShowError = false
        // 		// 	}
        // 		// })
        // 		return this.$myToast.success('所有受益人分配比例加總應為100%')
        // 	}
        // }
        if (this.allocation.allocation.value == 2) {
          this.beneficiary.forEach(el => {
          })
        }
        let tep = {
          addFirstTab: 1,
          goodsId: this.goodsId,
          orderNo: this.orderNum,
        }
        Object.assign(tep, insureData)
        let self = this
        this.ifloading = true
        this.Axios('informationCommit', tep)
          .then(res => {
            if (res.data.success) {
              // let arr = moment().format('YYYY-MM-DD').split('-')
              // console.log(`date`, arr)
              // this.effectDay = `${this.lt100(parseInt(arr[0] - 1911))}/${arr[1]}/${arr[2]}零時起生效`
              this.premium = res.data.data
              this.frontPolicyService(true)
              // this.ifloading = false
              // self.next()
            }
          })
          .catch(err => {
            this.ifloading = false
            // console.log(err)
          })
      } else {
        let arr = []
        objErr.forEach(el => {
          // if (el.type == 'text' || el.type == 'phone' || el.type == 'birthday' || el.type == 'radio') {
          let obj = {}
          if (el.name == 'benefitsRate') {
            obj = {
              "functionCode": el.name,
              "functionName": el.label,
              "checkFaceMsg": el.errorMsg,
              "checkMsg": '受益人比例填寫錯誤。'
            }
          } else {
            obj = {
              "functionCode": el.name,
              "functionName": el.label,
              "checkFaceMsg": el.errorMsg
            }
          }
          arr.push(obj)
          // }
        })
        // if(this.){}
        if (arr.length > 0) {
          let jsonStr = JSON.stringify(this.stepTow2CanData())
          this.postErr(arr, jsonStr)
        }
        let height = 0
        if (oneErr.length > 0) {
          let doc = document.querySelector('#two-one')
          $(window).scrollTop(doc.offsetTop - 100)
          return this.$myToast.success(oneErr[0].errorMsg);
        } else if (twoErr.length > 0 && oneErr.length == 0) {
          let doc = document.querySelector('#two-two')
          $(window).scrollTop(doc.offsetTop - 100)
          return this.$myToast.success(twoErr[0].errorMsg);
        } else if (threeErr.length > 0 && twoErr.length == 0 && oneErr.length == 0) {
          let doc = document.querySelector('#two-three')
          $(window).scrollTop(doc.offsetTop - 100)
          return this.$myToast.success(threeErr[0].errorMsg);
        } else if (fourErr.length > 0 && threeErr.length == 0 && twoErr.length == 0 && oneErr.length == 0) {
          let doc = document.querySelector(`#two-four-${fourErr[0].index}`)
          $(window).scrollTop(doc.offsetTop - 50)
          return this.$myToast.success(fourErr[0].obj.errorMsg);
        }
        // this.$myToast.success('很抱歉，您所提供的資料不適合投保本商品');
      }
    },
    // 第二步组装数据
    stepTow2CanData() {
      let insureData = {}
      let premDataTab2 = this.premDataTab2
      for (let prop in premDataTab2) {
        Object.keys(premDataTab2[prop]).forEach(function (key) {
          insureData[key] = premDataTab2[prop][key].type == 'birthday' ? premDataTab2[prop][key].transformvalue : premDataTab2[prop][key].value
        });
      }
      // 检验对位受益人
      insureData.proposalBeneficiaryDTOList = []
      let beneficiaryType = this.beneficiaryType
      Object.keys(beneficiaryType).forEach(function (key) {
        insureData[key] = beneficiaryType[key].value
      });
      let allocation = this.allocation
      Object.keys(allocation).forEach(function (key) {
        insureData[key] = allocation[key].value
      });
      // 校验受益人
      let beneficiaryList = [...this.beneficiary]
      beneficiaryList.forEach((el, index) => {
        let obj = {}
        for (let prop in el) {
          Object.keys(el[prop]).forEach(key => {
            obj[key] = el[prop][key].type == 'birthday' ? el[prop][key].transformvalue : el[prop][key].value
          });
        }
        insureData.proposalBeneficiaryDTOList.push(obj)
      })
      return insureData
    },
    // 第四步滚动到错误处
    go2Scroll(id, msg, err) {
      let arr1 = []
      let obj = {
        "functionCode": '',
        "functionName": msg,
        "checkFaceMsg": msg,
        "checkMsg": err || msg
      }
      arr1.push(obj)
      let jsonStr = JSON.stringify(this.stepFourCanData())
      this.postErr(arr1, jsonStr)
      let doc = document.querySelector(id)
      $(window).scrollTop(doc.offsetTop - 200)
    },
    // current 对应函数
    sure() {
      if (this.ifloading) return
      if (this.current == 0) {
        this.insureTab1()
      } else if (this.current == 1) {
        if (this.beneficiaryLength > 1) {
          let arr = []
          let obj = {
            "functionCode": '',
            "functionName": '受益人有指定多個，與被保險人關係為法定繼承人，重覆填寫',
            "checkFaceMsg": '法定繼承人只能有一位，請重新填寫',
            "checkMsg": '受益人有指定多個，與被保險人關係為法定繼承人，重覆填寫'
          }
          arr.push(obj)
          this.postErr(arr)
          return this.$myToast.success('法定繼承人只能有一位，請重新填寫')
        }

        this.insureTab2()
      } else if (this.current == 2) {// 第三步
        // let arrList = []
        // this.checked.forEach((el, index) => {
        //   if (el === false) {
        //     return arrList.push(index)
        //   }
        // });
        // console.log(`arrList`, arrList)
        // console.log(`this.riskAgreementDTOList`, this.riskAgreementDTOList[arrList[0]])
        // if (arrList.length > 0) {
        //   if (arrList[0] != 3) {
        //     return this.$myToast.success(`『請閲讀並同意』${this.riskAgreementDTOList[arrList[0]].name}`)
        //   } else {
        //     return this.$myToast.success(`請選擇${this.riskAgreementDTOList[arrList[0]].name}`)
        //   }
        // }
        if (!this.effectDay) return
        let list = JSON.stringify(this.riskAgreementDTOList)
        let arr = JSON.parse(list)
        arr.forEach(el => el.content = '')
        let arr1 = []
        let arr2 = []
        // let arr1 = []
        let obj = {
          "functionCode": '',
          "functionName": '確認投保，請發送動態密碼',
          "checkFaceMsg": '請閱讀聲明事項/文件後勾選並確認投保',
          "checkMsg": '未點擊確認投保按鈕',
          // "jsonStr":
        }
        arr1.push(obj)
        // let arr2 = []
        this.checked.forEach((el, index) => {
          if (el) {
            arr[index].content = ''
            arr2.push(arr[index])
          }
        })
        let teps = {
          riskAgreementDTOList: arr2
        }
        // this.postErr(arr1, JSON.stringify(tep))
        // return this.$myToast.success('請閱讀聲明事項/文件後勾選並確認投保')
        if (!this.Modeify) {
          let arr1 = []
          let obj = {
            "functionCode": '',
            "functionName": '確認投保，請發送動態密碼',
            "checkFaceMsg": '請閱讀聲明事項/文件後勾選並確認投保',
            "checkMsg": '未點擊確認投保按鈕',
            // "jsonStr":
          }
          arr1.push(obj)
          let arr2 = []
          this.checked.forEach((el, index) => {
            if (el) {
              arr[index].content = ''
              arr2.push(arr[index])
            }
          })
          let teps = {
            riskAgreementDTOList: arr2
          }
          this.postErr(arr1, JSON.stringify(teps))

          // this.postErr(arr1, JSON.stringify(tep))
          // return this.$myToast.success('請閱讀聲明事項/文件後勾選並確認投保')

          return this.$myToast.success('請先完成動態密碼驗證')
        }
        this.postErr(arr1, JSON.stringify(teps))

        if (this.errNum == 5) {
          return this.$myToast.success('動態密碼已失效,請重發動態密碼')
        }
        if (this.$refs.paycodeverify.ifPast) {
          return this.$myToast.success('動態密碼已失效，請重發動態密碼')
        }
        if (this.$refs.paycodeverify.code == '') {
          return this.$myToast.success('請填寫動態密碼')
        }
        if (!this.allSelect) return
        // 原组装数据处
        let tep = {
          orderNo: this.orderNum,
          otpCode: this.$refs.paycodeverify.code,
          otpKey: this.$refs.paycodeverify.otpKey,
          serialNumber: this.serialNumber,
          riskAgreementDTOList: arr
        }
        let self = this
        this.ifloading = true
        this.Axios('informationConfirmCheckOtp', tep)
          .then(res => {
            if (res.data.success) {
              self.ifPrefrom4 = false
              self.policyNo = res.data.data.policyNum
              self.premium = res.data.data.premium
              self.next()
              self.ifloading = false
            }
          })
          .catch(err => {
            self.ifloading = false
            this.errNum++
            if (this.errNum == 5) {
              this.$refs.paycodeverify.ifPast = true
              this.$refs.paycodeverify.ifPost = false
              this.errTime++
              if (this.errTime == 5 || this.$refs.paycodeverify.errTime == 6) {
                this.$myToast.success('動態密碼已重發多次，若您仍無法收到，請洽詢服務人員。')
                this.$store.dispatch('logOut')
                // this.$router.push({
                //   name: 'loginIn',
                // })
              }
            }
          })
      } else if (this.current == 3) {// 第四步
        if (this.bankNumber === '') {
          this.go2Scroll('#bank0', '信用卡卡號填寫錯誤')
          this.ifBankError = true
          return this.$myToast.success('信用卡卡號填寫錯誤')
        } else if (this.month === undefined || this.year === undefined) {
          this.ifdateErr = true
          this.go2Scroll('#four-date-select', '信用卡有效月年未選取')
          return this.$myToast.success('信用卡有效月年未選取')
        } else if (this.bankLast3Number === '') {
          this.ifLast3Error = true
          this.go2Scroll('#four-last-num', '請先填寫信用卡背面末三碼')
          return this.$myToast.success('請先填寫信用卡背面末三碼')
        } else if (this.renewalWay === '') {
          // let arr1 = []
          // let obj = {
          //   "functionCode": '',
          //   "functionName": '續期保費繳費方式未選擇',
          //   "checkFaceMsg": '續期保費繳費方式未選擇',
          //   "checkMsg": '續期保費繳費方式未選擇'
          // }
          // arr1.push(obj)
          // this.postErr(arr1)
          return this.$myToast.success('續期保費繳費方式未選擇')
        }

        // 檢查参数
        if (this.isAgree.every(el => el === true)) {
          //投保
          this.stepFour2Serve()
          return
        }
        let arr = []
        let arr2 = []
        this.isAgree.forEach((el, index) => {
          if (el === false) {
            return arr.push(index)
          }
        });
        let arr1 = []
        let obj = {
          "functionCode": '',
          "functionName": '繳費注意事項及信用卡約定條文已閱讀選項未勾選。',
          "checkFaceMsg": `請閱讀繳費注意事項及信用卡約定條文後勾選已閱讀選項`,
          "checkMsg": '繳費注意事項及信用卡約定條文已閱讀選項未勾選'
        }
        arr1.push(obj)
        let jsonStr = JSON.stringify(this.stepFourCanData())
        this.postErr(arr1, jsonStr)
        let doc = document.querySelector('#four-isAgree')
        $(window).scrollTop(doc.offsetTop - 200)
        // return this.$myToast.success(`『請閲讀並同意』${this.infoList[arr[0]].name}`)
        return this.$myToast.success(`請閱讀繳費注意事項及信用卡約定條文後勾選已閱讀選項`)
      }
    },
    // 下一步 current + 1
    next() {
      this.current += 1
      document.documentElement.scrollTop = 0;
    },
    async prePost() {
      try {
        let obj = {
          1: 'PROPOSALFIRTAB',
          2: 'PROPOSALSECTAB',
          3: 'PROPOSALTHRTAB'
        }
        let premData = {
          "orderNo": this.orderNum,
          "pageEnum": obj[this.current]
        }
        // pageEnum投保資料錄入頁传PROPOSALFIRTAB
        // pageEnum資料確認頁传PROPOSALSECTAB
        // pageEnum繳費頁传PROPOSALTHRTAB
        let res = await this.Axios('toPrevious', premData)
      } catch (error) {
      }
    },

    //返回上一步重新更新保費及年齡
    getInsureAgeAndPremium() {
      let premData = {
          "orderNo": this.orderNum,
        }
      this.Axios('getInsureAgeAndPremium',premData) 
        .then(res=>{
          this.premium = `${res.data.data.premium}`
          this.premDataTab1.applicatFactors.age.value = `${res.data.data.insureAge}歲`
          console.log(res,'haahha',this.premDataTab1.applicatFactors.age.value)
        })
      
    },

    async pre() {
      console.log( this.current)

      try {
        if (this.current == 0) {
          return this.$router.go(-1)
        }
        if (this.current == 1) {
          await this.prePost()
          await this.getInsureAgeAndPremium()


        }
        if (this.current == 2) {
          await this.prePost()
          this.Modeify = false
          await this.getInsureAgeAndPremium()

        }
        if (this.current == 3) {
          await this.prePost()
          this.ifPrefrom4 = true
          this.bankNumList.forEach(el => el.value = '')
          this.ifBankError = false
          this.month = undefined
          this.year = undefined
          this.ifdateErr = false
          this.bankLast3Number = ''
          this.ifLast3Error = false
        }
        this.current -= 1
        document.documentElement.scrollTop = 0;
      } catch (error) {
      }

    },
    benefichange(val) {

      console.log('benefichange',val)
      let noentryrequired = false
      if (val == "01") {
        noentryrequired = true
      }
      this.$set(this.allocation.allocation, 'noentryrequired', noentryrequired)
      for (let benefic of this.beneficiary) {
        for (let key in benefic) {
          for (let i in benefic[key]) {
            this.$set(benefic[key][i], 'noentryrequired', noentryrequired)
          }
        }
      }
    },
    allocachange(val) {
      let benefitsSort = false
      let benefitsRate = true
      if (val == 2) {
        benefitsSort = true
        benefitsRate = false
      }
      for (let benefic of this.beneficiary) {
        this.$set(benefic.benefitsSort.benefitsSort, 'noentryrequired', benefitsSort)
        this.$set(benefic.benefitsRate.benefitsRate, 'noentryrequired', benefitsRate)
      }
    },
    // 资料同步
    samechange(val, factorList) {
      let noentryrequired = false
      if (val.sameAsCustomer.value == 1) {
        // noentryrequired = true
        for (let key in factorList) {
          this.$set(factorList[key], 'noentryrequired', noentryrequired)
        }
        if (!this.premDataTab2.recognizeeFactorList.address.hasShowError && !this.premDataTab2.recognizeeFactorList.addressText.hasShowError &&
          !this.premDataTab2.recognizeeFactorList.phone.hasShowError
        ) {
          if (!this.premDataTab2.recognizeeFactorList.address.hasShowError && this.premDataTab2.recognizeeFactorList.address.value != '') {
            this.$set(factorList.beneficiaryAddress, 'value', this.premDataTab2.recognizeeFactorList.address.value)
            this.$set(factorList.beneficiaryAddress, 'show_value', this.premDataTab2.recognizeeFactorList.address.show_value)
            this.$set(factorList.beneficiaryAddress, 'hasShowError', this.premDataTab2.recognizeeFactorList.hasShowError)
            // this.$set(factorList.beneficiaryAddress, 'options', this.premDataTab2.recognizeeFactorList.address.options)
            this.$set(factorList.beneficiaryAddress, 'postcode', this.premDataTab2.recognizeeFactorList.address.postcode)
            // this.$set(factorList.beneficiaryAddress, 'selectedoption', this.premDataTab2.recognizeeFactorList.address.selectedoption)
            this.$set(factorList.beneficiaryAddress, 'firstWord', this.premDataTab2.recognizeeFactorList.address.firstWord)
            this.$set(factorList.beneficiaryAddress, 'secondWord', this.premDataTab2.recognizeeFactorList.address.secondWord)
            this.$set(factorList.beneficiaryAddress, 'lastWord', this.premDataTab2.recognizeeFactorList.address.lastWord)
          } else {
            this.$set(val.sameAsCustomer, 'value', 2)
            return this.$message.error('請正確填寫要保人資訊')
          }
          if (!this.premDataTab2.recognizeeFactorList.addressText.hasShowError && this.premDataTab2.recognizeeFactorList.addressText.value != '') {
            this.$set(factorList.beneficiaryAddressText, 'value', this.premDataTab2.recognizeeFactorList.addressText.value)
            this.$set(factorList.beneficiaryAddressText, 'hasShowError', this.premDataTab2.recognizeeFactorList.addressText.hasShowError)
          } else {
            this.$set(val.sameAsCustomer, 'value', 2)
            return this.$message.error('請正確填寫要保人資訊')
          }
          if (!this.premDataTab2.recognizeeFactorList.phone.hasShowError && this.premDataTab2.recognizeeFactorList.addressText.value != '') {
            this.$set(factorList.beneficiaryPhone, 'value', this.premDataTab2.recognizeeFactorList.phone.value)
            this.$set(factorList.beneficiaryPhone, 'hasShowError', this.premDataTab2.recognizeeFactorList.phone.hasShowError)
            if (this.premDataTab2.recognizeeFactorList.phone.value) {
              let arr = this.premDataTab2.recognizeeFactorList.phone.value.split('-')
              this.$set(factorList.beneficiaryPhone, 'first', arr[0])
              this.$set(factorList.beneficiaryPhone, 'second', arr[1] ? arr[1] : '')
              this.$set(factorList.beneficiaryPhone, 'last', arr[2] ? arr[2] : '')
            }
          } else {
            this.$set(val.sameAsCustomer, 'value', 2)
            return this.$message.error('請正確填寫要保人資訊')
          }
        } else {
          this.$set(val.sameAsCustomer, 'value', 2)
          return this.$message.error('請正確填寫要保人資訊')
        }
      } else {
        // for (let key in factorList) {
        //   this.$set(factorList[key], 'noentryrequired', noentryrequired)
        // }
        // this.$set(factorList.beneficiaryAddress, 'value', '')
        // this.$set(factorList.beneficiaryAddress, 'show_value', '')
        // // this.$set(factorList.beneficiaryAddress, 'options', [])
        // this.$set(factorList.beneficiaryAddress, 'postcode', '')
        // this.$set(factorList.beneficiaryAddress, 'firstWord', undefined)
        // this.$set(factorList.beneficiaryAddress, 'secondWord', undefined)
        // this.$set(factorList.beneficiaryAddress, 'lastWord', undefined)
        // // this.$set(factorList.beneficiaryAddress, 'selectedoption', [])
        // this.$set(factorList.beneficiaryAddressText, 'value', '')
        // this.$set(factorList.beneficiaryPhone, 'value', '')
        // console.log(`phone---------------111111111--------------`, '')
        // this.$set(factorList.beneficiaryPhone, 'first', '')
        // this.$set(factorList.beneficiaryPhone, 'second', '')
        // this.$set(factorList.beneficiaryPhone, 'last', '')

        // console.log(`after-------------------11111111----------`, factorList)
      }
    },
    // 添加受益人
    add() {
      if (this.beneficiaryLength > 1) return this.$message.error('多位受益人只能有一个法定继承人！')
      let beneficiary = JSON.stringify({ ...this.cacheObj })
      let obj2 = JSON.parse(beneficiary)
      obj2.benefitsSort.benefitsSort.value = this.beneficiary.length + 1
      this.beneficiary.push(obj2)
    },
    // 删除受益人
    deleteObj(index) {
      this.beneficiary.splice(index, 1)
      this.beneficiary.forEach((el, index) => el.benefitsSort.benefitsSort.value = index + 1)
    },
    submit() {
      let arrList = []
      this.checked.forEach((el, index) => {
        if (el === false) {
          return arrList.push(index)
        }
      });
      if (arrList.length > 0) {
        if (arrList[0] != 3) {
          return this.$myToast.success(`『請閲讀並同意』${this.riskAgreementDTOList[arrList[0]].name}`)
        } else {
          return this.$myToast.success(`請選擇${this.riskAgreementDTOList[arrList[0]].name}`)
        }
      }
      let self = this
      this.Axios('getSerialNumber', {})
        .then(res => {
          self.serialNumber = res.data.data
          self.Modeify = true
        })
        .catch(err => {

        })
    },
    // 第一步獲取数据
    getTab1Data() {
      let trail = this.trail
      let tepData = {
        "preminum": this.$route.query.premium,
        "goodsId": this.goodsId,
        "orderId": null,
        "tabNum": "1",
        ...this.vocationInfo
      }
      Object.entries(trail).forEach(el => {
        return tepData[el[1].name] = el[1].value
      })
      this.ifloading = true
      this.Axios('getPolicyFactor', tepData)
        .then(res => {
          let applicatFactors = {}
          let obj1 = {
            name: 'userIdcard',
            label: '身分證字號',
            type: "label",
            value: this.$store.getters.userIdcard
          }
          let obj2 = {
            name: 'sex',
            label: '性别',
            type: "label",
            value: String(this.$store.getters.userIdcard).substr(1, 1) == 1 ? '男' : '女'
          }
          res.data.data.applicatFactors.splice(1, 0, obj1)
          res.data.data.applicatFactors.splice(2, 0, obj2)
          res.data.data.applicatFactors.forEach(item => {
            if (item.name == 'birthday') {
              let arr = item.value.split('-')
              item.show_value = `${this.lt100(parseInt(arr[0] - 1911))}/${arr[1]}/${arr[2]}`
              let traildata = {
                productId: "1",
                goodsId: this.goodsId,
              }
              let obj = this.trail
              Object.keys(obj).forEach(function (key) {
                if (key == 'birthday') {
                  traildata[key] = item.value
                } else {
                  traildata[key] = obj[key].value
                }
              });
              // this.traildata = traildata
              this.getprice(traildata, true)
            }
            applicatFactors[item.name] = item
          })
          // 非既有客户

          // console.log(`arr1`, Object.keys(this.premDataTab1.infromFactors))
          // console.log(`arr2`, Object.keys(applicatFactors))
          // if (Object.keys(this.premDataTab1.infromFactors) == Object.keys(applicatFactors)) return
          if (res.data.message && res.data.message != 'ok') {
            // this.$message.error(res.data.message)
            this.$myToast.success(res.data.message)
            let traildata = {
              productId: "1",
              goodsId: this.goodsId,
            }
            let obj = this.trail
            Object.keys(obj).forEach(key => {
              if (key == 'birthday') {
                traildata[key] = applicatFactors.birthday.value
              } else if (key == 'amount') {
                traildata[key] = res.data.data.policyContent[1].value
              } else {
                if (key == 'genderCode') {
                  traildata[key] = this.$store.getters.userIdcard.substr(1, 1)
                } else {
                  traildata[key] = obj[key].value
                }
              }
            });
            // this.traildata = traildata
            this.getprice(traildata, true)
          }
          this.premDataTab1.applicatFactors = applicatFactors
          let infromFactors = {}
          res.data.data.infromFactors.forEach(item => {
            infromFactors[item.name] = item
            if ((item.name == 'jobId' || item.name == 'sidelineJobId')) {
              if (item.name == 'jobId') {
                infromFactors[item.name].jobType = trail.occupationLevel != undefined ? trail.occupationLevel.jobType : ''
                infromFactors[item.name].value = trail.occupationLevel != undefined ? trail.occupationLevel.value : ''
                infromFactors[item.name].show_value = trail.occupationLevel != undefined ? trail.occupationLevel.show_value : ''
                infromFactors[item.name].width = '45%'
                infromFactors[item.name].placeholder = '我的行業別'
                infromFactors[item.name].placeholdertwo = '我的職業別'
                infromFactors[item.name].placeholderthr = '工作性質'
                infromFactors[item.name].firstWord = trail.occupationLevel != undefined ?
                  trail.occupationLevel.firstWord : undefined
                infromFactors[item.name].secondWord = trail.occupationLevel != undefined ?
                  trail.occupationLevel.secondWord : undefined
                infromFactors[item.name].lastWord = trail.occupationLevel != undefined ?
                  trail.occupationLevel.lastWord : undefined
                if (this.goodsId == 3) {
                  infromFactors[item.name].options1 = []
                  infromFactors[item.name].options2 = []
                  infromFactors[item.name].options3 = []
                }


              } else {
                infromFactors[item.name].jobType = ''
                infromFactors[item.name].value = ''
                infromFactors[item.name].show_value = ''
                infromFactors[item.name].width = '45%'
                infromFactors[item.name].placeholder = '我的行業別'
                infromFactors[item.name].placeholdertwo = '我的職業別'
                infromFactors[item.name].placeholderthr = '工作性質'
                infromFactors[item.name].options1 = []
                infromFactors[item.name].options2 = []
                infromFactors[item.name].options3 = []
              }
            }
          })
          let idcard = {
            name: 'idCard'
          }
          this.premDataTab1.infromFactors = infromFactors
          this.questionList.infroms = res.data.data.infroms
          this.questionList.otherInfroms = res.data.data.otherInfroms
          let policyContent = {}
          res.data.data.policyContent.forEach(item => {
            if (item.name == 'amount') {
              item.show_value = `${parseInt(item.value) / 10000}萬`
            }
            policyContent[item.name] = item
          })
          this.premDataTab1.policyContent = policyContent
          this.orderNum = res.data.data.orderNum
          this.errorMsg = ''
          this.tab1 = true
          let that = this
          if (this.tab1 = true) {
            setTimeout(() => {
              that.ifloading = false
            }, 2000)
          }
        })
        .catch(err => {
          this.ifloading = false
          this.errorMsg = err
        })
    },
    // 第二步獲取数据
    getTab2Data() {
      let tepData = {
        "goodsId": this.goodsId,
        "orderId": null,
        "tabNum": "1"
      }
      let self = this
      this.ifloading = true
      this.Axios('getInfomationPageFactor', tepData)
        .then(res => {
          let recognizeeFactorList = {}
          res.data.data.recognizeeFactorList.forEach(item => {
            recognizeeFactorList[item.name] = item
            if (item.name == 'address') {
              item.postcode = ''
              item.firstWord = undefined
              item.secondWord = undefined
              item.lastWord = undefined
              // item.options1 = []
              // item.options2 = []
              // item.options3 = []
            }
          })
          self.premDataTab2.recognizeeFactorList = recognizeeFactorList
          let beneficiaryType = {}
          let allocation = {}
          res.data.data.beneficiaryTypeFactorList.forEach(item => {
            if (item.name == "beneficiaryType") {
              item.show_value = item.showValue
              beneficiaryType[item.name] = item
            } else if (item.name == "allocation") {
              allocation[item.name] = item
            }
          })
          self.beneficiaryType = beneficiaryType
          self.allocation = allocation
          let beneficiary = {}
          let benefitsSort = {}
          let benefitsRate = {}
          let sameAsCustomer = {}
          let beneficiaryFactorList = {}
          let factorList = {}
          let beneficiaryBirthday = {}
          res.data.data.beneficiaryFactorList.forEach(item => {
            if (item.name == "benefitsSort") {
              item.type = "label"
              benefitsSort[item.name] = item
            } else if (item.name == "benefitsRate") {
              benefitsRate[item.name] = item
            } else if (item.name == "sameAsCustomer") {
              sameAsCustomer[item.name] = item
            } else if (item.name == "factorList") {
              item.beneficiaryAddress.show_value = ''
              item.beneficiaryAddress.selectedoption = []
              item.beneficiaryAddress.postcode = ''
              item.beneficiaryAddress.firstWord = ''
              item.beneficiaryAddress.secondWord = ''
              item.beneficiaryAddress.lastWord = ''
              factorList[item.name] = item
            } else if (sameAsCustomer.hasOwnProperty('sameAsCustomer')) {
              if (item.name == 'beneficiaryAddress') {
                item.postcode = ''
                item.firstWord = undefined
                item.secondWord = undefined
                item.lastWord = undefined
              }
              factorList[item.name] = item
            } else if (item.name == "relationToInsured") {
              item.value = undefined
              beneficiaryFactorList[item.name] = item
            } else {
              beneficiaryFactorList[item.name] = item
            }
          })
          beneficiary.benefitsSort = benefitsSort
          beneficiary.benefitsRate = benefitsRate
          beneficiary.sameAsCustomer = sameAsCustomer
          beneficiary.beneficiaryFactorList = beneficiaryFactorList
          beneficiary.beneficiaryFactorList.beneficiaryNationalityCode.value = '001'
          beneficiary.factorList = factorList
          self.beneficiaryobj = { ...beneficiary }
          let obj = JSON.stringify({ ...beneficiary })
          self.cacheObj = JSON.parse(obj)
          self.beneficiary.push(beneficiary)
          this.benefichange('01')
          this.errorMsg = ''
          this.tab2 = true
          this.ifloading = false
        })
        .catch(err => {
          this.ifloading = false
          this.errorMsg = err
        })
    },
    // 第三步獲取数据
    getTab3Data(bol) {

      let tepData = {
        "riskCode": this.goodsId
      }
      let self = this
      this.ifloading = true
      this.Axios('riskAgreementList', tepData, true)
        .then(res => {
          this.userInfo.phone = res.data.data.phone
          this.userInfo.email = res.data.data.email
          //声明： 1 伤害险无 2 寿险有
          // if (this.$route.query.goodsType == 1) {
          // let arr = res.data.data.riskAgreementDTOList
          // this.riskAgreementDTOList = arr.filter(el => {
          // 	return el.subType !== 'insure_declaration' && this.$route.query.goodsType !== 1
          // })
          // } else {
          //  	this.riskAgreementDTOList
          // }
          // console.log(`riskAgreementDTOList`, this.riskAgreementDTOList)
          this.riskAgreementDTOList = res.data.data.riskAgreementDTOList
          this.premDataTab1.applicatFactors.cellphone = {
            name: 'cellphone',
            label: '手機',
            type: "label",
            value: res.data.data.phone
          }
          this.premDataTab1.applicatFactors.email = {
            name: 'email',
            label: 'E-mail',
            type: "label",
            value: res.data.data.email,
          }
          // console.log(`this.premDataTab1.applicatFactors`, this.premDataTab1.applicatFactors)
          // console.log(`this.premDataTab1.infromFactors`, this.premDataTab1.infromFactors)
          // if (!bol) {
          for (let r of this.riskAgreementDTOList) {
            this.checked.push(false)
          }
          // }

          if (this.riskAgreementDTOList.length > 0 && !bol) {
            this.allSelect = false
          }
          this.errorMsg = ''
          this.tab3 = true
          this.ifloading = false
        })
        .catch(err => {
          this.ifloading = false
          this.errorMsg = err
          // console.log(err)
        })
    },
    judgeTime(data) {
      let d1 = new Date(data.replace('-', '/'))
      let dd = new Date();
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1;
      let d = dd.getDate();
      let d2 = new Date(y + '/' + m + '/' + d);
      let iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
      return iday;
    },
    // 第三步更新生效日期
    async frontPolicyService(bol) {
      try {
        this.ifloading = true
        let tepData = {
          orderNo: this.orderNum
        }
        let res = await this.Axios('frontPolicyService', tepData)
        if (this.effectDay && this.effectDay != res.data.data.effectiveTimeStr && this.riskAgreementDTOList.length > 0) {
          console.log(`跨天`)
          this.riskAgreementDTOList = []
          this.checked = []
          this.getTab3Data(true)
        }
        this.effectDay = res.data.data.effectiveTimeStr
        this.premium = res.data.data.premium
        this.premDataTab1.applicatFactors.age.value = `${res.data.data.insureAge}歲`
        this.ifloading = false
        if (bol) {
          this.next()
        }
      } catch (error) {
        console.log(error)
        this.ifloading = false
        this.effectDay = ''
      }
    },
    jump() {
      // this.$router.push({
      // 	name: 'infoChange',
      // });
      let arr = this.redUrl.split('=')
      // window.open(this.imgList[0].url)
      // let timer = setTimeout(() => {
      //   window.open(this.redUrl)
      //   clearTimeout(timer)
      // }, 500)
      var tempwindow = window.open('_blank'); // 先打开页面
      tempwindow.location = this.redUrl; // 后更改页面地址
    },
    // 初始化查数据
    getData() {
      let map = new Map([
        [0, 'AIA 友邦人壽網路投保｜資料填寫'],
        [1, 'AIA 友邦人壽網路投保｜資料填寫'],
        [2, 'AIA 友邦人壽網路投保｜資料確認'],
        [3, 'AIA 友邦人壽網路投保｜線上繳費'],
        [4, 'AIA 友邦人壽網路投保｜完成投保'],
      ])
      window.document.title = map.get(this.current)
      if (this.current == 0 && !this.tab1 && !this.ifneedCach) {
        this.getTab1Data()
      } else if (this.current == 1 && !this.tab2) {
        this.getTab2Data()
      } else if (this.current == 2) {
        console.log(`第三步`)
        if (this.ifPrefrom4) {
          this.frontPolicyService(false)
        }
        if (this.tab3) {
          this.Modeify = false
        } else {
          this.getTab3Data(false)
        }
      } else if (this.current == 4) {
        this.getPolicyDetail()
      }

    },
    getQuery() {
      this.goodsId = this.$route.query.id
      this.premium = this.$route.query.premium
      this.goodsType = this.$route.query.goodsType
    },
  },
  mounted() {
  },

  created() {
    this.getQuery()
    this.getData()
    this.setYearList()
    this.getInfoList()
  }
};
</script>
<style scoped>


@media screen and (max-width: 1023px) {
  .footer_box {
    margin-bottom: 3.125rem;
  }
}
@media screen and (min-width: 1024px) {
  .footer_box {
    display: none
  }
}
  
</style>

<style lang="scss" scoped>
@import './index.scss';
@import './h5_insure.scss';
@media only screen and (min-device-width: 1024px) {
  html {
    font-size: 16px!important;
    
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .rightDiv {
    margin: 0 0 0 26rem ;
  }
  .fixed-side {
    padding-left: 10.8rem !important;
  }
  .step_three {
    .insureitem:nth-child(2) {
      margin-top: 4rem;
    }
  }
  .stepFour {
    .insureitem {
      .way {
        .bank-input {
          border-bottom: 0.125rem solid #e4e4e4;
        }
        .redbtbd {
          border-bottom: 0.125rem solid #d81f49 !important;
          color: #606060;
        }
        .bank-input:focus {
          border-bottom: 0.125rem solid #a2b5f9 !important;
        }
      }
    }

    .insureitem:nth-child(2) {
      /deep/ .way {
        margin-top: 0 !important;

        .selectbox {
          .ant-select-selection-selected-value {
            margin-top: -0.1rem;
          }
          .ant-select-selection__placeholder {
            top: 50% !important;
          }
        }
      }
    }
  }
  .step_two {
    .insureitem {
      .benefiBox {
        width: 100% !important;
        .benefiCon {
          /deep/.switch .box {
            width: 11rem !important;
          }
          .form:nth-child(2) {
            /deep/ .form_info {
              .lis:nth-child(1) {
                .ant-select-selection-selected-value {
                  margin-top: -0.25rem !important;
                }
              }
              .lis:nth-child(3) {
                .ant-select-selection-selected-value {
                  margin-top: -0.25rem !important;
                }
              }
            }
          }
          /deep/ .form:nth-child(4) {
            .form_info {
              .box {
                width: 13rem !important;
              }
            }
            // /deep/.box {
            // background: red;
            // }
          }
          .form:nth-child(5) {
            /deep/ .lis:nth-child(2) {
              // background: red;
              .select_opt .ant-select-selection__placeholder {
                top: 50% !important;
              }
            }
          }
          /deep/ .ant-select-selection__placeholder,
          .ant-select-search__field__placeholder {
            top: 44% !important;
            line-height: 1rem !important;
          }
          /deep/.ant-select-selection__rendered {
            line-height: 2rem !important;
          }
          //  .ant-select-selection-selected-value {
          //     margin-top: -.3rem
          //   }
        }
      }
    }
    .insureitem:nth-child(1) {
      .header {
        margin-bottom: 1.8rem !important;
      }
    }
  }
  .step_one {
    .insureitem:last-child /deep/ .lis:nth-child(2) .ant-form-item-label {
      label {
        display: inline-block;
        margin-top: 0.4rem;
        // vertical-align: bottom;
      }

      label::after {
        content: '' !important;
      }
    }

    /deep/ .questionList > div:not(:first-child) {
      // padding-bottom: 0!important
    }
  }

  .content
    .insure
    .form
    /deep/.ant-row
    .ant-form-item-label
    .ant-form-item-required {
    color: #3a3a3a;
  }
  .content
    .insure
    .form
    /deep/.linelabelitem
    .ant-form-item-control-wrapper
    .ant-form-item-children {
    font-size: 1.25rem !important;
  }
  .step_one #infromFactors .form /deep/ .other .addbtn {
    border-radius: 90rem;
    & > .anticon + span {
      color: #d81f49;
    }
  }

  .stepFour {
    //  /deep/.bank-input::placeholder,.bank{
    //   }
    /deep/ .bank {
      width: 23% !important;
      margin-right: 2% !important;
    }
  }
}
// @media screen and (min-width:835px) and (max-width:1140px){
//  .step_one{
//     /deep/.ant-form-item-label {
//     background: red

//     }
//  }
// }

// }
html {
  // font-size: 40px!important;
  width: 400px;
  /deep/.hello {
  background-color: red;
  /deep/.footer_box {
    display: none!important;
  }
}
}

.o_btn {
  display: inline-block;
  height: 2.5rem;
  padding-left: 1rem;
  line-height: 2.5rem;
  vertical-align: middle;
  color: #d81f49;
}
.stepFour {
  width: 33rem;
  min-height: 43.75rem;
  padding-bottom: 7.5rem;
  .select {
    font-size: 1.25rem;
    color: #3a3a3a;
    .ant-select-selection__rendered {
      line-height: 2.5rem !important;
    }
    .ant-select-selection__placeholder {
      color: #606060 !important;
    }
  }
  .select .ant-select-selection {
    font-size: 1.125rem;
  }
  .thirdbox1 {
    margin-top: 1.25rem !important;
  }
  .ant-select {
    width: 90% !important;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c9c9c9 !important;
    font-size: px(28);
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c9c9c9 !important;
    font-size: px(28);
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c9c9c9 !important;
    font-size: px(28);
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c9c9c9 !important;
    font-size: px(28);
  }
  .way {
    margin-top: 2.5rem;
    float: left;
    width: 100%;
    padding-bottom: 50px;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;

    .way-item {
      width: 46%;
      float: left;
      // margin-right: 1.25rem;
      display: inline-block;
      height: 3rem;
      line-height: 3rem;
      font-size: 1.125rem;
      text-align: center;
      border: 0.0625rem solid #e4e4e4;
      display: inline-block;
      &:nth-child(2) {
        float: right;
        margin-left: 0.25rem;
        display: inline-block;
      }
    }

    .red {
      color: #fff;
      background-color: $primary-color;
      font-weight: 600;
      border: 0.0625rem solid $primary-color;
    }

    .tips {
      margin-top: 0.9375rem;
      font-size: 0.9375rem;
      color: $primary-color;
    }

    .bankbox {
      width: 100%;
      display: flex;

      .left {
        // width: 7.8125rem;
      }

      .right {
        width: 25rem;

        .searchBank {
          font-size: 1.125rem;
          margin-top: 0.625rem;
          color: $primary-color;
          cursor: pointer;
          span {
            border-bottom: 0.0625rem solid $primary-color;
          }
        }
      }
    }

    .selectbox {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .select {
        width: 45%;
        // margin: auto;
        float: left;
        margin-top: 0.625rem;
        border-color: #757575;
        .ant-select-selection-selected-value {
          font-size: 1.125rem;
        }
        &:nth-child(2) {
          float: right;
        }
      }
    }
    .fl {
      float: left;
      font-size: 1rem;
    }

    .fr {
      float: right;
    }
    .state {
      width: 100%;
      margin-top: 2.5rem;
      font-size: 1rem;
      font-family: 'Microsoft JhengHei' !important;
      font-weight: 400;
      color: rgba(58, 58, 58, 1);
      line-height: 2.1875rem;
    }
    .effdateSlect {
      margin-top: 1.25rem;
    }
  }
  .errorTip {
    width: 100%;
    margin-top: 0.3125rem;
    font-size: 1rem;
    color: #d81f49;
  }
  .bank-input {
    margin-top: 1.25rem;
    font-size: 1.125rem;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 0.0625rem solid #e4e4e4;
  }
  .bank-input::placeholder {
    font-size: 1.125rem;
    letter-spacing: 0.125rem;
  }
  .bank-input:focus {
    border-bottom: 0.0625rem solid #a2b5f9 !important;
  }
  .redbtbd {
    border-bottom: 0.0625rem solid $primary-color !important;
    color: #606060;
  }
  .bank {
    width: 20%;
    margin-right: 5%;
    margin-top: 1.1rem !important;
    padding-left: 0.3125rem;
    float: left;
  }
  .thirdbox {
    margin-top: 3.75rem;

    .referrer {
      width: 100%;
      letter-spacing: 0.125rem;
      margin-top: 1.25rem;
      font-size: 1.25rem;
      font-family: 'Microsoft JhengHei' !important;
      font-weight: 400;
      color: rgba(58, 58, 58, 1);
      line-height: 2.1875rem;
    }
  }
  .way-item {
    font-size: 1rem !important;
  }
}

.bankList {
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100rem;
  bottom: 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  background-color: rgba(58, 58, 58, 0.6);
  padding: 10.25rem 20% 3rem;

  .contentbox {
    position: relative;
    flex: 1;
    padding: 5rem 9rem;
    overflow: auto;
    background-color: #fff;

    .title {
      font-size: 1.875rem;
      font-family: 'Microsoft JhengHei' !important;
      font-weight: 500;
      color: rgba(58, 58, 58, 1);
      line-height: 3.25rem;
    }

    .box {
      margin-top: 3.125rem;
      height: auto;
      width: 100%;
      // background-color: yellowgreen;
      display: flex;
      flex-wrap: wrap;
      border-top: 0.0625rem solid #727272;
      border-left: 0.0625rem solid #727272;
      overflow-x: hidden;
      .name {
        width: 25%;
        float: left;
        padding: 1.5rem 0.3125rem;
        background: #fff;
        font-size: 1rem;
        letter-spacing: 0.0625rem;
        font-weight: 400;
        color: rgba(58, 58, 58, 1);
        line-height: 1.25rem;
        text-align: center;
        border-right: 0.0625rem solid #727272;
        border-bottom: 0.0625rem solid #727272;
      }
    }

    .close {
      position: absolute;
      top: 5%;
      right: 3.125rem;
      color: $primary-color;
      font-size: 2.1875rem;
    }
  }
}
.rightDiv {
  /deep/ .oteh1r {
    p,
    span {
      background: none !important;
    }
  }
  /deep/ .ant-form-item-label .ant-form-item-required {
    color: #3a3a3a;
  }
}
.serialNumber {
  /deep/ .item_tips {
    color: #476195;
    font-size: 1rem;
    font-family: 'Microsoft JhengHei' !important;
    font-weight: 400;
  }
  /deep/ .codeSure {
    line-height: 1.875rem;
    // height:5.25rem;
    font-size: 1rem;
    font-family: 'Microsoft JhengHei' !important;
    font-weight: 400;
    color: rgba(106, 106, 106, 1);
    line-height: 2.125rem;
  }
}
.imgcarousel {
  .carouselimgBox {
    height: 13.75rem;
  }
  /deep/ .ant-carousel .slick-slide img {
    border: 0.3125rem solid #fff;
    display: block;
    // margin: auto;
    // max-width: 80%;
  }
  /deep/ .ant-carousel .slick-dots {
    bottom: -1.5rem;
  }
  /deep/ .ant-carousel .slick-dots li {
    width: 0.8125rem;
    height: 0.8125rem;
    background: #fff;
    border-radius: 0.8125rem;
    border: 0.0625rem solid #e94c55;
    margin: 0 0.5rem;
  }
  /deep/ .ant-carousel .slick-dots li.slick-active {
    background: #e94c55;
  }
  /deep/ .ant-carousel .slick-dots li button {
    display: none;
  }
}
.insureitem /deep/.form .addr_select {
  .select_opt {
    width: 40% !important;
  }
}
.stepFour .insureitem .header {
  padding-top: 0;
}
.stepFour .way .ant-select-selection__rendered {
  line-height: 3rem;
}
.stepFour {
  .insureitem .header {
    padding-top: 0;
  }
  .insureitem:nth-child(2) {
    .way .selectbox {
      /deep/ .ant-select-selection__placeholder {
        color: #606060 !important;
      }
    }
  }
}
.stepFour {
  /deep/ .ant-select-selection__rendered {
    line-height: 2.5rem !important;
  }
}
.content /deep/ .ant-radio-button-wrapper {
  &:first-child {
    margin-right: 6% !important;
  }
  &:not(:first-child)::before {
    left: 0rem !important;
  }
  border: 0.0625rem solid #727272 !important;
  letter-spacing: 0.125rem;
  color: #606060;
  border-radius: 0 !important;
  width: 47%;
  text-align: center;
}
.content /deep/ .select_opt,
.ant-select {
  width: 15.8125rem !important	;
}
.content /deep/ .ant-radio-button-wrapper-checked {
  border-color: $primary-color !important	;
  background-color: $primary-color !important;
  color: #fff !important;
  font-weight: 600;
}
.insure /deep/ .tip {
  color: #476195;
  margin-top: .35rem;

  // color: $primary-color !important;
}
.coin {
  position: absolute;
  right: 0;
}
</style>
