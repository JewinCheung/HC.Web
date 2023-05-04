<template>
  <div
    class="flex justify-center items-center q-electron-drag login-background-img"
    style="height: 100%"
  >
    <div
      class="row login-card-shadow electron-hide "
      style="width: 55vw;min-width: 300px"
    >
      <div
        class="col-4 flex justify-center items-center"
        style="background-color: #36d1dc"
        :style="{ height: win_height - 270 + 'px' }"
        v-show="$q.screen.gt.sm"
      >
        <!-- style="background-color: rgb(52, 144, 220);" -->
        <q-skeleton type="text" height="70%" width="50%" v-if="!isLottieF" />
        <lottie-web-cimo
          align="right"
          style="height: 70%,"
          :path="defaultOptions.path"
          @isLottieFinish="handleFinish"
        />
      </div>
      <q-separator vertical inset v-if="$q.screen.gt.sm" />
      <div
        class="col flex justify-center items-center"
        style="width: 55%; margin: auto;"
      >
        <q-card
          :style="$q.platform.is.desktop ? 'width:55%;' : ''"
          class="no-shadow"
        >
          <q-card-section class="items-center" align="center">
            <h5 class="">Welcome Aboard</h5>
            <!-- 用户名 -->
            <q-input
              class="logon-input"
              clearable
              standout="bg-cyan text-white"
              bottom-slots
              v-model="username"
              label="账号"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
            <!-- 密码 -->
            <q-input
              class="logon-input"
              standout="bg-cyan text-white"
              bottom-slots
              v-model="password"
              label="密码"
              :type="isPwd ? 'password' : 'text'"
              hint=""
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- 登录按钮 -->
            <q-btn
              :loading="loading"
              class="logon-btn bg-logon-card-input"
              text-color="white"
              unelevated
              label=""
              style="font-size: large;"
              @click="logon"
              >登 录 系 统
            </q-btn>
            <div class="row justify-between" style="margin-bottom: 20px;">
              <q-btn flat label="忘记密码" />
              <q-btn outline label="我要注册" @click="handleAdd()" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- electron 登录 -->
    <div
      class="row electron-only q-electron-drag base-card-shadow"
      style="width: 55vw;min-width: 300px;"
    >
      <div
        class="col-4 flex justify-center items-center "
        style="background-color: #36d1dc"
        :style="{ height: win_height - 270 + 'px' }"
        v-show="$q.screen.gt.sm"
      >
        <q-skeleton type="text" height="70%" width="40%" v-if="!isLottieF" />
        <lottie-web-cimo
          align="right"
          style="height: 70%,"
          :path="defaultOptions.path"
          @isLottieFinish="handleFinish"
        />
      </div>
      <q-separator vertical inset v-if="$q.screen.gt.sm" />
      <div class="col flex justify-center items-center">
        <q-card
          :style="$q.platform.is.desktop ? 'width:55%;' : ''"
          class="no-shadow"
        >
          <q-card-section class="items-center" align="center">
            <h5 class="">Welcome Aboard</h5>
            <!-- 用户名 -->
            <q-input
              class="logon-input q-electron-drag--exception"
              clearable
              standout="bg-cyan text-white"
              bottom-slots
              v-model="username"
              label="账号"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
            <!-- 密码 -->
            <q-input
              class="logon-input q-electron-drag--exception"
              standout="bg-cyan text-white"
              bottom-slots
              v-model="password"
              label="密码"
              :type="isPwd ? 'password' : 'text'"
              hint=""
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- 登录按钮 -->
            <q-btn
              :loading="loading"
              class="logon-btn bg-logon-card-input"
              text-color="white"
              unelevated
              label=""
              style="font-size: large;"
              @click="logon"
              >登 录 系 统
            </q-btn>
            <div class="row justify-between" style="margin-bottom: 20px;">
              <q-btn flat label="忘记密码" />
              <q-btn outline label="我要注册" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- electron end -->
    <RegisterModal ref="modalForm" @ok="modalFormOk"></RegisterModal>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import LottieWebCimo from '../../components/LottieWebCimo/LottieWebCimo'
import { timeFix } from '../../utils/util'
import RegisterModal from './modules/RegisterModal'
export default {
  name: 'logon',
  components: { LottieWebCimo, RegisterModal },
  data () {
    return {
      isPwd: true,
      username: '',
      password: '',
      defaultOptions: {
        path: this.$PUBLIC_PATH + 'data/imprint-genius.json',
        loop: true
      },
      loading: false,
      percentage: 0,
      isLottieF: false
    }
  },
  mounted () {
    if (process.env.MODE === 'electron') {
      const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
      win.maximize()
    }
  },
  computed: {
    win_width () {
      return this.$q.screen.width - 59
    },
    win_height () {
      return this.$q.screen.height - 0
    }
  },
  methods: {
    ...mapActions(['Login', 'GetUserInfo']),
    logon () {
      this.loading = !this.loading
      if (this.username !== '' && this.password !== '') {
        const loginParams = {}
        loginParams.username = this.username.trim()
        loginParams.password = this.password.trim()

        this.Login(loginParams)
          .then(res => {
            this.loginSuccess(res)
          })
          .catch(err => {
            this.requestFailed(err)
          })
      } else {
        this.loading = !this.loading
        this.$q.notify({
          icon: 'announcement',
          type: 'warning',
          message: '账号或密码不能为空',
          actions: [{ icon: 'close', color: 'black' }]
        })
      }
    },
    loginSuccess (res) {
      if (res.code === 200) {
        // sessionStorage.setItem('access_token', 972784674)
        // sessionStorage.setItem('user_role', this.username)
        this.getUserInfo()
      } else {
        this.requestFailed(res)
      }
    },
    requestFailed (err) {
      this.$q.notify({
        icon: 'announcement',
        type: 'warning',
        message: '登录失败',
        caption: err.msg || '请求出现错误，请稍后再试',
        actions: [{ icon: 'close', color: 'black' }]
      })
      this.loading = !this.loading
    },
    getUserInfo () {
      this.GetUserInfo()
        .then(res => {
          console.log(res)
          this.$router.push('/').then(e => {
            this.$q.notify({
              icon: 'insert_emoticon',
              // color: 'teal',
              type: 'info',
              message: `${timeFix()}，欢迎回来`
            })

            this.loading = !this.loading
          })
        })
        .catch(err => {
          this.$q.notify({
            icon: 'announcement',
            type: 'warning',
            message: '无法获取用户信息',
            caption: err.msg,
            actions: [{ icon: 'close', color: 'black' }]
          })
        })
    },
    handleFinish (e) {
      this.isLottieF = e
    },
    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },
    setting () {
      console.log(Vue.prototype.$baseURL)
    },
    handleAdd () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    modalFormOk () {}
  }
}
</script>

<style scoped>
.login-background-img {
  background-image: url("../../../public/data/login_bg.png");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
.logon-btn {
  font-size: large;
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
}

.bg-logon-card-input {
  background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-logon-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
