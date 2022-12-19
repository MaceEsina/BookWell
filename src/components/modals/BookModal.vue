<template>
  <b-modal
    centered
    no-stacking
    button-size="lg"
    id="book-modal"
    footer-class="footer"
    modal-class="book-modal"
    @hide="onHide"
    title="Request to book"
  >
    <h2>{{ service.name }}</h2>
    <div class="date">{{ bookDate }}</div>
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
    <div class="partner">
      Organized by
      <a :href="`/partner/${service.partnerId}`" target="_blank">
        {{service.partnerName}}
      </a>
    </div>

    <b-form class="form">
      <b-form-group label="Name" label-for="name">
        <b-form-input
          v-model="name"
          placeholder="Enter your name"
          :state="nameState"
          @input="onNameChange"
          size="lg"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="E-mail" label-for="email">
        <b-form-input
          v-model="email"
          type="email"
          :state="emailState"
          placeholder="Enter email address"
          @input="onEmailChange"
          size="lg"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>

    <template #modal-footer>
      <div class="price">
        <span>{{service.price}} THB</span>
        <span class="mx-2 text-primary">•</span>
        <span>{{service.duration}}</span>
      </div>
      <b-button variant="secondary" @click="onSelect">
        Change time
      </b-button>
      <b-button variant="primary" @click="onSubmit" :disabled="isDisabled">
        Submit
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { parseDate } from '@/helpers/dates'

export default {
  name: "DatesModal",
  props: {
    service: {
      type: Object,
      required: true,
    },
    bookDate: {
      type: String,
      required: true,     
    }
  },
  computed: {
    user() {
      return this.$store.state.user || {}
    },
    email() {
      return this.user.email || ''
    }
  },
  data() {
    return {
      name: '',
      nameState: null,
      emailState: null,
      isDisabled: true
    }
  },
  methods: {
    parseDate,
    onSubmit() {
      this.$emit('onSubmit')
    },
    onSelect() {
      this.$emit('onSelect')
    },
    onHide() {
      // TODO reset
    },
    isValid() {
      return this.name && this.email
    },
    onNameChange() {
      this.nameState = null
      this.isDisabled = !this.isValid()
    },
    onEmailChange() {
      this.emailState = null
      this.isDisabled = !this.isValid()
    }
  },
}
</script>
