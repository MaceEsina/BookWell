<template>
  <b-card no-body class="shadow" @click="goToService">
    <div class="image">
      <b-card-img
        :src="require(`@/assets/img/${partnerId}/${service.img}`)"
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
        <div class="description">
          {{service.desc}}
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
        <ul class="tags">
          <li v-for="tag in service.tags" :key="tag">{{tag}}</li>
        </ul>
        <hr class="w-100">
        <div class="footer">
          <span>{{service.price}} THB</span>
          <span class="mx-2 text-primary">•</span>
          <span>{{service.duration}}</span>
          <b-button class="book-btn" @click.stop="onBookClick" variant="primary">
            Book Now
          </b-button>
        </div>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "ServiceCard",
  props: {
    service: {
      type: Object,
      required: true
    },
    partner: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isFavorite: false,
      partnerId: this.partner ? this.partner.id : this.service.partnerId,
      location: this.partner ? this.partner.location : this.service.location
    }
  },
  methods: {
    goToService() {
      this.$router.push({
        name: "Service",
        params: {
          id: this.service.id,
          partnerId: this.partnerId,
        }
      })
    },
    onBookClick() {
      this.$emit('onBookClick')
    }
  }
};
</script>
