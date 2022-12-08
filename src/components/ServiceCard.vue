<template>
  <b-card no-body class="card shadow">
    <b-row no-gutters class="image">
      <b-card-img
        :src="require(`@/assets/img/${service.partnerId}/${service.img}`)"
      ></b-card-img>
      <button :class="`${isFavorite ? 'liked' : ''} like-btn`" @click="isFavorite = !isFavorite">
        <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
      </button>
    </b-row>
    <b-row no-gutters>
      <b-card-body class="d-flex flex-column h-100">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ service.name }}</h4>
        </div>
        <div class="location text-muted">
          <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
          <span class="city">{{ service.location.city }}</span>
          <span class="mx-2">&#8226;</span>
          <span class="address">{{ service.location.addr }}</span>
          <!-- show on map
          <b-button 
            class="p-0"
            variant="link"
          >
            Show On Map
          </b-button> -->
        </div>
        <!-- Desc -->
        <!-- <b-card-text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iure!
        </b-card-text> -->

        <hr class="w-100">

        <div class="d-flex justify-content-between align-items-center">
          <span class="font-1h">{{ service.price }}฿</span>
          <b-button :to="`/service/${service.partnerId}_${service.id}`" variant="primary">
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
