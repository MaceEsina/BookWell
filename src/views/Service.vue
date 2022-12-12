<template>
  <div class="service-page">
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
        <b-button class="book-btn" :to="`/book/${service.partnerId}/${service.id}`" variant="primary">
          Book Now
        </b-button>
      </div>
      <hr class="w-100">
      <div class="description">
        <ul class="tags">
          <li v-for="tag in service.tags" :key="tag">{{tag}}</li>
        </ul>
        <p>{{service.desc}}</p>
        <div class="partner">
          Discover more activities with
          <a :href="`/partner/${service.partnerId}`" target="_blank">
            {{service.partnerName}}
          </a>
        </div>
      </div>
      <hr class="w-100">
      <div class="dates">
        <h2>Date and Time</h2>
        <ul>
          <li v-for="date in dates" :key="date">
            <div class="date">
              <i class="fa fa-calendar-day"></i>
              <span>{{parseDate(date)}}</span>
            </div>
            <ul v-if="service.time" class="time">
              <li v-for="time in service.time" :key="time">{{time}}</li>
            </ul>
            <div v-else class="pl-4">
              <div v-if="service.timeStart">Check-in Time: {{service.timeStart}}</div>
              <div v-if="service.timeEnd">Check-out Time: {{service.timeEnd}}</div>
            </div>
          </li>
        </ul>
        <button v-if="hasMore" class="show-more-btn" @click="showMore">
          <span>Show More</span>
          <i class="fa fa-chevron-down"></i>
        </button>
        <button v-if="!hasMore && showLess" class="show-more-btn" @click="hideDates">
          <span>Show Less</span>
          <i class="fa fa-chevron-up"></i>
        </button>
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
  </div>
</template>

<script>
import ReviewCard from "@/components/ReviewCard"

export default {
  name: "Service",
  components: {
    ReviewCard
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
    dates() {
      return this.service.dates.slice(0, this.showMoreInx * 3)
    },
    hasMore() {
      return this.service.dates.length > this.dates.length
    },
  },
  data() {
    return {
      search: '',
      showMoreInx: 1,
      showLess: false,
      isFavorite: false,
    }
  },
  methods: {
    onSearch() {
      // TODO
    },
    showMore() {
      this.showMoreInx = this.showMoreInx + 1
      this.showLess = true
    },
    hideDates() {
      this.showMoreInx = 1
      this.showLess = false
    },
    parseDate(dateIso) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      const date = new Date(dateIso)
      return date.toLocaleDateString(undefined, options)
    },
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    goBack() {
      this.$router.back()
    }
  },
 };
</script>
