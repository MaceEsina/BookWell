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

      <button v-if="user" class="user" @click="goUser">
        <i class="far fa-user" />
      </button>
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
          <a :href="`/partner/${service.partnerId}`" target="_blank">
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
        Change time
      </b-button>
      <b-button variant="primary" @click="showBookModal">
        Book Now
      </b-button>
    </footer>

    <DatesModal
      :service="service"
      @onSelect="setSelectedDate"
      @onSubmit="showBookModal" />
    <BookModal
      :service="service"
      :bookDate="bookDate"
      @onSubmit="book"
      @onSelect="showDateModal"/>

  </div>
</template>

<script>
import ReviewCard from "@/components/ReviewCard"
import BookModal from "@/components/modals/BookModal"
import DatesModal from "@/components/modals/DatesModal"
import { parseDate } from '@/helpers/dates'

export default {
  name: "Service",
  components: {
    ReviewCard,
    BookModal,
    DatesModal
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    maxDate() {
      const today = new Date()
      const nextDate = new Date(today.setMonth(today.getMonth() + 3))
      return nextDate.toISOString().split('T')[0]
    },
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
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    goBack() {
      this.$router.push({ name: "Home" })
    },
    setSelectedDate(data) {
      this.selectedDate = data.date
      this.selectedTime = data.time
    },
    book() {
      // TODO
      console.log('book')
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
