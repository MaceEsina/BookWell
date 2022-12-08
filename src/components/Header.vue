<template>
  <header class="header">
    <div class="lang" @click="toggleLang" role="button">
      <img v-if="lang === 'eng'" class="img" src="@/assets/img/ukFlag.png" />
      <img v-else class="img" src="@/assets/img/thaiFlag.png" />
    </div>
    <h1>BookWell</h1>
    <button v-if="user" class="user" @click="goUser">
      <i class="far fa-user" />
    </button>
    <b-button variant="primary" class="login" v-else @click="signIn">
      Login
    </b-button>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    user () {
      return this.$store.state.user
    },
    lang () {
      return this.$store.state.lang
    }
  },
  methods: {
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    goUser() {
      this.$router.push({ name: "User" })
    },
    toggleLang() {
      this.$store.commit('changeLanguage')
    }
  },
}
</script>