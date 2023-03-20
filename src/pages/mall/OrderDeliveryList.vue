<template>
  <div class="main-content">
    <div class="q-py-md fit flex flex-center">
      <div class="fit q-pa-md well">
        <div class=" text-h5 text-bold text-uppercase">
          <span class="q-pl-md column">发货申请列表</span>
          <q-btn
            flat
            dense
            rounded
            color="black"
            class="q-mt-sm q-ml-md"
            to="/commodity"
          >
            <q-icon
              class="q-mr-sm"
              name="fas fa-chevron-left"
              style="font-size: 0.8rem;"
            />
            返回商城
          </q-btn>
        </div>
        <div class="row q-mx-auto justify-center">
          <div class="col-xs-12 q-pa-sm text-center" :class="orderTab">
            <q-card
              flat
              class="col q-pa-sm  q-px-md full-height text-left cimo-shadow"
            >
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

                  <q-btn round flat icon="more_vert">
                    <q-menu auto-close :offset="[110, 8]">
                      <q-list style="min-width: 150px">
                        <q-item clickable>
                          <q-item-section @click="setStatus('')"
                            >全部</q-item-section
                          >
                        </q-item>
                        <q-item clickable>
                          <q-item-section @click="setStatus(1)">{{
                            1 | statusFilter
                          }}</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section @click="setStatus(5)">{{
                            5 | statusFilter
                          }}</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section @click="setStatus(6)">{{
                            6 | statusFilter
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                  <q-btn round flat icon="refresh" @click="refresh" />
                </q-toolbar>
                <q-separator spaced />

                <q-list
                  class="scroll"
                  style="max-height: calc(100vh - 375px);min-height: 550px;"
                >
                  <q-infinite-scroll
                    ref="scrollTarget"
                    @load="onLoad"
                    :offset="250"
                  >
                    <div
                      class="row justify-center q-mt-sm q-mb-md"
                      v-show="IsNull"
                    >
                      <span class="q-pa-lg">
                        暂无发货申请单！
                      </span>
                    </div>
                    <div v-for="(orde, index) in deliveryList" :key="index">
                      <q-item
                        clickable
                        v-ripple
                        class="q-px-sm full-width justify-between items-center"
                        @click="getDeliveryInfo(orde)"
                      >
                        <q-item-section side class="col-5  q-mt-sm">
                          <q-item-label lines="1">
                            <span class="text-weight-bold text-weight-medium"
                              >发货申请单编号：{{ orde.billNo }}</span
                            >
                          </q-item-label>
                           <q-item-label lines="1">
                            <span class="text-weight-medium"
                              >订货单编号：{{ orde.saleNo }}</span
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
                            <div
                              style="font-size: 1.1em; font-weight: 600;"
                              class="text-teal"
                            >
                              申请数量： {{ orde.totalNum }}
                            </div>
                          </q-item-label>
                        </q-item-section>
                        <q-item-section side class="col-2">
                          <q-chip
                            class="text-weight-bolder text-center text-white"
                            :color="orde.status | statusTypeFilter"
                            >{{ orde.status | statusFilter }}</q-chip
                          >
                        </q-item-section>
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
          </div>
          <div class="col-xs-12 col-md-7 q-pa-sm" v-show="detailShow">
            <q-card flat class="q-pa-sm cimo-shadow">
              <q-card-section>
                <div
                  class="flex justify-between align-center items-center"
                  style=""
                >
                  <span class="q-mb-xs text-subtitle2 text-grey-8"
                    >发货申请单信息</span
                  >

                  <div>
                    <q-btn
                      class="q-ml-sm"
                      flat
                      dense
                      round
                      icon="close"
                      @click="close"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-item class="q-px-none">
                  <q-item-section top>
                    <q-item-label>
                      发货申请单编号：
                      <span class="text-bold">
                        {{ deliveryInfo.billNo }}</span
                      ></q-item-label
                    >
                    <q-item-label>
                      订货单编号：
                      <span class="text-bold">
                        {{ deliveryInfo.saleNo }}</span
                      ></q-item-label
                    >
                    <q-item-label>
                      商品大类：
                      <span class="text-bold">
                        {{ deliveryInfo.materialClassId_dictText }}</span
                      ></q-item-label
                    >
                    <q-item-label>
                      确认人：
                      <span class="text-bold">
                        {{ deliveryInfo.approver }}</span
                      ></q-item-label
                    >
                  </q-item-section>
                  <q-item-section top>
                    <q-item-label>
                      状态：
                      <span class="text-bold">
                        {{ deliveryInfo.statusText }}</span
                      >
                    </q-item-label>
                    <q-item-label>
                      创建时间：
                      <span class="text-bold">
                        {{ deliveryInfo.createTime }}</span
                      ></q-item-label
                    >
                    <q-item-label>
                      确认时间：
                      <span class="text-bold">
                        {{ deliveryInfo.approverTime }}</span
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
                  <span class="q-mb-xs text-subtitle2 text-grey-8"
                    >发货商品信息</span
                  >
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-list
                  class="scroll"
                   style="max-height:calc(100vh - 530px);min-height: 140px;"
                >
                  <q-item
                    class="row no-wrap q-px-sm full-width justify-between items-center"
                    v-for="material in deliveryInfo.orderDeliveryBList"
                    :key="material.id"
                  >
                    <q-item-section top avatar class="">
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
                    <q-item-section top>
                      <q-item-label>
                        <span class="text-weight-bold">{{
                          material.name
                        }}</span>
                      </q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption lines="1">
                        <span class="text-grey-8">{{
                          material.materialspec
                        }}</span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label
                        caption
                        class="q-mt-xs text-body2 text-weight-bold text-teal"
                      >
                        申请数量：{{ material.num }}
                      </q-item-label>
                      <!-- <q-item-label
                        caption
                        class="q-mt-xs text-body2 text-weight-bold text-teal"
                      >
                        调整金额：{{material.adjustMoney}}
                      </q-item-label> -->
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-inner-loading
                :showing="visible"
                color="teal"
                label-style="font-size: 1.1em"
              />
            </q-card>
          </div>
        </div>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
import { getDeliveryList, getDeliveryInfo, getMaterDetail } from '@/api/api'
const statusMap = {
  0: {
    status: 'warning',
    text: '保存'
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

export default {
  name: 'OrderDeliveryList',
  data () {
    return {
      keyWord: '',
      visible: false,
      orderTab: 'col-md-12',
      detailShow: false,
      IsNull: true,
      queryParam: { status: '', keyWord: '' },
      deliveryList: [],
      deliveryInfo: {},
      isSearch: false
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
  mounted () {},
  methods: {
    statusFilter (type) {
      return statusMap[type].text
    },
    close () {
      this.orderTab = 'col-md-12'
      this.detailShow = false
    },
    getDeliveryInfo (order) {
      //   this.$message.warning(id)
      this.orderTab = 'col-md-5'
      this.detailShow = true
      this.visible = true
      getDeliveryInfo(order.id).then(res => {
        this.deliveryInfo = res.data
        this.deliveryInfo.statusText = this.statusFilter(res.data.status)
        this.deliveryInfo.materialClassId_dictText =
          order.materialClassId_dictText

        console.log('deliveryInfo', this.deliveryInfo)
        this.setOrderDeliveryBList(this.deliveryInfo)
      })
    },
    setOrderDeliveryBList (deliveryInfo) {
      deliveryInfo.orderDeliveryBList.map(item => {
        getMaterDetail(item.materialId).then(res => {
          item.name = res.data.name
          item.materialspec = res.data.materialspec
          item.scalepicPath = res.data.scalepicPath
        })
        return item
      })

      setTimeout(() => {
        this.visible = false
      }, 500)
      console.log('orderdeliveryBList', deliveryInfo.orderDeliveryBList)
    },
    setStatus (status) {
      this.queryParam.status = status
      this.refresh()
    },
    setkeyWord (value) {
      this.isSearch = false
      this.queryParam.keyWord = value
      setTimeout(() => {
        this.isSearch = true
      }, 1500)
    },
    refresh () {
      this.deliveryList = []
      this.$refs.scrollTarget.reset()
      this.$refs.scrollTarget.resume()
      this.$refs.scrollTarget.trigger()
    },
    onLoad (index, done) {
      console.log(index)
      this.loadData(index, done)
    },
    loadData (index, done) {
      getDeliveryList(this.getQueryParams(index)).then(res => {
        this.IsNull = false
        // this.MaterialClass = res.data
        console.log(res.rows)
        var rows = res.rows.length
        this.total = res.total

        if (rows > 0) {
          setTimeout(() => {
            this.deliveryList.push(...res.rows)
            console.log('deliveryList', this.deliveryList)
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
      var customerInfo = this.$q.localStorage.getItem('customer_Info')
      param.customerId = customerInfo.id
      param.pageNum = index
      param.pageSize = 20
      param.column = 'createTime'
      param.order = 'DESC'
      return param
    }
  }
}
</script>

<style scoped>
.box-shadow:hover {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
    0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
}
.my-card {
  width: 100%;
  max-width: 300px;
}

.well {
  max-width: 1800px;
  margin: auto;
}

.chip_pending {
  background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}
.chip_completed {
  background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
}
</style>
