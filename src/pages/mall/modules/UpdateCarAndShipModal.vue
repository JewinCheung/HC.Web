<template>
  <q-dialog v-model="showDialog" flat>
    <q-card style="width: 500px; max-width: 500px; overflow: auto">
      <q-card-section
        class="q-pa-none text-bold bg-teal-5"
        style="color: white"
      >
        <div class="flex justify-between flex-center">
          <div class="q-py-md q-pl-md col">
            <span style="font-size: 16px; font-weight: bold"> {{title}}车船档案 </span>
          </div>
          <q-btn color="white" round flat icon="fa fa-times" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="full-width" ref="myForm">
          <div class="column q-pa-md q-gutter-sm">
            <q-input
              outlined
              clearable
              standout="bg-teal text-white"
              style="margin-bottom: 20px"
              v-model="orderCarAndShipInfo.carNumber"
              label="车船号"
            />
            <q-input
              outlined
              clearable
                      style="margin-bottom: 20px"
              standout="bg-teal text-white"
              v-model="orderCarAndShipInfo.driverName"
              label="司机姓名"
            />
            <q-input
              outlined
              clearable
              standout="bg-teal text-white"
              v-model="orderCarAndShipInfo.phone"
              :rules="[$inputRules.phoneTest]"
              label="电话"
            />
            <q-input
              outlined
              clearable
              standout="bg-teal text-white"
              v-model="orderCarAndShipInfo.cardId"
              :rules="[$inputRules.hcodeTest]"
              label="身份证"
            />
            <q-input
            outlined
              clearable
                      style="margin-bottom: 20px"
              standout="bg-teal text-white"
              v-model="orderCarAndShipInfo.tonnage"
              label="吨位"
            />
            <q-input
            outlined
              clearable
                      style="margin-bottom: 20px"
              standout="bg-teal text-white"
              v-model="orderCarAndShipInfo.loads"
              label="荷载"
            />
          </div>
        </q-form>
        <q-separator />
      </q-card-section>
      <q-card-actions class="q-pr-lg" style="height: 52px">
       <!-- <q-btn label="关闭" color="white" text-color="black" v-close-popup /> -->
        <q-space />
        <q-btn
          label="提交"
          color="teal-5"
          @click="handleOk"
          :loading="loading"
        />
      </q-card-actions>
      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="primary" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
import { addOrderCarAndShipInfo, putOrderCarAndShipInfo } from '@/api/api'
export default {
  name: 'UpdatePwdModal',
  data () {
    return {
      title: '操作',
      loading: false,
      showDialog: false,
      orderCarAndShipInfo: {
        carNumber: '',
        driverName: '',
        loads: '',
        tonnage: '',
        phone: '',
        cardId: '',
        transportType: ''
      }
    }
  },

  computed: {
    computedStyle () {
      let height = 'auto'
      // if (this.$q.fullscreen.isActive) {
      //   height = '87vh'
      // }
      let sub = '- 60px ' // 头部高度
      sub += '- 36px ' // 表单上下空隙高度
      sub += '- 52px ' // 底部按钮

      height = 'calc(100vh ' + sub + ')'
      return 'height:' + height + ';'
    }
  },
  methods: {

    add () {
      this.edit({})
    },
    edit (record) {
      this.showDialog = true
      this.orderCarAndShipInfo = Object.assign({}, record)
    },
    handleOk () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.submit()
        }
      })
    },
    submit () {
      this.loading = true
      let obj
      if (!this.orderCarAndShipInfo.id) {
        var customerInfo = this.$q.localStorage.getItem('customer_Info')
        this.orderCarAndShipInfo.customerId = customerInfo.id
        obj = addOrderCarAndShipInfo(this.orderCarAndShipInfo)
      } else {
        obj = putOrderCarAndShipInfo(this.orderCarAndShipInfo)
      }
      obj
        .then(res => {
          if (res.code === 200) {
            this.$message.success(this.title + '成功！')
            this.showDialog = false
            this.$emit('ok')
          } else {
            this.$message.warning(res.msg)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss"></style>
