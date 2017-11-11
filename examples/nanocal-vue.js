import Vue from 'vue'
import Nanocal from '../nanocal'
import '../nanocal/dist/nanocal.min.css'

let state = {
  day: {
    year: 2017,
    month: 11,
    day: 1
  }
}

new Vue({
  el: '#app',
  data() {
    return state
  },
  render(h, ctx) {
    const { year, month, day } = this.$data.day

    return <div>
      <h1>Vue & Nanocal</h1>
      <h2>Selected day: {year} / {month} / {day}</h2>
      <div id="nanocal"></div>
    </div>
  },
  mounted() {
    const el = document.getElementById('nanocal')
    const nanocal = new Nanocal({
      target: el,
      data: {
        selectedDay: state.day
      }
    })

    nanocal.on('selectedDay', (day) => {
      state.day = day // mutate
    })
  }
})
