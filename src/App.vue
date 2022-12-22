<template>
  <div id="app" class="app">
    <div v-if='$store.state.isLoading' class="loader">
      <h1>BookWell</h1>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { storeUser, getUser } from '@/helpers/localStorage'
import { getStart } from '@/api'

export default {
  name: "App",
  methods: {
    auth(user) {
      getStart(user)
      .then(({ data }) => {
        const { user } = data
        if (user) {
          storeUser(user)
          this.$store.commit('setUser', user)
        }
        this.$store.commit('setLoading', false)
      })
      .catch(error => console.log('ERROR', error))
    }
  },
  created() {
    const user = getUser()
    if (user) this.auth(user)
    else this.$store.commit('setLoading', false)
  }
}
</script>
