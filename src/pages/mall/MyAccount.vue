<template>
  <base-content>
    <div class="q-py-md fit flex flex-center">
      <div class="fit q-pa-md well">
        <div class="row q-col-gutter-md">
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <q-card>
              <q-img
                :src="this.$PUBLIC_PATH + 'data/material.png'"
                style="height: 150px"
              />
              <q-card-section class="q-pt-none text-center">
                <q-avatar
                  size="100px"
                  style="top:0px"
                  class="shadow-10 absolute text-center absolute-center"
                >
                  <img :src="this.$PUBLIC_PATH + 'data/avatar.png'" />
                </q-avatar>
                <div
                  class="text-h6 q-pt-xl text-grey-8 text-weight-bold"
                  style="padding-top: 60px;"
                >
                  {{ this.$q.localStorage.getItem("user_info").nickName }}
                </div>
                <div class="text-subtitle2 q-pt-xs text-grey-8">
                  账户信息
                </div>
                <div>
                  <q-btn rounded color="brown" class="q-mt-sm" to="/commodity">
                    <q-icon
                      class="q-mr-sm"
                      name="fas fa-chevron-left"
                      style="font-size: 0.8rem;"
                    />
                    订货商城
                  </q-btn>
                </div>
              </q-card-section>

              <q-separator />
              <q-list v-for="account in accountList" :key="account.id">
                <q-item clickable class="q-pa-md" @click="setAccountInfo(account)">
                  <q-item-section avatar>
                    <q-avatar class="bg-teal text-white">
                      <q-icon round name="fas fa-address-card" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ account.customerName }}</q-item-label>
                    <q-item-label caption>{{
                      account.saleorgName
                    }}</q-item-label>
                  </q-item-section>
                  <q-item-section top>
                    <q-item-label>
                      <span>资金总额：</span>
                      <span> {{ account.totalMoney }}</span>
                    </q-item-label>
                    <q-item-label class="q-mt-xs text-body2 ">
                      <span class="cursor-pointer">授信总额：</span>
                      <span> {{ account.totalCredit }}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
          <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
            <q-card>
              <q-card-section
                class="q-pa-none text-white text-subtitle bg-teal"
              >
                <div class="flex justify-between flex-center">
                  <div class="q-py-md q-pl-md col">
                    <div>
                      账户信息 - [{{ accountInfo.saleorgName}}]
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-none q-ma-md">
                <div
                  class="scroll row"
                  style="max-height: calc(100vh - 275px);min-height:300px"
                >
                  <q-intersection
                    v-for="(item, index) in accountInfo.orderAccountBList"
                    :key="index"
                    transition="scale"
                    once
                    class="card-padding col-lg-6 col-md-6 col-xs-12 col-sm-12 q-pa-sm"
                  >
                    <q-card class="cursor-pointer cimo-shadow q-ma-sm">
                      <q-item>
                        <q-item-section avatar>
                          <q-img
                            style="width: 35px; height: 35px; border-radius: 50%;"
                          >
                            <span
                              class="bg-green-8 text-white"
                              style="width: 35px; height: 35px; display: flex; border-radius: 50%; font-size: 15px; align-items: center; justify-content: center; text-align: center; user-select: none;"
                              ><span style="max-width: 90%;">
                                {{ item.materialclassName.substring(0, 1) }}
                              </span></span
                            >
                          </q-img>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-body1">
                            <strong> {{ item.materialclassName }}</strong>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item class="block text-center q-pt-xs q-mb-sm">
                        <q-item-label class="row" caption>
                          <span class="col">金额</span>
                          <span class="col">授信额</span>
                        </q-item-label>
                        <q-item-label class="row text-body1 text-black">
                          <span class="col"><strong>{{ item.accountMoney }}</strong></span>
                          <span class="col"><strong>{{ item.accountCredit }}</strong></span>
                        </q-item-label>
                      </q-item>
                      <q-separator />
                      <q-item class="q-px-sm text-center">
                        <!-- <q-item-section>
                          授信使用额：{{item.accountCreditUsed?item.accountCreditUsed:0}}
                        </q-item-section>
                        <q-item-section>
                          剩余：{{item.accountCredit-item.accountCreditUsed}}
                        </q-item-section> -->
                      </q-item>
                    </q-card>
                  </q-intersection>
                </div>
              </q-card-section>
              <template v-if="loading">
                <slot name="loading">
                  <q-inner-loading showing color="teal" />
                </slot>
              </template>
            </q-card>
          </div>
        </div>
      </div>
      <!---->
    </div>
  </base-content>
</template>

<script>
import { getByUser, getOrgList, getCustomerInfo } from '@/api/api'
import BaseContent from '@/components/BaseContent/BaseContent'
export default {
  name: 'MyAccount',
  components: { BaseContent },
  data () {
    return {
      loading: false,
      orgList: [],
      accountList: [],
      accountInfo: []
    }
  },
  mounted () {
    this.GetOrgList()
  },
  methods: {
    GetAccountList () {
      getByUser().then(res => {
        console.log('getByUser', res)
        this.accountList = res.data
        this.accountList.forEach(item => {
          getCustomerInfo(item.customerId).then(res => {
            item.saleorgName = this.orgConvert(item.saleorgId)
            item.customerName = res.data.name
            const index = this.accountList.indexOf(item)
            this.accountList.splice(index, 1, item)
          })
        })

        console.log('AccountList', this.accountList)
        this.accountInfo = this.accountList[0]
      })
    },
    GetOrgList () {
      getOrgList().then(res => {
        console.log('getOrgList', res)
        this.orgList = res.rows
        this.GetAccountList()
      })
    },
    orgConvert (id) {
      const item = this.orgList.find(c => c.id === id)
      if (item) {
        return item.name
      } else {
        return ''
      }
    },
    GetCustomerInfo (item) {
      getCustomerInfo(item.customerId).then(res => {
        item.customerName = res.data.name
      })
    },
    setAccountInfo (accountInfo) {
      this.accountInfo = accountInfo
    }
  }
}
</script>
<style scoped>
.box-shadow:hover {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
    0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
}
/* .cimo-shadow {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px !important;
    transition: All 0.2s ease-in-out;
}
.cimo-shadow:hover{
      box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
} */
.my-card {
  width: 100%;
  max-width: 300px;
}

.well {
  max-width: 1400px;
  margin: auto;
}
</style>
