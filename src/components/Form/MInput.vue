<!--
 :autofocus="toAutofocus"  newValue无值自动光标聚焦（弃用）
 :disable="readonly"  是否禁用
  outlined 轮廓线
 :type="type" 输入类型 text password textarea email search tel filen umber url time date
 :placeholder 显示文本
  dense 密集模式；占用更少的空间
  square 去除border-radius，使边界为正方形；覆盖“rounded”属性
  lazy-rules  如果设置为布尔真，则只有在字段第一次失去焦点后，它才会根据“rules”检查验证状态；如果设置为“ondemand”，则仅当手动调用组件的validate()方法或当包装器QForm提交自身时才会触发
 :error-message 验证错误消息（仅当“error”设置为“true”时显示）
  error  字段是否有验证错误
  slot：append  后置内部字段；建议：QIcon、QBtn
  -->
<template>
  <q-input
    :disable="readonly"
    v-model="newValue"
    class="q-pb-none"
    outlined
    :type="type"
    :placeholder="type==='String'?placeholder:''"
    dense
    square
    lazy-rules
    :rules="rules"
    :error-message="errorMessage"
    :error="error"
  >
    <template v-slot:append>
      <q-icon
        style="font-size: 16px;"
        v-if="(newValue!=null && newValue !== '')&&type==='String'"
        name="cancel"
        class="cursor-pointer"
        @click.prevent.stop="doClear"
      />
    </template>
  </q-input>
</template>
<script>
export default {
  name: 'MInput',
  data () {
    return {
      newValue: this.value,
      toAutofocus: this.handleAutofocus(this.autofocus)
    }
  },
  props: {
    type: {
      type: String,
      default: 'String',
      required: false
    },
    value: {
      type: [String, Number],
      required: false
    },
    rules: {
      type: [Object, Array],
      required: false
    },
    placeholder: {
      type: String,
      default: '请输入内容！',
      required: false
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false
    },
    square: {
      type: Boolean,
      default: true,
      required: false
    },
    errorMessage: {
      type: String,
      default: '',
      required: false
    },
    error: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  watch: {
    newValue () {
      this.$emit('input', this.newValue)
    }
  },
  methods: {
    // 是否聚集
    handleAutofocus (toAutofocus) {
      if (toAutofocus) {
        // 是否有值  判断是否聚焦
        if (this.value && this.value.length > 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    doClear () {
      this.newValue = ''
      this.$emit('input', this.newValue)
      //   const oldVal = this.value
      //   console.log('oldVal:' + oldVal)
      //   this.doInput(null)
      // this.$nextTick(() => {
      // this.$emit('clear', oldVal)
      // })
    },
    doInput (value) {
      this.newValue = value
      this.$emit('input', value)
    }
  }
}
</script>
