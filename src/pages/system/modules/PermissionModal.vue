<template>
  <q-dialog v-model="showDialog" maximized flat :persistent="!disableSubmit" position="right">
    <q-card style="width: 600px">
      <q-card-section class="qcs-from">
        <div class="flex justify-between align-center items-center qch-from">
          <span>{{title}}</span>
          <q-btn color="grey-7" round flat icon="clear" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section :style="computedStyle">
        <q-scroll-area :thumb-style="thumbStyle" style="height: 84.5vh;">
          <q-form class="full-width" ref="myForm">
            <div class="row q-gutter-y-sm q-my-md items-center">
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">菜单类型：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <q-btn-toggle
                    readonly
                    v-model="MED_PERMISSION.MENU_TYPE"
                    toggle-color="primary"
                    :options="menuType"
                  />
                </q-item-label>
              </span>
            </div>
            <div class="row q-gutter-y-sm q-my-md items-center">
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label
                  class="qi-required"
                  :class="{ 'text-right': $q.screen.gt.xs }"
                >{{MED_PERMISSION.MENU_TYPE===2?'按钮/权限':'菜单名称'}}：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input
                    v-model="MED_PERMISSION.TITLE"
                    placeholder="请输入名称"
                    errorMessage="请输入名称"
                    :error="!isValid_TITLE"
                  ></m-input>
                  <!-- <q-input
                    v-model="form.name"
                    class="q-pb-none"
                    outlined
                    placeholder="请输入菜单名称"
                    dense
                    square
                    :rules="[(val) => (val && val.length > 0) || '请输入菜单名称！']"
                    :autofocus="true"
                  >
                    <template v-slot:append>
                      <q-icon
                        style="font-size: 16px;"
                        v-if="form.name !== ''"
                        name="cancel"
                        class="cursor-pointer"
                        @click="form.name = ''"
                      />
                    </template>
                  </q-input>-->
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=0"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label class="qi-required" :class="{ 'text-right': $q.screen.gt.xs }">上级菜单：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input
                    v-model="MED_PERMISSION.parent.name"
                    placeholder="请选择上级菜单"
                    errorMessage="请选择上级菜单"
                    :error="!isValid_PARENT_ID"
                    :readonly="true"
                  ></m-input>
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label class="qi-required" :class="{ 'text-right': $q.screen.gt.xs }">访问路径：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input
                    v-model="MED_PERMISSION.PATH"
                    placeholder="请输入访问路径"
                    :rules="[(val) => (val && val.length > 0) || '请输入访问路径！']"
                    :autofocus="true"
                  ></m-input>
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label class="qi-required" :class="{ 'text-right': $q.screen.gt.xs }">前端组件：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input
                    v-model="MED_PERMISSION.COMPONENT"
                    placeholder="请输入前端组件"
                    :rules="[(val) => (val && val.length > 0) || '请输入前端组件！']"
                    :autofocus="true"
                  ></m-input>
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE===2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">授权标识：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input v-model="MED_PERMISSION.PERMS" placeholder="请输入授权标识"></m-input>
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE===2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">授权策略：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <q-radio size="sm" v-model="MED_PERMISSION.PERMS_TYPE" :val="1" label="可见/可访问" />
                  <q-radio
                    size="sm"
                    v-model="MED_PERMISSION.PERMS_TYPE"
                    :val="2"
                    label="可编辑(未授权时禁用)"
                  />
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE===2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">状态：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <q-radio size="sm" v-model="MED_PERMISSION.STATUS" :val="1" label="有效" />
                  <q-radio size="sm" v-model="MED_PERMISSION.STATUS" :val="0" label="无效" />
                </q-item-label>
              </span>
            </div>

            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE==0"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">菜单图标：</q-item-label>
              </span>
              <span class="col-sm-9 col-xs-12 field-from">
                <q-item-label>
                  <m-input v-model="MED_PERMISSION.ICON" placeholder="请输入菜单图标"></m-input>
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">排序：</q-item-label>
              </span>
              <span class="col-sm-2 col-xs-12 field-from">
                <q-item-label>
                  <m-input v-model="MED_PERMISSION.SORT" type="number"></m-input>
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
                    v-model="MED_PERMISSION.DESCRIPTION"
                    placeholder="请输入描述"
                    dense
                    square
                  ></q-input>
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">隐藏路由：</q-item-label>
              </span>
              <span class="col-sm-2 col-xs-12 field-from">
                <q-item-label>
                  <q-toggle v-model="MED_PERMISSION.IS_HIDDEN" />
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">是否缓存：</q-item-label>
              </span>
              <span class="col-sm-2 col-xs-12 field-from">
                <q-item-label>
                  <q-toggle v-model="MED_PERMISSION.IS_KEEP_ALIVE" />
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">聚合路由：</q-item-label>
              </span>
              <span class="col-sm-2 col-xs-12 field-from">
                <q-item-label>
                  <q-toggle v-model="MED_PERMISSION.ALWAYS_SHOW" />
                </q-item-label>
              </span>
            </div>
            <div
              class="row q-gutter-y-sm q-my-md items-center"
              v-show="MED_PERMISSION.MENU_TYPE!=2"
            >
              <span class="col-sm-2 col-xs-12" :class="{ 'justify-end': $q.screen.gt.xs }">
                <q-item-label :class="{ 'text-right': $q.screen.gt.xs }">是否展开：</q-item-label>
              </span>
              <span class="col-sm-2 col-xs-12 field-from">
                <q-item-label>
                  <q-toggle v-model="MED_PERMISSION.IS_OPEN" />
                </q-item-label>
              </span>
            </div>
          </q-form>
        </q-scroll-area>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pr-lg">
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
import { addPermission, editPermission } from '@/api/api'
export default {
  name: 'PermissionModal',
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
      menuType: [
        { label: ' 一级菜单 ', value: 0 },
        { label: ' 子菜单 ', value: 1 },
        { label: ' 按钮/权限 ', value: 2 }
      ],
      MED_PERMISSION: {
        parent: {}
      }
    }
  },
  computed: {
    computedStyle () {
      let height = '87.5vh'
      if (this.$q.fullscreen.isActive) {
        height = '89vh'
      }
      return 'height:' + height + ';'
    },
    isValid_PARENT_ID () {
      // console.log(this.$q.fullscreen.isActive)
      return (
        this.MED_PERMISSION.PARENT_ID &&
        this.MED_PERMISSION.PARENT_ID.length > 0
      )
    },
    isValid_TITLE () {
      return this.MED_PERMISSION.TITLE && this.MED_PERMISSION.TITLE.length > 0
    }
  },
  methods: {
    add (type, record) {
      this.edit({
        SORT: 10,
        MENU_TYPE: type,
        PERMS_TYPE: 1,
        STATUS: 1,
        parent: { name: '' }
      })
      if (type !== 0) {
        this.edit({
          SORT: record.SORT,
          MENU_TYPE: type,
          PERMS_TYPE: 1,
          STATUS: 1,
          PARENT_ID: record.ID,
          parent: { name: record.TITLE }
        })
      }
    },
    edit (record) {
      this.showDialog = true
      this.MED_PERMISSION = Object.assign({}, record)
      // console.log(this.MED_PERMISSION)
    },
    handleOk () {
      // this.$refs.dialog.hide()

      // 一级菜单验证
      if (this.MED_PERMISSION.MENU_TYPE === 0) {
        if (this.isValid_TITLE) {
          this.$refs.myForm.validate().then(success => {
            if (success) {
              // console.log(this.MED_PERMISSION)

              this.submitPermission()
            }
          })
        }
      }
      // 子级菜单验证
      if (this.MED_PERMISSION.MENU_TYPE === 1) {
        if (this.isValid_TITLE && this.isValid_PARENT_ID) {
          this.$refs.myForm.validate().then(success => {
            if (success) {
              // console.log(this.MED_PERMISSION)

              this.submitPermission()
            }
          })
        }
      }
      // 按钮/权限 验证
      if (this.MED_PERMISSION.MENU_TYPE === 2) {
        if (this.isValid_TITLE && this.isValid_PARENT_ID) {
          // console.log(this.MED_PERMISSION)

          this.submitPermission()
        }
      }
    },
    submitPermission () {
      this.loading = true
      let obj
      if (!this.MED_PERMISSION.ID) {
        obj = addPermission(this.MED_PERMISSION)
      } else {
        obj = editPermission(this.MED_PERMISSION)
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
