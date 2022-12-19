<template>
  <b-modal
    centered
    no-stacking
    button-size="lg"
    id="date-modal"
    footer-class="footer"
    modal-class="date-modal"
    @hide="onHide"
    title="Date and Time"
  >
    <h2>{{ service.name }}</h2>
    <DateSelection :service="service" @onSelect="setSelectedDate" ref="select" />

    <template #modal-footer>
      <div class="date" v-if="isDateSelected">
        {{parseDate(selectedDate)}} at {{selectedTime}}
      </div>
      <b-button variant="primary" @click="onSubmit" :disabled="!isDateSelected">
        Book Now
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import DateSelection from "@/components/DateSelection"
import { parseDate } from '@/helpers/dates'

export default {
  name: "DatesModal",
  components: {
    DateSelection
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedDate: '',
      selectedTime: ''
    }
  },
  computed: {
    isDateSelected() {
      return !!(this.service.time ? this.selectedTime : this.selectedDate)
    }
  },
  methods: {
    parseDate,
    onSubmit() {
      this.$emit('onSubmit')
    },
    setSelectedDate(data) {
      this.selectedDate = data.date
      this.selectedTime = data.time
      this.$emit('onSelect', data)
    },
    onHide() {
      this.$refs.select.reset()
      this.selectedTime = ''
      this.selectedDate = ''
    }
  },
};
</script>
