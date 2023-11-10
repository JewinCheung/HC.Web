<template>
  <q-dialog
    flat
    full-height
    v-model="showDialog"
    transition-show="slide-left"
    @hide="clearCode()"
  >
    <q-card square style="min-width: 1200px">
      <q-card-section
        class="q-pa-none text-white text-subtitle"
        style="background: rgb(21,113,62)"
      >
        <div class="flex justify-between flex-center">
          <q-btn
            size="10px"
            color="white"
            round
            flat
            icon="fa fa-chevron-left"
            class="q-my-auto q-ma-sm"
            v-close-popup
          />
          <div class="q-py-md q-pl-md col">
            <div>
              预约单
            </div>
          </div>
          <q-btn
            class="q-my-auto q-ma-sm"
            size="10px"
            color="white"
            round
            flat
            icon="fa fa-times"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="scroll"
        style="height: calc(100vh - 185px);min-height: 140px;"
      >
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <div class="flex justify-between align-center items-center">
              <span class="text-subtitle2 text-grey-8">预约单信息</span>
              <q-btn round flat icon="refresh" @click="refresh" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-item class="q-px-none">
              <q-item-section top>
                <q-item-label>
                  预约单号：
                  <span class="text-bold">
                    {{ TmsAppointment.billno }}</span
                  ></q-item-label
                >
                <q-item-label>
                  运输方式：
                  <span class="text-bold">
                    {{ TmsAppointment.shipType }}</span
                  ></q-item-label
                >
                <q-item-label>
                  准许入厂：
                  <span class="text-bold">
                    {{
                      TmsAppointment.inFactoryFlag === "Y" ? "是" : "否"
                    }}</span
                  ></q-item-label
                >
                <q-item-label>
                  车船号：
                  <span class="text-bold">
                    {{ TmsAppointment.carNumber }}</span
                  ></q-item-label
                >
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  厂区：
                  <span class="text-bold">
                    {{ TmsAppointment.factoryName }}</span
                  >
                </q-item-label>
                <q-item-label>
                  预约日期：
                  <span class="text-bold">
                    {{ TmsAppointment.apptDate }}</span
                  ></q-item-label
                >
                <q-item-label>
                  占用停车场：
                  <span class="text-bold">
                    {{ TmsAppointment.needParkade === "Y" ? "是" : "否" }}</span
                  ></q-item-label
                >
                <q-item-label>
                  司机：
                  <span class="text-bold">
                    {{ TmsAppointment.driver }}</span
                  ></q-item-label
                >
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  装卸区：
                  <span class="text-bold">
                    {{ TmsAppointment.loadPlaceName }}</span
                  >
                </q-item-label>
                <q-item-label>
                  预约时段：
                  <span class="text-bold">
                    {{ TmsAppointment.time }}</span
                  ></q-item-label
                >
                <q-item-label>
                  申请入厂时间：
                  <span class="text-bold">
                    {{ TmsAppointment.applyTime }}</span
                  ></q-item-label
                >
                <q-item-label>
                  联系方式：
                  <span class="text-bold">
                    {{ TmsAppointment.driverPhone }}</span
                  ></q-item-label
                >
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  装卸位：
                  <span class="text-bold">
                    {{ TmsAppointment.platformName }}</span
                  >
                </q-item-label>
                <q-item-label>
                  特殊入厂：
                  <span class="text-bold">
                    {{
                      TmsAppointment.specialInFlag === "Y" ? "是" : "否"
                    }}</span
                  ></q-item-label
                >
                <q-item-label>
                  状态：
                  <span class="text-bold">
                    {{ SetData(TmsAppointment.status) }}</span
                  ></q-item-label
                >
                <q-item-label>
                  备注：
                  <span class="text-bold">
                    {{ TmsAppointment.remark }}</span
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-section class="q-py-none">
            <div
              class="flex justify-between align-center items-center"
              style=""
            >
              <span class="q-mb-xs text-subtitle2 text-grey-8">货物信息</span>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list
              class="scroll"
              style="height: calc(100vh - 485px);min-height: 140px;"
            >
              <q-item
                class="row no-wrap q-px-sm full-width justify-between items-center"
                v-for="tms in TmsAppointment.appointmentBList"
                :key="tms.id"
              >
                <!-- <q-item-section avatar top>
                  <img
                    class=""
                    :src="
                      material.scalepicPath
                        ? $global.getImgUrl(material.scalepicPath)
                        : '/data/bigAlbum.gif'
                    "
                    style="width: 50px; height: 10%;"
                  />
                </q-item-section> -->

                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">
                    <span class="text-weight-bold">
                      货物单号：{{ tms.goodsBillno }}</span
                    >
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label caption>
                    货物单类型：{{
                      tms.goodsBilltype === "01" ? "发货单" : "到货单"
                    }}
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label>
                    <span>客户名称：</span>
                    <span> {{ tms.customerName }}</span>
                  </q-item-label>
                  <q-item-label>
                    <span>供应商名称：</span>
                    <span> {{ tms.customerName }}</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label>
                    <span>数量：</span>
                    <span class="text-grey-8"> {{ tms.num }}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label>
                    <span> 备注： {{ tms.remark }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-actions class="row justify-around q-pa-md bg-grey-2">
        <q-btn class="col-5" label="入厂" color="green-7" />
        <q-btn class="col-5" label="出厂" color="teal-5" />

        <!-- <q-btn
          class="full-width q-py-xs"
          style=""
          label="提交发货申请"
          color="green-7"
          @click="submitDelivery"
        /> -->
      </q-card-actions>
      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="teal" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
import { getInfoByQRCode } from '@/api/login'
// import deepClone from '@/utils/CloneUtils'
export default {
  name: 'TmsAppointmentModules',
  data () {
    return {
      showDialog: false,
      showDelivery: false,
      loading: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        width: '5px',
        opacity: 0.55
      },
      TmsAppointment: {},
      code: ''
    }
  },
  watch: {},
  computed: {},
  mounted () {},
  methods: {
    show (code) {
      this.showDialog = true
      this.loading = true
      this.code = code
      console.log(code)
      this.getInfo(code)
    },
    hide () {
      this.showDialog = false
      this.code = ''
    },
    clearCode () {
      this.$emit('clearCode')
    },
    getInfo (code) {
      this.loading = true
      var params = { QRCode: code }
      getInfoByQRCode(params)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.TmsAppointment = res.data
          } else {
            this.$message.warning('二维码错误，请重新扫描')
            this.showDialog = false
            this.code = ''
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    SetData (status) {
      switch (status) {
        case '1':
        case '2':
        case '11':
        case '12':
          return '运输中'

        case '3':
        case '4':
        case '5':
          return '排队中'

        case '6':
          return '作业中'

        case '7':
        case '8':
          return '作业完成'
      }
    },
    refresh () {
      this.getInfo(this.code)
    }
    // needParkadeName (TmsAppointment) {
    //   if (this.form && this.form.needParkade === 'Y') {
    //     return '是'
    //   }
    //   return '否'
    // }
  }
}
</script>
