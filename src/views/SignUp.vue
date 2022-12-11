<template>
  <div class="signup-page">
    <header>
      <h1>BookWell</h1>
      <p>Please enter your E-mail address and create password</p>
    </header>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group label="E-mail" label-for="email">
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
          User with this email already exists
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password" label-for="password">
        <b-form-input
          type="password"
          v-model="password"
          placeholder="Enter password"
          aria-describedby="password-feedback"
          :state="passwordState"
          @input="onPasswordChange"
          size="lg"
          required
        ></b-form-input>
        <b-form-input
          type="password"
          v-model="passwordRepeat"
          placeholder="Repeat password"
          aria-describedby="password-feedback"
          :state="passwordState"
          @input="onPasswordChange"
          size="lg"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="password-feedback">
          Passwords must match
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-checkbox v-model="rememberMe">
        Remember me
      </b-form-checkbox>
      <b-button type="submit" variant="primary" size="lg" block :disabled="isDisabled">
        Sign Up
      </b-button>
      <p class='signin'>
        Already have account?
        <b-link href="/signin" class="link">
          Sign In
        </b-link>
      </p>
    </b-form>
  </div>
</template>

<script>
import { signup } from '@/api'
import { storeUser } from '@/helpers/localStorage'

export default {
  name: "SignUp",
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      rememberMe: true,
      emailState: null,
      passwordState: null,
      isDisabled: true,
    }
  },
  methods: {
    onSubmit() {
      if (this.password !== this.passwordRepeat) {
        this.passwordState = false
        this.isDisabled = true
      } else {
        const params = {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe ? 1 : 0,
        }
        signup(params)
        .then(({ data }) => {
          const { error, user } = data
          if (error) {
            if (/email/.test(error)) {
              this.emailState = false
              this.isDisabled = true
            }
          } else if (user) {
            storeUser(user)
            this.$store.commit('setUser', user)
            this.$router.push({ name: "Home" })
          }
        })
        .catch(error => console.log('ERROR', error))
      }
    },
    isValid() {
      return this.passwordRepeat && this.password && this.email
    },
    onEmailChange() {
      this.emailState = null
      this.isDisabled = !this.isValid()
    },
    onPasswordChange() {
      this.passwordState = null
      this.isDisabled = !this.isValid()
    },
  }
};
</script>
