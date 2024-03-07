<template>
  <q-dialog flat  v-model="showDialog" :position="position" full-height seamless >
    <q-card style="min-width: 700px">
      <q-btn flat dense color="black" class="q-mt-lg q-ml-lg" v-close-popup>
        <q-icon
          class="q-mr-sm"
          name="fas fa-chevron-left"
          style="font-size: 0.8rem;"
        />
        继续选择
      </q-btn>
      <q-card
        flat
        class="col q-pa-sm  q-px-mdfull-height text-left  no-shadow  "
      >
        <q-card-section>
          <div class="text-subtitle2 text-grey-8 text-uppercase">
            <div class="q-px-sm q-pb-md">
              新的订货单
            </div>
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="q-separator q-separator q-separator--horizontal"
            />
          </div>

          <q-list class="full-width" style="min-height: 140px;">
            <q-item
              class="row no-wrap q-px-sm full-width justify-between items-center"
                  v-for="material in materialList" :key="material.id"
            >
              <q-item-section top avatar class="">
                <img
                  class=""
                  :src="material.scalepicPath?$global.getImgUrl(material.scalepicPath):'/data/bigAlbum.gif'"
                  style="width: 50px; height: 10%;"
                />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-weight-bold">{{material.name}}</span>
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label caption lines="1">
                  <span class="text-grey-8">{{material.materialspec}}</span>
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  <!-- <div style="font-size: 1.1em; font-weight: 600;">
                    51/吨
                  </div> -->
                </q-item-label>
                <q-item-label caption>
                  <q-input
                    standout="bg-teal text-white"
                    style="max-width: 80px;text-align: center;"
                    v-model="material.materialNum"
                    dense
                    type="number"
                    :min="0"
                    @blur="checkNum(material)"
                  />
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  <div style="font-size: 1.1em; font-weight: 600;">
                    吨
                  </div>
                </q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="text-red-3"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="handleDelete(material)"
                  />
                </div>
              </q-item-section>
            </q-item>

          </q-list>
        </q-card-section>
        <q-card-section class="column q-pa-none q-ma-sm">
          <div class="flex justify-between align-center full-width">
            <span class="text-subtitle2 text-grey-7 q-ml-md">Total: </span
            >
            <span class="flex"
              ><span class="q-mr-sm text-subtitle2 text-bold">{{totalNum}}吨</span></span
            >
          </div>
          <div class="flex justify-end">
            <q-btn
              class="q-my-lg"
              label="生成订货单"
              style="background-color: rgb(136, 58, 43); color: white;width: 200px;"
              @click="handleOk"
            >
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="primary" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
import deepClone from '@/utils/CloneUtils'
import { addOrderSale } from '@/api/api'
export default {
  name: 'OrderingModal',
  data () {
    return {
      title: '操作',
      position: 'left',
      loading: false,
      disableSubmit: false,
      showDialog: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      materialList: [],
      panel: 'mails',
      check1: true
    }
  },
  watch: {
    getMaterialList (n, o) {
      console.log('getMaterialList', n)
      this.materialList = deepClone(n)
    }
  },
  computed: {
    totalNum () {
      let total = 0
      for (const item of this.materialList) {
        total = total + parseFloat(item.materialNum)
      }
      return total.toFixed(4)
    },
    getMaterialList () {
      return this.$store.getters.getMaterial
    }
  },
  methods: {
    show () {
      console.log('购物车：', this.$store.getters.getMaterial)
      this.materialList = deepClone(this.$store.getters.getMaterial)

      if (this.showDialog) {
        this.showDialog = false
      } else {
        this.showDialog = true
      }
    },

    handleOk () {
      // var customerInfo = this.$q.localStorage.getItem('customer_Info')
      // console.log('customerInfo', customerInfo)
      console.log('materialList', this.materialList)
      var orderSaleBList = []
      var materialClassCode = ''
      for (const item of this.materialList) {
        materialClassCode = item.material_class_code
        const orderSaleB = {}
        orderSaleB.materialId = item.id
        orderSaleB.materialCode = item.code
        orderSaleB.materialClassId = item.classId
        // orderSaleB.materialClassCode = item.id
        orderSaleB.num = item.materialNum
        orderSaleBList.push(orderSaleB)
      }
      var OrderSale = {
        // customerId: customerInfo.id,
        // customerCode: customerInfo.code,
        // customerName: customerInfo.name,
        materialClassCode: materialClassCode,
        orderSaleBList: orderSaleBList
      }
      console.log('OrderSale', OrderSale)
      // var OrderSale = {
      //   customerId: '',
      //   customerCode: '',
      //   customerName: '',
      //   materialClassCode: '',
      //   orderSaleBList: [{
      //     materialId: '',
      //     materialCode: '',
      //     materialClassId: '',
      //     materialClassCode: '',
      //     num: ''

      //   }]
      // }
      this.createOrdering(OrderSale)
    },
    handleDelete (material) {
      this.$message.confirm('是否确认移除:' + material.name).onOk(() => {
        this.$store.commit('SET_MESSAGE_MINUS', material)
        // this.materialList = deepClone(this.$store.getters.getMaterial)
        this.$message.success('移除成功')
      })
    },
    createOrdering (OrderSale) {
      addOrderSale(OrderSale).then(res => {
        if (res.code === 200) {
          this.$message.success('订货单生成成功')
          this.$store.commit('SET_MESSAGE_CLEAR')
          this.showDialog = false
        }
      })
    },
    checkNum (material) {
      console.log('数量检查', material)
      if (material.materialNum <= 0) {
        material.materialNum = 1
        this.$message.warning('数量必须大于0')
      } else {
        this.$store.commit('UPDATE_MATERIAL', material)
      }
    }

  }
}
</script>
