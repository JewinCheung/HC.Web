<template>
  <base-content>
    <h1>{{ msg }}</h1>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
export default {
  name: 'DictList',
  components: { BaseContent },
  data () {
    return {
      msg: 'DictList'
    }
  }
}
</script>
