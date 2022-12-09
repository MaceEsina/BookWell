<template>
  <b-card no-body class="card shadow">
    <b-row no-gutters class="image">
      <b-card-img
        :src="require(`@/assets/img/${service.partnerId}/${service.img}`)"
      ></b-card-img>
      <button :class="`${isFavorite ? 'liked' : ''} like-btn`" @click="isFavorite = !isFavorite">
        <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
      </button>
      <div class="reviews">
        <i class="fas fa-star"></i>
        <span>{{service.rating}}</span>
      </div>
    </b-row>
    <b-row no-gutters>
      <b-card-body class="d-flex flex-column h-100">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ service.name }}</h4>
        </div>
        <div class="description">
          {{service.desc}}
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
        <ul class="tags">
          <li v-for="tag in service.tags" :key="tag">{{tag}}</li>
        </ul>

        <hr class="w-100">
        <div class="footer">
          <span>{{service.price}} THB</span>
          <span class="mx-2 text-primary">•</span>
          <span>{{service.duration}}</span>
          <b-button class="book-btn" :to="`/service/${service.partnerId}_${service.id}`" variant="primary">
            Book Now
          </b-button>
        </div>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "HotelCard",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false,
    }
  }
};
</script>
