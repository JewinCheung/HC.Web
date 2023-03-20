<template>
  <div>
    <q-file
      v-model="file"
      color="teal"
      outlined
      :disable="disable"
      :label="label"
      :rules="rules"
      accept=".jpg, image/*"
    >
      <template v-slot:append>
        <q-icon name="cloud_upload" />
      </template>
      <q-inner-loading
        :showing="loading"
        :label="loadingLabel"
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-file>
    <div
      class="row items-start justify-center q-mt-sm"
      v-show="url != null && url != ''"
    >
      <q-img
        spinner-color="primary"
        :src="url"
        class="cursor-pointer"
        style="height: 150px; width: 200px"
        @click="$hevueImgPreview(url)"
      >
        <q-tooltip transition-show="scale" transition-hide="scale">点击查看大图</q-tooltip>
      </q-img>
      <q-btn round flat @click="del()" v-if="!disable" class="q-ml-sm">
        <q-icon name="delete" />
      </q-btn>
    </div>
  </div>
</template>
<script>
import { compressImage } from '@/utils/util'
export default {
  name: 'MFileImage',
  data () {
    return {
      loading: false,
      loadingLabel: '',
      file: null,
      imgFile: null,
      thumbImgFile: null
    }
  },
  props: {
    label: {
      type: String,
      default: '请选择图片',
      required: false
    },
    url: {
      type: String,
      required: false
    },
    disable: {
      type: Boolean,
      default: false,
      required: false
    },
    clearUrl: {
      type: Function,
      default: null
    },
    rules: {
      type: [Object, Array],
      required: false
    }
  },
  watch: {
    file: {
      handler (newValue, oldValue) {
        this.changeImage(newValue)
      }
    }
  },
  methods: {
    del () {
      this.file = null
      this.imgFile = null
      this.thumbImgFile = null
      this.parentChangeUrl('')
      // debugger
      // this.file = null
      // this.url = ''
      // if (this.clearUrl != null) {
      //   this.clearUrl(this.url)
      // }
    },
    changeImage () {
      if (this.file != null) {
        if (this.file.size > 5242880 * 4) {
          this.$message.warning('文件大小不能大于20M')
          this.file = null
          return
        }
        var that = this
        this.loading = true
        console.log(this.file)
        this.getBase64(this.file).then(res => {
          that.loadingLabel = '原图压缩中'
          // 原图压缩
          compressImage(res, 300, base64 => {
            that.imgFile = that.base64ToFile(base64)
            console.log(that.imgFile)
            // 缩略图压缩
            that.loadingLabel = '生成缩略图'
            compressImage(base64, 60, thumbBase64 => {
              that.thumbImgFile = that.base64ToFile(thumbBase64)
              that.loadingLabel = '加载中'
              var reader = new FileReader()
              reader.readAsDataURL(that.imgFile)
              reader.onload = function (e) {
                that.loading = false
                that.parentChangeUrl(this.result)
                // that.url = this.result
                // console.log(that.url)
              }
            })
          })
        })
      } else {
        this.parentChangeUrl('')
      }
    },
    parentChangeUrl (url) {
      this.$emit('changeUrl', url)
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          fileResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(fileResult)
        }
      })
    },
    base64ToFile (dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], 'filename', { type: mime })
    }
  }
}
</script>
