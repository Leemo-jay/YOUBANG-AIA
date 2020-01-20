<template>
	<div class="form-com-content">
		<!-- {{item.param_type}} -->
		<!-- 填寫框 -->
		<comInput :reg='item.bds' :value.sync='item.value' :id='item.id' v-if="item.param_type == '1'" :showError.sync='item.error' :errorDesc.sync="item.errorMsg" :title="item.param_name" :tip="item.tip" :required="item.required" :grey="item.grey" :disabled="item.disabled" :modefine="item.modefine" :class="item.bds" @checkReferrerCode="checkReferrerCode"></comInput>
		<!-- 单選框 -->
		<comRadio :value.sync='item.value' v-else-if="item.param_type == '3'" :showError.sync='item.error' :errorDesc="item.errorMsg" :radioInfo="item.param_var" :title="item.param_name" modefine="item.modefine"></comRadio>
		<!-- 時間框 -->
    <!--{{screenWidth}}-->
    <comTime
      class="comTimeH5"
      :value.sync='item.value'
      v-else-if="item.param_type == '4' || item.param_type == 'dateever'"
      :minYear="item.minYear"
      :maxYear="item.maxYear"
      :widget.sync="item.widget"
      :showError.sync='item.error'
      :errorDesc="item.errorMsg"
      :errorMsg1="item.errorMsg1"
      :isRegister="item.isRegister"
      :ageT="item.ageT"
      :title="item.param_name"
      :id="item.id"
      :tip="item.tip"
      :defaultValue="item.defaultValue"
      :grey="item.grey"
      :otherSome="item.id == 'effectDate' ? true : false "
      :isSome="item.param_type == 'dateever' ? true : false "
      :modefine="item.modefine"></comTime>
    <!--<comTime :value.sync='item.value' v-else-if="item.param_type == '4' || item.param_type == 'dateever'" :minYear="item.minYear" :maxYear="item.maxYear" :showError.sync='item.error' :errorDesc="item.errorMsg" :errorMsg1="item.errorMsg1" :ageT="item.ageT" :title="item.param_name" :id="item.id" :tip="item.tip" :grey="item.grey" :otherSome="item.id == 'effectDate' ? true : false " :isSome="item.param_type == 'dateever' ? true : false " :modefine="item.modefine" @update="update"></comTime>-->
    <comNewTime class="comTimePC"  :reg='item.bds' :value.sync='item.value' :id='item.id' v-if="item.param_type == '8'" :showError.sync='item.error' :errorDesc.sync="item.errorMsg" :title="item.param_name" :tip="item.tip" :required="item.required" :grey="item.grey" :modefine="item.modefine" :type="item.type"></comNewTime>

		<!-- 下拉框 -->
		<comSelect :id='item.id' :value.sync='item.value' v-else-if="item.param_type == '2' || item.param_type == 'amount'" :showError.sync='item.error' :errorDesc="item.errorMsg" :title="item.param_name" :radioInfo="item.param_var" :tip="item.tip" :grey="item.grey" :modefine="item.modefine"></comSelect>
		<!-- 地区 -->
		<comArea :value.sync='item.value' :showError.sync='item.error' v-else-if="item.param_type == '7'" :errorDesc="item.errorMsg" :radioInfo="item.param_var" :title="item.param_name" :modefine="item.modefine"></comArea>
		<!-- 拍照 -->
		<!-- 	<div class="thisCard" v-else-if="item.param_type == 'ocr'">
				<input ref="file" v-show="false" id="fileZA" class="hidden" param_type="file" @change="fileChange" />
				<div class="ThisTitle">身分證正反照片</div>
				<div class="idcard">
					<div @click="chooseImg(0)" class="cardThis">
						<img v-if="!cardInfo[0]" src="../assets/idCard.png">
						<img v-else :src="cardInfo[0]">
						<div>上傳身分證正面</div>
					</div>
					<div @click="chooseImg(1)" class="cardThis">
						<img v-if="!cardInfo[1]" src="../assets/idCard.png">
						<img v-else :src="cardInfo[1]">
						<div>上傳身分证国徽面</div>
					</div>
				</div>
				<div class="redError" v-if="item.error">{{item.errorDesc || '請選擇身分证正反照片'}}</div>
			</div>
			<comOCC @click.native='openOc' :isRight="true" :disabled="true" :value.sync='item.value' :valueName='item.valueName'
			 :id='item.id' v-else-if="item.type == 'occupation'" :showError.sync='item.error' :errorDesc="item.errorMsg" :title="item.name"
			 :modefine="item.modefine"></comOCC> -->
	</div>
</template>
<script>
// import {
// 	compress,
// 	getfilesize
// } from '@/commonJs/common.js'
import comInput from './comInput.vue'
// import comOCC from './comOCC.vue'
import comArea from './chooseCity/comArea.vue'
import comRadio from './comRadio.vue'
import comTime from '../../comFormH5/form/comTime.vue'
import comNewTime from './comNewTime.vue'
import comSelect from './comSelect.vue'
export default {
	name: 'formCom',
	components: {
		comInput,
		comArea,
		comRadio,
		comTime,
		comNewTime,
		comSelect,
		// comOCC
	},
	props: {
		item: {
			type: Object,
			required: false
		}

	},
	data() {
		return {
			// 1法定受益人
			cardInfo: [0, 0],
			cardT: '',
			cardF: '',
			// 0 正 1 反
			type: '',
			isShow: true,
			canUp: true,
      screenWidth: '',
      screenHeight: ''
		}
	},
  mounted() {
      this.screenWidth = document.body.clientWidth + this.getScrollWidth();
      this.screenHeight = document.body.clientHeight;
      window.onresize = () => {
          return (() => {
              this.screenWidth = document.body.clientWidth;
              this.screenHeight = document.body.clientHeight;
          })();
      };
  },
  computed:{
	  /*windowWidth(){
	      return document.body.clientWidth+this.getScrollWidth()
    }*/
  },
	watch: {
		'item.value': {
			handler: function () { },
			deep: true,
			immediate: true
		}
	},
	created() { },
	methods: {
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
		update(value) {
			this.$parent.update(value)
		},
		checkReferrerCode() {
			this.$emit('checkReferrerCode')
		}
	},
}
</script>

<style lang="scss" scoped>
.redError {
  margin-bottom: px(30);
}

.thisCard {
  padding: px(29) 0;
  padding-bottom: 0;
  border-bottom: 1px solid #e8e8e8;
}

.hidden {
  position: fixed;
  left: -2000px;
}

.ThisTitle {
  text-align: left;
  font-size: px(28);
  color: #333;
  padding-left: px(40);
}

.idcard {
  display: flex;
  justify-content: space-around;
  padding: px(40) 0;
  color: #858b9c;
  font-size: px(24);

  img {
    width: px(168);
    height: px(112);
    margin-bottom: px(15);
  }
}
@media  screen and (max-width: 1023px) {
  .comTimePC{display: none}
}
@media only screen and (min-width: 1024px) {
  .comTimeH5{
    display: none;
  }
}

</style>
