<template>
  <b-dropdown right class="user-btn">
    <template #button-content>
      <i class="fa fa-user" />
    </template>
    <b-dropdown-item @click="goToBookings">My Bookings</b-dropdown-item>
    <b-dropdown-item @click="goToFavorites">My Favorites</b-dropdown-item>
    <b-dropdown-item @click="goToSettings">Settings</b-dropdown-item>
    <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { removeUser } from '@/helpers/localStorage'

export default {
  name: "UserButton",
  methods: {
    logout() {
      removeUser()
      this.$store.commit('setUser', null)
    },
    goToBookings() {
      this.$router.push({ name: "Bookings" })
    },
    goToFavorites() {
      // TODO
      this.$router.push({ name: "Favorites" })
    },
    goToSettings() {
      // TODO
      this.$router.push({ name: "User" })
    },
  }
};
</script>