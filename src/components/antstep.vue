<template>
	<div class="stepBox">
		<!-- <img :src="g1" alt=""> -->
		<div class="arr_list" v-for="(item,index) in img_arr" :key="index" >
			<img :src="item.r1" alt="" v-show="current==index" class="setp_img">
			<img :src="item.f1" alt="" v-show="current>index" class="setp_img">
			<img :src="item.g1" alt="" v-show="current<index" class="setp_img">
			<div class="line"></div>
			<div>
			</div>
			<div>
			</div>
		</div>
	</div>
</template>

<script>

const flagIcon = {
	template:`
		 <a-icon :component="flag" />
	`,
	data() {
    return {
			flag,
		
    }
  }
} 
	export default {
		name: 'antstep',
		components:{
			flagIcon
		},
		props: {
			current: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
					// g1,
			img_arr:[
				{
				g1:require("@/assets/step/g1.jpg"),
				r1:require("@/assets/step/r1.jpg"),
				f1:require("@/assets/step/f1.jpg")
				},
				{
				g1:require("@/assets/step/g2.jpg"),
				r1:require("@/assets/step/r2.jpg"),
				f1:require("@/assets/step/f2.jpg")

				},
				{
				g1:require("@/assets/step/g3.jpg"),
				r1:require("@/assets/step/r3.jpg"),
				f1:require("@/assets/step/f3.jpg")

				},
				{
				g1:require("@/assets/step/g4.jpg"),
				r1:require("@/assets/step/r4.jpg"),
				f1:require("@/assets/step/f4.jpg")

				},
				{
				g1:require("@/assets/step/g5.jpg"),
				r1:require("@/assets/step/r5.jpg")
				},
			]
			}
		},
		computed: {},
		watch: {
			'current'(n,o) {
				console.error('step-----------------',n,o)
			}
		},
		methods: {
			change(i){
				// this.$emit('update:current',i)
				// document.documentElement.scrollTop = 0;
			}
		},
		created() {},
		mounted() {
			this.current = 0
			console.error(this.current)
			
		}
	}
</script>

<style lang="scss" scoped>
@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape){

.setp_img {
	width: 11.875rem
}
}



.setp_img {
	width: 11.875rem
}
.line {
	margin: 1.1625rem auto;
	height: 2.525rem;
	border-left: .125rem solid #e9e9e9;
	width: .125rem
}
.arr_list:nth-child(5) .line{
	// margin-top: 6rem;
	display: none
}

	.ant-steps-item {
		margin-top: 0.625rem;
		height: 5.625rem;
	}
	.ant-steps-item:last-child {
	/deep/	.ant-steps-icon {
		font-size: 1.75rem!important;
		// margin-top: -0.3125rem

		}
	}

	
</style>
<style lang="scss" >
			.stepBox .ant-steps-item-title{
			font-size:1.375rem!important;
			font-weight:600;
			letter-spacing: 0.125rem;
			line-height:2rem;
			color: #909090 ;
			
		}
		.stepBox .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title{
						color: #909090;
						font-weight: 600!important;
		}
		.stepBox .ant-steps-item-process > .ant-steps-item-content > .ant-steps-item-title{
					color: $primary-color;
						font-weight: 600!important;
					
				}	
		.stepBox .ant-steps-item-finish .ant-steps-item-icon{
			border: 0.0625rem solid #CCCCCC;
			background-color: #CCCCCC;
						font-weight: 600!important;

		}
		.stepBox .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon{
			color: #fff;
						font-weight: 600!important;

		}
		.stepBox .ant-steps-item-tail:after{
			background-color: #E9E9E9;
		}
		.stepBox .ant-steps-item-finish > .ant-steps-item-tail:after{
			background-color: #E9E9E9;
		}
		.stepBox .ant-steps-vertical.ant-steps-small .ant-steps-item-tail {
			height: 2.5rem;
			top: 2.8125rem;
			border: 0.0625rem solid #e9e9e9;
			left: 5rem !important
		}
</style>

