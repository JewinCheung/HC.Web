<template>
  <q-layout view="hHh lpR fFf" class="full-height">
    <q-header
      elevated
      style="background: linear-gradient(145deg, #15503e 15%, #133154 70%);"
    >
      <q-toolbar style="height: 64px">
        <q-toolbar-title shrink class="row items-center no-wrap">
          <img
            class="cursor-pointer float-left"
            :src="this.$PUBLIC_PATH + 'data/mall_logo.png'"
            style="width: 9%"
          />
          <span
            class="float-left q-mt-xs q-ml-md text-h6 text-weight-bold"
            style="font-size: 17px;"
            >订货商城</span
          >
        </q-toolbar-title>

        <q-space />
        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="我的订单"
          class="q-ml-sm q-px-md pull-right"
        ></q-btn>
        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="发货列表"
          class="q-ml-sm q-px-md pull-right"
        ></q-btn>
        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="新增发货"
          class="q-ml-sm q-px-md pull-right"
        ></q-btn>
        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="个人账户"
          class="q-ml-sm q-px-md pull-right"
        ></q-btn>
        <q-btn class="q-mr-md" dense round flat icon="assignment">
          <q-badge color="red" class="text-bold" floating transparent v-show="message>0">
            {{message}}
          </q-badge>
        </q-btn>

        <q-btn flat round dense icon="settings" class="q-mr-md" />
        <q-btn flat round dense icon="fas fa-sign-out-alt" to="/" />
      </q-toolbar>
      <!-- bg-white -->
      <div
        class="text-grey-9 text-weight-bold shadow-transition"
        style="background-color: rgb(181, 216, 207);"
      >
        <div
          class="row text-center items-center"
          :style="$q.platform.is.desktop ? 'height: 38px' : ''"
        >
          <div
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 q-ma-sm cursor-pointer hover-blue"
            @mouseover="menu_cat_1 = true"
          >
            复合肥成品
            <q-menu
              fit
              @mouseleave="menu_cat_1 = false"
              v-model="menu_cat_1"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 12]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
              >
                <q-item clickable>
                  <q-item-section>复肥1</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>复肥2</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>复肥3</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>复肥4</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>复肥5</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon
              size="sm"
              class="q-ml-xs text-weight"
              name="keyboard_arrow_down"
            ></q-icon>
          </div>
          <div
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 q-ma-sm cursor-pointer hover-blue"
            @mouseover="menu_cat_2 = true"
          >
            纯碱
            <q-menu
              fit
              @mouseleave="menu_cat_2 = false"
              v-model="menu_cat_2"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
              >
                <q-item clickable>
                  <q-item-section>纯碱</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>轻碱</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>重碱</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>碱</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon
              size="sm"
              class="q-ml-xs text-weight"
              name="keyboard_arrow_down"
            ></q-icon>
          </div>
          <div
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 q-ma-sm cursor-pointer hover-blue"
            @mouseover="menu_cat_3 = true"
          >
            氯化铵
            <q-menu
              fit
              @mouseleave="menu_cat_3 = false"
              v-model="menu_cat_3"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
              >
                <q-item clickable>
                  <q-item-section>氯化铵</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>湿铵</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>干铵</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon
              size="sm"
              class="q-ml-xs text-weight"
              name="keyboard_arrow_down"
            ></q-icon>
          </div>
          <div
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 q-ma-sm cursor-pointer hover-blue"
            @mouseover="menu_cat_4 = true"
          >
            尿素
            <q-menu
              fit
              @mouseleave="menu_cat_4 = false"
              v-model="menu_cat_4"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
              >
                <q-item clickable>
                  <q-item-section>尿素</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>小包装尿素</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>大包装尿素</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>贴牌尿素</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>液体尿素</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>散装尿素</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon
              size="sm"
              class="q-ml-xs text-weight"
              name="keyboard_arrow_down"
            ></q-icon>
          </div>
          <div
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 q-ma-sm cursor-pointer hover-blue"
            @mouseover="menu_cat_5 = true"
          >
            硝酸
            <q-menu
              fit
              @mouseleave="menu_cat_5 = false"
              v-model="menu_cat_5"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
              >
                <q-item clickable>
                  <q-item-section>稀硝酸</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>浓硝酸</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>硝酸</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon
              size="sm"
              class="q-ml-xs text-weight"
              name="keyboard_arrow_down"
            ></q-icon>
          </div>
          <div
            class="col-lg-1 col-md-1 col-sm-12 col-xs-12 q-ma-sm cursor-pointer hover-blue"
            @mouseover="menu_cat_6 = true"
          >
            其他
            <q-menu
              fit
              v-model="menu_cat_6"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
              >
                <q-item clickable>
                  <q-item-section side>
                    <q-icon color="white" name="keyboard_arrow_left" />
                  </q-item-section>
                  <q-item-section>甲醇</q-item-section>

                  <q-menu side anchor="top start" self="top right">
                    <q-list
                      dense
                      class="text-caption text-white"
                      style="background: #328163 !important;"
                    >
                      <q-item clickable>
                        <q-item-section>精甲醇</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>合成氨</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section side>
                    <q-icon color="white" name="keyboard_arrow_left" />
                  </q-item-section>
                  <q-item-section>氨水</q-item-section>

                  <q-menu side anchor="top start" self="top right">
                    <q-list
                      dense
                      class="text-caption text-white"
                      style="background: #328163 !important;"
                    >
                      <q-item clickable>
                        <q-item-section>稀氨水</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>浓氨水</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section side>
                    <q-icon color="white" name="keyboard_arrow_left" />
                  </q-item-section>
                  <q-item-section>多元醇产品</q-item-section>

                  <q-menu side anchor="top start" self="top right">
                    <q-list
                      dense
                      class="text-caption text-white"
                      style="background: #328163 !important;"
                    >
                      <q-item clickable>
                        <q-item-section>醛</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>醇</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>溶液</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>烷</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>合成氨</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon
              size="sm"
              class="q-ml-xs text-weight"
              name="keyboard_arrow_down"
            ></q-icon>
          </div>
        </div>
      </div>
    </q-header>
    <q-page-container class="app-main full-height bg-grey-1">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :max="Max_keepAlive" :include="keepAliveList">
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>
<script>
import { getMaterialClass } from 'src/api/UserApi'
export default {
  name: 'MallLayout',
  data () {
    return {
      active: true,
      Max_keepAlive: this.$Max_KeepAlive,
      keepAliveList: this.$store.getters.getKeepAliveList,
      menu_cat_1: false,
      menu_cat_2: false,
      menu_cat_3: false,
      menu_cat_4: false,
      menu_cat_5: false,
      menu_cat_6: false,
      message: this.$store.getters.getMessage,
      MaterialClass: []
    }
  },
  watch: {
    getKeepAliveList (n, o) {
      this.keepAliveList = n
    },
    getMessage (n, o) {
      this.message = n
    }
  },
  mounted () {
    this.getMaterialClass()
  },
  computed: {
    // Get cache list
    getKeepAliveList () {
      return this.$store.getters.getKeepAliveList
    },
    key () {
      return this.$route.fullPath
    },
    getMessage () {
      return this.$store.getters.getMessage
    }
  },
  methods: {
    getMaterialClass () {
      getMaterialClass()
        .then(res => {
          // this.MaterialClass = res.data
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
