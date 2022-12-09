<template>
  <div class="home-page">
    <Header />
    <h2>
      Plan your health anywhere, anytime
    </h2>
    <div class="search-bar">
      <b-input-group size="lg">
        <b-form-input v-model="search" size="lg" placeholder="Search services">
        </b-form-input>
        <b-input-group-append>
          <button @click="onSearch">
            <i class="fa fa-search"></i>
          </button>
        </b-input-group-append>
      </b-input-group>
      <!--<b-input-group>
        <b-input-group-prepend isText>
          <i class="fa fa-map-marker-alt"></i>
        </b-input-group-prepend>
        <b-form-input v-model="destination" size="lg" placeholder="Enter destination">
        </b-form-input>
      </b-input-group>-->
    </div>
    <ul class="cards">
      <li v-for="service in services" :key="`${service.id}_${service.partnerId}`">
        <ServiceCard :service="service" />
      </li>
    </ul>
  </div>
</template>

<script>
import ServiceCard from "@/components/ServiceCard"
import Header from "@/components/Header"

export default {
  name: "Home",
  components: {
    Header,
    ServiceCard
  },
  data() {
    return {
      search: '',
      destination: '',
    }
  },
  computed: {
    services() {
      return this.$store.getters.getAllServices
    }
  },
  methods: {
    onSearch() {
      // TODO
    }
  },
};
</script>
