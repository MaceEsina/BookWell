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

export default {
  name: "Start",
  data() {
    return {
      user: null,
      isLoading: true,
    }
  },
  methods: {
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    signUp() {
      this.$router.push({ name: "SignUp" })
    },
    auth(session) {      
      getStart(session)
      .then(({ data }) => {
        const { user } = data
        if (user) {
          // this.$router.push({
          //   name: "Home",
          //   params: { user }
          // })
        }
        this.isLoading = false
      })
      .catch(error => console.log('ERROR', error))
    }
  },
  mounted() {
    const session = localStorage.getItem('session');
    if (session) this.auth(session)
    else this.isLoading = false
  }
};
</script>