<template>
  <div id="app" class="app">

    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

const DEPLOY_ID = 'AKfycbxAH9m6dn8WMAna29iuPqhe5BajAbco8e9hFr58awSOzU2IY63i2Y-zXdmhyfiRVDh8jA'

export default {
  name: "App",
  data() {
    return {
      user: null,
      isAuthorized: false,
      isLoading: true,
      // error: null,
      api: `https://script.google.com/macros/s/${DEPLOY_ID}/exec`
    }
  },
  methods: {
    auth(session) {      
      axios.get(`${this.api}?session=${session}`)
      .then(({ data }) => {
        const { user, error } = data
        if (user) this.isAuthorized = true
        else if (error) console.log('ERROR', error)
        this.isLoading = false
      })
      .catch(error => console.log('ERROR',error))
    }
  },
  mounted() {
    const session = localStorage.getItem('session');
    if (session) this.auth(session)
    else this.isLoading = false
  }
}
</script>
