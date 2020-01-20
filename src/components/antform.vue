<template>
	<div class="form">
		<div v-if="!benefi" class="form_info">
			<antformItem :key="key" v-for="(item,key) in premData" @change="change" @select="select" :item="item" :line="line" :vocationInfo="vocationInfo" :index="index" @checkSum="checkSum" @checkIdcard="checkIdcard" @checkAddress="checkAddress" @changeSame="changeSame" :testFree="testFree" @updateErrorAddress="updateErrorAddress"></antformItem>
		</div>
		<div v-else class="form_info">
			<antformItem @change="change" @select="select" @checkAddress="checkAddress" :item="premData.relationToInsured" :line="line" :vocationInfo="vocationInfo" :index="index" @changeSame="changeSame" :testFree="testFree" @updateErrorAddress="updateErrorAddress">
			</antformItem>
		</div>
	</div>
</template>

<script>
import antformItem from './antformItem.vue'  
export default {
	name: 'antform',
	components: {
		antformItem,
	},
	props: {
		premData: {
			type: Object,
			required: true
		},
		line: {
			type: String
		},
		vocationInfo: {
			type: [Object, String],
			required: false
		},
		index: {
			type: Number,
			required: false
		},
		benefi: {
			type: Boolean,
			required: false,
			default: false
		},
		testFree: {
			type: Boolean,
			required: false,
			default: false
		},

	},
	data() {
		return {
		}
	},
	computed: {},
	watch: {},
	methods: {
		change(val) {
			// console.log('change____',val)
			this.$emit('change', val)
		},
		checkSum() {
			this.$emit('checkSum')
		},
		checkIdcard() {
			this.$emit('checkIdcard')
		},
		checkAddress() {
			Object.keys(this.premData).forEach(el => {
				if (el == 'address' || el == 'beneficiaryAddress') {
					if (this.premData[el].hasShowError) {
						this.updateErrorAddress(true)
					}
				}
			})
			this.$emit('checkAddress')
		},
		select(val) {
			this.$emit('select', val)
		},
		changeSame(val) {
			this.$emit('changeSame', val)
		},
		updateErrorAddress(val) {
			Object.keys(this.premData).forEach(el => {
				if (el == 'addressText' || el == 'beneficiaryAddressText') {
					this.premData[el].hasShowError = val
				}
			})
		}
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
.form {
  /deep/ .lineitem.ant-form-item {
    margin-top: 1.875rem;
    margin-bottom: 1.875rem;
  }
  .form_info {
    margin-top: 1.85rem;
  }
  /deep/.ant-select {
    width: 40% !important;
  }
}
</style>
