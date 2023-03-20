<template>
  <q-layout :view="viewStyle" class="full-height">
    <!-- HEADER START bg-cyan-8-->
   <q-header class="q-py-xs text-white" height-hint="48"
              style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px; padding-bottom: 0px;background-color: #0db4afb8;">

      <!-- 状态栏     :icon="leftDrawerOpen === true?'menu_open':'menu'"    @click="leftDrawerOpen = !leftDrawerOpen"-->
      <q-toolbar style="margin-top: -4px;" class="q-electron-drag">

      <q-btn class="gt-md" dense round flat icon="eva-menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-btn
          class="gt-md"
          flat
          dense
          round
          aria-label="Menu"
          :icon="`${leftDrawerMini?'eva-arrowhead-right':'eva-arrowhead-left'}`"
          @click="leftDrawerMiniClick"
        />
        <q-btn
          class="lt-lg"
          flat
          dense
          round
          aria-label="Menu"
          :icon="leftDrawerOpen === true?'format_indent_decrease':'format_indent_increase'"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <!-- toolbar - title -->
        <toolbar-title />
        <!-- 面包屑 -->
        <breadcrumbs v-if="$q.screen.gt.sm" />
        <q-space />
        <!-- 右侧元素 -->
        <toolbar-item-right />
      </q-toolbar>
      <!-- TAGVIEW -->
       <q-separator color="grey-3" />
      <tag-view />

    </q-header>

    <!-- HEADER END -->

    <!-- slideBar START -->
    <!-- :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      bordered
      behavior="mobile"
    -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniCheck"
      content-class="bg-white"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :mini-to-overlay="miniToOverlay"
      bordered
      :width="240"
    >
      <base-menu :state='leftDrawerMini' />
    </q-drawer>
    <!-- slideBar END -->

    <!-- container START -->
    <q-page-container class="app-main full-height bg-grey-1">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :max="Max_keepAlive" :include="keepAliveList">
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </q-page-container>
    <!-- container END -->
  </q-layout>
</template>

<script>
import BaseMenu from '../components/Menu/BaseMenu'
import TagView from 'components/TagView/TagView'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ToolbarTitle from 'components/Toolbar/ToolbarTitle'
import ToolbarItemRight from 'components/Toolbar/ToolbarItemRight'

export default {
  name: 'MainLayout',
  components: {
    ToolbarItemRight,
    ToolbarTitle,
    Breadcrumbs,
    TagView,
    BaseMenu
  },
  data () {
    return {
      viewStyle: this.$SildeBar,
      miniState: true,
      leftDrawerOpen: true,
      leftDrawerMini: true,
      Max_keepAlive: this.$Max_KeepAlive,
      keepAliveList: this.$store.getters.getKeepAliveList
    }
  },
  computed: {
    // Get cache list
    getKeepAliveList () {
      return this.$store.getters.getKeepAliveList
    },
    key () {
      return this.$route.fullPath
    },
    miniCheck: function () {
      if (this.leftDrawerMini) {
        return this.miniState
      } else {
        return false
      }
    },
    miniToOverlay: function () {
      if (this.leftDrawerMini) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    getKeepAliveList (n, o) {
      this.keepAliveList = n
    }
  },
  methods: {
    leftDrawerMiniClick () {
      // if (this.$q.screen.gt.sm) {
      this.leftDrawerMini = !this.leftDrawerMini

      if (this.leftDrawerMini) {
        this.miniState = true
      } else {
        this.miniState = false
      }
      // } else {
      //   this.leftDrawerOpen = !this.leftDrawerOpen
      // }
    }
  }
}
</script>

<style>
</style>
