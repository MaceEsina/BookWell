<template>
  <div class="bookings-page" v-if="bookings">
    <header class="header">
      <button class="goBack" @click="goBack">
        <i class="fa fa-arrow-left"></i>
      </button>
      <h1 @click="goHome">BookWell</h1>
      <UserButton v-if="user" />
    </header>
    <ul class="cards" v-if="bookings">
      <li v-for="booking in bookings" :key="booking.id">
        <BookCard
          :booking="booking"
          @onCancelClick="onCancelClick(booking)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { getBookings } from '@/api'
import UserButton from "@/components/UserButton"
import BookCard from "@/components/BookCard"

export default {
  name: "Bookings",
  components: {
    UserButton,
    BookCard
  },
  data() {
    return {
      bookings: null
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    services() {
      return this.$store.getters.getAllServices
    },
  },
  watch: {
    user: function(user) {
      if (user) this.getBookings()
      else this.signIn()
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    goHome() {
      this.$router.push({ name: "Home" })
    },
    getBookings() {
      const params = {
        id: this.user.id,
        email: this.user.email
      }
      this.$store.commit('setLoading', true)
      getBookings(params)
      .then(({ data }) => {
        if (data.bookings) {
          const bookings = []
          data.bookings.forEach(booking => {
            const service = this.services.find(service => {
              return service.id == booking.serviceId
            })
            if (service) {
              bookings.push({ ...booking, service })
            }
          })
          this.$store.commit('setLoading', false)
          this.bookings = bookings
        }
      })
      .catch(error => console.log('ERROR', error))
    },
    onCancelClick() {
      // TODO
    }
  },
  created() {
    if (this.user) this.getBookings()
  }
};
</script>
