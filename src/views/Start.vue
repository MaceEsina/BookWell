<template>
  <div class="start-page">
    <div v-if='isLoading' class="loader">
      <h1>BookWell</h1>
    </div>
    <div v-else class="intro">
      <h1>BookWell</h1>
      <img class="img" src="@/assets/img/start.png">
      <p>
        Plan your health anytime, anywhere
      </p>
      <div class="btns-container">
        <b-button block pill variant="primary" @click="signUp">
          Create an account
        </b-button>
        <b-button block pill variant="secondary" @click="goHome">
          Continue as Guest
        </b-button>
        <p>
          Already on wellbeing?
          <b-link href="/signin">Sign In</b-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getStart } from '@/api'
import { storeUser, getUser } from '@/helpers/localStorage'

export default {
  name: "Start",
  data() {
    return {
      user: null,
      isLoading: true,
    }
  },
  methods: {
    signUp() {
      this.$router.push({ name: "SignUp" })
    },
    goHome() {
      this.$router.push({ name: "Home" })
    },
    auth(user) {
      getStart(user)
      .then(({ data }) => {
        const { user } = data
        if (user) {
          storeUser(user)
          this.$store.commit('setUser', user)
          this.goHome()
        } else this.isLoading = false
      })
      .catch(error => console.log('ERROR', error))
    }
  },
  mounted() {
    const user = getUser()
    if (user) this.auth(user)
    else this.isLoading = false
  }
};
</script>