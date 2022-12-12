<template>
  <b-card no-body class="shadow review-card">
    <b-row no-gutters>
      <b-card-body class="d-flex flex-column h-100">
        <div class="d-flex justify-content-between align-items-center">
          <h4>{{ review.user }}</h4>
          <div class="rate">
            <i class="fas fa-star"></i>
            {{review.rating}}
          </div>
        </div>
        <div class="date text-muted">
          {{review.date}}
        </div>
        <div class="message">
          {{review.message}}
        </div>
      </b-card-body>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "ReviewCard",
  props: {
    review: {
      type: Object,
      required: true
    }
  },
};
</script>
