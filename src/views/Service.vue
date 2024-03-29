<template>
  <div :class="getPageClasses()" ref="page">
    <header class="header">
      <button class="goBack" @click="goBack">
        <i class="fa fa-arrow-left"></i>
      </button>
      <b-input-group class="search-bar">
        <b-form-input v-model="search" placeholder="Search service or destination">
        </b-form-input>
        <b-input-group-append>
          <button @click="onSearch">
            <i class="fa fa-search"></i>
          </button>
        </b-input-group-append>
      </b-input-group>

      <UserButton v-if="user" />
      <b-button variant="secondary" class="login-btn" v-else @click="signIn">
        Login
      </b-button>
    </header>
    <section class="image">
      <b-img :src="require(`@/assets/img/${service.partnerId}/${service.img}`)" fluid></b-img>
      <button :class="`${isFavorite ? 'liked' : ''} like-btn`" @click.stop="isFavorite = !isFavorite">
        <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
      </button>
      <div class="reviews">
        <i class="fas fa-star"></i>
        <span>{{service.rating}}</span>
      </div>
    </section>
    <section class="info">
      <h1>{{ service.name }}</h1>
      <div class="location text-muted">
        <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
        <span class="city">{{ service.location.country }}</span>
        <span class="mx-2">&#8226;</span>
        <span class="city">{{ service.location.city }}</span>
        <span class="mx-2">&#8226;</span>
        <a :href="`http://maps.google.com/?q=1200 ${service.location.addr}`" target="_blank">
          Show on Map
        </a>
      </div>
      <div class="price">
        <span>{{service.price}} THB</span>
        <span class="mx-2 text-primary">•</span>
        <span>{{service.duration}}</span>
        <b-button class="book-btn" @click="onBookClick" variant="primary">
          Book Now
        </b-button>
      </div>
      <hr class="w-100">
      <div class="description">
        <ul class="tags">
          <li v-for="tag in service.tags" :key="tag">
            {{tag}}
          </li>
        </ul>
        <p>{{service.desc}}</p>
        <div class="partner">
          Organized by
          <a href="#" @click.prevent="goPartner">
            {{service.partnerName}}
          </a>
        </div>
      </div>
      <hr class="w-100">
      <div class="contacts">
        <h2>Contacts</h2>
        <a v-if="service.email" :href="`mailto:${service.email}`" target="_blank">
          <i class="fas fa-envelope"></i>
          <span>{{service.email}}</span>
        </a>
        <a v-if="service.phone" :href="`tel:${service.email}`" target="_blank">
          <i class="fas fa-phone"></i>
          <span>{{service.phone}}</span>
        </a>
        <a v-if="service.website" class="website" :href="service.website" target="_blank">
          <i class="fa fa-globe"></i>
          <span>{{service.website}}</span>
        </a>
      </div>
    </section>
    <hr class="w-100">
    <section class="reviews-list">
      <h2>{{reviews.length}} Reviews</h2>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <ReviewCard :review="review" />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="isDateSelected">
      <div class="date" v-if="isDateSelected">
        {{parseDate(selectedDate)}}
        <span v-if="selectedTime"> at {{selectedTime}}</span>
      </div>
      <b-button variant="secondary" @click="showDateModal">
        Change Time
      </b-button>
      <b-button variant="primary" @click="showBookModal">
        Book
      </b-button>
    </footer>

    <DatesModal
      :service="service"
      @onSelect="setSelectedDate"
      @onSubmit="showBookModal" />
    <BookModal
      :service="service"
      :bookDate="bookDate"
      :location="service.location"
      @onSelect="showDateModal"/>
  </div>
</template>

<script>
import UserButton from "@/components/UserButton"
import ReviewCard from "@/components/ReviewCard"
import BookModal from "@/components/modals/BookModal"
import DatesModal from "@/components/modals/DatesModal"
import { parseDate } from '@/helpers/dates'

export default {
  name: "Service",
  components: {
    UserButton,
    ReviewCard,
    BookModal,
    DatesModal
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    service() {
      const { id, partnerId } = this.$route.params
      return this.$store.getters.getService(id, partnerId)
    },
    reviews() {
      const { partnerId } = this.$route.params
      return this.$store.getters.getReviews(partnerId)
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
  data() {
    return {
      search: '',
      isFavorite: false,
      selectedDate: '',
      selectedTime: ''
    }
  },
  methods: {
    parseDate,
    onSearch() {
      // TODO
    },
    getPageClasses() {
      return (this.isDateSelected ? 'selected ' : '') + 'service-page'
    },
    goPartner() {
      this.$router.push({
        name: "Partner",
        params: {
          id: this.service.partnerId
        }
      })
    },
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    goBack() {
      this.$router.go(-1)
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
    onBookClick() {
      if (!this.isDateSelected) this.showDateModal()
      else this.showBookModal()
    }
  },
 };
</script>
