<template>
  <div class="main-content">
    <div class="q-py-md fit flex flex-center">
      <div class="fit q-pa-md well">
        <div class=" text-h5 text-bold text-uppercase">
          <span class="q-pl-md column"> 订货单列表</span>
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
                          <q-item-section @click="setStatus(0)">{{
                            0 | statusFilter
                          }}</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section @click="setStatus(1)">{{
                            1 | statusFilter
                          }}</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section @click="setStatus(4)">{{
                            4 | statusFilter
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
                        暂无订货单！
                      </span>
                    </div>
                    <div v-for="orde in saleOrdeing" :key="orde.id">
                      <q-item
                        clickable
                        v-ripple
                        class="q-px-sm full-width justify-between items-center"
                        @click="getOrderSaleInfo(orde)"
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
                        <q-item-section side class="col-2">
                          <q-chip
                            class="text-weight-bolder text-center text-white"
                            :color="orde.status | statusTypeFilter"
                            >{{ orde.status | statusFilter }}</q-chip
                          >
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
          </div>
          <div class="col-xs-12 col-md-7 q-pa-sm" v-show="detailShow">
            <q-card flat class="q-pa-sm cimo-shadow">
              <q-card-section>
                <div
                  class="flex justify-between align-center items-center"
                  style=""
                >
                  <span class="q-mb-xs text-subtitle2 text-grey-8"
                    >订货信息</span
                  >
                  <!-- <q-btn-dropdown color="primary" label="Dropdown Button">
                    <q-list>
                      <q-item clickable v-close-popup @click="onItemClickPass">
                        <q-item-section>
                          <q-item-label>通过</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup @click="onItemClickFail">
                        <q-item-section>
                          <q-item-label>不通过</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown> -->
                  <div>
                    <q-btn
                      flat
                      dense
                      round
                      icon="delete"
                      v-show="orderSale.status === '0'"
                      @click="handleDelete(orderSale)"
                    />
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
                      片区确认：
                      <span class="text-bold">
                        {{ orderSale.leadApprover }}</span
                      ></q-item-label
                    >
                    <q-item-label v-if="orderSale.materialClassCode!=='02'">
                      内勤确认：
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

              <q-card-section class="q-py-none q-mb-sm">
                <div
                  class="flex justify-between align-center items-center"
                  style=""
                >
                  <span class="q-mb-xs text-subtitle2 text-grey-8"
                    >商品信息</span
                  >
                  <div>
                    <q-btn
                      icon="add"
                      color="indigo-6"
                      label="添加商品"
                      v-show="!disable || orderSale.status === '0'"
                      @click="selectMaterial(orderSale)"
                    >
                    </q-btn>
                    <q-btn
                      icon="save"
                      class="q-ml-md"
                      color="teal"
                      label="保存订货单"
                      @click="saveSaleOrder()"
                      v-show="orderSale.status === '0'"
                    >
                    </q-btn>
                    <q-toggle
                      class="q-ml-lg"
                      v-model="fourth"
                      checked-icon="check"
                      color="red"
                      label="调整"
                      unchecked-icon="clear"
                      :disable="disableTZ"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-list
                  class="scroll"
                  style="max-height:calc(100vh - 650px);min-height: 140px;"
                >
                  <q-item
                    class="row no-wrap q-px-sm full-width justify-between items-center"
                    v-for="material in orderSale.orderSaleBList"
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

                    <q-item-section side>
                      <q-item-label caption v-show="!disable && !disableTZ">
                        <div
                          style="font-size: 1.1em; "
                          class="text-deep-orange"
                        >
                          调整前： {{ material.oldnum }}
                        </div>
                      </q-item-label>
                      <q-item-label caption>
                        <q-input
                          standout="bg-teal text-white"
                          style="max-width: 80px;text-align: center;"
                          v-model="material.num"
                          dense
                          type="number"
                          :disable="disable"
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
                    <q-item-section
                      side
                      v-show="
                        orderSale.status === '4' || orderSale.status === '5'
                      "
                    >
                      <q-item-label
                        caption
                        class="q-mt-xs text-body2 text-weight-bold text-teal"
                      >
                        通过数量： {{ material.passNum }}
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
                          :disable="disable"
                          @click="handleMaterialDelete(material)"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section>
                <div class="bg-grey-2 q-pa-md">
                  <div class="col-xs-12 q-pa-sm">
                    <q-btn
                      class="full-width"
                      :label="statusBtnFilter(orderSale.status)"
                      :color="statusBtnTypeFilter(orderSale.status)"
                      @click="submitSaleOrder"
                      v-show="orderSale.status === '0'"
                    />
                    <q-btn
                      class="full-width"
                      :label="statusBtnFilter(orderSale.status)"
                      :color="statusBtnTypeFilter(orderSale.status)"
                      @click="backOrderSale"
                      v-show="!fourth && orderSale.status === '1'"
                    />
                    <q-btn
                      class="full-width"
                      :label="statusBtnFilter(10)"
                      :color="statusBtnTypeFilter(10)"
                      @click="submitOrderSaleAdjust"
                      v-show="fourth"
                    />
                    <q-btn
                      class="full-width"
                      :label="statusBtnFilter(orderSale.status)"
                      :color="statusBtnTypeFilter(orderSale.status)"
                      v-show="
                        !fourth &&
                          (orderSale.status === '4' ||
                            orderSale.status === '5') &&
                          orderSale.adjustFlag !== 'Y'
                      "
                      @click="deliveryApply"
                    />
                  </div>
                </div>
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
    <DeliveryModal ref="deliveryModal" @ok="deliveryModalOk"></DeliveryModal>
    <SelectMaterialModal
      ref="selectMaterialModal"
      @ok="selectMaterialModalOk"
    ></SelectMaterialModal>
  </div>
</template>

<script>
import {
  getOrderSaleList,
  getOrderSaleInfo,
  getMaterDetail,
  putOrderSale,
  submitOrderSale,
  submitOrderSaleAdjust,
  deleteOrderSale,
  backOrderSale,
  passOrderSale,
  failOrderSale
} from '@/api/api'
import DeliveryModal from './modules/DeliveryModal'
import SelectMaterialModal from './modules/SelectMaterialModal'

const statusMap = {
  0: {
    status: 'warning',
    text: '保存'
  },
  1: {
    status: 'teal',
    text: '已提交'
  },
  2: {
    status: 'teal-8',
    text: '确认中'
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

const statusBtnMap = {
  0: {
    status: 'brown',
    text: '提交订货单'
  },
  1: {
    status: 'teal',
    text: '撤回订货单'
  },
  2: {
    status: 'teal',
    text: ''
  },
  4: {
    status: 'brown',
    text: '申请发货'
  },
  5: {
    status: 'brown',
    text: '申请发货'
  },
  6: {
    status: 'brown',
    text: '不通过'
  },
  10: {
    status: 'brown',
    text: '提交调整'
  }
}
export default {
  name: 'MineOrdering',
  components: { DeliveryModal, SelectMaterialModal },
  data () {
    return {
      keyWord: '',
      visible: false,
      fourth: false,
      disableTZ: true,
      disable: false,
      orderTab: 'col-md-12',
      detailShow: false,
      saleOrdeing: [],
      saleOrdeing_add: [
        {
          id: '16358739261671137301',
          billNo: 'HB202303150002',
          materialClassId_dictText: '复合肥成品',
          createTime: '2023-03-15 13:21:52',
          status: '0',
          totalNum: 5.0
        },
        {
          id: '16358739261671137302',
          billNo: 'HB202303150002',
          materialClassId_dictText: '复合肥成品',
          createTime: '2023-03-15 13:21:52',
          status: '1',
          totalNum: 5.0
        },
        {
          id: '16358739261671137303',
          billNo: 'HB202303150002',
          materialClassId_dictText: '复合肥成品',
          createTime: '2023-03-15 13:21:52',
          status: '4',
          totalNum: 5.0
        },
        {
          id: '16358739261671137304',
          billNo: 'HB202303150002',
          materialClassId_dictText: '复合肥成品',
          createTime: '2023-03-15 13:21:52',
          status: '5',
          totalNum: 5.0
        },
        {
          id: '16358739261671137305',
          billNo: 'HB202303150002',
          materialClassId_dictText: '复合肥成品',
          createTime: '2023-03-15 13:21:52',
          status: '6',
          totalNum: 5.0
        }
      ],
      IsNull: true,
      queryParam: { status: '', keyWord: '' },
      orderSale: {},
      isSearch: false,
      orderInfo: {}
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
    fourth (n, o) {
      console.log('当前分类', n)
      if (n) {
        this.disable = false
      } else {
        this.disable = true
      }
    },
    isSearch (n, o) {
      if (n) {
        console.log('进行检索', this.isSearch)
        this.refresh()
      }
    }
  },
  mounted () {},
  methods: {
    statusBtnFilter (type) {
      return type ? statusBtnMap[type].text : ''
    },
    statusBtnTypeFilter (type) {
      return type ? statusBtnMap[type].status : ''
    },
    statusFilter (type) {
      return statusMap[type].text
    },
    close () {
      this.orderTab = 'col-md-12'
      this.detailShow = false
    },
    getOrderSaleInfo (order) {
      this.orderInfo = order
      //   this.$message.warning(id)
      this.orderTab = 'col-md-5'
      this.detailShow = true
      this.visible = true
      getOrderSaleInfo(order.id).then(res => {
        this.orderSale = res.data
        this.orderSale.materialClassId_dictText =
          order.materialClassId_dictText
        this.orderSale.statusText = this.statusFilter(res.data.status)
        if (res.data.status === '0') {
          this.fourth = false
          this.disableTZ = true
          this.disable = false
        }

        if (res.data.status === '1') {
          this.fourth = false
          this.disableTZ = true
          this.disable = true
        }
        if (res.data.status === '4' || res.data.status === '5') {
          this.fourth = false
          this.disableTZ = false
          this.disable = true
        }
        if (res.data.status === '6') {
          this.fourth = false
          this.disableTZ = true
          this.disable = true
        }

        if (res.data.adjustFlag === 'Y') {
          this.fourth = false
          this.disableTZ = true
          this.disable = true
        }
        if (res.data.status === '2') {
          this.fourth = false
          this.disableTZ = true
          this.disable = true
        }
        console.log('OrderSaleInfo', this.orderSale)
        this.setOrderSaleBList(this.orderSale)
      })
    },
    setOrderSaleBList (orderSale) {
      orderSale.orderSaleBList.map(item => {
        getMaterDetail(item.materialId).then(res => {
          // console.log('getMaterDetail', res.data)
          item.name = res.data.name
          item.materialspec = res.data.materialspec
          item.scalepicPath = res.data.scalepicPath
          item.oldnum = item.num
        })
        return item
      })

      setTimeout(() => {
        this.visible = false
      }, 500)
      console.log('orderSaleBList', orderSale.orderSaleBList)
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
    saveSaleOrder () {
      this.visible = true
      putOrderSale(this.orderSale)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('订货单保存成功')
            this.orderSale.totalNum = res.data.totalNum
            this.orderInfo.status = res.data.status
            this.orderInfo.totalNum = res.data.totalNum
            console.log('saveSaleOrder', this.orderSale)
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.visible = false
          }, 500)
        })
    },

    submitSaleOrder () {
      console.log('submitSaleOrder', this.orderSale)
      //   this.orderSale.nccId = 'NO001'
      //   this.orderSale.nccNo = 'NO001'
      this.visible = true
      putOrderSale(this.orderSale)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('订货单保存成功')
            this.orderSale.totalNum = res.data.totalNum
            this.orderInfo.status = res.data.status
            this.orderInfo.totalNum = res.data.totalNum
            submitOrderSale(this.orderSale)
              .then(res => {
                if (res.code === 200) {
                  this.orderSale.statusText = this.statusFilter(1)
                  this.orderSale.status = '1'
                  this.fourth = false
                  this.disableTZ = true
                  this.disable = true
                  this.$message.success('订货单提交成功')
                  this.orderInfo.status = res.data.status
                  this.orderInfo.totalNum = res.data.totalNum
                }
              })
              .finally(() => {
                setTimeout(() => {
                  this.visible = false
                }, 500)
              })
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.visible = false
          }, 500)
        })
    },
    submitOrderSaleAdjust () {
      submitOrderSaleAdjust(this.orderSale)
        .then(res => {
          if (res.code === 200) {
            this.fourth = false
            this.disableTZ = false
            this.disable = true
            this.orderSale.adjustFlag = 'Y'
            this.$message.success('订货单调整提交成功')
            this.orderInfo.adjustFlag = 'Y'
            // this.orderInfo.status = res.data.status
            // this.orderInfo.totalNum = res.data.totalNum
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.visible = false
          }, 500)
        })
    },
    handleMaterialDelete (material) {
      console.log('materia', material)
      if (!material.id) {
        const idx = this.orderSale.orderSaleBList.indexOf(material)
        if (idx !== -1) {
          this.orderSale.orderSaleBList.splice(idx, 1)
          return
        }
      }
      this.$message
        .confirm('该商品已保存，是否确认移除:' + material.name)
        .onOk(() => {
          for (const item of this.orderSale.orderSaleBList) {
            if (item.id === material.id) {
              const idx = this.orderSale.orderSaleBList.indexOf(item)
              if (idx !== -1) {
                this.orderSale.orderSaleBList.splice(idx, 1)
                if (!this.orderSale.orderSaleBDelList) {
                  this.orderSale.orderSaleBDelList = []
                }
                if (material.id) {
                  this.orderSale.orderSaleBDelList.push(material.id)
                  this.$message.success('移除成功,保存订单后生效')
                }
                console.log(material)
                console.log(this.orderSale)
              }
            }
          }
        })
    },
    handleDelete (orderSale) {
      console.log('handleDelete:orderSale', orderSale)
      this.$message.confirm('是否确认删除:' + orderSale.billNo).onOk(() => {
        deleteOrderSale(orderSale.id).then(res => {
          this.$message.success(orderSale.billNo + ':订货单删除成功')
          this.refresh()
          this.close()
        })
      })
    },
    backOrderSale () {
      console.log('backOrderSale', this.orderSale)
      this.visible = true
      backOrderSale(this.orderSale)
        .then(res => {
          if (res.code === 200) {
            this.orderSale.statusText = this.statusFilter(0)
            this.orderSale.status = '0'
            this.fourth = false
            this.disableTZ = true
            this.disable = false
            this.$message.success('订货单撤回成功')
            this.orderInfo.status = res.data.status
            this.orderInfo.totalNum = res.data.totalNum
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.visible = false
          }, 500)
        })
    },
    deliveryApply () {
      this.$refs.deliveryModal.show(this.orderSale)
    },
    onItemClickPass () {
      this.orderSale.saleorgId = '0001X510000000001X0J'
      this.orderSale.saleorgCode = '101'
      console.log('onItemClickPass', this.orderSale)
      passOrderSale(this.orderSale).then(res => {
        if (res.code === 200) {
          this.$message.success('通过')
          setTimeout(() => {
            this.visible = false
          }, 500)
        }
      })
    },
    onItemClickFail () {
      failOrderSale(this.orderSale).then(res => {
        if (res.code === 200) {
          this.$message.success('不通过')
          setTimeout(() => {
            this.visible = false
          }, 500)
        }
      })
    },
    deliveryModalOk (orderSale) {
      this.$refs.deliveryModal.hide()
      this.getOrderSaleInfo(orderSale)
    },
    selectMaterial () {
      this.$refs.selectMaterialModal.show(this.orderSale)
    },
    selectMaterialModalOk (materialList) {
      console.log(materialList)

      materialList.map(item => {
        const orderSaleB = {}
        orderSaleB.materialId = item.id
        orderSaleB.materialCode = item.code
        orderSaleB.materialClassId = item.classId
        orderSaleB.name = item.name
        orderSaleB.materialspec = item.materialspec
        orderSaleB.scalepicPath = item.scalepicPath
        orderSaleB.num = 1
        var IsAdd = true
        this.orderSale.orderSaleBList.map(SaleB => {
          if (SaleB.materialId === item.id) {
            IsAdd = false
            SaleB.num = SaleB.num + 1
          }
          return SaleB
        })
        if (IsAdd) {
          this.orderSale.orderSaleBList.push(orderSaleB)
        }
      })
      this.$refs.selectMaterialModal.hide()
    },
    checkNum (material) {
      console.log('数量检查', material)
      if (material.num <= 0) {
        material.num = 1
        this.$message.warning('数量必须大于0')
      }
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
