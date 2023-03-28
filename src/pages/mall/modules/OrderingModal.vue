<template>
  <q-dialog flat full-height v-model="showDialog">
    <q-card style="min-width: 1080px">
      <q-btn flat dense color="black" class="q-mt-lg q-ml-lg" v-close-popup>
        <q-icon
          class="q-mr-sm"
          name="fas fa-chevron-left"
          style="font-size: 0.8rem;"
        />
        返回商品
      </q-btn>
      <q-card flat class="col q-pa-sm  q-px-md  text-left  no-shadow  ">
        <q-card-section>
          <div class="text-subtitle2 text-grey-8">
            <div class="text-weight-bolder q-px-sm q-pb-md">
              订单货列表
            </div>
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="q-separator q-separator q-separator--horizontal"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <q-card flat class="col q-pa-sm  q-px-md full-height text-left">
            <q-card-section>
              <q-toolbar>
                <q-space />
                <q-input
                  outlined
                  dense
                  color="teal"
                  class="full-width"
                  bg-color="white"
                  placeholder="搜索"
                  v-model="keyWord"
                  @input="setkeyWord"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-space />
                <q-btn round flat icon="refresh" @click="refresh" />
              </q-toolbar>
              <q-separator spaced />

              <q-list
                ref="scrollTargetRef"
                class="scroll"
                style="max-height: calc(100vh - 375px)"
              >
                <q-infinite-scroll
                  ref="scrollTarget"
                  @load="onLoad"
                  :offset="250"
                  :scroll-target="$refs.scrollTargetRef"
                >
                  <div
                    class="row justify-center q-mt-sm q-mb-md"
                    v-show="IsNull"
                  >
                    <span class="q-pa-lg">
                      暂无订货单！
                    </span>
                  </div>
                  <div v-for="orde in saleOrdeing" :key="orde.id">
                    <q-item
                      clickable
                      v-ripple
                      class="q-px-sm full-width justify-between items-center"
                      @click="addMaterial(orde)"
                    >
                      <q-item-section side class="col-5  q-mt-sm">
                        <q-item-label lines="1">
                          <span class="text-weight-bold text-weight-medium"
                            >订货单编号：{{ orde.billNo }}</span
                          >
                        </q-item-label>
                        <q-item-label caption lines="1">
                          <span
                            class="cursor-pointerq-mt-xs text-body2 text-weight-bold text-negative"
                            >{{
                              orde.adjustFlag === "Y" ? "[订单调整中]" : ""
                            }}</span
                          >
                        </q-item-label>
                        <q-item-label caption>
                          {{ orde.createTime }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="q-mt-xs text-body2">
                          <span class="cursor-pointer">
                            {{ orde.materialClassId_dictText }}</span
                          >
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>
                          <div style="font-size: 1.1em; font-weight: 600;">
                            总计： {{ orde.totalNum }}
                          </div>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side class="q-mx-md">
                        <q-btn dense class="bg-teal text-white" >
                          <q-icon left name="reply_all" class="rotate-180" />
                          <div class="q-mx-sm">加入</div>
                        </q-btn>
                      </q-item-section>
                      <!-- <q-item-section side class="q-mx-sm">
                      <q-btn
                        disable
                        label="申请发货"
                        style="background-color: rgb(136, 58, 43); color: white;width: 120px;"
                        v-on:click.stop="test"
                      >
                      </q-btn>
                    </q-item-section> -->
                    </q-item>

                    <q-separator spaced />
                  </div>
                  <template v-slot:loading>
                    <div class="text-center q-my-md">
                      <q-spinner-dots color="teal" size="40px" />
                    </div>
                  </template>
                </q-infinite-scroll>
              </q-list>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </q-card>
  </q-dialog>
</template>
<script>
const statusMap = {
  0: {
    status: 'warning',
    text: '保存'
  },
  2: {
    status: 'teal-8',
    text: '确认中'
  },
  1: {
    status: 'teal',
    text: '已提交'
  },
  4: {
    status: 'light-green',
    text: '部分通过'
  },
  5: {
    status: 'green',
    text: '通过'
  },
  6: {
    status: 'red',
    text: '不通过'
  }
}
import { getOrderSaleList, putOrderSale, getOrderSaleInfo } from '@/api/api'
export default {
  name: 'OrderingModal',
  data () {
    return {
      showDialog: false,
      IsNull: true,
      saleOrdeing: [],
      queryParam: { status: '0', keyWord: '' },
      isSearch: false,
      keyWord: '',
      total: 0,
      material: {},
      orderSale: {}
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  watch: {
    isSearch (n, o) {
      if (n) {
        console.log('进行检索', this.isSearch)
        this.refresh()
      }
    }
  },
  computed: {},
  methods: {
    Ordering (material) {
      console.log('Add-Material', material)
      this.material = material
      this.showDialog = true
      this.saleOrdeing = []
      this.scrollTarget = this.$refs.scrollTargetRef
    },
    hide () {
      this.showDialog = false
    },
    setkeyWord (value) {
      this.isSearch = false
      this.queryParam.keyWord = value
      setTimeout(() => {
        this.isSearch = true
      }, 1500)
    },
    refresh () {
      this.saleOrdeing = []
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
    },
    onLoad (index, done) {
      console.log(index)
      this.loadData(index, done)
      //   if (this.saleOrdeing.length < 50) {
      //     setTimeout(() => {
      //       console.log(this.saleOrdeing)
      //       this.saleOrdeing.push(...this.saleOrdeing_add)
      //       done()
      //     }, 1000)
      //   } else {
      //     done()
      //   }
    },
    loadData (index, done) {
      getOrderSaleList(this.getQueryParams(index)).then(res => {
        this.IsNull = false
        // this.MaterialClass = res.data
        console.log(res.rows)
        var rows = res.rows.length
        this.total = res.total

        if (rows > 0) {
          setTimeout(() => {
            this.saleOrdeing.push(...res.rows)
            console.log('saleOrdeing', this.saleOrdeing)
            done()
          }, 500)
        } else {
          setTimeout(() => {
            if (this.total === 0) {
              this.IsNull = true
            }
            this.$refs.scrollTarget.stop()
          }, 500)
        }
      })
    },
    getQueryParams (index) {
      var param = Object.assign({}, this.queryParam)
      // var customerInfo = this.$q.localStorage.getItem('customer_Info')
      // param.customerId = customerInfo.id
      param.pageNum = index
      param.pageSize = 20
      param.releaseFlag = 'Y'
      param.column = 'createTime'
      param.order = 'DESC'
      return param
    },
    addMaterial (saleOrdeing) {
      console.log('saleOrdeing', saleOrdeing)
      this.getOrderSaleInfo(saleOrdeing)
    },
    getOrderSaleInfo (order) {
      getOrderSaleInfo(order.id).then(res => {
        this.orderSale = res.data
        console.log('OrderSaleInfo', this.orderSale)
        this.handleOk(this.orderSale)
      })
    },

    handleOk () {
      const orderSaleB = {}
      orderSaleB.materialId = this.material.id
      orderSaleB.materialCode = this.material.code
      orderSaleB.materialClassId = this.material.classId
      orderSaleB.num = this.material.materialNum
      this.orderSale.orderSaleBList.push(orderSaleB)

      console.log('addOrderSale', this.orderSale)
      this.$q
        .dialog({
          title: '商品：' + this.material.name,
          message: '加入订货单：' + this.orderSale.billNo,
          cancel: true,
          ok: '加入'
        })
        .onOk(() => {
          this.saveSaleOrder()
        })
    },
    saveSaleOrder () {
      putOrderSale(this.orderSale).then(res => {
        if (res.code === 200) {
          this.$message.success('商品添加成功')
          this.$emit('ok')
        }
      })
    }
  }
}
</script>
