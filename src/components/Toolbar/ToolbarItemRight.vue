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
      <q-menu
        transition-show="scale"
        transition-hide="scale"
        anchor="bottom right"
        self="top right"
      >
        <div class="row justify-between q-col-gutter-md q-pa-sm">
          <div class="col-12 q-gutter-md">
            <q-card
              v-for="(menu, index) in menuList"
              :key="index"
              :class="menu.class"
              @click="redirect(menu)"
            >
              <q-card-section horizontal>
                <q-card-section class="col-9 q-pa-sm">
                  <div class="text-subtitle2 text-white">
                    {{ menu.title }}
                    <q-icon color="yellow" name="shopping_cart" />
                  </div>
                  <div class="text-h6 text-bold q-mt-sm q-mb-xs text-white">
                    {{ menu.name }}
                  </div>
                </q-card-section>
                <q-card-section class="col-3">
                  <q-icon
                    color="grey-1"
                    :name="menu.icon"
                    style="font-size: 46px"
                  />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-menu>
    </q-btn>
    <q-btn round dense flat icon="message" v-if="$q.screen.gt.sm">
      <q-tooltip>消息</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="notifications" class=" q-mr-md">
      <!-- <q-badge color="red" text-color floating>2</q-badge> -->
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
              {{
                this.$q.localStorage
                  .getItem("user_info")
                  .nickName.substring(0, 1)
              }}
            </span></span
          >
        </q-img>
        <span class="q-px-sm text-caption text-bold  text-teal-8"
          ><span class="q-pr-xs">{{
            this.$q.localStorage.getItem("user_info").nickName
          }}</span>
          <q-icon class="text-teal" name="fa fa-caret-down"></q-icon
        ></span>
      </div>
      <q-menu>
        <div class="row q-pa-md bg-teal">
          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="this.$PUBLIC_PATH + 'data/avatar.png'" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs text-white">
              Hi！ {{ this.$q.localStorage.getItem("user_info").nickName }}
            </div>
            <q-btn
              class="q-mb-sm"
              color="teal-8"
              size="sm"
              label="修改密码"
              v-close-popup
              @click="updatePwd"
            />
            <q-separator />
            <q-btn
              color="teal-8"
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
    <UpdatePwdModal ref="modalForm" @ok="modalFormOk"></UpdatePwdModal>
  </div>
</template>

<script>
import UpdatePwdModal from '@/pages/logon/modules/UpdatePwdModal'
import { getSubSys } from '@/api/login'
export default {
  name: 'ToolbarItemRight',
  components: { UpdatePwdModal },
  data () {
    return {
      search: '',
      mobileData: false,
      bluetooth: true,
      isMaximize: false,
      menuList: []
    }
  },
  mounted () {
    this.getSubSys()
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

    updatePwd () {
      this.$refs.modalForm.show()
    },

    logout () {
      this.$store.commit('LOGOUT')
      // window.location.href = '/'
      // window.sessionStorage.clear()
      // if (process.env.MODE === 'electron') {
      //   this.$q.electron.remote.getCurrentWindow().setSize(500, 490)
      //   this.$q.electron.remote.getCurrentWindow().center()
      // }
    },
    modalFormOk () {
      setTimeout(() => {
        this.logout()
      }, 1000)
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
    },
    getSubSys () {
      this.menuList = []
      // var menuLists = JSON.stringify(this.menuList)
      // console.log(menuLists)
      getSubSys().then(res => {
        if (res.code === 200) {
          // console.log(res.data)

          var menuInfo = {}
          res.data.map(item => {
            if (JSON.parse(item.remark)) {
              menuInfo = JSON.parse(item.remark)
              menuInfo[0].name = item.menuName
              menuInfo[0].url = item.path
              // if (item.menuName !== '后台管理') {
              this.menuList.push(menuInfo[0])
              // }
            }
          })

          console.log(this.menuList)
        }
      })
    },
    redirect (menu) {
      this[menu.redirect](menu.url)
    },
    redirectToUrl (url) {
      // const pathInfo = this.$router.resolve({
      //   path: url
      // })
      // window.open(pathInfo.href, '_blank')

      const token = localStorage.getItem('access_token')

      var index = window.location.href.lastIndexOf('8889')
      if (index > 0) {
        const pathInfo = this.$router.resolve({
          path: '/mall'
        })
        window.open(pathInfo.href, '_blank')
      } else {
        window.open(url + token, '_blank')
      }
    },
    openUrl (url) {
      const token = localStorage.getItem('access_token')
      window.open(url + token, '_blank')
    },
    openTmsUrl (url) {
      const token = localStorage.getItem('access_token')
      window.open(url + token, '_blank')
    },
    openAdminUrl (url) {
      const token = localStorage.getItem('access_token')
      window.open(url + token, '_blank')
    }
  }
}
</script>

<style scoped>
.hover-style:hover {
  filter: blur(1px);
}
.income {
  width: 100%;
  background: linear-gradient(to right, #68e4bc 0%, #4ad0d1 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 6px 6px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #0db4afb8;
  background-size: 200% auto;
}

.income:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #0db4afb8;
}

.expense {
  width: 100%;
  background: linear-gradient(to left, #fcac94 0%, #f3a183 98%);
  border-radius: 5px;
  font-size: 14px;
  padding: 6px 6px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #fca76c;
  background-size: 200% auto;
}

.expense:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #fca76c;
}

.total {
  width: 100%;
  background: linear-gradient(90deg, #f073c8 0%, #ff6a95 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 6px 6px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px rgba(240, 115, 200, 0.73);
  background-size: 200% auto;
}

.manager {
  width: 100%;
  background: linear-gradient(to right, #36d1dc 0%, #5b86e5 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 6px 6px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #36d1dc;
  background-size: 200% auto;
}

.manager:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #36d1dc;
}
.total:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px rgba(240, 115, 200, 0.73);
}
</style>
