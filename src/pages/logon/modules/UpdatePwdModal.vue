<template>
  <q-dialog v-model="showDialog" flat >
    <q-card style="width: 500px; max-width: 500px; overflow: auto">
      <q-card-section
        class="q-pa-none text-bold bg-teal-5"
        style="color: white"
      >
        <div class="flex justify-between flex-center">
          <div class="q-py-md q-pl-md col">
            <span style="font-size: 16px; font-weight: bold"> 修改密码 </span>
          </div>
          <q-btn color="white" round flat icon="fa fa-times" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form class="full-width" ref="myForm">
          <div class="column q-pa-md q-gutter-sm">
            <q-input
              outlined
              clearable
              v-model="pwdform.oldPassword"
              type="password"
              style="padding-bottom: 10px"
              label="旧密码"
              :rules="[$inputRules.requiredNull]"
            />
            <q-input
              outlined
              clearable
              v-model="pwdform.newPassword"
              type="password"
              style="padding-bottom: 10px"
              label="新密码"
              :rules="[$inputRules.requiredNull]"
            />
            <q-input
              outlined
              clearable
              v-model="pwdform.password"
              type="password"
              style="padding-bottom: 10px"
              label="确认新密码"
              :rules="[$inputRules.requiredNull]"
            />
          </div>
        </q-form>
        <q-separator />
      </q-card-section>
      <q-card-actions class="q-pr-lg" style="height: 52px">
        <!-- <q-btn label="关闭" color="white" text-color="black" v-close-popup /> -->
        <q-space />
        <q-btn
          label="提交"
          color="teal-5"
          @click="handleOk"
          :loading="loading"
        />
      </q-card-actions>
      <template v-if="loading">
        <slot name="loading">
          <q-inner-loading showing color="primary" />
        </slot>
      </template>
    </q-card>
  </q-dialog>
</template>
<script>
import { updatePwd } from '@/api/api'
export default {
  name: 'UpdatePwdModal',
  data () {
    return {
      title: '操作',
      loading: false,
      showDialog: false,
      pwdform: {
        oldPassword: '',
        newPassword: '',
        password: ''
      }
    }
  },

  computed: {
    computedStyle () {
      let height = 'auto'
      // if (this.$q.fullscreen.isActive) {
      //   height = '87vh'
      // }
      let sub = '- 60px ' // 头部高度
      sub += '- 36px ' // 表单上下空隙高度
      sub += '- 52px ' // 底部按钮

      height = 'calc(100vh ' + sub + ')'
      return 'height:' + height + ';'
    }
  },
  methods: {
    show () {
      this.showDialog = true
      this.pwdform = {}
    },

    handleOk () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          if (this.pwdform.newPassword.trim() === this.pwdform.password.trim()) {
            this.submit()
          } else {
            this.$message.warning('两次新密码不一致！')
          }
        }
      })
    },
    submit () {
      updatePwd(this.pwdform).then(res => {
        if (res.code === 200) {
          this.$message.success('修改密码成功,请重新登录！')

          this.$emit('ok')

          this.showDialog = false
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
