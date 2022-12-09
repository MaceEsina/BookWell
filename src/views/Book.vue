<template>
  <div class="book-page">
  </div>
</template>

<script>
export default {
  name: "Book",
  computed: {
    service() {
      return this.$store.getters.getService
    }
  },
  data() {
    return {
      isFavorite: false,
    }
  }
};
</script>
