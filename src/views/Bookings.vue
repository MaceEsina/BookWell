<template>
  <div class="bookings-page">
    <header class="header">
      <button class="goBack" @click="goBack">
        <i class="fa fa-arrow-left"></i>
      </button>
      <h1>BookWell</h1>
      <UserButton v-if="user" />
    </header>
    <h1>Your Bookings</h1>
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
      bookings: null,
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
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    signIn() {
      this.$router.push({ name: "SignIn" })
    },
    getBookings() {
      const params = {
        id: this.user.id,
        email: this.user.email
      }
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
    else this.signIn()
  }
};
</script>
