<template>
  <q-dialog flat full-height v-model="showDialog">
    <q-card style="min-width: 1200px">
      <q-btn flat dense color="black" class="q-mt-lg q-ml-lg" v-close-popup>
        <q-icon
          class="q-mr-sm"
          name="fas fa-chevron-left"
          style="font-size: 0.8rem;"
        />
        返回申请发货
      </q-btn>
      <q-card flat class="col q-pa-sm  q-px-md  text-left  no-shadow  ">
        <q-card-section>
          <div class="text-subtitle2 text-grey-8">
            <div class="text-weight-bolder q-px-sm q-pb-md">
              车船档案列表（点击选择）
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
                 <q-btn round flat icon="add" @click="handleAdd" />
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
                      暂无车船档案！
                    </span>
                  </div>
                  <div v-for="orde in saleOrdeing" :key="orde.id">
                    <q-item
                      clickable
                      v-ripple
                      class="q-px-sm full-width justify-between items-center"
                      @click="handleOk(orde)"
                    >
                      <q-item-section side class="col  q-mt-sm">
                        <q-item-label>
                          <span>车船号码：{{ orde.carNumber }}</span>
                        </q-item-label>
                        <q-item-label>
                          <span>司机姓名：{{ orde.driverName }}</span>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section class="col  q-mt-sm">
                        <q-item-label>
                          <span>电话号码：{{ orde.phone }}</span>
                        </q-item-label>
                        <q-item-label>
                          <span>身份证号：{{ orde.cardId }}</span>
                        </q-item-label>
                      </q-item-section>
                      <!-- <q-item-section class="col  q-mt-sm">
                        <q-item-label>
                          <span>运输方式：{{ orde.transportType }}</span>
                        </q-item-label>
                      </q-item-section> -->
                      <q-item-section side>
                        <q-item-label class="q-mt-xs text-body2">
                          <span class="cursor-pointer">
                            荷载： {{ orde.loads }}</span
                          >
                        </q-item-label>
                        <q-item-label caption>
                          <div style="font-size: 1.1em; font-weight: 600;">
                            吨位： {{ orde.tonnage }}
                          </div>
                        </q-item-label>
                      </q-item-section>
                    <q-item-section top side>
                      <div class="text-grey-8 q-gutter-xs">
                                                <q-btn
                          class="text-teal"
                          size="12px"
                          flat
                          dense
                          round
                          icon="edit"
                          @click.stop="handleEdit(orde)"
                        />
                        <q-btn
                          class="text-red-3"
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click.stop="handleDelete(orde)"
                        />
                      </div>
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
        <UpdateCarAndShipModal ref="modalForm" @ok="modalFormOk"></UpdateCarAndShipModal>
  </q-dialog>
</template>
<script>
import { getOrderCarAndShipList, deleteOrderCarAndShipInfo } from '@/api/api'
import UpdateCarAndShipModal from '@/pages/mall/modules/UpdateCarAndShipModal'
export default {
  name: 'CarAndShipModal',
  components: { UpdateCarAndShipModal },
  data () {
    return {
      showDialog: false,
      IsNull: true,
      saleOrdeing: [],
      queryParam: { status: '0', keyWord: '' },
      isSearch: false,
      keyWord: '',
      total: 0,
      orderSale: {},
      ordeing: [
        {
          carNumber: '苏F6E52H',
          driverName: '张闲生',
          loads: '33',
          tonnage: '44',
          phone: '13762825044',
          cardId: '400001122293847556',
          transportType: '自提汽运'
        }
      ]
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
      // if (this.saleOrdeing.length < 1) {
      //   this.IsNull = false
      //   setTimeout(() => {
      //     console.log(this.saleOrdeing)
      //     this.saleOrdeing.push(...this.ordeing)
      //     done()
      //   }, 1000)
      // } else {
      //   done()
      // }
    },
    loadData (index, done) {
      getOrderCarAndShipList(this.getQueryParams(index)).then(res => {
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
      var customerInfo = this.$q.localStorage.getItem('customer_Info')
      param.customerId = customerInfo.id
      param.pageNum = index
      param.pageSize = 20
      param.column = 'createTime'
      param.order = 'DESC'
      return param
    },

    handleDelete (orde) {
      console.log('handleDelete:orde', orde)
      this.$message.confirm('是否确认删除').onOk(() => {
        deleteOrderCarAndShipInfo(orde.id).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.refresh()
          }
        })
      })
    },
    handleOk (orde) {
      console.log('handleOk', orde)
      this.$emit('ok', orde)
      this.hide()
    },
    modalFormOk () {
      this.refresh()
    },
    handleAdd () {
      this.$refs.modalForm.title = '添加'
      this.$refs.modalForm.add()
    },
    handleEdit (orde) {
      this.$refs.modalForm.title = '修改'
      this.$refs.modalForm.edit(orde)
    }
  }
}
</script>
