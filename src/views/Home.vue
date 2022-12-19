<template>
  <div class="home-page">
    <header class="header">
      <div class="lang" @click="toggleLang" role="button">
        <img v-if="lang === 'eng'" class="img" src="@/assets/img/ukFlag.png" />
        <img v-else class="img" src="@/assets/img/thaiFlag.png" />
        <span v-if="lang === 'eng'">English</span>
        <span v-else>Thai</span>
      </div>
      <h1>BookWell</h1>
      <button v-if="user" class="user" @click="goUser">
        <i class="far fa-user" />
      </button>
      <b-button variant="secondary" class="login-btn" v-else @click="signIn">
        Login
      </b-button>
    </header>
    <h2>
      Plan your health anywhere, anytime
    </h2>
    <div class="search-bar">
      <b-input-group size="lg">
        <b-form-input v-model="search" size="lg" placeholder="Search service or destination">
        </b-form-input>
        <b-input-group-append>
          <button @click="onSearch">
            <i class="fa fa-search"></i>
          </button>
        </b-input-group-append>
      </b-input-group>
      <!--<div class="filter-bar">
        <button class="filter">
          <i class="fa fa-filter"></i>
        </button>
      </div>-->
    </div>
    <ul class="cards">
      <li v-for="service in services" :key="`${service.id}_${service.partnerId}`">
        <ServiceCard :service="service" />
      </li>
    </ul>
  </div>
</template>

<script>
import ServiceCard from "@/components/ServiceCard"

export default {
  name: "Home",
  components: {
    ServiceCard
  },
  data() {
    return {
      search: '',
      destination: '',
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    lang () {
      return this.$store.state.lang
    },
    services() {
      return this.$store.getters.getAllServices
    }
  },
  methods: {
    onSearch() {
      // TODO
    },
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
};
</script>
