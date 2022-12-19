<template>
  <b-modal
    centered
    no-stacking
    button-size="lg"
    id="date-modal"
    footer-class="footer"
    modal-class="date-modal"
    :title="`Select date${service.time ? ' and time' : ''}`"
  >
    <DateSelection :service="service" @onSelect="setSelectedDate" />

    <template #modal-footer>
      <div class="dates-footer">
        <div class="date" v-if="isDateSelected">
          {{parseDate(selectedDate)}}
          <span v-if="selectedTime"> at {{selectedTime}}</span>
        </div>
        <b-button variant="primary" @click="onSubmit" :disabled="!isDateSelected">
          Book Now
        </b-button>
      </div>
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
    }
  },
};
</script>
