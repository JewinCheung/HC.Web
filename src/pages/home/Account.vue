<template>
    <base-content>
    <div class="bg-white q-pa-md q-ma-md base-card-shadow" >

      <div class="row items-center q-gutter-y-sm">
        <div class="col-sm-auto col-xs-12">
          <q-avatar size="76px">
            <q-img ratio="1" :src="this.$PUBLIC_PATH + 'data/avatar.png'" />
          </q-avatar>
        </div>
        <div class="col-xs-12 col-sm-9 col-md-6 q-pl-md">
          <div style="font-size: large" class="q-mb-xs">
            早安，祝你开心每一天！
          </div>
          <!-- <q-item-label class="text-grey-6 text-body"
          >{{ workplaceSata.currentUserData.job }} |
            {{ workplaceSata.currentUserData.department }}
          </q-item-label> -->
        </div>
        <div
          class="col-xs-12 col-md-5 text-grey-6 text-body q-gutter-x-lg"
          :class="{
            'text-right': $q.screen.gt.sm,
            'q-pl-md': $q.screen.lt.md
          }"
        >
          <q-item-label class="inline-block">
            <q-item-label>
              <q-avatar
                color="blue-1"
                size="sm"
                text-color="primary"
                class="q-mr-sm"
                icon="apps"
              ></q-avatar>
              <span>订单数</span>
            </q-item-label>
            <q-item-label
              class="text-center text-black q-pt-xs"
              style="font-size: x-large"
            >56
            </q-item-label>
          </q-item-label>
          <q-item-label class="inline-block">
            <q-item-label>
              <q-avatar
                color="orange-1"
                size="sm"
                text-color="orange"
                class="q-mr-sm"
                icon="edit"
              ></q-avatar>
              <span>待办项</span>
            </q-item-label>
            <q-item-label
              class="text-center text-black q-pt-xs"
              style="font-size: x-large"
            >8/24
            </q-item-label>
          </q-item-label>
          <q-item-label class="inline-block">
            <q-item-label>
              <q-avatar
                color="green-1"
                size="sm"
                text-color="green"
                class="q-mr-sm"
                icon="visibility"
              ></q-avatar>
              <span>发货量</span>
            </q-item-label>
            <q-item-label
              class="text-center text-black q-pt-xs"
              style="font-size: x-large"
            >
              {{
                2223 | numeral('0,0')
              }}
            </q-item-label>
          </q-item-label>
        </div>
      </div>
    </div>
  <div class="row q-pa-md">
      <div class="col-md-4 col-sm-6 col-xs-12 q-px-sm q-mb-md">
        <sc-shadow>
          <q-card  class="no-border-radius text-grey-9 cimo-shadow">
            <q-card-section class="bg-white">
              <q-avatar
                color="green-1"
                size="sm"
                text-color="green"
                class="q-mr-sm"
                icon="visibility"
              ></q-avatar>
              <span> 订单量 </span>
              <span>
                <q-chip
                  size="sm"
                  square
                  outline
                  color="green"
                  class="bg-green-1 float-right"
                  label="日"
                ></q-chip>
              </span>
            </q-card-section>
            <q-separator />
            <q-card flat square class="q-pa-md">
              <div style="height: 70px">
                <q-item-label
                  class="text-grey-9 q-mb-md"
                  style="font-size: xx-large"
                >
                 28
                </q-item-label>
              </div>
              <q-separator spaced="15px" />
              <q-item-label>
                <span>总订单量</span>
                <span class="float-right">688</span>
              </q-item-label>
            </q-card>
          </q-card>
        </sc-shadow>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12 q-px-sm q-mb-md">
        <sc-shadow>
          <q-card  class="no-border-radius text-grey-9 cimo-shadow">
            <q-card-section class="bg-white">
              <q-avatar
                color="red-1"
                size="sm"
                text-color="red"
                class="q-mr-sm"
                icon="attach_money"
              ></q-avatar>
              <span> 销售额 </span>
              <span>
                <q-chip
                  size="sm"
                  square
                  outline
                  color="blue"
                  class="bg-blue-1 float-right"
                  label="月"
                ></q-chip>
              </span>
            </q-card-section>
            <q-separator />
            <q-card flat square class="q-pa-md">
              <div style="height: 70px">
                <q-item-label
                  class="text-grey-9 q-mb-md"
                  style="font-size: xx-large"
                >
                  ¥100000
                </q-item-label>
              </div>
              <q-separator spaced="15px" />
              <q-item-label>
                <span>总销售额</span>
                <span class="float-right">100万</span>
              </q-item-label>
            </q-card>
          </q-card>
        </sc-shadow>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12 q-px-sm q-mb-md">
        <sc-shadow>
          <q-card  class="no-border-radius text-grey-9 cimo-shadow">
            <q-card-section class="bg-white">
              <q-avatar
                color="purple-1"
                size="sm"
                text-color="purple"
                class="q-mr-sm"
                icon="people_alt"
              ></q-avatar>
              <span> 新增客户 </span>
              <span>
                <q-icon
                  name="help_outline"
                  color="grey-7"
                  class="float-right"
                ></q-icon>
              </span>
            </q-card-section>
            <q-separator />
            <q-card flat square class="q-pa-md">
              <div style="height: 70px">
                <q-item-label
                  class="text-grey-9 q-mb-md"
                  style="font-size: xx-large"
                >
                 18位
                </q-item-label>
              </div>
              <q-separator spaced="15px" />
              <q-item-label>
                <span>总客户</span>
                <span class="float-right"
                >1880人</span
                >
              </q-item-label>
            </q-card>
          </q-card>
        </sc-shadow>
      </div>
      <div class="col-12 q-mb-md">
        <div class="no-border-radius row q-gutter-y-md">
          <div
            class="col-lg col-md-2 col-xs-4 text-center q-px-sm  cimo-shadow"
            v-for="(data, index) in linkData"
            :key="index"

          >
            <sc-shadow>
              <q-card-section class="bg-white" >
                <q-avatar
                  :icon="data.icon"
                  :text-color="data.textColor"
                ></q-avatar>
                <q-item-label>{{ data.desc }}</q-item-label>
              </q-card-section>
            </sc-shadow>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-px-sm">
      <div class="col-lg-8 col-xs-12 q-mb-md q-px-sm">

        <q-card  class="cimo-shadow">
          <q-card-section class="bg-white">
            <q-avatar
              color="purple-1"
              size="sm"
              text-color="purple"
              class="q-mr-sm"
              icon="highlight"
            ></q-avatar>
            <span> 动态 </span>
          </q-card-section>
          <q-separator />
          <q-list>
            <div
              class="q-mb-sm"
            >
              <q-item class="q-py-md">
                <q-item-section avatar>
                  <q-avatar>
                    <img alt="" :src="this.$PUBLIC_PATH + 'data/avatar.png'" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="q-mb-xs">
                    <span class="text-weight-bold q-pr-xs">
                          钟小鱼</span>
                    <span>在</span>
                    <span class="text-primary q-px-xs">订货商城</span>
                    <span>新建订单</span>
                    <span class="text-primary q-pl-xs"> NP454512154</span>
                  </q-item-label>
                  <q-item-label class="text-grey-6" lines="1">
                  2020-12-22 21:11:21
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset="" />
                    <q-item class="q-py-md">
                <q-item-section avatar>
                  <q-avatar>
                    <img alt="" :src="this.$PUBLIC_PATH + 'data/avatar.png'" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="q-mb-xs">
                    <span class="text-weight-bold q-pr-xs">
                          钟小鱼</span>
                    <span>在</span>
                    <span class="text-primary q-px-xs">NP454512154 </span>
                    <span>申请发货</span>
                    <span class="text-primary q-pl-xs"> FH1554456465</span>
                  </q-item-label>
                  <q-item-label class="text-grey-6" lines="1">
                  2022-12-21 21:11:21
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-card>
      </div>
      <div class="col-lg-4 col-xs-12 q-px-sm">
        <q-card  class="cimo-shadow q-mb-md">
          <q-card-section class="bg-white">
            <q-avatar
              color="red-1"
              size="sm"
              text-color="red"
              class="q-mr-sm"
              icon="favorite"
            ></q-avatar>
            <span> 快捷操作 </span>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-card-section class="q-mb-sm row">
              <div class="col-4">
                <sc-shadow class="q-py-md">
                  <q-item-section
                    avatar
                    style="align-items: center"
                    class="q-pr-none"
                  >
                    <q-avatar
                      font-size="28px"
                      icon="dashboard"
                      text-color="info"
                    >
                    </q-avatar>
                    主控台
                  </q-item-section>
                </sc-shadow>
              </div>
              <div class="col-4">
                <sc-shadow class="q-py-md">
                  <q-item-section
                    avatar
                    style="align-items: center"
                    class="q-pr-none"
                  >
                    <q-avatar
                      font-size="28px"
                      icon="list_alt"
                      text-color="primary"
                    >
                    </q-avatar>
                    <div>表单</div>
                  </q-item-section>
                </sc-shadow>
              </div>
              <div class="col-4">
                <sc-shadow class="q-py-md">
                  <q-item-section
                    avatar
                    style="align-items: center"
                    class="q-pr-none"
                  >
                    <q-avatar
                      font-size="28px"
                      icon="grid_on"
                      text-color="warning"
                    >
                    </q-avatar>
                    列表
                  </q-item-section>
                </sc-shadow>
              </div>
              <div class="col-4">
                <sc-shadow class="q-py-md">
                  <q-item-section
                    avatar
                    style="align-items: center"
                    class="q-pr-none"
                  >
                    <q-avatar
                      font-size="28px"
                      icon="search"
                      text-color="purple"
                    >
                    </q-avatar>
                    <div>搜索</div>
                  </q-item-section>
                </sc-shadow>
              </div>
              <div class="col-4">
                <sc-shadow class="q-py-md">
                  <q-item-section
                    avatar
                    style="align-items: center"
                    class="q-pr-none"
                  >
                    <q-avatar
                      font-size="28px"
                      icon="settings_applications"
                      text-color="green"
                    >
                    </q-avatar>
                    设置
                  </q-item-section>
                </sc-shadow>
              </div>
              <div class="col-4">
                <sc-shadow class="q-py-md">
                  <q-item-section
                    avatar
                    style="align-items: center"
                    class="q-pr-none"
                  >
                    <q-avatar
                      font-size="28px"
                      icon="home_repair_service"
                      text-color="negative"
                    >
                    </q-avatar>
                    <div>工具</div>
                  </q-item-section>
                </sc-shadow>
              </div>
            </q-card-section>
            <q-separator inset="" />
            <div class="q-pa-md row text-center items-center q-gutter-y-sm">
              <span class="col-3">
                <q-chip square dense color="white" label="操作一" />
              </span>
              <span class="col-3">
                <q-chip square dense color="white" label="操作一" />
              </span>
              <span class="col-3">
                <q-chip square dense color="white" label="操作二" />
              </span>
              <span class="col-3">
                <q-chip square dense color="white" label="操作三" />
              </span>
              <span class="col-3">
                <q-chip square dense color="white" label="操作四" />
              </span>
              <span class="col-3">
                <q-chip square dense color="white" label="操作五" />
              </span>
              <span class="col-3">
                <q-btn
                  size="sm"
                  padding="2px 15px"
                  style="border: 1px solid deepskyblue"
                  color="primary"
                  flat
                  label="添加"
                  :ripple="false"
                ></q-btn>
              </span>
            </div>
          </q-list>
        </q-card>

      </div>
    </div>
  </base-content>
</template>

<script>
import ScShadow from 'components/shadow/ScShadow'
import BaseContent from '../../components/BaseContent/BaseContent'
export default {
  name: 'Account',
  components: { ScShadow, BaseContent },
  data () {
    return {
      linkData: [
        {
          icon: 'group',
          desc: '客户',
          textColor: 'primary',
          path: 'ClientManage/Client'
        },
        {
          icon: 'shopping_cart',
          desc: '商品',
          textColor: 'orange',
          path: 'GoodsManage/Goods'
        },
        {
          icon: 'assignment',
          desc: '订单',
          textColor: 'purple',
          path: 'OrderManage/Order'
        },
        {
          icon: 'leaderboard',
          desc: '分析',
          textColor: 'green'
        },
        {
          icon: 'email',
          desc: '审核',
          textColor: 'info'
        },
        {
          icon: 'bookmarks',
          desc: '发货单',
          textColor: 'accent'
        },
        {
          icon: 'card_travel',
          desc: '结算',
          textColor: 'yellow'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
