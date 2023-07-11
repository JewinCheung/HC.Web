<template>
  <div>
    <q-inner-loading showing color="primary" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  name: 'autologin',
  data () {
    return {

    }
  },
  mounted () {
    this.login()
  },
  methods: {
    ...mapActions(['GetUserInfo']),
    onSubmit () {
      this.login()
    },
    login () {
      var index = this.$route.fullPath.lastIndexOf('token=')
      if (index > 0) {
        var tempToken = this.$route.fullPath.substring(index + 6)
        localStorage.setItem('access_token', tempToken)
        localStorage.setItem('user_role', 'Admin')
        this.GetUserInfo()
          .then(res => {
            this.$router.push('/mall').then(e => {

            })
          })
          .catch(() => {
            this.$router.push('/login').then(e => {

            })
          })
      }
    }
  }
}
</script>
