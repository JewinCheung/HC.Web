<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import MInput from '@/components/Form/MInput'
import MTree from '@/components/Form/MTree'
import MFileImage from '@/components/Form/MFileImage'
// 字典数据组件
import DictData from '@/components/DictData'
import inputRules from 'src/utils/inputRules'
import global from 'src/utils/global'
import hevueImgPreview from 'hevue-img-preview'
import { getDicts } from '@/api/api'
Vue.use(hevueImgPreview, {
  keyboard: true,
  clickMaskCLose: true
})
Vue.prototype.getDicts = getDicts
Vue.prototype.$inputRules = inputRules
Vue.prototype.$global = global
Vue.component(MInput.name, MInput)
Vue.component(MTree.name, MTree)
Vue.component(MFileImage.name, MFileImage)
DictData.install()
export default {
  name: 'App'
}
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/transition.css";
@import "./assets/css/cimo.css";
</style>
