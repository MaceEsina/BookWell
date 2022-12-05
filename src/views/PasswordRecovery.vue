<template>
  <div class="password-recovery-page">
    <header>
      <h1>BookWell</h1>
      <p v-if="!emailSent">
        To reset your password, please enter your E-mail address below
      </p>
      <p v-else class="pt-5">
        An email with a link to reset your password is sent.
        Please check your E-mail {{this.email}} for further instructions.
      </p>
    </header>
    <b-form v-if="!emailSent" @submit.stop.prevent="onSubmit">
      <b-form-group label="E-mail" label-for="email" label-size="lg">
        <b-form-input
          v-model="email"
          type="email"
          placeholder="Enter email address"
          aria-describedby="email-feedback"
          :state="emailState"
          @input="onEmailChange"
          size="lg"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="email-feedback">
          User with this email doesn't exist
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary" size="lg" block :disabled="isDisabled">
        Reset password
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { resetPassword } from '@/api'

export default {
  name: "PasswordRecovery",
  data() {
    return {
      email: '',
      emailState: null,
      emailSent: false,
      isDisabled: true,
    }
  },
  methods: {
    onSubmit() {
      const params = {
        email: this.email,
      }
      resetPassword(params)
      .then(({ data }) => {
        const { error, success } = data
        if (error && /email/.test(error)) {
          this.emailState = false
          this.isDisabled = true
        } else this.emailSent = success
      })
      .catch(error => console.log('ERROR', error))
    },
    onEmailChange() {
      this.emailState = null
      this.isDisabled = !this.email
    },
  }
};
</script>