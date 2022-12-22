<template>
  <div v-if='isLoading' class="loader">
    <h1>BookWell</h1>
  </div>
  <div class="start-page" v-else>
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
</template>

<script>

export default {
  name: "Start",
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    signUp() {
      this.$router.push({ name: "SignUp" })
    },
    goHome() {
      this.$router.push({ name: "Home" })
    },
  },
  created() {
    if (!this.user) this.isLoading = false
    else this.goHome()
  }
};
</script>