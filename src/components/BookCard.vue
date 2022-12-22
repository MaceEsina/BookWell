<template>
  <b-card no-body class="shadow" @click="goToService">
    <div class="image">
      <b-card-img
        :src="require(`@/assets/img/${service.partnerId}/${service.img}`)"
      ></b-card-img>
      <button :class="`${isFavorite ? 'liked' : ''} like-btn`" @click.stop="isFavorite = !isFavorite">
        <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
      </button>
      <div class="reviews">
        <i class="fas fa-star"></i>
        <span>{{service.rating}}</span>
      </div>
    </div>
    <b-row no-gutters>
      <b-card-body class="d-flex flex-column h-100">
        <div class="d-flex justify-content-between align-items-center">
          <h4>{{ service.name }}</h4>
        </div>
        <div class="book-row">Booking Date: <span>{{ booking.date }}</span></div>
        <div class="book-row">Booking Code: <span>{{ booking.code }}</span></div>
        <div class="book-info">
          <h2>Your Book Info</h2>
          <div>Name: <span>{{ booking.name }}</span></div>
          <div>Phone: <span>{{ booking.phone }}</span></div>
        </div>
        <div class="partner">
          Organized by
          <a href="#" @click.prevent="goToPartner">
            {{service.partnerName}}
          </a>
        </div>
        <div class="location text-muted">
          <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
          <span class="city">{{ location.country }}</span>
          <span class="mx-2">&#8226;</span>
          <span class="city">{{ location.city }}</span>
          <span class="mx-2">&#8226;</span>
          <a :href="`http://maps.google.com/?q=1200 ${location.addr}`" @click.stop target="_blank">
            Show on Map
          </a>
        </div>
        <hr class="w-100">
        <div class="footer">
          <span>{{service.price}} THB</span>
          <span class="mx-2 text-primary">•</span>
          <span>{{service.duration}}</span>
          <b-button class="book-btn" @click.stop="onCancelClick" variant="primary">
            Cancel Booking
          </b-button>
        </div>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "BookCard",
  props: {
    booking: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isFavorite: false,
      service: this.booking.service,
      location: this.booking.service.location
    }
  },
  methods: {
    goToService() {
      this.$router.push({
        name: "Service",
        params: {
          id: this.service.id,
          partnerId: this.service.partnerId,
        }
      })
    },
    goToPartner() {
      this.$router.push({
        name: "Partner",
        params: {
          id: this.service.partnerId
        }
      })
    },
    onCancelClick() {
      this.$emit('onCancelClick')
    }
  }
};
</script>
