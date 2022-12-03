<template>
  <div class="signin-page">
  <b-form @submit.stop.prevent="onSubmit">
      <b-form-group label="E-mail" label-for="email">
        <b-form-input
          v-model="email"
          type="email"
          placeholder="Enter email address"
          aria-describedby="email-feedback"
          :state="emailState"
          @change="onEmailChange"
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
          @change="onPasswordChange"
          minlength="6"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="password-feedback">
          Incorrect password
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-checkbox v-model="rememberMe">
        Remember me
      </b-form-checkbox>
      <b-button type="submit" variant="primary">Sign In</b-button>
    </b-form>
  </div>
</template>

<script>
import { signin } from '@/api'

export default {
  name: "SignIn",
  data() {
    return {
      email: '',
      password: '',
      rememberMe: true,
      emailState: null,
      passwordState: null,
    }
  },
  methods: {
    onSubmit() {
      const params = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      }
      signin(params)
      .then(({ data }) => {
        const { error, user } = data
        if (error) {
          if (/email/.test(error)) {
            this.passwordState = !/password/.test(error)
          } else this.emailState = false
        } else if (user) {
          const { session } = user
          if (session) localStorage.setItem('session', session)
          else localStorage.removeItem('session')
        }
      })
      .catch(error => console.log('ERROR', error))
    },
    onEmailChange() {
      this.emailState = null
    },
    onPasswordChange() {
      this.passwordState = null
    },
  }
};
</script>
