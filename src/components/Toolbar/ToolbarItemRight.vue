<template>
  <div class="q-gutter-sm row items-center no-wrap q-electron-drag--exception">
    <!-- <q-input
      dense
      outlined
      v-model="search"
      style="min-width: 60px"
      input-class="text-right"
      class="q-ml-md"
    >
      <template v-slot:append>
        <q-icon v-if="search === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
      </template>
    </q-input>-->
    <q-btn
      round
      dense
      flat
      :icon="this.$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      v-if="$q.screen.gt.sm"
      @click="fullScreen"
    >
      <q-tooltip v-if="!this.$q.fullscreen.isActive">全屏</q-tooltip>
      <q-tooltip v-if="this.$q.fullscreen.isActive">退出全屏</q-tooltip>
    </q-btn>
    <!-- <q-btn round dense flat icon="video_call" v-if="$q.screen.gt.sm">
      <q-tooltip>创建</q-tooltip>
    </q-btn>-->
    <q-btn round dense flat icon="apps" v-if="$q.screen.gt.sm">
      <q-tooltip>应用</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="message" v-if="$q.screen.gt.sm">
      <q-tooltip>消息</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="notifications" class=" q-mr-md">
      <q-badge color="red" text-color floating>2</q-badge>
      <q-tooltip>通知</q-tooltip>
    </q-btn>
    <q-btn
      rounded
      outline
      padding="4px"
      color="teal"
      class="q-btn--no-uppercase q-mr-md"
    >
      <div class="relative-position hover-style" title="account">
        <q-img style="width: 35px; height: 35px; border-radius: 50%;">
          <span
            class="bg-teal text-white"
            style="width: 35px; height: 35px; display: flex; border-radius: 50%; font-size: 15px; align-items: center; justify-content: center; text-align: center; user-select: none;"
            ><span style="max-width: 90%;">
              {{this.$q.localStorage.getItem('user_info').nickName.substring(0,1)}}
            </span></span
          >
        </q-img>
        <span class="q-px-sm text-caption text-bold  text-teal-8"
          ><span class="q-pr-xs">{{this.$q.localStorage.getItem('user_info').nickName}}</span>
          <q-icon class="text-teal" name="fa fa-caret-down"></q-icon
        ></span>
      </div>
      <q-menu>
        <div class="row q-pa-md bg-teal">
          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="this.$PUBLIC_PATH + 'data/avatar.png'" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs text-white">Hi！ {{this.$q.localStorage.getItem('user_info').nickName}}</div>

            <q-btn
              color="primary"
              label="退出系统"
              size="sm"
              v-close-popup
              @click="logout"
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
    <div class="electron-only">
      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn
        dense
        flat
        :icon="isMaximize ? 'crop_square' : 'flip_to_front'"
        @click="maximize"
      />
      <q-btn dense flat icon="close" @click="closeApp" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolbarItemRight',
  data () {
    return {
      search: '',
      mobileData: false,
      bluetooth: true,
      isMaximize: false
    }
  },
  methods: {
    fullScreen () {
      if (this.$q.fullscreen.isActive) {
        // 退出全屏模式：
        this.$q.fullscreen
          .exit()
          .then(() => {
            // v1.5.0+
            // success!
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            // v1.5.0+
            // oh, no!!!
          })
      } else {
        // 请求全屏模式：
        this.$q.fullscreen
          .request()
          .then(() => {
            // v1.5.0+
            // success!
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            // v1.5.0+
            // oh, no!!!
          })
      }
    },

    logout () {
      this.$store.commit('LOGOUT')
      window.location.href = '/'
      window.sessionStorage.clear()
      // if (process.env.MODE === 'electron') {
      //   this.$q.electron.remote.getCurrentWindow().setSize(500, 490)
      //   this.$q.electron.remote.getCurrentWindow().center()
      // }
    },

    // electron
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
        if (win.isMaximized()) {
          win.unmaximize()
          this.isMaximize = !this.isMaximize
        } else {
          win.maximize()
          this.isMaximize = !this.isMaximize
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>

<style scoped>
.hover-style:hover {
  filter: blur(1px);
}
</style>
