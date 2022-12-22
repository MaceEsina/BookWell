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
      <UserButton v-if="user" />
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
        <ServiceCard :service="service" @onBookClick="onBookClick(service)" />
      </li>
    </ul>
    <DatesModal v-if="service"
      :service="service"
      @onSelect="setSelectedDate"
      @onSubmit="showBookModal" />
    <BookModal v-if="service"
      :service="service"
      :location="service.location"
      :bookDate="bookDate"
      @onSelect="showDateModal"/>
  </div>
</template>

<script>
import UserButton from "@/components/UserButton"
import ServiceCard from "@/components/ServiceCard"
import BookModal from "@/components/modals/BookModal"
import DatesModal from "@/components/modals/DatesModal"
import { parseDate } from '@/helpers/dates'

export default {
  name: "Home",
  components: {
    UserButton,
    ServiceCard,
    BookModal,
    DatesModal
  },
  data() {
    return {
      search: '',
      service: null,
      selectedDate: '',
      selectedTime: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    lang() {
      return this.$store.state.lang
    },
    services() {
      return this.$store.getters.getAllServices
    },
    isDateSelected() {
      if (!this.service) return false
      return !!(this.service.time ? this.selectedTime : this.selectedDate)
    },
    bookDate() {
      let date = ''
      if (this.isDateSelected) {
        date = parseDate(this.selectedDate)
        if (this.selectedTime) date += ` at ${this.selectedTime}`
      }
      return date
    }
  },
  methods: {
    parseDate,
    onSearch() {
      // TODO
    },
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    toggleLang() {
      this.$store.commit('changeLanguage')
    },
    setSelectedDate(data) {
      this.selectedDate = data.date
      this.selectedTime = data.time
    },
    showDateModal() {
      this.$bvModal.show('date-modal')
    },
    showBookModal() {
      this.$bvModal.show('book-modal')
    },
    onBookClick(service) {
      this.service = service
      setTimeout(this.showDateModal, 100)
    },
  },
};
</script>
