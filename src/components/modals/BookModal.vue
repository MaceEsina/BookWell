<template>
  <b-modal
    centered
    no-stacking
    button-size="lg"
    id="book-modal"
    footer-class="footer"
    modal-class="book-modal"
    title="Request to Book"
  >
    <h2>{{ service.name }}</h2>
    <div class="date">
      <span>{{ bookDate }}</span>
      <b-button variant="secondary" @click="onSelect">
        Change Time
      </b-button>
    </div>

    <b-form class="book-form">
      <b-form-group label="Name*" label-for="name">
        <b-form-input
          v-model="name"
          placeholder="Enter your name"
          :state="nameState"
          @input="onNameChange"
          size="lg"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="E-mail*" label-for="email">
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
      <b-form-group label="Phone" label-for="phone">
        <b-form-input
          v-model="phone"
          type="tel"
          placeholder="Enter phone number"
          size="lg"
        ></b-form-input>
      </b-form-group>
      <b-form-textarea
        id="textarea"
        v-model="comment"
        :placeholder="`Your message for ${service.partnerName}`"
        rows="3"
        size="lg"
        no-resize
      ></b-form-textarea>
    </b-form>

    <template #modal-footer>
      <div class="price">
        <span>{{service.price}} THB</span>
        <span class="mx-2 text-primary">•</span>
        <span>{{service.duration}}</span>
      </div>
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
      // TODO set email
      return this.$store.state.user
    }
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      comment: '',
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
