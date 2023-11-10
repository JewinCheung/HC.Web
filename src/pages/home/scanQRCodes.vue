<template>
  <div class="main-content">
    <div
      class="flex flex-center text-center"
      style="padding-left: 18%; padding-right: 18%; background-color: #b5d8cf"
    >
      <h3 style="line-height: 3.125rem">扫描二维码,获取预约单信息<br /></h3>
    </div>
    <div>
      <div class="row justify-center text-center" style="height: 300px;margin-top: 100px;">
        <div class="col-12">
          <q-img
            :src="this.$PUBLIC_PATH + 'data/code.png'"
            style="height: 320px; max-width: 320px"
          />
        </div>
        <div class="col-12"  style="margin-top: -3000px;max-width: 450px">
          <q-input filled v-model="newValue"  dense ref="codeInfo" autofocus @blur="inpBlur" @keydown.enter.native="nextFocus()" />
        </div>
      </div>
    </div>
       <TmsAppointmentModules ref="TmsAppointmentModules" @clearCode="clearCode()"></TmsAppointmentModules>
  </div>
</template>

<script>
import TmsAppointmentModules from './modules/TmsAppointmentModules'
export default {
  name: 'scanQRCodes',
  components: { TmsAppointmentModules },
  data () {
    return {
      newValue: '',
      text2: ''
    }
  },
  watch: {
    // newValue () {
    //   this.$message.success('扫码成功：' + this.newValue)
    // }
  },
  methods: {
    inpBlur () {
      this.$refs.codeInfo.focus()
    },
    nextFocus () {
      // this.$message.success('扫码成功')
      this.$refs.TmsAppointmentModules.show(this.newValue)
    },
    clearCode () {
      this.newValue = ''
    }

  }
}
</script>
