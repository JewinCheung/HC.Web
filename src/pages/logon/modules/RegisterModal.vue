<template>
  <q-dialog v-model="showDialog" flat :persistent="!disableSubmit">
    <q-card style="width: 800px; max-width: 800px; overflow: auto">
      <q-card-section
        class="q-pa-none text-bold bg-teal-5"
        style="color: white"
      >
        <div class="flex justify-between flex-center">
          <div class="q-py-md q-pl-md col">
            <span style="font-size: 16px; font-weight: bold"> 注册 </span>
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
              v-model="customer.name"
              style="padding-bottom: 10px"
              label="客户名称"
              :rules="[$inputRules.requiredNull]"
            />
            <q-input
              outlined
              clearable
              v-model="customer.registrationNo"
              style="padding-bottom: 10px"
              label="纳税人登记号"
              :rules="[$inputRules.requiredNull]"
            />

            <!-- <q-select
              clearable
              outlined
              v-model="customer.areacl"
              use-input
              input-debounce="0"
              label="输入-地区分类-检索"
              :options="options"
              @filter="filterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> 无结果 </q-item-section>
                </q-item>
              </template>
            </q-select> -->

            <q-field
              outlined
              v-model="customer.areacl"
              label="地区分类"
              :rules="[$inputRules.requiredNull]"
              stack-label
              style="padding-bottom: 10px"
            >
              <template v-slot:control>
                <v-distpicker
                  :placeholders="placeholders"
                  @province="onChangeProv"
                  @city="onChangeCity"
                  @area="onChangeArea"
                />
              </template>
            </q-field>

            <q-input
              outlined
              v-model="customer.address"
              style="padding-bottom: 10px"
              :rules="[$inputRules.requiredNull]"
              label="地址"
            />
            <!-- <q-file
              ref="selectImg"
              v-model="filesImages"
              outlined
              label="选择营业执照"
              multiple
              accept=".jpg, image/*"
              @rejected="onRejected"
            /> -->
            <q-input
              outlined
              v-model="customer.referrerName"
              style="padding-bottom: 10px"
              label="推荐人姓名"
              :rules="[$inputRules.requiredNull]"
            />
            <!-- <q-input
              outlined
              v-model="customer.referrerNo"
              style="padding-bottom: 10px"
              label="推荐人账号"
            /> -->
            <m-file-image
              ref="mFileForm"
              :url="$global.getImgUrl(customer.picPath)"
              @changeUrl="changeUrl"
              :rules="[$inputRules.requiredNull]"
              label="请选择营业执照"
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
import { register, registerUpload } from '@/api/api'
import VDistpicker from 'v-distpicker'
const stringOptions = [
  '北京市市辖区',
  '北京市东城区',
  '北京市西城区',
  '北京市崇文区',
  '北京市朝阳区'
]
export default {
  name: 'RegisterModal',
  components: { VDistpicker },
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
      customer: {
        registrationNo: '',
        name: '',
        areacl: '',
        referrerName: '',
        address: '',
        picPath: ''
      },
      filesImages: null,
      url: '',
      options: stringOptions,
      placeholders: {
        province: '省',
        city: '市',
        area: '区'
      },
      tempProvince: '',
      tempCity: ''
    }
  },
  watch: {
    // filesImages: {
    //   immediate: true,
    //   handler (newVal, oldVal) {
    //     this.changeImage(newVal)
    //   }
    // }
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
    onChangeProv (e) {
      this.customer.areacl = e.code
      this.tempProvince = e.value
    },
    onChangeCity (e) {
      this.customer.areacl = e.code
      if (e.value !== this.tempProvince) {
        this.tempCity = e.value
      }
    },
    onChangeArea (e) {
      this.customer.areacl = e.code
    }, //
    changeUrl (url) {
      this.customer.picPath = url
    },

    add () {
      this.edit({ areacl: '', picPath: '' })
    },
    edit (record) {
      this.showDialog = true
      this.customer = Object.assign({}, record)
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
      if (this.$refs.mFileForm.imgFile) {
        // 创建 formData 对象
        const formData = new FormData()
        // 向 formData 对象中添加文件
        formData.append('file', this.$refs.mFileForm.imgFile)
        registerUpload(formData).then(resFile => {
          this.customer.picPath = resFile.data.fileName
          register(this.customer)
            .then(res => {
              if (res.code === 200) {
                this.$message.alert('注册成功，请等待管理员审核', '注册成功')
                this.showDialog = false
              } else {
                this.$message.warning(res.msg)
              }
            })
            .finally(() => {
              this.loading = false
            })
        })
      }
    },
    submit1 () {
      this.loading = true
      if (this.$refs.mFileForm.imgFile) {
      }
      // let obj
      // if (!this.MED_ROLES.ID) {
      //   obj = addRole(this.MED_ROLES)
      // } else {
      //   obj = editRole(this.MED_ROLES)
      // }
      // obj
      //   .then(res => {
      //     if (res.success) {
      //       this.$message.success(res.msg)
      //       this.showDialog = false
      //       this.$emit('ok')
      //     } else {
      //       this.$message.warning(res.msg)
      //     }
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} 文件没有通过验证`
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
