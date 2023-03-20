<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-toolbar-title shrink class="row text-weight-bold items-center no-wrap">
      <!-- <img src="http://e.mdsd.cn:9000/Image/logo/logo170x50.png" />-->
      <span class="q-ml-sm">{{title}}</span>
    </q-toolbar-title>
  </q-btn>
</template>

<script>
export default {
  name: 'ToolbarTitle',
  data () {
    return {
      title: 'HC'
    }
  }
}
</script>
