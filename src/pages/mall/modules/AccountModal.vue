<template>
  <q-dialog flat full-height v-model="showDialog" transition-show="slide-left">
    <q-card square style="min-width: 1200px">
      <q-card-section class="q-pa-none text-white text-subtitle bg-teal">
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
              款项往来明细
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
        style="height: calc(100vh - 102px);min-height: 140px;"
      >
        <q-card flat class="q-pa-sm">
          <q-card-section>
            <div class="flex justify-between align-center items-center">
              <span class="text-subtitle2 text-grey-8">账户信息</span>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-item class="q-px-none">
              <q-item-section top>
                <q-item-label>
                  销售组织：
                  <span class="text-bold">
                    {{accountInfo.saleorgName}}</span
                  ></q-item-label
                >
                <q-item-label>
                  金额：
                  <span class="text-bold"> {{ accountInfo.totalMoney }}</span></q-item-label
                >
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  名称：
                  <span class="text-bold">
                     {{accountInfo.customerName}}</span
                  ></q-item-label
                >
                <q-item-label>
                  授信额：
                  <span class="text-bold">  {{ accountInfo.totalCredit }}</span></q-item-label
                >
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  商品分类：
                  <span class="text-bold">  {{ accountInfo.materialclassName }}</span
                ></q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section class="q-py-none">
            <div
              class="flex justify-between align-center items-center"
              style=""
            >
              <span class="q-mb-xs text-subtitle2 text-grey-8">明细列表</span>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="base-card-shadow bg-white">
              <div>
                <q-table
                  ref="table"
                  class="table-sticky-header"
                  :style="computedStyle"
                  virtual-scroll
                  :data="dataSource"
                  :columns="columns"
                  :visible-columns="visibleColumns"
                  row-key="id"
                  @request="loadData"
                  :loading="loading"
                  :fullscreen.sync="isFullscreen"
                  :pagination.sync="pagination"
                  :rows-per-page-options="pageSizeOptions"
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                  </template>
                  <template v-slot:top-left>
                    <!-- <div class="q-gutter-md">
            <q-btn
              label="开通账号"
              color="primary"
              icon="add"
              :disable="addUserDisable"
              @click="handleAddUser()"
            />
          </div> -->
                    <q-btn-group class="q-my-xs q-ml-xs">
                      <q-btn color="secondary" glossy label="1月" @click="getRangeDate(-15)" />
                      <q-btn color="secondary" glossy label="3月" @click="getRangeDate(-90)"/>
                      <q-btn color="secondary" glossy label="半年" @click="getRangeDate(-180)"/>
                      <q-btn color="secondary" glossy label="1年" @click="getRangeDate(-365)" />
                    </q-btn-group>
                  </template>
                  <template v-slot:body-cell-billType="props">
                    <q-td :props="props">
                      <q-badge
                        outline
                        class="q-pa-sm"
                        color="positive"
                        :label="$global.billTypeConvert(props.row.billType)"
                      />
                    </q-td>
                  </template>
                  <template v-slot:top-right="props">
                    <div>
                      <q-btn
                        rounded
                        flat
                        dense
                        size="md"
                        icon="autorenew"
                        @click="loadData"
                      >
                        <q-tooltip>刷新</q-tooltip>
                      </q-btn>
                      <q-btn
                        rounded
                        flat
                        round
                        dense
                        :icon="
                          props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                        "
                        @click="props.toggleFullscreen"
                      >
                        <q-tooltip>全屏</q-tooltip>
                      </q-btn>
                      <q-btn-dropdown
                        rounded
                        flat
                        dense
                        size="md"
                        auto-close
                        outline
                        no-icon-animation
                        class="btn-dropdown-hide-droparrow"
                        icon="apps"
                      >
                        <div class="row no-wrap q-pa-sm">
                          <div class="column">
                            <q-toggle
                              v-model="visibleColumns"
                              v-for="item in columns"
                              :key="item.name"
                              :val="item.name"
                              :label="item.label"
                            />
                          </div>
                        </div>
                      </q-btn-dropdown>
                    </div>
                  </template>
                  <template v-slot:pagination="scope">
                    <div class="justify-center row items-center">
                      <div class="col-auto">
                        <q-pagination
                          v-model="pagination.page"
                          color="primary"
                          :max="scope.pagesNumber"
                          :max-pages="4"
                          :boundary-numbers="false"
                          :boundary-links="true"
                          :ellipses="false"
                          class="float-right"
                          input-class="text-orange-10"
                          input
                          @input="loadData"
                        />
                      </div>
                      <div class="col-auto">
                        <span class="q-ml-sm q-mr-xs"
                          >共 {{ pagination.rowsNumber }} 条</span
                        >
                      </div>
                    </div>
                  </template>
                </q-table>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <!-- <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="teal" />
        </slot>
      </template> -->
    </q-card>
  </q-dialog>
</template>
<script>
import { TableMixin } from '@/mixins/TableMixin'
export default {
  name: 'AccountModal',
  mixins: [TableMixin],
  data () {
    return {
      showDialog: false,
      visibleColumns: [
        'materialclassName',
        'billno',
        'billType',
        'happenMoney',
        'happenCredit',
        'remark',
        'createBy_dictText',
        'createTime'
      ],
      columns: [
        {
          name: 'billno',
          align: 'center',
          label: '单据号',
          field: 'billno'
        },
        {
          name: 'billType',
          align: 'center',
          label: '单据类型',
          field: 'billType'
        },
        {
          name: 'materialclassName',
          label: '商品分类',
          align: 'center',
          field: 'materialclassName'
        },
        {
          name: 'happenMoney',
          align: 'center',
          label: '发生金额',
          field: 'happenMoney'
        },
        {
          name: 'happenCredit',
          align: 'center',
          label: '发生授信额',
          field: 'happenCredit'
        },
        {
          name: 'remark',
          align: 'center',
          label: '备注',
          field: 'remark',
          style: 'width: 200px'
        },
        {
          name: 'createBy_dictText',
          align: 'center',
          label: '创建者',
          field: 'createBy_dictText'
        },
        {
          name: 'createTime',
          align: 'center',
          label: '创建时间',
          field: 'createTime',
          sortable: true
        }
      ],
      url: {
        list: '/order/accountLog/list'
      },
      accountInfo: {}
    }
  },
  watch: {},
  computed: {},
  mounted () {},
  methods: {
    show (accountInfo, id, type) {
      console.log('accountInfo', accountInfo)
      console.log('id', id)
      this.accountInfo = accountInfo
      this.showDialog = true
      if (type === 'main') {
        this.queryParam.accountId = id
        this.queryParam.accountBid = null
        this.accountInfo.materialclassName = ''
      } else {
        this.queryParam.accountId = null
        this.queryParam.accountBid = id
        this.accountInfo.materialclassName = type
      }

      //  `${param[key]}`
      this.getRangeDate(-15)

      // this.loading = true
    },
    hide () {
      this.showDialog = false
    },
    /**
     * 查询当天日期
     */
    getNowDate () {
      const timeOne = new Date()
      const year = timeOne.getFullYear()
      let month = timeOne.getMonth() + 1
      let day = timeOne.getDate()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      const NOW_MONTHS_AGO = `${year}-${month}-${day}`
      return NOW_MONTHS_AGO
    },
    getRangeDate (value) {
      var startTime = this.$moment().add(value, 'days').format('YYYY-MM-DD')
      var endTime = this.getNowDate()
      this.queryParam.createTime_begin = `${startTime}`
      this.queryParam.createTime_end = `${endTime}`
      this.searchQuery()
    }
  }
}
</script>
