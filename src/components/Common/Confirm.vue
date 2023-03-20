<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section class="row items-center q-ml-lg q-mt-lg" style="min-width: 400px;">
        <q-avatar :icon="icon" color="brown" text-color="white" />
        <span class="q-ml-md">{{msg}}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn outline label="取消"  color="teal"  @click="onCancelClick" />
        <q-btn label="确定" color="teal" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    msg: String,
    icon: {
      type: String,
      default: 'mdi-delete-variant'
    }
  },
  methods: {
    // 以下方法是必需的
    // (不要改变它的名称 --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // 以下方法是必需的
    // (不要改变它的名称 --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // QDialog发出“hide”事件时
      // 需要发出
      this.$emit('hide')
    },

    onOKClick () {
      // 按OK，在隐藏QDialog之前
      // 发出“ok”事件（带有可选的有效负载）
      // 是必需的
      this.$emit('ok')
      // 或带有有效负载：this.$emit('ok', { ... })

      // 然后隐藏对话框
      this.hide()
    },

    onCancelClick () {
      // 我们只需要隐藏对话框
      this.hide()
    }
  }
}
</script>
