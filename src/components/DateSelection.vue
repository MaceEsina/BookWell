<template>
  <div class="dates">
    <div class="dates-header">
      <h2>Date and Time</h2>
      <b-form-datepicker class="datepicker" size="lg" v-model="date" hide-header :min="minDate" :max="maxDate"
        :date-format-options="{ year: 'numeric', month: 'short', day: 'numeric' }" nav-button-variant="dark"
        placeholder="Choose a Date" reset-button close-button :boundary="$parent.$refs.page" @input="onDateSelect">
      </b-form-datepicker>
    </div>
    <ul>
      <li v-for="date in dates" :key="date" :class="getDateClasses(date)" @click="selectDate(date)">
        <div class="date">
          <i class="fa fa-calendar-day"></i>
          <span>{{parseDate(date)}}</span>
        </div>
        <ul v-if="service.time" class="time">
          <li v-for="time in service.time" :key="time" @click.stop="selectTime(time, date)"
            :class="getTimeClasses(date, time)">
            {{time}}
          </li>
        </ul>
        <div v-else class="pl-4">
          <div v-if="service.timeStart">Check-in Time: {{service.timeStart}}</div>
          <div v-if="service.timeEnd">Check-out Time: {{service.timeEnd}}</div>
        </div>
      </li>
    </ul>
    <div v-if="!dates.length" class="no-result">
      <span>No available bookings for the selected date</span>
      <b-button variant="primary" @click="reset">
        Show available dates
      </b-button>
    </div>
    <button v-if="hasMore" class="show-more-btn" @click="showMore">
      <span>Show More</span>
      <i class="fa fa-chevron-down"></i>
    </button>
    <button v-if="!hasMore && showLess" class="show-more-btn" @click="hideDates">
      <span>Show Less</span>
      <i class="fa fa-chevron-up"></i>
    </button>
  </div>
</template>

<script>
import { parseDate } from '@/helpers/dates'

export default {
  name: "DateSelection",
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    maxDate() {
      const today = new Date()
      const nextDate = new Date(today.setMonth(today.getMonth() + 3))
      return nextDate.toISOString().split('T')[0]
    },
    hasMore() {
      return !this.date && this.service.dates.length > this.dates.length
    },
    dates() {
      if (this.date) {
        return this.service.dates.filter(date => date === this.date)
      } else {
        return this.service.dates.slice(0, this.showMoreInx * 3)
      }
    },
  },
  data() {
    return {
      date: '',
      showMoreInx: 1,
      showLess: false,
      selectedDate: '',
      selectedTime: ''
    }
  },
  methods: {
    parseDate,
    getDateClasses(date) {
      let result = !this.service.time ? 'clickable' : ''
      if (this.selectedDate === date) result += ' selected'
      return result
    },
    getTimeClasses(date, time) {
      if (this.selectedTime === time && this.selectedDate === date) {
        return 'selected'
      } else return ''
    },
    resetSelectedDate() {
      this.selectedDate = ''
      this.selectedTime = ''
    },
    onDateSelect() {
      this.resetSelectedDate()
    },
    reset() {
      this.date = ''
      this.resetSelectedDate()
    },
    selectTime(time, date) {
      this.selectedTime = time
      this.selectedDate = date
      this.$emit('onSelect', { time, date })
    },
    selectDate(date) {
      const time = this.service.timeStart
      this.selectedTime = time
      this.selectedDate = date
      this.$emit('onSelect', { time, date })
    },
    showMore() {
      this.showMoreInx = this.showMoreInx + 1
      this.showLess = true
    },
    hideDates() {
      this.showMoreInx = 1
      this.showLess = false
    }
  }
}
</script>