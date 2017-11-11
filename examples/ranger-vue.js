import Vue from 'vue'
import Ranger from '../ranger' // Works fine
import '../ranger/dist/ranger.min.css'

let state = {
  start: {
    year: 2017,
    month: 11,
    day: 1
  },
  end: {
    year: 2017,
    month: 11,
    day: 10
  }
}

new Vue({
  el: '#app',
  data() {
    return state
  },
  render(h, ctx) {
    const { start, end } = this.$data

    return <div>
      <h1>Vue & Nanocal Ranger</h1>
      <h2>Selected range: {start.year} / {start.month} / {start.day} - {end.year} / {end.month} / {end.day}</h2>
      <div id="ranger"></div>
    </div>
  },
  mounted() {
    const { start, end } = this.$data
    const el = document.getElementById('ranger')
    const ranger = new Ranger({
      target: el,
      data: {
        rangeStartDay: start,
        rangeEndDay: end
      }
    })

    ranger.on('selectedRange', ([start, end]) => {
      // mutate
      state.start = start
      state.end = end
    })
  }
})
