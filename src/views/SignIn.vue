<template>
  <div class="signin-page">
    <header>
      <h1>BookWell</h1>
      <p>Please fill E-mail and password to login your app account</p>
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
          User with this email doesn't exist
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
        <b-form-invalid-feedback id="password-feedback">
          Incorrect password
        </b-form-invalid-feedback>
      </b-form-group>
      <b-container fluid>
        <b-row align-h="between" align-v="center">
          <b-form-checkbox v-model="rememberMe">
            Remember me
          </b-form-checkbox>
          <b-link href="/password-recovery">
            Forgot password?
          </b-link>
        </b-row>
      </b-container>
      <b-button type="submit" variant="primary" size="lg" block :disabled="isDisabled">
        Sign In
      </b-button>  
      <p class='signup'>
        Do not have an account yet?
        <b-link href="/signup" class="link">
          Sign Up
        </b-link>
      </p>
    </b-form>
  </div>
</template>

<script>
import { signin } from '@/api'
import { storeUser } from '@/helpers/localStorage'

export default {
  name: "SignIn",
  data() {
    return {
      email: '',
      password: '',
      rememberMe: true,
      emailState: null,
      passwordState: null,
      isDisabled: true,
    }
  },
  methods: {
    onSubmit() {
      const params = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe ? 1 : 0,
      }
      signin(params)
      .then(({ data }) => {
        const { error, user } = data
        if (error) {
          if (/password/.test(error)) this.passwordState = false
          else if (/email/.test(error)) {
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
    },
    isValid() {
      return this.password && this.email
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
