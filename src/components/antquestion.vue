<template>
	<div class="questionList">
		<div v-for="(item,index) in questionList" :key="index">
			<p class="question" v-html='item.question' ></p>
			<a-radio-group v-model="item.value" class="radio" @change="item.hasShowError=false" :disabled="allfalse" buttonStyle="solid">
				<a-radio-button v-for="(option,optionIndex) in options" :key="optionIndex" :value="option.value" :disabled="allfalse" :class="allfalse?'cant':''">
					{{option.name}}
				</a-radio-button>
			</a-radio-group>
			<p v-if="item.hasShowError && item.questionType ==1" class="error">請勾選告知事項</p>
			<p v-if="item.hasShowError && item.questionType ==99" class="error">請勾選其他問項</p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'antquestion',
	props: {
		questionList: {
			type: Array,
		},
		allfalse: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			options: [{ value: "Y", name: "是" }, { value: "N", name: "否" }]
		}
	},
	computed: {},
	watch: {
	},
	methods: {

	},
	created() { }
}
</script>

<style lang="scss" scoped>

@media screen and (max-width:1023px){
	.questionList {
		.error {
			font-size: .75rem !important
		}
	}
	
	
}
.questionList > div {
	padding: 2.35rem 0 2.5rem 0;
	// margin-bottom: 0.625rem
}
.questionList
  /deep/
  label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-disabled.cant {
  background-color: #f5222d !important;
}
.questionList > div:not(:first-child) {
  border-top: .125rem solid #e4e4e4;
}
.ant-radio-group {
  width: 100%;
}
.ant-radio-button-wrapper {
  width: 15.875rem;
	height: 3rem;
  line-height: 3rem;
  border-radius: 0 !important;
  text-align: center;
	font-size:1.125rem;
	font-weight:400;
	border:0.125rem solid rgba(114,114,114,1);
}

.ant-radio-button-wrapper:first-child {
	// margin: 0 5% 0 0;
	margin-right: 1.2rem;

	border-left: 0.125rem solid
}
.ant-radio-button-wrapper:not(:first-child):before {
	width: fit-content;
}
.question {
	margin-top: 1.9375rem;
	font-size:1rem;
	font-family:'Microsoft JhengHei' !important;
	font-weight:400;
	color:rgba(58,58,58,1);
	line-height:2.25rem;
}
// .question>p {
// 	margin-top: 10rem!important;
// }
.radio {
	margin: 2.1rem 0 .5rem 0;
	font-size:1.125rem;
font-family:'Microsoft JhengHei' !important;
font-weight:400;
color:rgba(96,96,96,1);
}
.error {
	color: #f5222d;
	font-size: 1rem!important;
	margin-top: .5rem;
}
</style>
