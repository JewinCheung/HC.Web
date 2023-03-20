<template>
  <q-dialog v-model="showDialog" maximized flat :persistent="!disableSubmit" position="right">
    <q-card style="width: 600px">
      <q-card-section class="qcs-from">
        <div class="flex justify-between align-center items-center qch-from">
          <span>{{title}}角色</span>
          <q-btn color="white" round flat icon="clear" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-scroll-area :thumb-style="thumbStyle" :style="computedStyle">
          <q-form class="full-width" ref="myForm">
            <div class="row q-gutter-y-sm q-my-md items-center">
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label class="qi-required" :class="{ 'text-right': $q.screen.gt.xs }">角色名称：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input
                    v-model="MED_ROLES.ROLE_NAME"
                    placeholder="角色名称"
                    :rules="[(val) => (val && val.length > 0) || '请输入角色名称！']"
                    :autofocus="true"
                  ></m-input>
                </q-item-label>
              </span>
            </div>
            <div class="row q-gutter-y-sm q-my-md items-center">
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label class="qi-required" :class="{ 'text-right': $q.screen.gt.xs }">角色编码：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input
                    v-model="MED_ROLES.ROLE_CODE"
                    placeholder="角色编码："
                    :rules="[(val) => (val && val.length > 0) || '请输入角色编码：！']"
                    :autofocus="true"
                  ></m-input>
                </q-item-label>
              </span>
            </div>
            <div class="row q-gutter-y-sm q-my-md items-start">
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">描述：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12">
                <q-item-label>
                  <q-input
                    class="q-pb-none"
                    style="height:75px"
                    outlined
                    type="textarea"
                    v-model="MED_ROLES.DESCRIPTION"
                    placeholder="请输入描述"
                    dense
                    square
                  ></q-input>
                </q-item-label>
              </span>
            </div>
          </q-form>
        </q-scroll-area>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pr-lg" style="height:52px">
        <q-btn label="取消" color="white" text-color="black" v-close-popup />
        <q-btn
          label="确认"
          color="primary"
          @click="handleOk"
          :loading="loading"
          :disable="disableSubmit"
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
import { addRole, editRole } from '@/api/api'
export default {
  name: 'RoleModal',
  data () {
    return {
      title: '操作',
      loading: false,
      disableSubmit: false,
      showDialog: false,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      MED_ROLES: {}
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
    add () {
      this.edit({})
    },
    edit (record) {
      this.showDialog = true
      this.MED_ROLES = Object.assign({}, record)
    },
    handleOk () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.submit()
        }
      })
    },
    submit () {
      this.loading = true
      let obj
      if (!this.MED_ROLES.ID) {
        obj = addRole(this.MED_ROLES)
      } else {
        obj = editRole(this.MED_ROLES)
      }
      obj
        .then(res => {
          if (res.success) {
            this.$message.success(res.msg)
            this.showDialog = false
            this.$emit('ok')
          } else {
            this.$message.warning(res.msg)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
