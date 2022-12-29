<template>
  <div class="partner-page">
    <header class="header">
      <button class="goBack" @click="goBack">
        <i class="fa fa-arrow-left"></i>
      </button>
      <h1 @click="goHome">BookWell</h1>
      <UserButton v-if="user" />
      <b-button variant="secondary" class="login-btn" v-else @click="signIn">
        Login
      </b-button>
    </header>
    <div class="image">
      <b-card-img
        :src="require(`@/assets/img/${partner.id}/${partner.img}`)"
      ></b-card-img>
      <button :class="`${isFavorite ? 'liked' : ''} like-btn`" @click.stop="isFavorite = !isFavorite">
        <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
      </button>
      <div class="reviews">
        <i class="fas fa-star"></i>
        <span>{{partner.rating}}</span>
      </div>
    </div>
    <section class="info">
      <h1>{{ partner.name }}</h1>
      <div class="location text-muted">
        <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
        <span class="city">{{ partner.location.country }}</span>
        <span class="mx-2">&#8226;</span>
        <span class="city">{{ partner.location.city }}</span>
        <span class="mx-2">&#8226;</span>
        <a :href="`http://maps.google.com/?q=1200 ${partner.location.addr}`" target="_blank">
          Show on Map
        </a>
      </div>
      <div class="description">
        <ul class="tags">
          <li v-for="tag in partner.tags" :key="tag">
            {{tag}}
          </li>
        </ul>
        <p>{{partner.desc}}</p>
      </div>
      <hr class="w-100">
      <div class="contacts">
        <h2>Contacts</h2>
        <a v-if="partner.email" :href="`mailto:${partner.email}`" target="_blank">
          <i class="fas fa-envelope"></i>
          <span>{{partner.email}}</span>
        </a>
        <a v-if="partner.phone" :href="`tel:${partner.email}`" target="_blank">
          <i class="fas fa-phone"></i>
          <span>{{partner.phone}}</span>
        </a>
        <a v-if="partner.website" class="website" :href="partner.website" target="_blank">
          <i class="fa fa-globe"></i>
          <span>{{partner.website}}</span>
        </a>
      </div>
    </section>
    <hr class="w-100">
    <ul class="cards">
      <h2>Services</h2>
      <li v-for="service in partner.services" :key="`${service.id}_${partner.id}`">
        <ServiceCard
          :service="service"
          :partner="partner"
          @onBookClick="onBookClick(service)" />
      </li>
    </ul>
    <hr class="w-100">
    <section class="reviews-list">
      <h2>{{partner.reviews.length}} Reviews</h2>
      <ul>
        <li v-for="(review, index) in partner.reviews" :key="index">
          <ReviewCard :review="review" />
        </li>
      </ul>
    </section>
    <DatesModal v-if="service"
      :service="service"
      @onSelect="setSelectedDate"
      @onSubmit="showBookModal" />
    <BookModal v-if="service"
      :service="service"
      :location="partner.location"
      :bookDate="bookDate"
      @onSelect="showDateModal"/>
  </div>
</template>

<script>
import UserButton from "@/components/UserButton"
import ReviewCard from "@/components/ReviewCard"
import ServiceCard from "@/components/ServiceCard"
import BookModal from "@/components/modals/BookModal"
import DatesModal from "@/components/modals/DatesModal"
import { parseDate } from '@/helpers/dates'

export default {
  name: "Partner",
  components: {
    UserButton,
    ServiceCard,
    ReviewCard,
    BookModal,
    DatesModal
  },
  data() {
    return {
      service: null,
      isFavorite: false,
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
    partner() {
      return this.$store.getters.getPartner(this.$route.params.id)
    },
    isDateSelected() {
      return !!(this.selectedTime && this.selectedDate)
    },
    bookDate() {
      if (this.isDateSelected) {
        return `${parseDate(this.selectedDate)} at ${this.selectedTime}`
      }
      return ''
    }
  },
  methods: {
    parseDate,
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push({ name: "Home" })
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
    }
  }
};
</script>
