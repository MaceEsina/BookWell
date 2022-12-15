<template>
  <div class="book-page">
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

    <section class="info">
      <h1>{{ service.name }}</h1>
      <div class="partner">
        Organized by
        <a :href="`/partner/${service.partnerId}`" target="_blank">
          {{service.partnerName}}
        </a>
      </div>
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
    </section>
    <section class="image">
      <b-img :src="require(`@/assets/img/${service.partnerId}/${service.img}`)" fluid></b-img>
      <button :class="`${isFavorite ? 'liked' : ''} like-btn`" @click="isFavorite = !isFavorite">
        <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
      </button>
      <div class="reviews">
        <i class="fas fa-star"></i>
        <span>{{service.rating}}</span>
      </div>
      <div class="price">
        <span>{{service.price}} THB</span>
        <span class="mx-2 text-primary">•</span>
        <span>{{service.duration}}</span>
      </div>
    </section>
    <div class="dates">
      <div class="dates-header">
        <h2>Date and Time</h2>
        <b-form-datepicker class="datepicker" size="lg" v-model="date" hide-header :min="minDate" :max="maxDate"
          :date-format-options="{ year: 'numeric', month: 'short', day: 'numeric' }" nav-button-variant="dark"
          placeholder="Select Date">
        </b-form-datepicker>
      </div>
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
  </div>
</template>

<script>
export default {
  name: "Book",
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    maxDate() {
      const today = new Date()
      const nextDate = new Date(today.setMonth(today.getMonth()+2))
      return nextDate.toISOString().split('T')[0]
    },
    user () {
      return this.$store.state.user
    },
    service() {
      const { id, partnerId } = this.$route.params
      return this.$store.getters.getService(id, partnerId)
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
      date: '',
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
      this.$router.push({ name: "Home" })
    },
  }
};
</script>
