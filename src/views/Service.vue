<template>
  <div class="service-page">
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
          Discover more activities from
          <a :href="`/partner/${service.partnerId}`" target="_blank">
            {{service.partnerName}}
          </a>
        </div>
      </div>
      <div class="contacts">
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
      <h2>Reviews</h2>
    </section>
  </div>
</template>

<script>
export default {
  name: "Service",
  computed: {
    service() {
      const { id, partnerId } = this.$route.params
      return this.$store.getters.getService(id, partnerId)
    }
  },
  data() {
    return {
      isFavorite: false,
    }
  },
  mounted() {
    console.log(this.service)
  }
 };
</script>
