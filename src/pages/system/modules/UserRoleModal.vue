<template>
  <q-dialog v-model="showDialog" maximized flat position="right" @hide="close">
    <q-card style="width: 500px">
      <q-card-section class="qcs-from">
        <div class="flex justify-between align-center items-center qch-from">
          <span>角色授权</span>
          <q-btn color="white" round flat icon="clear" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-scroll-area :thumb-style="thumbStyle" :style="computedStyle">
          <m-tree
            ref="treelist"
            class="col-12"
            :nodes="treeData"
            node-key="ID"
            label-key="TITLE"
            children-key="Children"
            tick-strategy="leaf-any-with-parent"
            :ticked.sync="tickedSync"
          />
        </q-scroll-area>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pr-lg" style="height:52px">
        <q-btn label="取消" color="white" text-color="black" v-close-popup />
        <q-btn
          label="确认"
          color="primary"
          @click="handleSubmit"
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
import {
  getPermissionTree,
  getPermissionIdsByRoleId,
  saveRolePermission
} from '@/api/api'
export default {
  name: 'UserRoleModal',
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
      roleId: '',
      treeData: [],

      tickedSync: []
    }
  },
  computed: {
    computedStyle () {
      let height = 'auto'
      let sub = '- 60px ' // 头部高度
      sub += '- 36px ' // 表单上下空隙高度
      sub += '- 52px ' // 底部按钮

      height = 'calc(100vh ' + sub + ')'
      return 'height:' + height + ';'
    }
  },
  methods: {
    show (roleId) {
      this.roleId = roleId
      this.showDialog = true
      this.loadData()
    },
    close () {
      this.showDialog = false
      this.tickedSync = []
    },
    loadData () {
      this.loading = true
      const params = {
        roleId: this.roleId
      }
      Promise.all([this.getTree(), this.getTicked(params)])
        .then(res => {
          const [tree, ticked] = res
          this.treeData = tree
          this.tickedSync = ticked
          this.$nextTick(() => {
            this.$refs.treelist.expandAll()
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = true
        })
    },
    handleSubmit () {
      console.log(this.tickedSync)
      const params = {
        roleId: this.roleId,
        permissionIds: this.tickedSync
      }
      saveRolePermission(params)
        .then(res => {
          if (res.success) {
            this.$message.success(res.msg)
            this.close()
          } else {
            this.$message.warning(res.msg)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getTree () {
      return new Promise((resolve, reject) => {
        getPermissionTree().then(res => {
          if (res.success) {
            resolve(res.response)
          }
        })
      })
    },
    getTicked (roleId) {
      return new Promise((resolve, reject) => {
        getPermissionIdsByRoleId(roleId).then(res => {
          if (res) {
            resolve(res)
          }
        })
      })
    }
  }
}
</script>
