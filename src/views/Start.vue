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
          <b-link href="/sigin">Sign in</b-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const DEPLOY_ID = 'AKfycbwwsr8sF6KlD8gZpgDHi6nWy7HTCvxbyhVhjmWqv0amUfBxhwC2fu5OF4GFYhnlIxfDag'

export default {
  name: "Start",
  data() {
    return {
      user: null,
      isLoading: true,
      api: `https://script.google.com/macros/s/${DEPLOY_ID}/exec`
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
      axios.get(`${this.api}?session=${session}`)
      .then(({ data }) => {
        const { user } = data
        if (user) {
          this.$router.push({
            name: "Home",
            params: { user }
          })
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