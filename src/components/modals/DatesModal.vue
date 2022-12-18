<template>
  <b-modal
    centered
    no-stacking
    button-size="lg"
    id="date-modal"
    footer-class="footer"
    modal-class="date-modal"
    :title="`Select date${service.time ? ' and time' : ''}`"
    @ok="onOkClick"
  >
    <DateSelection
      :service="service"
      @onSelect="setSelectedData"
      @onBookClick="onOkClick" />

    <template #modal-footer>
      <footer class="footer">
        <!--<div class="date" v-if="isDateSelected">
          {{parseDate(selectedDate)}}
          <span v-if="selectedTime"> at {{selectedTime}}</span>
        </div>-->
        <b-button variant="primary" @click="onOkClick" :disabled="!isDateSelected">
          Book Now
        </b-button>
      </footer>
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
    onOkClick: {
      type: Function,
      required: true,
    },
  },
  computed: {
    isDateSelected() {
      // const isSelected = !!(this.service.time ? this.selectedDate : this.selectedTime)
      // this.setSelected(isSelected)
      return false
    }
  },
  methods: {
    parseDate,
    setSelectedData(data) {
      console.log('setSelectedData', data)
    }
  }
};
</script>
