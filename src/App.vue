<template>
  <div id="app" :class="`app${$store.state.isLoading ? ' loader' : ''}`">
    <h1>BookWell</h1>
    <router-view />
  </div>
</template>

<script>
import { storeUser, getUser } from '@/helpers/localStorage'
import { getStart } from '@/api'

export default {
  name: "App",
  methods: {
    signIn() {
      if (this.$route.name !== 'SignIn')
        this.$router.push({ name: "SignIn" })
    },
    goStart() {
      if (this.$route.name !== 'Start')
        this.$router.push({ name: "Start" })
    },
    goHome() {
      const routeName = this.$route.name
      if (routeName === 'App' && routeName !== 'Home')
        this.$router.push({ name: "Home" })
    },
    auth(user) {
      getStart(user)
      .then(({ data }) => {
        const { user } = data
        if (user) {
          storeUser(user)
          this.goHome()
          this.$store.commit('setUser', user)
        } else this.signIn()
        this.$store.commit('setLoading', false)
      })
      .catch(error => console.log('ERROR', error))
    }
  },
  created() {
    const user = getUser()
    if (user) this.auth(user)
    else {
      this.$store.commit('setLoading', false)
      this.goStart()
    }
  }
}
</script>
