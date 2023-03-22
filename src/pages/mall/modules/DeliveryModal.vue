<template>
  <q-dialog flat full-height v-model="showDialog" transition-show="slide-left">
    <q-card square style="min-width: 1080px">
      <q-card-section class="q-pa-none text-white text-subtitle bg-brown">
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
              申请发货
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
      <q-card-section>
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <div class="flex justify-between align-center items-center">
              <span class="text-subtitle2 text-grey-8">订单货信息</span>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-item class="q-px-none">
              <q-item-section top>
                <q-item-label>
                  订货单编号：
                  <span class="text-bold">
                    {{ orderSale.billNo }}</span
                  ></q-item-label
                >
                <q-item-label>
                  商品大类：
                  <span class="text-bold">
                    {{ orderSale.materialClassId_dictText }}</span
                  ></q-item-label
                >
                <q-item-label>
                  确认人：
                  <span class="text-bold">
                    {{ orderSale.approver }}</span
                  ></q-item-label
                >
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  状态：
                  <span class="text-bold"> {{ orderSale.statusText }}</span>
                  <span
                    class="cursor-pointer q-ml-md q-mt-xs text-body2 text-weight-bold text-negative"
                    >{{
                      orderSale.adjustFlag === "Y" ? "[订单调整中]" : ""
                    }}</span
                  >
                </q-item-label>
                <q-item-label>
                  创建时间：
                  <span class="text-bold">
                    {{ orderSale.createTime }}</span
                  ></q-item-label
                >
                <q-item-label>
                  审批数量：
                  <span class="text-bold">
                    {{ orderSale.totalPassNum }}</span
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
              <span class="q-mb-xs text-subtitle2 text-grey-8">订货单商品</span>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list
              class="scroll"
              style="height: calc(100vh - 460px);min-height: 140px;"
            >
              <q-item
                class="row no-wrap q-px-sm full-width justify-between items-center"
                v-for="material in orderSale.orderSaleBList"
                :key="material.id"
              >
                <q-item-section avatar top>
                  <img
                    class=""
                    :src="
                      material.scalepicPath
                        ? $global.getImgUrl(material.scalepicPath)
                        : '/data/bigAlbum.gif'
                    "
                    style="width: 50px; height: 10%;"
                  />
                </q-item-section>

                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">
                    <span class="text-weight-bold">{{ material.name }}</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label caption>
                    {{ material.materialspec }}
                  </q-item-label>
                </q-item-section>
                <q-item-section v-show="material.price">
                  <q-item-label caption>
                    <div
                      class="text-orange"
                      style="font-size: 1.1em; font-weight: 600;"
                    >
                      单价：{{ material.price }}
                    </div>
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label>
                    <span>审核数量：</span>
                    <span class="text-grey-8"> {{ material.passNum }}</span>
                  </q-item-label>
                  <q-item-label class="q-mt-xs text-body2  text-deep-orange">
                    <span class="cursor-pointer">已申请数量：</span>
                    <span> {{ material.deliveryNum }}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label lines="1">
                    <span class="text-body2 text-teal"> 申请数量：</span>
                  </q-item-label>
                </q-item-section>
                <q-item-section top side>
                  <q-item-label lines="1">
                    <q-input
                      class="gt-xs"
                      standout="bg-teal text-white"
                      style="max-width: 80px;text-align: center;"
                      v-model="material.num"
                      dense
                      type="number"
                      @blur="checkNum(material)"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-actions class="q-pa-md bg-grey-2">
        <q-btn
          class="full-width q-py-xs"
          style=""
          label="提交发货申请"
          color="green-7"
          @click="submitDelivery"
        />
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
import { getMaterDetail, addDelivery } from '@/api/api'
import deepClone from '@/utils/CloneUtils'
export default {
  name: 'DeliveryModal',
  data () {
    return {
      showDialog: false,
      loading: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        width: '5px',
        opacity: 0.55
      },
      orderSale: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    show (orderSale) {
      console.log('发货单申请', orderSale)
      this.orderSale = deepClone(orderSale)
      this.showDialog = true
      this.loading = true

      this.setOrderSaleBList(this.orderSale)
    },
    hide () {
      this.showDialog = false
    },
    setOrderSaleBList (orderSale) {
      orderSale.orderSaleBList.map(item => {
        getMaterDetail(item.materialId).then(res => {
          item.name = res.data.name
          item.num = parseFloat(item.passNum) - parseFloat(item.deliveryNum)
          item.materialspec = res.data.materialspec
          item.scalepicPath = res.data.scalepicPath
        })
        return item
      })

      setTimeout(() => {
        this.loading = false
      }, 500)
      console.log('orderSaleBList', orderSale.orderSaleBList)
    },
    checkNum (material) {
      console.log('数量检查', material)
      if (material.num < 0) {
        material.num = 1
        this.$message.warning('申请数量必须大于0')
      }
      if (material.num > material.passNum) {
        material.num = material.passNum
        this.$message.warning('申请数量不能大于审核数量')
      }
    },
    submitDelivery () {
      console.log('提交申请', this.orderSale)
      var orderDeliveryBList = []
      for (const item of this.orderSale.orderSaleBList) {
        if (item.num > 0) {
          const OrderDeliveryB = {}
          OrderDeliveryB.materialId = item.materialId
          OrderDeliveryB.materialCode = item.materialCode
          OrderDeliveryB.materialClassId = item.materialClassId
          // orderSaleB.materialClassCode = item.id
          OrderDeliveryB.num = item.num
          OrderDeliveryB.saleId = this.orderSale.id
          OrderDeliveryB.saleBid = item.id
          orderDeliveryBList.push(OrderDeliveryB)
        }
      }
      var OrderDelivery = {
        customerId: this.orderSale.customerId,
        customerCode: this.orderSale.customerCode,
        customerName: this.orderSale.customerName,
        materialClassId: this.orderSale.materialClassId,
        materialClassCode: this.orderSale.materialClassCode,
        approver: this.orderSale.approver,
        approverCode: this.orderSale.approverCode,
        deptId: this.orderSale.deptId,
        saleorgId: this.orderSale.saleorgId,
        saleorgCode: this.orderSale.saleorgCode,
        saleId: this.orderSale.id,
        saleNo: this.orderSale.billNo,
        orderDeliveryBList: orderDeliveryBList
      }

      console.log('OrderDelivery', OrderDelivery)
      if (orderDeliveryBList.length > 0) {
        this.createDelivery(OrderDelivery)
      } else {
        this.$message.warning('可申请数量为0')
      }
    },
    createDelivery (OrderDelivery) {
      this.$q
        .dialog({
          title: '提示',
          message: '确认发货申请单,发货单提交后不可修改！',
          cancel: true,
          ok: '确认申请'
        })
        .onOk(() => {
          addDelivery(OrderDelivery).then(res => {
            if (res.code === 200) {
              this.$message.success('申请发货成功')
              this.$emit('ok', this.orderSale)
            }
          })
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    }
  }
}
</script>
