<template>
<div>
  <b-modal
    centered
    no-stacking
    button-size="lg"
    id="book-modal"
    footer-class="book-footer"
    modal-class="book-modal"
    @show="onShow"
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
          aria-describedby="name-feedback"
          :state="nameState"
          @input="onNameChange"
          size="lg"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="name-feedback">
          Name is too short
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="E-mail*" label-for="email">
        <b-form-input
          v-model="email"
          type="email"
          :state="emailState"
          aria-describedby="email-feedback"
          placeholder="Enter email address"
          @input="onEmailChange"
          size="lg"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="email-feedback">
          Invalid email address
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Phone" label-for="phone">
        <b-form-input
          v-model="phone"
          :state="phoneState"
          @input="onPhoneChange"
          type="tel"
          aria-describedby="phone-feedback"
          placeholder="Enter phone number"
          size="lg"
        ></b-form-input>
        <b-form-invalid-feedback id="phone-feedback">
          Invalid phone number
        </b-form-invalid-feedback>
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
      <b-button variant="primary" @click="onSubmit">
        Submit
      </b-button>
    </template>
  </b-modal>

  <b-modal
    id="booked-modal"
    title="Booking Confirmed"
    modal-class="booked-modal"
    centered
    no-stacking
    button-size="lg"
    footer-class="book-footer"
  >
    <h2>{{ service.name }}</h2>
    <div class="location text-muted">
        <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
        <span class="city">{{ location.country }}</span>
        <span class="mx-2">&#8226;</span>
        <span class="city">{{ location.city }}</span>
        <span class="mx-2">&#8226;</span>
        <a :href="`http://maps.google.com/?q=1200 ${location.addr}`" target="_blank">
          Show on Map
        </a>
    </div>
    <div class="book-row">Booking Date: <span>{{ bookDate }}</span></div>
    <div class="book-row">Booking Code: <span>{{ code }}</span></div>
    <p>
      You can cancel your booking anytime by the link that we sent you on e-mail <b>{{ this.email.trim() }}</b> or by booking code in the app.
    </p>
    <template #modal-footer>
      <div class="price">
        <span>{{service.price}} THB</span>
        <span class="mx-2 text-primary">•</span>
        <span>{{service.duration}}</span>
      </div>
      <b-button variant="primary" @click="hideBookedModal">
        OK
      </b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import { book } from '@/api'
import { parseDate } from '@/helpers/dates'
import { validEmail, validPhone } from '@/helpers/validation-rules'

export default {
  name: "BookModal",
  props: {
    service: {
      type: Object,
      required: true,
    },
    bookDate: {
      type: String,
      required: true,     
    },
    location: {
      type: Object,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      comment: '',
      code: '',
      nameState: null,
      emailState: null,
      phoneState: null,
      isDisabled: true
    }
  },
  methods: {
    parseDate,
    validEmail,
    validPhone,
    onSelect() {
      this.$emit('onSelect')
    },
    isValid() {
      const isEmailValid = this.email && validEmail(this.email.trim())
      const hasPhoneVal = this.phone && this.phone.trim().length
      const isPhoneValid = !hasPhoneVal || validPhone(this.phone.trim())
      const isNameValid = this.name.trim() && this.name.trim().length > 1
      if (!isEmailValid) this.emailState = false
      if (!isPhoneValid) this.phoneState = false
      if (!isNameValid) this.nameState = false
      return isEmailValid && isPhoneValid && isNameValid
    },
    onNameChange() {
      this.nameState = null
    },
    onEmailChange() {
      this.emailState = null
    },
    onPhoneChange() {
      this.phoneState = null
    },
    hideBookedModal() {
      this.$bvModal.hide('booked-modal')
    },
    showBookedModal() {
      this.$bvModal.show('booked-modal')
    },
    onSubmit() {
      if (this.isValid()) {
        const params = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          date: this.bookDate,
          comment: this.comment,
          serviceId: this.service.id,
          partnerId: this.service.partnerId
        }
        if (this.user) params.userId = this.user.id
        book(params)
        .then(({ data }) => {
          const { error, code } = data
          if (!error && code) {
            this.code = code
            this.showBookedModal()
            // TODO
          }
        })
        .catch(error => console.log('ERROR', error))
      }
    },
    onShow() {
      if (this.user) {
        this.email = this.user.email || ''
      }
    }
  }
}
</script>
