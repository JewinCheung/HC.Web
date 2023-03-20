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
          label="我的订货单"
          class="q-ml-sm q-px-md pull-right"
          to="/ordering"
        ></q-btn>
                <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="订货调整单"
          class="q-ml-sm q-px-md pull-right"
          to="/adjust"
        ></q-btn>

         <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="新增发货"
          class="q-ml-sm q-px-md pull-right"
          to="/delivery"
        ></q-btn>
                <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="发货列表"

          class="q-ml-sm q-px-md pull-right"
          to="/delivery-list"
        ></q-btn>
         <!-- @click="showMineOrdering" -->
        <!-- <q-btn
          v-if="$q.screen.gt.xs"
          flat
          no-wrap
          no-caps
          label="我的账户"
          class="q-ml-sm q-px-md pull-right"
        ></q-btn> -->
        <q-btn class="q-mr-md" dense round flat icon="assignment" @click="showShopping">
          <q-badge
            color="red"
            class="text-bold"
            floating
            transparent
            v-show="message > 0"
          >
            {{ message }}
          </q-badge>
        </q-btn>

        <q-btn flat round dense icon="settings" class="q-mr-md" />
        <q-btn flat round dense icon="fas fa-sign-out-alt" to="/" />
      </q-toolbar>
      <!-- bg-white -->
      <div
        class="text-grey-9 text-weight-bold shadow-transition"
        style="background-color: rgb(181, 216, 207);"
         v-show="getIsHome"
      >
        <div
          class="row text-center items-center"
          :style="$q.platform.is.desktop ? 'height: 38px' : ''"
        >
          <div
            class="col q-ma-sm cursor-pointer hover-blue"
            v-for="items in MaterialClass"
            :key="items.id"
          >
            {{ items.label }}
            <q-menu
              fit
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 12]"
            >
              <q-list
                dense
                class="text-caption text-white"
                style="background: #328163 !important;"
                v-for="item in items.children"
                 :key="item.id"
                 @click="checkedClass(item)"
              >
                <q-item clickable v-close-popup>
                  <q-item-section>{{item.label}}</q-item-section>
                </q-item>
                <q-separator />
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
     <ShoppingModal ref="shoppingModal" ></ShoppingModal>
       <MineOrderingModal ref="mineOrderingModal" ></MineOrderingModal>
  </q-layout>
</template>
<script>
import { getTreeList } from '@/api/api'
import ShoppingModal from '@/pages/mall/modules/ShoppingModal'
import MineOrderingModal from '@/pages/mall/modules/MineOrderingModal'
export default {
  name: 'MallLayout',
  components: { ShoppingModal, MineOrderingModal },
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
      MaterialClass: [],
      isHome: false
    }
  },
  watch: {
    getKeepAliveList (n, o) {
      this.keepAliveList = n
    },
    getMessage (n, o) {
      this.message = n
    }
    // getIsHome (n, o) {
    //   this.isHome = n
    // }
  },
  mounted () {
    this.getMaterialClass()
    this.isHome = this.$store.getters.getIsHome
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
    },
    getIsHome () {
      return this.$store.getters.getIsHome
    }
  },
  methods: {
    getMaterialClass () {
      getTreeList()
        .then(res => {
          // this.MaterialClass = res.data
          console.log(res.data)
          this.MaterialClass = res.data

          this.$store.commit('SET_MATERIALCLASS_ALL', res.data)
          this.$store.commit('SET_MATERIALCLASS', res.data[0])
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkedClass (MaterialClass) {
      console.log(MaterialClass)
      this.$store.commit('SET_MATERIALCLASS', MaterialClass)
    },
    showShopping () {
      this.$refs.shoppingModal.show()
    },
    showMineOrdering () {
      this.$refs.mineOrderingModal.show()
    }
  }
}
</script>
